const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
	type: { type: String, required: true },
	name: { type: String, required: true },
	time: { type: String, required: true },
	reminder: { type: Boolean, required: true }
});

module.exports = mongoose.model('Activity', activitySchema);
