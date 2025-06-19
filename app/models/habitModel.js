const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  frequency: { type: String, required: true },
});

module.exports = mongoose.model('Habit', habitSchema);
