const { responsed } = require("./helpers");

async function getmoviesData(page) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  return await responsed(url);
}

async function movieinfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  return await responsed(url);
}

async function getimages(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/images?include_image_language=en`;
  return await responsed(url);
}

async function getmovieTrailter(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`;
  return await responsed(url);
}
async function getgenre() {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  return await responsed(url);
}
async function getcast(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`;
  return await responsed(url);
}
async function comingSoon(page) {
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  return await responsed(url);
}

async function trending(page) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
}

module.exports = {
  getmoviesData,
  getcast,
  movieinfo,
  getimages,
  getmovieTrailter,
  getgenre,
  comingSoon,
  trending,
};
