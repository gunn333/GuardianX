const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
	name: { type: String, required: true },
	status: { type: String, required: true },
	activity: { type: String, required: true }
});

const Health = mongoose.model('Health', healthSchema);

module.exports = Health;
