const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    file: String // to store the file path
});

module.exports = mongoose.model('Incident', incidentSchema);