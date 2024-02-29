const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://raymondyounes:cu4yLypyIbmMfL7K@younes-dev.enszkpk.mongodb.net/test" ;

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
  }
};

module.exports = connectDatabase;
