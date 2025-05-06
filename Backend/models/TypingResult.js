const mongoose = require('mongoose');

const TypingResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  wpm: { type: Number, required: true, min: 0 },
  cpm: { type: Number, default: 0, min: 0 },
  mistakes: { type: Number, default: 0, min: 0 },
  accuracy: { type: Number, required: true, min: 0, max: 100 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TypingResult', TypingResultSchema);
