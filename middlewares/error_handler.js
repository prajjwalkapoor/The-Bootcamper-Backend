const errorHandler = (err, req, res, next) => {
  //Log for devs
  console.log(err.stack);

  res.status(500).json({
    success: false,
    error: err.message || "server error",
  });
};
module.exports = errorHandler;
