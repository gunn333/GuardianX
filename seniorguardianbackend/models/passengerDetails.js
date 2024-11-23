const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const passengerSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,  // This is the field that is failing
    },
    phoneNumber: {
      type: String,
      required: true,  // This ensures phoneNumber is required
      unique: true      // Optionally, enforce uniqueness
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Others"],
    },
    location: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Hash password before saving
  passengerSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  });
  
  module.exports = mongoose.model("Passenger", passengerSchema);
  