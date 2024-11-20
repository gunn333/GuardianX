import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiFillHome, AiOutlinePhone } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { BiAlarm } from 'react-icons/bi';
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
				<NavLink to="/" className="nav-link">
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
			</div>
		</div>
	);
};

export default Navbar;
