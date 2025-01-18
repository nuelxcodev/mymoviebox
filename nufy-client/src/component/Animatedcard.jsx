import React, { useEffect, useState } from "react";
import datas from "../utils/appdatas/data";

function Animatedcard({ currentbg }) {
  const [current, setCurrent] = useState(0);
  const [slice_start, setslice_start] = useState();

  useEffect(() => {
    setslice_start(Math.floor(Math.random() * 100));
  }, []);

  console.log(slice_start);
  return (
    <div className="flex flex-col md:flex-row h-full items-center gap-4 md:gap-6 p-4 overflow-x-auto scrollbar-hide">
      {datas
        .slice(slice_start, slice_start + 5) // Limit to first 5 movies
        .map((movie, index) => (
          <div
            key={index}
            onClick={() => {
              currentbg(movie);
              setCurrent(index);
            }}
            className={`relative flex-shrink-0 transition-all duration-300 cursor-pointer ${
              current === index
                ? "md:scale-150"
                : "md:scale-100 hover:scale-105"
            }`}
          >
            {/* Movie Thumbnail */}
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="h-[30p] w-auto md:h-[300px] rounded-lg "
              style={{ width: movie.thumbnail_width || "auto" }}
            />

            {/* Active Overlay */}
            {current === index && (
              <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center text-white text-xs md:text-sm font-semibold">
                Active
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Animatedcard;
