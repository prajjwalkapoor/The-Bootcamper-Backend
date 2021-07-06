const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://prajjwal:pk12345@cluster0.kljk4.mongodb.net/bootcamperDb?retryWrites=true&w=majority&ssl=true",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    if (process.env.NODE_ENV === "development")
      console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
