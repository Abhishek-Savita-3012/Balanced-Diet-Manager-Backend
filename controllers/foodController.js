const getNutritionData = require('../utils/nutritionAPI');
const FoodEntry = require('../models/FoodEntry');

exports.addFoodEntry = async (req, res) => {
  try {
    const { userId, foodName, quantity, date } = req.body;

    const nutrition = await getNutritionData(foodName);
    const factor = quantity / 100;

    const scaledNutrition = {
      calories: nutrition.calories * factor,
      protein: nutrition.protein * factor,
      carbohydrates: nutrition.carbohydrates * factor,
      fats: nutrition.fats * factor,
    };

    const newEntry = new FoodEntry({
      userId,
      foodName,
      quantity,
      date: new Date(date), // or new Date() if not passed
      ...scaledNutrition,
    });    

    await newEntry.save();
    res.status(201).json({ message: 'Food entry added', data: newEntry });
  } catch (err) {
    console.error('Error adding food entry:', err.message);
    res.status(500).json({ message: 'Failed to add food entry' });
  }
};

exports.getFoodEntriesByDate = async (req, res) => {
  try {
    const { userId, date } = req.params;

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const entries = await FoodEntry.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    res.status(200).json(entries);
  } catch (err) {
    console.error('Error fetching food entries:', err.message);
    res.status(500).json({ message: 'Failed to fetch food entries' });
  }
};
