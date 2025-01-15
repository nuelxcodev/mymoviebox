// const { datas } = require("../utils/data.js");
const {
  getmoviesData,
  movieinfo,
  getimages,
  getmovieTrailter,
} = require("../utils/moviehelper.js");

async function getTrendingmovies(req, res) {
  const { page } = req.body;

  try {
    const movies = await getmoviesData(page);
    res.status(200).json(movies.results);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "an erro occured" || error,
    });
  }
}
async function gettriller(req, res) {
  const { movie_id } = req.body;
  try {
    const moviesinfo = await movieinfo(movie_id);
    const moviesthriller = await getmovieTrailter(movie_id);
    const moviesimage = await getimages(movie_id);
    res
      .status(200)
      .json({ trailer: moviesthriller, info: moviesinfo, image: moviesimage });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "an erro occured" || error,
    });
  }
}
// async function serchMovies(req, res) {}
// async function serchMovies(req, res) {}

module.exports = { getTrendingmovies, gettriller };
