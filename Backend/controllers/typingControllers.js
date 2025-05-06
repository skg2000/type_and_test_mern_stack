const TypingResult = require('../models/TypingResult');

exports.saveResult = async (req, res) => {
  try {
    const { username, wpm, accuracy, characters, date } = req.body;

    if (
      username == null || 
      wpm == null || 
      accuracy == null || 
      characters == null || 
      date == null
    ) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newResult = new TypingResult({ username, wpm, accuracy, characters, date });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const results = await TypingResult.find({ username: req.params.username }).sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const topResults = await TypingResult.find().sort({ wpm: -1 }).limit(10);
    res.json(topResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
