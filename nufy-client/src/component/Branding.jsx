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
          const childCenter = childRect.left + childRect.width / 2;
          const distance = Math.abs(childCenter - parentCenter);

          const movieData = JSON.parse(child.dataset.movie);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestChild = child;
            setisActive(movieData)
          }
        }

        for (const child of cont_elem.children) {
          child.classList.remove("scale-[154%]");
        }
        if (closestChild) {
          closestChild.classList.add("scale-[154%]");
        }
      };
      cont_elem.addEventListener("scroll", handleScroll);

      return () => {
        cont_elem.removeEventListener("scroll", handleScroll);
      };
    }
  }, [cont_elem, isActive]);

  useEffect(() => {
    moviesthriller({ setbackdrop, movieId: isActive?.id });
  }, [isActive]);

  return (
    <div className="relative p-9 h-[75vh] ">
      <div className=" absolute inset-0 h-full w-full z-10">
        {backdrops && <Image url={backdrops[2]?.file_path || null} />}
      </div>
      <div
        className="bg-gradient-to-tr from-red-800 via-neutral-800/70 to-neutral-800/50 absolute h-full w-full inset-0 z-20"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className=" w-1/2 m-0 h-full flex justify-center items-center p-5">
          <div>
            <h1 className=" text-4xl font-extrabold my-3">
              {isActive?.original_title}
            </h1>
            <p className=" text-xl">{isActive?.overview}</p>
          </div>
        </div>
      </div>
      <div className=" w-full md:w-[50%] h-full absolute bottom-3 right-0 overflow-hidden  z-30">
        <div className=" h-full branding_movie_list" ref={brand_movie_cont}>
          {/* Dynamically render items based on data */}
          {data?.movies?.map((movie, index) => (
            <div
              className=" shadow-lg rounded-md overflow-hidden h-[200px] w-auto flex-shrink-0 duration-300 "
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
