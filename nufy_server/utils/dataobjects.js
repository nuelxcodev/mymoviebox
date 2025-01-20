function movie_detail_data({ data, image, info }) {
  return {
    poster_path: `http://image.tmdb.org/t/p/w500${data?.poster_path}`,
    overview: data?.overview,
    release_date: data?.release_date,
    genre_ids: data?.genre_ids,
    id: data?.id,
    original_title: data?.original_title,
    original_language: data?.original_language,
    title: data?.title,
    backdrop_path: `http://image.tmdb.org/t/p/w500${data?.backdrop_path}`,
    popularity: data?.popularity,
    // Images
    backdrops: image?.backdrops?.map((img) => {
      return {
        aspect_ratio: img.aspect_ratio,
        file_path: `http://image.tmdb.org/t/p/w500${img.file_path}`,
        height: img.height,
        width: img.width,
      };
    }),
    logos: image?.logos?.map((img) => {
      return {
        aspect_ratio: img.aspect_ratio,
        file_path: `http://image.tmdb.org/t/p/w500${img.file_path}`,
        height: img.height,
        width: img.width,
      };
    }),
    posters: image?.posters?.map((img) => {
      return {
        aspect_ratio: img.aspect_ratio,
        file_path: `http://image.tmdb.org/t/p/w500${img.file_path}`,
        height: img.height,
        width: img.width,
      };
    }),
    // Information
    backdrop_path: `https://image.tmdb.org/t/p/w500${info?.backdrop_path}`,
    belongs_to_collection: info?.belongs_to_collection,
    genres: info?.genres || [],
    homepage: info?.homepage,
    id: info?.id,
    imdb_id: info?.imdb_id,
    original_title: info?.original_title,
    overview: info?.overview,
    popularity: info?.popularity,
    poster_path: `https://image.tmdb.org/t/p/w500${info?.poster_path}`,
    production_companies: info?.production_companies?.map((img) => {
      return {
        id: img.id,
        logo_path: `http://image.tmdb.org/t/p/w500${img.logo_path}`,
        name: img.name,
        origin_country: img.origin_country,
      };
    }),
    release_date: info?.release_date,
    runtime: info?.runtime,
    spoken_languages: info?.spoken_languages || [],
    status: info?.status,
    title: info?.title,
    video: info?.video,
  };
}

function trailer_links_objects(data) {
  if (data?.official && data?.type === "Trailer") {
    return {
      id: data?.id,
      key: data?.key,
      name: data?.name,
      published_at: data?.published_at,
      site: data?.site,
      size: data?.size,
    };
  }
  return null;
}

module.exports = {
  movie_detail_data,
  trailer_links_objects,
};
