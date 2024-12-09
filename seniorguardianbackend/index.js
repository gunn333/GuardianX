const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const Activity = require('./models/Activity');
const Health = require('./models/HealthStatus');
const Contact = require('./models/Contact'); 
require("dotenv").config();

const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(
	cors({
		origin: 'http://localhost:3001',
		methods: ['GET', 'POST', 'PUT', 'DELETE']
	})
);

mongoose
  .connect('mongodb://localhost:27017/elderactivity')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  app.use('/api/', require('./routes/userRoutes'));

  

// mongoose
// 	.connect('mongodb://localhost:27017/elderactivity', {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	})
// 	.then(() => console.log('Connected to MongoDB'))
// 	.catch(err => console.error('Error connecting to MongoDB:', err));

// ------------------------------------Incident Routes---------------------------------------

// Incident Schema
const incidentSchema = new mongoose.Schema({
	name: String,
	story: String,
	createdAt: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 },
	comments: [{ text: String, createdAt: { type: Date, default: Date.now } }],
	isAnonymous: Boolean
});

const Incident = mongoose.model('Incident', incidentSchema);

// Routes
app.get('/api/incidents', async (req, res) => {
	const { page = 1, limit = 10 } = req.query;
	const skip = (page - 1) * limit;

	try {
		const incidents = await Incident.find()
			.skip(skip)
			.limit(Number(limit))
			.sort({ createdAt: -1 });
		res.status(200).json(incidents);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch incidents' });
	}
});

app.post('/api/incidents', async (req, res) => {
    const { name, story, isAnonymous } = req.body;

    try {
        const newIncident = new Incident({
            name,
            story,
            isAnonymous,
        });
        await newIncident.save();
        res.status(201).json({ message: 'Incident created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create incident' });
    }
});

// ------------------------------------Community Routes---------------------------------------

// Increment like count
app.put('/api/incidents/:id/like', async (req, res) => {
	const { like } = req.body;
	const { id } = req.params;

	try {
		const incident = await Incident.findById(id);
		if (like) {
			incident.likes += 1;
		} else {
			incident.likes -= 1;
		}
		await incident.save();
		res.status(200).json({ message: 'Like updated' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update like' });
	}
});

// Add comment
app.post('/api/incidents/:id/comment', async (req, res) => {
	const { text } = req.body;
	const { id } = req.params;

	try {
		const incident = await Incident.findById(id);
		incident.comments.push({ text });
		await incident.save();
		res.status(200).json({ message: 'Comment added' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to add comment' });
	}
});

// ------------------------------------Activity Routes------------------------------------

app.use('/api', (req, res, next) => {
	console.log(`Incoming request to: ${req.path}`); 
	next(); 
  });

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
			{ new: true } 
		);
		res.status(200).json(updatedActivity);
	} catch (error) {
		console.error('Error updating activity:', error.message);
		res.status(500).json({ message: 'Error updating activity', error });
	}
});

// ------------------------------------Health Status Routes------------------------------------

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
			{ new: true } 
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

// ------------------------------------Emergency Contact Routes------------------------------------

app.get('/api/contacts', async (req, res) => {
  try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
  } catch (error) {
      console.error('Error fetching contacts:', error.message);
      res.status(500).json({ message: 'Error fetching contacts', error });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, phone, relation } = req.body;
  try {
      const newContact = new Contact({ name, phone, relation });
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
  } catch (error) {
      console.error('Error adding contact:', error.message);
      res.status(500).json({ message: 'Error adding contact', error });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
      await Contact.findByIdAndDelete(id);
      res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
      console.error('Error deleting contact:', error.message);
      res.status(500).json({ message: 'Error deleting contact', error });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, phone, relation } = req.body;
  try {
      const updatedContact = await Contact.findByIdAndUpdate(
          id,
          { name, phone, relation },
          { new: true } 
      );
      res.status(200).json(updatedContact);
  } catch (error) {
      console.error('Error updating contact:', error.message);
      res.status(500).json({ message: 'Error updating contact', error });
  }
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});