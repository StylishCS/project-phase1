const { Movie } = require("../models/Movie");
const { User } = require("../models/User");

async function createMovieController(req, res) {
  try {
    let images = [];
    console.log(req.files);
    for (let image of req.files.images) {
      images.push(`http://localhost:3000/${image.filename}`);
    }
    req.body.media = `http://localhost:3000/${req.files.media[0].filename}`;
    req.body.images = images;
    req.body.createdBy = req.admin._id;
    const movie = await Movie.create(req.body);
    if (!movie) {
      throw Error();
    }
    res.status(201).json(movie);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getMoviesController(req, res) {
  try {
    const movies = await Movie.find()
      .sort([["rating", -1]])
      .populate({
        path: "createdBy",
        select: "-password",
      });
    return res.status(200).json(movies);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getMovieByIdController(req, res) {
  try {
    const movie = await Movie.findById(req.params.id).populate({
      path: "createdBy",
      select: "-password",
    });
    if (!movie) {
      return res.status(404).json("Movie Not Found");
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function addMovieToWatchLaterController(req, res) {
  try {
    /**
     * Movie ID => req.params
     * user ID => req.user._id
     */
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json("Movie Not Found");
    }
    const user = await User.findById(req.user._id);
    if (user.moviesWatchLater.includes(req.params.id)) {
      return res.status(400).json("Movie Already Exist In Watch Later List..");
    }
    user.moviesWatchLater.push(movie._id);
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  createMovieController,
  getMoviesController,
  getMovieByIdController,
  addMovieToWatchLaterController,
};
