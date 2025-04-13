const mongoose = require('mongoose');

const foodEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number, // e.g., in grams
    required: true,
  },
  date: {
    type: Date, // ✅ Use Date instead of String
    required: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('FoodEntry', foodEntrySchema);
