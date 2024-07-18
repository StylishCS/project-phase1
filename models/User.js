const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    moviesWatchLater: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Movie",
      default: [],
    },
    comments: {
      type: [
        {
          movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
          },
          text: {
            type: String,
            required: true,
          },
        },
      ],
      ref: "Movie",
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
exports.User = User;
// SEO => search engine optimization
// regex => regular expression => Match Query
// optimize keywords => toLowerCase, Trim, remove special chars

// server-side events => Realtime
