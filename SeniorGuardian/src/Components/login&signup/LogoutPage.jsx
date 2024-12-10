import React from 'react';
import './LogoutPage.css';

const LogoutPage = () => {
  const handleLogout = () => {
    console.log('User logged out.');
    window.location.href = '/';
  };

  return (
    <div className="logout-page">
      <div className="logout-container">
        <h2>Goodbye!</h2>
        <p>You have successfully logged out. We hope to see you again soon!</p>
        <button className="logout-btn" onClick={handleLogout}>
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
