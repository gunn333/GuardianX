import React from 'react';
import './Home.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from '../Components/Navbar/Navbar';
import HealthReminder from './HealthReminder/Reminder';
import LandingPage from './Landing Page/LandingPage';
import EmergencyContact from './EmergencyContact/Contact';
import Activities from './TrackActivities/Activities';
import HealthStatus from './HealthStatus/HealthStatus';
import SOSAlert from './SOSalert/SOSalert';
import IncidentReportForm from './IncidentReporting/IncidentReportForm';
import CommunityStories from './Community/CommunityStories';
import SafetyTips from './SafetyTips/SafetyTips';

const Home = () => {
	return (
		<div className="home-wrapper">
			<header className="header">
				<div className="navbar-container">
					<Navbar />
				</div>
			</header>

			<div className="content-container">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route
						path="/HealthReminder"
						element={<HealthReminder />}
					/>
					<Route path="/services" element={<EmergencyContact />} />
					<Route path="/activities" element={<Activities />} />
					<Route path="/health-status" element={<HealthStatus />} />
					<Route path="/sos-alert" element={<SOSAlert />} />
					<Route path="/report-incident" element={<IncidentReportForm />} />
					<Route path="/community-stories" element={<CommunityStories />} />
					<Route path="/safety-tips" element={<SafetyTips />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
