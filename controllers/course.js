const Course = require("../modals/course");
const cloudinary = require("../config/cloudinaryConfig");
// @disc    GET all the courses
// @route   /api/v1/courses
// @route   /api/v1/bootcamps/:bootcampId/courses
// @access  Public


exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find(
      req.params.bootcampId ? { bootcamp: req.params.bootcampId } : {}
    )
      .populate({
        path: "bootcamp",
        select: "name description",
      })
      .populate({
        path: "user",
        select: "name role",
      });
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

// @disc    GET single course
// @route   /api/v1/courses/:id
// @access  Public

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: "bootcamp",
        select: "name description",
      })
      .populate({
        path: "user",
        select: "name role",
      });
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

// @disc    POST new course in a bootcamp
// @route   /api/v1/bootcamps/:bootcampId/courses
// @access  Private

exports.createCourses = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    req.body.bootcamp = req.params.bootcampId;
    const courses = await Course.create(req.body);
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};
// @disc    Update  course in a bootcamp
// @route   /api/v1/courses/id
// @access  Private

exports.editCourses = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(400).json({
        success: false,
        message: "course does'nt exist",
      });
    } else if (req.user.id !== course.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You're not authorize to access this",
      });
    } else {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: course,
      });
    }
  } catch (err) {
    next(err);
  }
};
// @disc    delete  course in a bootcamp
// @route   /api/v1/courses/id
// @access  Private

exports.deleteCourses = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(400).json({
        success: false,
        message: "course does'nt exist",
      });
    } else if (req.user.id !== course.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You're not authorize to access this",
      });
    } else {
      const course = await Course.findByIdAndRemove(req.params.id);
      res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (err) {
    next(err);
  }
};
