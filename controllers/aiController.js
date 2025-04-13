const dotenv = require('dotenv');
dotenv.config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Replace with your Gemini API key from Google
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAISuggestions = async (req, res) => {
    const { totalCalories, totalProtein, totalCarbs, totalFats } = req.body;

    const prompt = `
You are a certified dietitian. A user consumed the following nutrients today:

- Calories: ${totalCalories}
- Protein: ${totalProtein} g
- Carbohydrates: ${totalCarbs} g
- Fats: ${totalFats} g

Analyze this data and give dietary advice:
- Mention if they are within, below, or above healthy ranges.
- Suggest what they should eat more/less of.
- Be concise, friendly, and give practical food examples.
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const suggestions = response.text();

        res.json({ suggestions });
    } catch (error) {
        console.error('Gemini Suggestion Error:', error.message);
        res.status(500).json({ error: 'Failed to generate Gemini-based suggestions' });
    }
};

module.exports = { getAISuggestions };
