var express = require("express");
const {
  getMovieByIdController,
  getMoviesController,
} = require("../controllers/movies.controllers");
var router = express.Router();

router.get("/", getMoviesController);
router.get("/:id", getMovieByIdController);

module.exports = router;
