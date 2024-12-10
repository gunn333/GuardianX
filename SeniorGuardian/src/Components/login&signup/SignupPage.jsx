import React, { useState } from 'react';
import './SignupPage.css'; 
import { FaUser, FaLock, FaPhoneAlt, FaRegBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		first_name: '',
		last_name: '',
		age: '',
		blood_group: '',
		gender: '',
		phone_number: '',
		password: ''
	});
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSignUp = async e => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});
			const data = await response.json();
			if (response.ok) {
				navigate('/');
			} else {
				setErrorMessage(data.message || 'Registration failed');
			}
		} catch (error) {
			setErrorMessage('Error occurred during sign up');
		}
	};

	return (
		<div className="signup-page">
			<div className="signup-container">
				<h2>Sign Up for GuardianX</h2>
				<form onSubmit={handleSignUp} className="signup-form">
					<div className="input-container">
						<FaUser className="input-icon" />
						<input
							type="text"
							placeholder="First Name"
							name="first_name"
							value={formData.first_name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="input-container">
						<FaUser className="input-icon" />
						<input
							type="text"
							placeholder="Last Name"
							name="last_name"
							value={formData.last_name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="input-container">
						<FaRegBuilding className="input-icon" />
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="input-container">
						<input
							type="number"
							placeholder="Age"
							name="age"
							value={formData.age}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="input-container">
						<input
							type="text"
							placeholder="Blood Group"
							name="blood_group"
							value={formData.blood_group}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="input-container">
						<select
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							required
						>
							<option value="">Select Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
							<option value="Other">Other</option>
						</select>
					</div>
					<div className="input-container">
						<FaPhoneAlt className="input-icon" />
						<input
							type="tel"
							placeholder="Phone Number"
							name="phone_number"
							value={formData.phone_number}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="input-container">
						<FaLock className="input-icon" />
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>

					<button type="submit" className="submit-btn">
						Sign Up
					</button>
				</form>
				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}
				<p className="already-account">
					Already have an account?{' '}
					<span onClick={() => navigate('/')} className="login-link">
						Login
					</span>
				</p>
			</div>
		</div>
	);
};

export default SignUpPage;
