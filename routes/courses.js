const express = require("express");
const { protects, authorize } = require("../middlewares/auth");
const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourse,
  createCourses,
  editCourses,
  deleteCourses,
} = require("../controllers/course");

router
  .route("/")
  .get(getCourses)
  .post(protects, authorize("publisher", "admin"), createCourses);
router
  .route("/:id")
  .get(getCourse)
  .put(protects, authorize("publisher", "admin"), editCourses)
  .delete(protects, authorize("publisher", "admin"), deleteCourses);

module.exports = router;
