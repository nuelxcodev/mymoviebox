import React, { useState } from "react";
import { useEffect } from "react";
import { moviesthriller } from "../utils/appdatas/movieApicall";

function Branding() {
  const [images, setimages] = useState({ bg: [], poster: [] });

  useEffect(() => {
    moviesthriller({ setimages, movieId: 762509 });
  }, []);
  return (
    <div className="relative h-screen w-full max-h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.VITE_API_PIC_URL}${images.bg[2]?.file_path}`}
          alt="Movie Thumbnail"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backdropFilter: "blur(1px)" }}
      ></div>

      <div className=" absolute h-full w-full inset-0 z-30 flex">
        {/* Movie Branding Content */}
        <div className="text-center text-white px-6 w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {/* {currentmovie.title} */}
          </h1>
          {/* <p className=" font-light mb-6">{currentmovie.extract}</p> */}
          <button className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium text-lg transition">
            Watch Trailer
          </button>
        </div>
        {/* the anition movies */}
        <div className="w-1/2 h-full ">
          {/* <Animatedcard currentbg={setcurrmovie} /> */}
        </div>
      </div>
    </div>
  );
}

export default Branding;
