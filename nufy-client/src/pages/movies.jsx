import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Nav from "../component/Nav";
import VideoPlayer from "../component/Youtubeplayback";
import Image from "../component/Image";
import { moviesthriller } from "../utils/appdatas/ApiResponse";

function Trailerpage() {
  const [information, setinformation] = useState({});
  const [trailer, setrailer] = useState({});
  const [images, setimages] = useState({ bg: [], poster: [] });

  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movies") | null;
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId === null || movieId === 0) {
      return navigate("/");
    }
    moviesthriller({ setimages, movieId, setinformation, setrailer });
  }, [movieId]);


  return (
    <div>
      <Nav />
      {trailer ? (
        <div>
          <div className=" w-full flex p-5">
            <VideoPlayer videoId={trailer[trailer.length - 1]?.key} />
            <div className=" w-1/2 p-8">
              <h1 className=" text-2xl font-extrabold">
                {information.original_title}
              </h1>
              <p>{information.overview}</p>
            </div>
          </div>

          {/* display images */}
          {images.bg && images.bg.length > 0 && (
            <div className="flex w-max mt-3">
              {images.bg[0]?.file_path && (
                <div className="h-52 w-auto">
                  <Image url={images.bg[0].file_path} />
                </div>
              )}
              {images.bg[2]?.file_path && (
                <div className="h-52 w-auto">
                  <Image url={images.bg[2].file_path} />
                </div>
              )}
            </div>
          )}

          {/* companies */}
          <div className=" flex mt-8 w-max gap-4">
            {information.production_companies?.map((con) => (
              <div className=" h-7 " id={con?.id}>
                <Image url={con?.logo_path} />
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
