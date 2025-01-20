const { movie_detail_data } = require("../utils/dataobjects.js");
const {
  movieinfo,
  getimages,
  getmoviesData,
  getgenre,
  getmovieTrailter,
} = require("../utils/movie_datas_api.js");

async function getTrendingmovies(req, res) {
  const { page } = req.body;

  try {
    const genre = await getgenre();
    const movies = await getmoviesData(page);

    const detail = await Promise.all(
      movies.results.map(async (movie) => {
        const moviesimage = await getimages(movie.id);
        const moviesinfo = await movieinfo(movie.id);
        return movie_detail_data({
          data: movie,
          image: moviesimage,
          info: moviesinfo,
        });
      })
    );

    return res.status(200).json({ movies: detail, genre });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message || error,
    });
  }
}

async function gettriller(req, res) {
  const { movie_id } = req.body;
  try {
    const trailers_gotten = await getmovieTrailter(movie_id);
    const movies_trailer_links = trailers_gotten.results
      .map((result) => trailer_links_objects(result))
      .filter((element) => element !== null);
    const data = {
      trailer: movies_trailer_links,
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
