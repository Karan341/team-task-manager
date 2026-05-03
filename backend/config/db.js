const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
    });
    console.log("MongoDB Connected Successfully ✓");
  } catch (error) {
    console.warn("⚠️ MongoDB Connection Failed:", error.message);
    console.warn("Continuing with server... (using mock/offline mode)");
    // Don't crash - allow server to run without DB for testing
  }
};

module.exports = connectDB;

