import React, { useState } from 'react';
import './LoginPage.css';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			const data = await response.json();
			if (response.ok) {
				localStorage.setItem('token', data.token);
				navigate('/home');
			} else {
				setErrorMessage(data.message || 'Login failed');
			}
		} catch (error) {
			setErrorMessage('Error occurred during login');
		}
	};

	const handleSignUpRedirect = () => {
		navigate('/signup');
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<h2>Login to GuardianX</h2>
				<form onSubmit={handleLogin} className="login-form">
					<div className="input-container">
						<FaUser className="input-icon" />
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="input-container">
						<FaLock className="input-icon" />
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit" className="submit-btn">
						Login
					</button>
				</form>
				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}

				<div className="signup-redirect">
					<p>
						Don't have an account?{' '}
						<span onClick={handleSignUpRedirect}>Sign Up</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;