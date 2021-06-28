const Users = require("../modals/users");

// @disc    Register a user
// @route   /api/v1/auth/register
// @access  Public

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await Users.create({
      name,
      email,
      password,
      role,
    });

    const jwtToken = user.getSignedJwtToken();
    res.send({ success: true, token: jwtToken });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!password || !email)
      return next(new Error("Inavlid or empty credentials"));
    user = await Users.findOne({ email }).select("+password");
    if (!user) return next(new Error("Inavlid or empty credentials"));

    const isPassMatch = await user.matchPassword(password);

    if (!isPassMatch) return next(new Error("Invalid or empty credention"));
    const jwtToken = user.getSignedJwtToken();
    res.send({ success: true, token: jwtToken });
  } catch (error) {
    next(error);
  }
};

exports.aboutUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (user) return res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
