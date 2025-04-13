// server/routes/foodRoutes.js

const express = require('express');
const router = express.Router();
const { addFoodEntry, getFoodEntriesByDate } = require('../controllers/foodController');

// @route   POST /api/food/add
router.post('/add', addFoodEntry);

// @route   GET /api/food/:userId/:date
router.get('/:userId/:date', getFoodEntriesByDate);

module.exports = router;
