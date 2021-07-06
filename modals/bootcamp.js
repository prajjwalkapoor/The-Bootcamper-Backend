const mongoose = require("mongoose");
const slugify = require("slugify");
const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  url: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  averageCost: Number,
  totalCost: Number,
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/prajjwalcdn/image/upload/v1625392111/coding-bootcamp-1024x486_bfms3v.png",
  },
  cloudinary_id: {
    type: String,
  },
  housing: {
    type: String,
    default: "no",
  },
  jobAssistance: {
    type: String,
    default: "no",
  },
  jobGuarantee: {
    type: String,
    default: "no",
  },
  EMI: {
    type: String,
    default: "no",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
});

bootcampSchema.pre("save", function (next) {
  this.slug =
    slugify(this.name, { lower: true }) +
    `-${Math.floor(Math.random() * 1000)}`;
  this.url = `${process.env.DOMAIN_URL}/${this.slug}`;
  next();
});
module.exports = mongoose.model("Bootcamp", bootcampSchema);
