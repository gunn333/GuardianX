import React from 'react';
import './Home.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from '../Components/Navbar/Navbar';
import HealthReminder from './HealthReminder/Reminder';
import LandingPage from './Landing Page/LandingPage';
import EmergencyContact from './EmergencyContact/Contact';
import Activities from './TrackActivities/Activities';
import HealthStatus from './HealthStatus/HealthStatus';

const Home = () => {
	return (
		<div className="home-wrapper">
			<header className="header">
				<h1 className="header-title">Old Care & Women Safety</h1>
				<div className="navbar-container">
					<Navbar />
				</div>
			</header>

			<div className="content-container">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/HealthReminder" element={<HealthReminder />} />
					<Route path="/services" element={<EmergencyContact />} />
					<Route path="/activities" element={<Activities />} />
					<Route path="/health-status" element={<HealthStatus />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
