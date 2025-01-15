import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Card({ movie }) {
  const [curr, setcurr] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setcurr(true)}
      onMouseLeave={() => setcurr(false)}
      className=" m-2 rounded-md overflow-hidden w-[200px] min-h-[290px] shadow-lg"
    >
      <div className="relative h-full w-full">
        <img
          src={`${import.meta.env.VITE_API_PIC_URL}${movie.poster_path}`}
          alt={movie.title}
          className="object-cover"
        />
        {curr && (
          <div className="bg-black absolute inset-0 bg-opacity-55 duration-300 ">
            <div className="m-0 h-full w-full ">
              <div
                className={`flex justify-center items-center   text-white h-full w-full card_text_anima`}
              >
                <div className="text-center">
                  <h1 className="text-2xl font-extrabold mb-3">
                    {movie.original_title}
                  </h1>
                  <h1>{movie.year}</h1>
                  <button
                    className=" bg-red-600 px-3 rounded-md py-2 "
                    onClick={() => navigate(`/movies?movies=${movie.id}`)}
                  >
                    watch now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
