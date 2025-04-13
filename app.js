const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// ✅ Load other env variables
dotenv.config();

// ✅ Hardcoded MongoDB URI
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/balanced-diet-manager';

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

// Initialize Express App
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);         // Signup/Login
app.use('/api/food', foodRoutes);         // Add food entries
app.use('/api/summary', summaryRoutes);   // Get daily nutrition summary

// Root route
app.get('/', (req, res) => {
  res.send('Balanced Diet Manager API is running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
