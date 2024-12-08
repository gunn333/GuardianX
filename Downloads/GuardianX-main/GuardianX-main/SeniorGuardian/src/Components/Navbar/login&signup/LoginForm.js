// src/components/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link component


const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', credentials);
      console.log(response.data);
      // Handle successful login (e.g., redirect or show a success message)
      navigate('/home');
    } catch (error) {
      console.error('There was an error logging in!', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User  Login</h2>
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
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <h4 className="mt-3">Don’t have an account? <Link to="/signup">Sign up here</Link></h4>

        
      </form>
    </div>
  );
};

export default LoginForm;