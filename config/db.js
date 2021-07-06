const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    if (process.env.NODE_ENV === "development")
      console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
