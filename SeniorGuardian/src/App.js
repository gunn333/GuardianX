import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Screens/Home';
import LoginPage from './Components/login&signup/LoginPage';
import SignUpPage from './Components/login&signup/SignupPage';
import LogoutPage from './Components/login&signup/LogoutPage';

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/home/*" element={<Home />} />
					<Route path="/logout" element={<LogoutPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;