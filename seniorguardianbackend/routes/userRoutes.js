const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser
} = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middleware/jwtMiddleware');

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Secure route that requires JWT authentication
router.get('/secure-data', jwtAuthMiddleware, (req, res) => {
	res.status(200).json({
		message: 'This is a secure data route',
		user: req.user // User data from the verified token
	});
});

// Example routes for user profile management (uncomment and implement in the controller as needed)
// router.get('/myaccount', jwtAuthMiddleware, getUserProfile);
// router.patch('/myaccount', jwtAuthMiddleware, updateUserProfile);

module.exports = router;