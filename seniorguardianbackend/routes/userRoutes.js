const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser
} = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middleware/jwtMiddleware');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/secure-data', jwtAuthMiddleware, (req, res) => {
	res.status(200).json({
		message: 'This is a secure data route',
		user: req.user 
	});
});

module.exports = router;