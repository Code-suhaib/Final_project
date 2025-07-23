const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/location');

dotenv.config();

const app = express();

// 🔐 CORS Setup (adjust origin as needed for frontend)
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true
}));

// 🔧 Middleware
app.use(express.json());

// 📦 Routes
app.use('/api', authRoutes);
app.use('/api', locationRoutes);

// 🧠 MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  // 🚀 Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
