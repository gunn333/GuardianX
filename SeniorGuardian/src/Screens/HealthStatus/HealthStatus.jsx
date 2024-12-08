import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthStatus.css';

axios.defaults.baseURL = 'http://localhost:3000';

const HealthStatus = () => {
	const [formData, setFormData] = useState({
		name: '',
		healthStatus: '',
		activity: ''
	});

	const [healthRecords, setHealthRecords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const validateForm = () => {
		return (
			formData.name.trim() &&
			formData.healthStatus.trim() &&
			formData.activity.trim()
		);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (!validateForm()) {
			setError('All fields are required');
			return;
		}
		setError(null);

		setLoading(true);
		try {
			const response = await axios.post('/api/health', {
				name: formData.name,
				status: formData.healthStatus,
				activity: formData.activity
			});

			setHealthRecords(prevRecords => [response.data, ...prevRecords]);
			setFormData({ name: '', healthStatus: '', activity: '' });
		} catch (error) {
			console.error('Error submitting health status:', error.message);
			setError(
				error.response?.data.message || 'Error submitting health status'
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const fetchHealthRecords = async () => {
			try {
				const response = await axios.get('/api/health');
				setHealthRecords(response.data);
			} catch (error) {
				console.error('Error fetching health records:', error.message);
			}
		};

		fetchHealthRecords();
	}, []);

	return (
		<div className="health-status-wrapper">
			<div className="centered-box">
				<h1>Health Status</h1>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<form onSubmit={handleSubmit} className="health-form">
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Name"
						required
					/>
					<textarea
						name="healthStatus"
						value={formData.healthStatus}
						onChange={handleChange}
						placeholder="Health Status"
						required
					/>
					<textarea
						name="activity"
						value={formData.activity}
						onChange={handleChange}
						placeholder="Recent Activities"
						required
					/>
					<button type="submit" disabled={loading}>
						{loading ? 'Submitting...' : 'Submit'}
					</button>
				</form>
				<h2>Previous Updates</h2>
				<ul>
					{healthRecords.map(record => (
						<li key={record._id}>
							<strong>{record.name}</strong>: {record.status} -{' '}
							{record.activity}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default HealthStatus;
