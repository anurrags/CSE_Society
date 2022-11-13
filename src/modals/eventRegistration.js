const mongoose = require("mongoose");

const eventRegisterSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const registeredUser = new mongoose.model(
  "RegisteredEvent",
  eventRegisterSchema
);

module.exports = registeredUser;
