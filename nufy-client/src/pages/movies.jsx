import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Nav from "../component/Nav";
import VideoPlayer from "../component/Youtubeplayback";
import Image from "../component/Image";
import { moviesthriller } from "../utils/appdatas/ApiResponse";
import { BiArrowBack } from "react-icons/bi";

function Trailerpage({ data }) {
  const [information, setinformation] = useState({});
  const [trailer, setrailer] = useState({});
  const [images, setimages] = useState({ bg: [], poster: [] });

  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movies") | null;
  const navigate = useNavigate();

  const movie = data.movies.find((movie) => movie.id === movieId);

  useEffect(() => {
    if (movieId === null || movieId === 0) {
      return navigate("/");
    }
    // moviesthriller({ movieId });
  }, [movieId]);

  return (
    <div className=" relative">
      <Nav />
      <div onClick={()=>navigate(-1)}
      className="fixed bg-neutral-600 rounded-full bottom-11 z-30 left-9 md:hidden h-min text-white shadow-lg">
        <BiArrowBack size={40} />
      </div>
      {trailer ? (
        <div>
          <div className=" w-full flex flex-col md:flex-row md:pt-24 ">
            <VideoPlayer videoId={trailer[trailer.length - 1]?.key} />
            <div className=" md:w-1/2 md:p-8 p-2">
              <div>
                <h1 className=" text-3xl font-extrabold">
                  {movie?.original_title}
                </h1>
                <p>{movie?.overview}</p>
              </div>
              <div className=" flex flex-row my-7 dark:bg-white md:p-4">
                {movie?.production_companies?.map(
                  (con) =>
                    con?.logo_path !== null && (
                      <div
                        key={con.id}
                        className="w-auto h-10 md:w-[35px] md:h-auto flex-shrink-0 "
                      >
                        <Image url={con?.logo_path} />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <div className=" flex overflow-x-auto scrollbar-hide mt-8">
            {movie?.backdrops
              ?.slice(0, movie?.backdrops.length - 2)
              .map((mov) => (
                <div key={mov.id} className=" h-[200px] flex-shrink-0 ">
                  <Image url={mov?.file_path} />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default Trailerpage;
