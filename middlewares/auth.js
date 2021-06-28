const Users = require("../modals/users");
const jwt = require("jsonwebtoken");

exports.protects = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Not authorize to access this route" });

  try {
    // Verify token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Users.findById(verifiedUser.id);

    next();
  } catch (err) {
    next(err);
  }
  req.user = await Users.findById(user.id);
  next();
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Not authorize to access this route",
      });
    }
    next();
  };
};
