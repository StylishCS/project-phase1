async function getUserWatchLaterController(req, res) {
  try {
    return res.status(200).json(req.user.moviesWatchLater);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { getUserWatchLaterController };
