const Incident = require("../models/incidentModel");

const reportIncident = async (req, res) => {
    try {
        const { title, description, location, date } = req.body;
        const file = req.file ? req.file.path : null; // Get the file path

        const newIncident = new Incident({
            title,
            description,
            location,
            date,
            file
        });

        await newIncident.save();
        res.status(201).json({ success: true, message: "Incident reported successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    reportIncident
};