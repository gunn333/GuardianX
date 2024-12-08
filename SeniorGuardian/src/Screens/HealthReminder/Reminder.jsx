import React, { useState } from 'react';
import './Reminder.css'; 
import emailjs from 'emailjs-com'; 

const HealthCheckIn = () => {
  const [reminderTime, setReminderTime] = useState('');
  const [reminderText, setReminderText] = useState('');
  const [email, setEmail] = useState(''); 
  const [userId] = useState(''); 
  const [reminders, setReminders] = useState([]);
  const [notification, setNotification] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (reminderTime && reminderText && email) {
      const newReminder = {
        time: reminderTime,
        text: reminderText,
        email: email, 
        userId: userId, 
      };

      setReminders([...reminders, newReminder]);
      setReminderTime('');
      setReminderText('');
      setEmail('');
      setNotification('Sending reminder email...');

      sendEmailReminder(newReminder); 
    } else {
      setNotification('Please fill out all fields.');
    }
  };

  const sendEmailReminder = reminder => {
    const templateParams = {
      to_email: reminder.email,
      user_name: `User ${reminder.userId}`, 
      reminder_time: reminder.time,
      reminder_text: reminder.text,
    };

    emailjs
      .send('service_5v6s886', 'template_ggr72pi', templateParams, 'xxRsop9HTbdvmx1nx')
      .then(
        response => {
          console.log('Email sent successfully:', response);
          setNotification(`Reminder sent to ${reminder.email} for ${reminder.time}: "${reminder.text}"`);
        },
        error => {
          console.error('Error sending email:', error);
          setNotification('Failed to send email reminder.');
        }
      );
  };

  return (
    <div className="health-checkin-container">
      <h2>Health Check-In Reminders</h2>
      <form onSubmit={handleSubmit} className="reminder-form">
        <input
          type="time"
          value={reminderTime}
          onChange={e => setReminderTime(e.target.value)}
          required
          className="reminder-input"
        />
        <input
          type="text"
          placeholder="Reminder text (e.g., Take medication)"
          value={reminderText}
          onChange={e => setReminderText(e.target.value)}
          required
          className="reminder-input"
        />
        <input
          type="email" 
          placeholder="Your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="reminder-input"
        />
        <button type="submit" className="submit-button">
          Set Reminder
        </button>
      </form>
      
      {notification && <div className="notification">{notification}</div>}

      <div className="reminders-list">
        <h3>Your Reminders</h3>
        <ul>
          {reminders.map((reminder, index) => (
            <li key={index} className="reminder-item">
              {reminder.time} - {reminder.text} (to: {reminder.email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthCheckIn;
