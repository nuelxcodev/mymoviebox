import axios from "axios";

export async function moviesthriller({
  setimages,
  movieId,
  setinformation,
  setrailer,
}) {
  const url = `${import.meta.env.VITE_API_URL}/watchtriller`;
  try {
    const response = await axios.post(url, { movie_id: movieId });
    const result = response.data;
    const { backdrops, posters } = result.image;
    setimages && setimages({ bg: backdrops, poster: posters });
    setinformation && setinformation(result.info);
    setrailer && setrailer(result.trailer.results);
    console.log(result);
    // setvideo(result.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
