const axios = require('axios');

// Use process.env.USDA_API_KEY in production
const USDA_API_KEY = 'sFH2ixD58J7TYdeTXB0Wo77xVPUlJRwipmKfxVib';

const getNutritionData = async (foodName) => {
  try {
    // Step 1: Search for the food
    const searchRes = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        query: foodName,
        api_key: USDA_API_KEY,
      },
    });

    const foodItem = searchRes.data.foods?.[0];
    if (!foodItem) throw new Error('Food not found in USDA database');

    const fdcId = foodItem.fdcId;

    // Step 2: Get detailed nutrition data
    const detailRes = await axios.get(`https://api.nal.usda.gov/fdc/v1/food/${fdcId}`, {
      params: {
        api_key: USDA_API_KEY,
      },
    });

    const nutrients = detailRes.data.foodNutrients || [];

    // 🔍 Debug: Print all nutrient names with fallback for both structures
    console.log(`\n🔍 Nutrients for "${foodName}":`);
    nutrients.forEach((n, index) => {
      const name = n.nutrient?.name || n.nutrientName || 'Unknown';
      const amount = n.amount ?? n.value ?? 0;
      const unit = n.nutrient?.unitName || n.unitName || '';
      console.log(`${index + 1}. ${name}: ${amount} ${unit}`);
    });

    const findNutrient = (target) => {
      const nutrient = nutrients.find(n =>
        (n.nutrient?.name || n.nutrientName || '').toLowerCase().includes(target.toLowerCase())
      );
      return nutrient?.amount ?? nutrient?.value ?? 0;
    };

    return {
      calories: findNutrient('Energy'),
      protein: findNutrient('Protein'),
      carbohydrates: findNutrient('Carbohydrate'),
      fats: findNutrient('Total lipid'),
    };

  } catch (err) {
    console.error('❌ Error fetching nutrition data from USDA:', err.message);
    return {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
    };
  }
};

module.exports = getNutritionData;
