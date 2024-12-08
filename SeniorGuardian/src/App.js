import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import LoginForm from './Components/Navbar/login&signup/LoginForm.js';
import SignupForm from './Components/Navbar/login&signup/SignupForm.js';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<LoginForm />} />
					<Route path="/signup" element={<SignupForm />} />
					<Route path="/home/*" element={<Home />} />
				</Routes>
			</div>
		</Router>
		
	);
}

export default App;
