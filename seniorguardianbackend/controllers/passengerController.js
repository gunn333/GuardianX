const passenger = require("../models/passengerDetails");
const express = require("express");
const router = express.Router();
const { Error } = require("console");

//create a passenger
router.post("/add-passenger", async (req, res) => {
    console.log(req.body);  // Log incoming request body
    const { email, Name, phoneNumber, gender, password, location } = req.body;
    try {
      const passengerDetail = new passenger({
        email,
        Name,
        phoneNumber,
        gender,
        password,
        location,
      });
      const passengerdetail = await passengerDetail.save();
      res.json(passengerdetail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
//get all passengers
router.get("/get-passenger-all", async (req, res) => {
  try {
    const passengerDetail = await passenger.find({});
    res.json(passengerDetail);
  } catch (error) {
    res.status(500).json({ error: Error.message });
  }
});

//get specific passenger
router.get("/get-passenger", async (req, res) => {
  const passengerId = req.params.id;
  try {
    const passengerDetail = await issue.findById({ passengerId });
    if (!passengerDetail) {
      return res.status(404).json({ error: Error.message });
    }
    res.json(passengerDetail);
  } catch (error) {
    res.status(500).json({ error: Error.message });
  }
});

//delete passenger
router.delete("/delete-passenger", async (req, res) => {
  const passengerId = req.params.id;
  try {
    const deletedpassenger = await issue.findByIdAndRemove({ passengerId });
    if (!deletedpassenger) {
      return res.status(404).json({ error: Error.message });
    }
    res.json(deletedpassenger);
  } catch (error) {
    res.status(500).json({ error: Error.message });
  }
});

module.exports = router;