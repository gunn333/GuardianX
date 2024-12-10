import React from 'react';
import './LandingPage.css';
import {
	FaSitemap,
	FaLocationArrow,
	FaPhoneAlt,
	FaBook,
	FaHeartbeat,
	FaListAlt,
	FaInfoCircle
} from 'react-icons/fa';

const LandingPage = () => {
	return (
		<div className="landing-page">
			<br></br>

			<h1>Welcome to GuardianX</h1>

			<p>Your Comprehensive Safety and Care Platform</p>

			<div className="features">
				<div className="featurel">
					<FaSitemap className="feature-icon" />
					<br></br>
					SOS Alert
					<p>
						Send an emergency alert to a trusted contact with just
						one click.
					</p>
				</div>

				<div className="featurel">
					<FaInfoCircle className="feature-icon" />
					<br></br>
					Incident Reporting
					<p>Report unsafe incidents through a simple form.</p>
				</div>

				<div className="featurel">
					<FaLocationArrow className="feature-icon" />
					<br></br>
					Location Sharing
					<p>
						Share your current location with loved ones for added
						safety.
					</p>
				</div>

				<div className="featurel">
					<FaPhoneAlt className="feature-icon" />
					<br></br>
					Emergency Contact Management
					<p>Save and update emergency contact details easily.</p>
				</div>

				<div className="featurel">
					<FaBook className="feature-icon" />
					<br></br>
					Safety Tips
					<p>
						Access a collection of safety tips and guidelines for
						confidence.
					</p>
				</div>

				<div className="featurel">
					<FaHeartbeat className="feature-icon" />
					<br></br>
					Health Check-In Reminders
					<p>
						Set and receive reminders for daily health check-ins and
						medication.
					</p>
				</div>

				<div className="featurel">
					<FaListAlt className="feature-icon" />
					<br></br>
					Routine Tracker
					<p>
						Track and log daily activities like meals and exercise.
					</p>
				</div>

				<div className="featurel">
					<FaInfoCircle className="feature-icon" />
					<br></br>
					Health Status Updates
					<p>
						Simple forms for updating and viewing health status and
						activities.
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
