import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaExclamationTriangle } from 'react-icons/fa';
import {
	AiFillHome,
	AiOutlinePhone,
	AiOutlineHeart,
	AiOutlineExclamationCircle
} from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { BiAlarm } from 'react-icons/bi';
import { RiCommunityLine } from 'react-icons/ri';
import { FaShieldAlt } from 'react-icons/fa'; 
import './Navbar.css';

const Navbar = () => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	return (
		<div className="navbar-container">
			<div className="menu">
				<FaBars className="hamburger-icon" onClick={toggleNav} />
			</div>

			<div
				className={`sidenav-container ${isNavOpen ? 'open' : 'closed'}`}
			>
				<NavLink to="/home" className="nav-link">
					<AiFillHome className="icon" />
					{isNavOpen && <span>Home</span>}
				</NavLink>

				<NavLink to="/home/activities" className="nav-link">
					<CgGym className="icon" />
					{isNavOpen && <span>Track Activities</span>}
				</NavLink>

				<NavLink to="/home/services" className="nav-link">
					<AiOutlinePhone className="icon" />
					{isNavOpen && <span>Emergency Contact</span>}
				</NavLink>

				<NavLink to="/home/HealthReminder" className="nav-link">
					<BiAlarm className="icon" />
					{isNavOpen && <span>Health Reminder</span>}
				</NavLink>

				<NavLink to="/home/health-status" className="nav-link">
					<AiOutlineHeart className="icon" />
					{isNavOpen && <span>Health Status</span>}
				</NavLink>

				<NavLink to="/home/sos-alert" className="nav-link">
					<FaExclamationTriangle className="icon" />
					{isNavOpen && <span>SOS Alert</span>}
				</NavLink>

				<NavLink to="/home/report-incident" className="nav-link">
					<AiOutlineExclamationCircle className="icon" />
					{isNavOpen && <span>Report Incident</span>}
				</NavLink>

				<NavLink to="/home/community-stories" className="nav-link">
					<RiCommunityLine className="icon" />
					{isNavOpen && <span>Community Stories</span>}
				</NavLink>

				<NavLink to="/home/safety-tips" className="nav-link">
          				<FaShieldAlt className="icon" />
          				{isNavOpen && <span>Safety Tips</span>}
        			</NavLink>
			</div>
		</div>
	);
};

export default Navbar;
