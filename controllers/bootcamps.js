const Bootcamp = require("../modals/bootcamp");
const cloudinary = require("../config/cloudinaryConfig");
// @disc    GET all the bootcamps
// @route   /api/v1/bootcamps
// @access  Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const reqQuery = { ...req.query };
    const removeFields = ["limit", "page", "sortBy"];
    removeFields.forEach((param) => delete reqQuery[param]);
    let { page, limit, sortBy } = req.query;
    // page = parseInt(page);
    // limit = parseInt(limit);
    // if (!page) page = 1;
    // if (!limit) limit = 10;
    // const skip = (page - 1) * limit;

    const bootcamps = await Bootcamp.find(reqQuery)
      .populate({
        path: "user",
        select: "name role",
      })
      // .limit(limit)
      // .skip(skip)
      .sort(sortBy || "-createdAt");
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      // currentPage: page,
      // limit: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    next(err);
  }
};

// @disc    GET single bootcamp
// @route   /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id).populate({
      path: "user",
      select: "name role",
    });

    if (!bootcamp) {
      res.status(400).send({
        success: false,
        message: "server error bootcamp not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: bootcamp,
      });
    }
  } catch (err) {
    next(err);
  }
};

// @disc    GET users bootcamps
// @route   /api/v1/bootcamps/user/:id
// @access  Public

exports.getUserBootcamps = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bootcamps = await Bootcamp.find({ user: userId }).populate({
      path: "user",
      select: "name role",
    });

    if (!bootcamps) {
      res.status(400).send({
        success: false,
        message: "server error bootcamps not found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: bootcamps,
      });
    }
  } catch (err) {
    next(err);
  }
};
// @disc    create single bootcamp
// @route   /api/v1/bootcamps/
// @access  Private

exports.createBootcamps = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamp });
    console.log("Data succcessfully created at server");
  } catch (err) {
    next(err);
  }
};

// @disc    edit single bootcamp
// @route   /api/v1/bootcamps/:id
// @access  Private

exports.editBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      res
        .status(400)
        .json({ success: false, message: "Bootcamp Does't exist" });
      console.log("Bootcamp Does't exist");
    } else if (req.user.id !== bootcamp.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You're not authorize to access this",
      });
    } else {
      const bootcamp = await Bootcamp.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ success: true, data: bootcamp });
      console.log("Data succcessfully created at server");
    }
  } catch (err) {
    next(err);
  }
};

// @disc    delete single bootcamp
// @route   /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      res.status(400).json({ success: false });
      console.log("There is some error");
    } else if (req.user.id !== bootcamp.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You're not authorize to access this",
      });
    } else {
      const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, data: {} });
      console.log("Data succcessfully created at server");
    }
  } catch (err) {
    next(err);
  }
};
// @disc    add image for single bootcamp
// @route   PUT /api/v1/bootcamps/:id/image
// @access  Private

exports.addImage = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return console.log("Bootcamp not found");
    } else if (req.user.id !== bootcamp.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You're not authorize to access this",
      });
    } else {
      const image = req.files.image.tempFilePath;
      cloudinary.uploader.upload(image, async function (error, result) {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, {
          image: result.url,
        });
        res.json({ success: true, image: result.url });
        console.log(error);
      });
    }
  } catch (err) {
    next(err);
  }
};
