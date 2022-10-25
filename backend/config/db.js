const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); //mongoose db connect method, taking in our mongoDb connection string
    console.log(`MongoDb connected ${conn.connection.host}`.cyan.underline); //log the host that we're connected to
  } catch (error) {
    console.log(`error: ${error.message}`.red.underline.bold);
    process.exit(1); //if fail, just exit
  }
};

module.exports = connectDB;
