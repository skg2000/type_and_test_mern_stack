const express = require('express');
const router = express.Router();

const {
  saveResult,
  getHistory,
  getLeaderboard,
} = require('../controllers/typingControllers');

// Save typing test result
router.post('/save', saveResult);

// Get typing history by username
router.get('/history/:username', getHistory);

// Get leaderboard
router.get('/leaderboard', getLeaderboard);

module.exports = router;

