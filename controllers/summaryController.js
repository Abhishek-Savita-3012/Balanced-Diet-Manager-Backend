const FoodEntry = require('../models/FoodEntry');
const getNutritionData = require('../utils/nutritionAPI');

exports.getDailySummary = async (req, res) => {
  const { userId, date } = req.params;

  try {
    const entries = await FoodEntry.find({ userId, date });

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    for (let entry of entries) {
      const nutrition = await getNutritionData(entry.foodName, entry.quantity);

      totalCalories += nutrition.calories || 0;
      totalProtein += nutrition.protein || 0;
      totalCarbs += nutrition.carbohydrates || 0;
      totalFats += nutrition.fats || 0;
    }

    res.json({
      date,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFats,
    });
  } catch (err) {
    console.error('Error in summary:', err);
    res.status(500).json({ error: 'Failed to generate nutrition summary' });
  }
};
