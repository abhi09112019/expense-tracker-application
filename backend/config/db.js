const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using the URI supplied in the
 * environment. Exits the process on failure so that the app never
 * runs silently without a working database connection.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expense-tracker';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
