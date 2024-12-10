import React, { useState, useEffect } from 'react';  
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiLogoWhatsapp } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import './Contact.css';
import axios from 'axios';

const EmergencyContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editContactIndex, setEditContactIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    relation: Yup.string().required('Relation is required')
  });

  const contactFormik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      relation: ''
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editContactIndex !== null) {
          const contactToEdit = contacts[editContactIndex];
          const response = await axios.put(
            `http://localhost:3000/api/contacts/${contactToEdit._id}`,
            values
          );
          const updatedContacts = [...contacts];
          updatedContacts[editContactIndex] = response.data;
          setContacts(updatedContacts);
          toast.success('Emergency contact updated successfully!');
        } else {
          const response = await axios.post(
            'http://localhost:3000/api/contacts',
            values
          );
          setContacts([...contacts, response.data]);
          toast.success('Emergency contact added successfully!');
        }
        resetForm();
        closeModal();
      } catch (error) {
        toast.error('Failed to save contact');
        console.error('Error saving contact:', error.message);
      }
    }
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error.message);
        toast.error('Failed to fetch contacts');
      }
    };
    fetchContacts();
  }, []); 

  const openModal = (index) => {
    if (index !== null) {
      const contact = contacts[index];
      contactFormik.setValues(contact);
      setEditContactIndex(index);
    } else {
      contactFormik.resetForm();
      setEditContactIndex(null);
    }
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    setModalIsOpen(false);
    contactFormik.resetForm(); 
    setEditContactIndex(null); 
  };
  

  const deleteContact = async index => {
    const contactToDelete = contacts[index];
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${contactToDelete._id}`);
      const updatedContacts = contacts.filter((_, i) => i !== index);
      setContacts(updatedContacts);
      toast.info('Emergency contact deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete contact');
      console.error('Error deleting contact:', error.message);
    }
  };

  const shareLocation = phone => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          const message = `I'm in an emergency! My current location is: ${locationUrl}`;
          window.open(
            `http://wa.me/${phone}?text=${encodeURIComponent(message)}`,
            '_blank'
          );
          toast.success('Location shared successfully!');
        },
        () => {
          toast.error('Unable to retrieve location.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className={`EmergencyContactManagement ${modalIsOpen ? 'modal-open' : ''}`}>
      <h1>Emergency Contact Management</h1>
      <ToastContainer />

      <div className="form-section">
        <h2>Add Emergency Contact</h2>
        <form onSubmit={contactFormik.handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contactFormik.values.name}
              onChange={contactFormik.handleChange}
              onBlur={contactFormik.handleBlur}
            />
            {contactFormik.touched.name && contactFormik.errors.name && (
              <div className="error">
                {contactFormik.errors.name}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={contactFormik.values.phone}
              onChange={contactFormik.handleChange}
              onBlur={contactFormik.handleBlur}
            />
            {contactFormik.touched.phone && contactFormik.errors.phone && (
              <div className="error">
                {contactFormik.errors.phone}
              </div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="relation"
              placeholder="Relation"
              value={contactFormik.values.relation}
              onChange={contactFormik.handleChange}
              onBlur={contactFormik.handleBlur}
            />
            {contactFormik.touched.relation && contactFormik.errors.relation && (
              <div className="error">
                {contactFormik.errors.relation}
              </div>
            )}
          </div>
          <button className="btn" type="submit">
            {editContactIndex === null ? 'Add Contact' : 'Update Contact'}
          </button>

        </form>

        <input
          type="text"
          placeholder="Search Contacts..."
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          className="search-input"
        />

        <h3>Contacts List</h3>
        <ul className="contacts-list">
          {contacts
            .filter(
              contact =>
                contact.name.toLowerCase().includes(searchTerm) ||
                contact.phone.includes(searchTerm)
            )
            .map((contact, index) => (
              <li key={index} className="contact-item">
                {contact.name} - {contact.phone} ({contact.relation})
                <button
                  className="whatsapp-button"
                  onClick={() =>
                    window.open(`http://wa.me/${contact.phone}`, '_blank')
                  }
                >
                  <BiLogoWhatsapp />
                </button>
                <button
                  className="edit-button"
                  onClick={() => openModal(index)}
                >
                  <FiEdit /> Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteContact(index)}
                >
                  <FiTrash2 /> Delete
                </button>
                <button
                  className="location-button"
                  onClick={() => shareLocation(contact.phone)}
                >
                  Share Location
                </button>
              </li>
            ))}
        </ul>
      </div>

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  className="Modal"
  overlayClassName="ReactModal__Overlay" 
>
  <h2>{editContactIndex !== null ? 'Edit Contact' : 'Add Contact'}</h2>
  <form onSubmit={contactFormik.handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={contactFormik.values.name}
      onChange={contactFormik.handleChange}
      onBlur={contactFormik.handleBlur}
    />
    <input
      type="tel"
      name="phone"
      placeholder="Phone Number"
      value={contactFormik.values.phone}
      onChange={contactFormik.handleChange}
      onBlur={contactFormik.handleBlur}
    />
    <input
      type="text"
      name="relation"
      placeholder="Relation"
      value={contactFormik.values.relation}
      onChange={contactFormik.handleChange}
      onBlur={contactFormik.handleBlur}
    />
    <button type="submit">
      {editContactIndex !== null ? 'Update' : 'Add'}
    </button>
  </form>
  <button onClick={closeModal}>Close</button>
</Modal>
    </div>
  );
};

export default EmergencyContactManagement;
