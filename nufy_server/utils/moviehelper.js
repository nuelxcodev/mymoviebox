async function getmoviesData(page) {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2NiYWY5MzExOTQzYWY3MzU5NWE4N2ZjZjNkMjIyOCIsIm5iZiI6MTczNjA1MTI1OS42ODUsInN1YiI6IjY3N2EwYTNiOGZkNmY1MTA5ZDcyOTNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuS1GI1s_XaIVXMa_zPNCUShfywmm6F68vsHoZeCic0",
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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2NiYWY5MzExOTQzYWY3MzU5NWE4N2ZjZjNkMjIyOCIsIm5iZiI6MTczNjA1MTI1OS42ODUsInN1YiI6IjY3N2EwYTNiOGZkNmY1MTA5ZDcyOTNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuS1GI1s_XaIVXMa_zPNCUShfywmm6F68vsHoZeCic0",
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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2NiYWY5MzExOTQzYWY3MzU5NWE4N2ZjZjNkMjIyOCIsIm5iZiI6MTczNjA1MTI1OS42ODUsInN1YiI6IjY3N2EwYTNiOGZkNmY1MTA5ZDcyOTNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuS1GI1s_XaIVXMa_zPNCUShfywmm6F68vsHoZeCic0",
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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlN2NiYWY5MzExOTQzYWY3MzU5NWE4N2ZjZjNkMjIyOCIsIm5iZiI6MTczNjA1MTI1OS42ODUsInN1YiI6IjY3N2EwYTNiOGZkNmY1MTA5ZDcyOTNjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PuS1GI1s_XaIVXMa_zPNCUShfywmm6F68vsHoZeCic0",
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
