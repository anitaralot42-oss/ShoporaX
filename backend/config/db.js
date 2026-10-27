const dns = require("dns");

dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected succesfully");
  } catch (error) {
    console.log("MongoDB connection Failed : ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
