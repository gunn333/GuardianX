// src/components/SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom'; // Import Link component


const SignupForm = () => {
  const [user, setUser ] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    gender: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser ({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signup', user);
      console.log(response.data);
    } catch (error) {
      console.error('There was an error creating the user!', error);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            placeholder="Enter your phone number"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="Enter your location"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">Register</button>
        <h4 className="mt-3">Already have an account? <Link to="/">Log in here</Link></h4>

      </form>
    </div>
    
  );
};

export default SignupForm;