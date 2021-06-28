const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDb = async () => {
  const conn = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  if (process.env.NODE_ENV === "development")
    console.log(`MongoDB Connected ${(await conn).connection.host}`);
};

module.exports = connectDb;
