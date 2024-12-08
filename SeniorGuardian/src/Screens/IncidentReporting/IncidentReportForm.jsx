import React, { useState } from 'react';
import axios from 'axios';
import './IncidentReportForm.css';

const IncidentReportForm = () => {
	const [name, setName] = useState('');
	const [story, setStory] = useState('');
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		const incident = { name, story, isAnonymous };
		setLoading(true);
		try {
			await axios.post('http://localhost:3000/api/incidents', incident);
			alert('Incident reported successfully!');
			setName('');
			setStory('');
		} catch (error) {
			alert('Failed to report the incident');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

return (
	<div className="incident-report-wrapper">
		<div className="floating-bubbles">
			<div className="bubble"></div>
			<div className="bubble"></div>
			<div className="bubble"></div>
			<div className="bubble"></div>
		</div>
		<div className="incident-report-form">
			<div className="form-header">
				<h2>Report an Incident</h2>
				<p>
					Your voice matters. Share your story and help us make a
					difference.
				</p>
			</div>
			<form onSubmit={handleSubmit} className="form-container">
				{!isAnonymous && (
					<input
						type="text"
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Your Name"
						required
						className="input-field"
					/>
				)}
				<textarea
					value={story}
					onChange={e => setStory(e.target.value)}
					placeholder="Describe the incident"
					required
					className="input-field"
				/>
				<div className="checkbox-container">
					<label className="checkbox-label">
						<input
							type="checkbox"
							checked={isAnonymous}
							onChange={() => setIsAnonymous(!isAnonymous)}
						/>
						Submit Anonymously
					</label>
				</div>
				<button type="submit" className="submit-btn" disabled={loading}>
					{loading ? 'Submitting...' : 'Submit'}
				</button>
			</form>
		</div>
	</div>
);

};

export default IncidentReportForm;
