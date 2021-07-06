const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
});

// Static method to get avg of course tuitions
courseSchema.statics.getSumAndAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: "$bootcamp",
        averageCost: { $avg: "$tuition" },
        totalCost: { $sum: "$tuition" },
      },
    },
  ]);
  // console.log(obj);
  try {
    await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
      totalCost: obj[0].totalCost,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getSumAndAverageCost after save
courseSchema.post("save", function () {
  this.constructor.getSumAndAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
courseSchema.pre("remove", function () {
  this.constructor.getSumAndAverageCost(this.bootcamp);
});

module.exports = mongoose.model("Courses", courseSchema);
