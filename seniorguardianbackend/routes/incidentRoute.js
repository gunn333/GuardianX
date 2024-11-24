const express = require('express');
const multer = require('../middleware/multer'); // Import multer configuration
const { reportIncident } = require('../controllers/incidentController');

const router = express.Router();

router.post('/report-incident', multer.single('file'), reportIncident); // Use multer for file uploads

module.exports = router;