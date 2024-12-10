const jwt = require('jsonwebtoken');

const generateToken = userData => {
	return jwt.sign(userData, process.env.JWT_SECRET);
};

const jwtAuthMiddleware = (req, res, next) => {
	const authcheck = req.headers.authorization;

	if (!authcheck) {
		return res.status(401).json({ message: 'Token not available' });
	}

	const token = authcheck.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized User' });
	}
	try {
		const validateToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = validateToken;
		next();
	} catch (error) {
		console.error('Error occurred: ', err.message);
		return res.status(401).json({ err: 'Invalid token' });
	}
};

module.exports = { generateToken, jwtAuthMiddleware };