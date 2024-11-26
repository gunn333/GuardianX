const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/UserSosModel');

const router = express.Router();

// POST /api/sos
router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Send Email Alert
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'SOS Alert',
            text: `SOS Alert from ${user.name}: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email', error });
            }
            res.status(200).json({ message: 'SOS alert sent successfully', info });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;