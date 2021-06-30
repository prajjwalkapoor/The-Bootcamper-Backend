const express = require("express");
const { protects, authorize } = require("../middlewares/auth");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  editBootcamp,
  deleteBootcamp,
  addImage,
} = require("../controllers/bootcamps");

//Other resources routes
// const courseRouter = require("./courses");
//re-route into other resource router

router
  .route("/")
  .get(getBootcamps)
  .post(protects, authorize("publisher", "admin"), createBootcamps);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protects, authorize("publisher", "admin"), editBootcamp)
  .delete(protects, authorize("publisher", "admin"), deleteBootcamp);
router
  .route("/:id/image")
  .put(protects, authorize("publisher", "admin"), addImage);

module.exports = router;
