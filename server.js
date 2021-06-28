const express = require("express");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDb = require("./config/db");
const app = express();

const errorHandler = require("./middlewares/error_handler");
const PORT = process.env.PORT;

// body parser
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

//connection to mongodb

connectDb();

//route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
//mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port number ${PORT}`
  );
});
