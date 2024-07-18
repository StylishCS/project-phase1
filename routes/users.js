var express = require("express");
const {
  loginUserController,
  signupUserController,
} = require("../controllers/userAuth.controllers");
const {
  addMovieToWatchLaterController,
} = require("../controllers/movies.controllers");
const {
  getUserWatchLaterController,
} = require("../controllers/userMovies.controllers");
const UserPrivileges = require("../middlewares/isUser");
var router = express.Router();

/* User Auth */
router.post("/login", loginUserController);
router.post("/signup", signupUserController);

/* User Movies */
router.post(
  "/movies/watchLater/:id",
  UserPrivileges,
  addMovieToWatchLaterController
);
router.get("/movies/watchLater", UserPrivileges, getUserWatchLaterController);
module.exports = router;
