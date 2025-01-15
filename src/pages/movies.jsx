import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { moviesthriller } from "../utils/appdatas/movieApicall";

const { VITE_API_PIC_URL } = import.meta.env;

function Trailerpage() {
  const [information, setinformation] = useState({});
  const [trailer, setrailer] = useState({});
  const [images, setimages] = useState({ bg: [], poster: [] });

  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("movies") | null;
  const navigate = useNavigate();

  console.log(movieId);

  useEffect(() => {
    if (movieId === null || movieId === 0) {
      return navigate("/");
    }
    moviesthriller({ setimages, movieId, setinformation, setrailer });
  }, [movieId]);

  return (
    <div>
      {trailer ? (
        <div>
          <div className=" w-full flex p-5">
            <iframe
              width="50%"
              height="315"
              src={`https://www.youtube.com/embed/${trailer[0]?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
                <img
                  src={`${VITE_API_PIC_URL}${images.bg[0].file_path}`}
                  alt="image-1"
                  className="h-52 w-auto"
                />
              )}
              {images.bg[2]?.file_path && (
                <img
                  src={`${VITE_API_PIC_URL}${images.bg[2].file_path}`}
                  alt="image-2"
                  className="h-52 w-auto"
                />
              )}
            </div>
          )}

          <div className=" flex mt-8 w-max gap-4">
            {information.production_companies?.map(
              (con) =>
                con?.logo_path !== null && (
                  <img
                    src={`${VITE_API_PIC_URL}${con?.logo_path}`}
                    alt="company_logos"
                    className=" h-7"
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default Trailerpage;
