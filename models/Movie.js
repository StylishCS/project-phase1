const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releasedYear: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    actors: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 255,
    },
    media: {
      type: String,
      required: true,
    },
    comments: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
        },
      ],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 ** update movie
 ** delete movie => Cascade Style On Delete
 ** comments
 */

/**
 * ! Additional features
 * * Validation
 * * Mail Services
 * * OTP Auth
 * * Cloudinary
 * * Support "Donations" => Paymob
 */

/**
 * * MySQL => Raw SQL
 */

const Movie = mongoose.model("Movie", movieSchema);
exports.Movie = Movie;
