const { API_BEARIER } = process.env;
async function getmoviesData(page) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_BEARIER,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("couldnt fetch data." + error);
  }
}

async function movieinfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_BEARIER,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("couldnt fetch data." + error);
  }
}

async function getimages(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/images?include_image_language=en`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_BEARIER,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("couldnt fetch data." + error);
  }
}

async function getmovieTrailter(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_BEARIER,
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("couldnt fetch data." + error);
  }
}

module.exports = { getmoviesData, movieinfo, getimages, getmovieTrailter };
