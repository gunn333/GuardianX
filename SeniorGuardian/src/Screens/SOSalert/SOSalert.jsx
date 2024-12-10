import React, { useState, useEffect } from 'react';
import './SOSalert.css';
import { FaExclamationTriangle, FaPhoneAlt, FaShieldAlt } from 'react-icons/fa';
import sirenAudio from '../../assets/emergency-vehicles-31578.mp3';

const SOSAlert = () => {
	const [alertActive, setAlertActive] = useState(false);

	const [audio] = useState(new Audio(sirenAudio));

	useEffect(() => {
		if (alertActive) {
			audio.loop = true; 
			audio.play(); 
		} else {
			audio.pause();
			audio.currentTime = 0;
		}

		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, [alertActive, audio]); 

	const toggleAlert = () => {
		setAlertActive(!alertActive);
	};

	return (
		<div className="sos-alert-page">
			<div className="sos-alert-container">
				<h1 className="page-title">GuardianX SOS Alert</h1>
				<p className="alert-description">
					Your safety is our priority. The SOS alert helps you notify
					your trusted contacts immediately in case of an emergency.
					It is fast, reliable, and can save lives.
				</p>

				<div className="alert-info-box">
					<FaPhoneAlt className="info-icon" />
					<div>
						<h3>How It Works:</h3>
						<p>
							Simply press the button below to send an emergency
							alert to your trusted contacts. The SOS alarm will
							sound to draw attention, and help will be on the
							way.
						</p>
					</div>
				</div>

				<div className="alert-info-box">
					<FaShieldAlt className="info-icon" />
					<div>
						<h3>Your Safety is Guaranteed:</h3>
						<p>
							Once activated, your location is shared with your
							emergency contacts, and help is dispatched
							immediately. Stay safe with GuardianX.
						</p>
					</div>
				</div>

				<button
					className={`sos-alert-button ${
						alertActive ? 'active' : ''
					}`}
					onClick={toggleAlert}
				>
					<FaExclamationTriangle
						className={`sos-icon ${alertActive ? 'active' : ''}`}
					/>
					{alertActive ? 'SOS Alert Activated' : 'Activate SOS Alert'}
				</button>

				{alertActive && (
					<div className="alert-status">
						<p>
							Your alert has been activated. Help is on the way!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SOSAlert;
