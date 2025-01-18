const {
  movie_detail_data,
  trailer_links_objects,
  movie_link_data,
  movie_images_links,
} = require("../utils/dataobjects.js");
const {
  movieinfo,
  getmovieTrailter,
  getimages,
  getmoviesData,
  getgenre,
} = require("../utils/movie_datas_api.js");

async function getTrendingmovies(req, res) {
  const { page } = req.body;

  try {
    const genre = await getgenre();
    const movies = await getmoviesData(page);
    const detail = movies.results.map((movie) => movie_detail_data(movie));
    return res.status(200).json({ movies: detail , genre });
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
    const moviesimage = await getimages(movie_id);

    const trailers_gotten = await getmovieTrailter(movie_id);
    const movies_trailer_links = trailers_gotten.results
      .map((result) => trailer_links_objects(result))
      .filter((element) => element !== null);

    const data = {
      trailer: movies_trailer_links,
      info: movie_link_data(moviesinfo) || {},
      image: movie_images_links(moviesimage) || {},
    };

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred",
    });
    return;
  }
}

// async function serchMovies(req, res) {}
// async function serchMovies(req, res) {}

module.exports = { getTrendingmovies, gettriller };
