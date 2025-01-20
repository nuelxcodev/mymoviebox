import React, { useState, useEffect, useRef } from "react";

import Image from "./Image";
import { moviesthriller } from "../utils/appdatas/ApiResponse";

function Branding({ data }) {
  const [backdrops, setbackdrop] = useState([]);
  const [isActive, setisActive] = useState(data[0]);

  const brand_movie_cont = useRef(null);
  const cont_elem = brand_movie_cont.current;

  useEffect(() => {
    if (cont_elem) {
      const handleScroll = () => {
        const parentRect = cont_elem.getBoundingClientRect();
        const parentCenter = parentRect.left + parentRect.width / 2;
        let closestChild = null;
        let closestDistance = Infinity;

        for (const child of cont_elem.children) {
          const childRect = child.getBoundingClientRect();
          const childCenter = childRect.left + childRect.width / 1.5;
          const distance = Math.abs(childCenter - parentCenter);
          const movieData = JSON.parse(child.dataset.movie);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestChild = child;
            setisActive(movieData);
            setbackdrop(movieData.backdrops)
          }
        }
        for (const child of cont_elem.children) {
          child.classList.remove("scaled");
        }
        if (closestChild) {
          closestChild.classList.add("scaled");
        }
      };
      cont_elem.addEventListener("scroll", handleScroll);

      return () => {
        cont_elem.removeEventListener("scroll", handleScroll);
      };
    }
  }, [cont_elem, isActive]);

  return (
    <div className="relative w-full p-9 h-[75vh] max-h-[1000px] ">
      <div className="absolute inset-0 h-full w-full z-10">
        {backdrops && <Image url={backdrops[(backdrops.length-1)-1]?.file_path || null} />}
      </div>
      <div
        className="bg-gradient-to-tr from-red-800 via-neutral-800/70 to-neutral-800/50 absolute h-full w-full inset-0 z-20"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className=" w-full h-[70%] md:w-[40%] m-0 md:h-full flex justify-center items-center p-7 text-neutral-200 text-opacity-60">
          <div>
            <h1 className=" text-6xl font-extrabold my-3">
              {isActive?.original_title || "Welcome to Nufy Movies"}
            </h1>
            <p className=" text-xl ">
              {isActive?.overview ||
                `Discover the latest and greatest in the world of cinema. Nufy Movies brings you up-to-date information on trending movies, 
                including trailers, release dates, genres, and much more! Browse through an extensive collection of movies, explore detailed
                `}
            </p>
          </div>
        </div>
      </div>
      <div className="h-[40%] w-full md:max-w-[60%] md:h-full absolute md:bottom-3 bottom-0 right-0 overflow-hidden  z-30">
        <div className="h-full w-full branding_movie_list" ref={brand_movie_cont}>
          {/* Dynamically render items based on data */}
          {data?.movies?.map((movie, index) => (
            <div
              className="w-[100px] shadow-lg rounded-md overflow-hidden md:w-[150px] h-auto flex-shrink-0 duration-300 "
              key={index}
              data-movie={JSON.stringify(movie)}
            >
              <Image url={movie?.poster_path} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Branding;
