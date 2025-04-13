const express = require('express');
const router = express.Router();
const { getDailySummary } = require('../controllers/summaryController');
const { getAISuggestions } = require('../controllers/aiController'); // ⬅️ New controller

// @route   GET /api/summary/:userId/:date
router.get('/:userId/:date', getDailySummary);

//@route   POST /api/summary/ai-suggestions
router.post('/ai-suggestions', getAISuggestions); // ⬅️ New route for AI suggestions

module.exports = router;
