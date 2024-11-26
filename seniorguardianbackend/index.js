const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const Activity = require('./models/Activity');
const Health = require('./models/HealthStatus');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const sosRoutes = require('./routes/userSosRoute');
// Middleware
app.use(express.json());
// app.use(cors());
app.use(bodyParser.json());
app.use(
	cors({
		origin: 'http://localhost:3001',
		methods: ['GET', 'POST', 'PUT', 'DELETE']
	})
);

app.use('/api/sos', sosRoutes);

// Connect to MongoDB
mongoose
	.connect('mongodb://localhost:27017/elderactivity', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB:', err));

// ------------------------------------Activity Routes------------------------------------

// Fetch activities by type
app.get('/api/activities', async (req, res) => {
	const { type } = req.query;
	try {
		const activities = await Activity.find(type ? { type } : {});
		res.status(200).json(activities);
	} catch (error) {
		console.error('Error fetching activities:', error.message);
		res.status(500).json({ message: 'Error fetching activities', error });
	}
});

// Add a new activity
app.post('/api/activities', async (req, res) => {
	const { type, name, time, reminder } = req.body;

	console.log('Request body:', req.body);

	try {
		const newActivity = new Activity({ type, name, time, reminder });
		const savedActivity = await newActivity.save();
		res.status(201).json(savedActivity);
	} catch (error) {
		console.error('Error adding activity:', error.message);
		res.status(500).json({ message: 'Error adding activity', error });
	}
});

// Delete an activity by ID
app.delete('/api/activities/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await Activity.findByIdAndDelete(id);
		res.status(200).json({ message: 'Activity deleted successfully' });
	} catch (error) {
		console.error('Error deleting activity:', error.message);
		res.status(500).json({ message: 'Error deleting activity', error });
	}
});

// Update an activity by ID
app.put('/api/activities/:id', async (req, res) => {
	const { id } = req.params;
	const { name, time, reminder } = req.body;

	console.log('Update request:', { id, name, time, reminder });

	try {
		const updatedActivity = await Activity.findByIdAndUpdate(
			id,
			{ name, time, reminder },
			{ new: true } // Return the updated document
		);
		res.status(200).json(updatedActivity);
	} catch (error) {
		console.error('Error updating activity:', error.message);
		res.status(500).json({ message: 'Error updating activity', error });
	}
});

// ------------------------------------Health Status Routes------------------------------------

// Fetch all health records or filter by status
app.get('/api/health', async (req, res) => {
	const { status } = req.query;
	try {
		const healthRecords = await Health.find(status ? { status } : {});
		res.status(200).json(healthRecords);
	} catch (error) {
		console.error('Error fetching health records:', error.message);
		res.status(500).json({
			message: 'Error fetching health records',
			error
		});
	}
});

// Add a new health record
app.post('/api/health', async (req, res) => {
	const { name, status, activity } = req.body;

	try {
		const newHealthRecord = new Health({ name, status, activity });
		const savedHealthRecord = await newHealthRecord.save();
		res.status(201).json(savedHealthRecord);
	} catch (error) {
		console.error('Error adding health record:', error.message);
		res.status(500).json({ message: 'Error adding health record', error });
	}
});

// Delete a health record by ID
app.delete('/api/health/:id', async (req, res) => {
	const { id } = req.params;
	try {
		await Health.findByIdAndDelete(id);
		res.status(200).json({ message: 'Health record deleted successfully' });
	} catch (error) {
		console.error('Error deleting health record:', error.message);
		res.status(500).json({
			message: 'Error deleting health record',
			error
		});
	}
});

// Update a health record by ID
app.put('/api/health/:id', async (req, res) => {
	const { id } = req.params;
	const { name, status, activity } = req.body;

	try {
		const updatedHealthRecord = await Health.findByIdAndUpdate(
			id,
			{ name, status, activity },
			{ new: true } // Return the updated document
		);
		res.status(200).json(updatedHealthRecord);
	} catch (error) {
		console.error('Error updating health record:', error.message);
		res.status(500).json({
			message: 'Error updating health record',
			error
		});
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
