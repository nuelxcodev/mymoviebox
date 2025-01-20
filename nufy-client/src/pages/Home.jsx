import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Card from "../component/Card";
import Branding from "../component/Branding";
import Nav from "../component/Nav";

console.log(import.meta.env.VITE_API_URL)

function Home({onNextpage, data , nextPage}) {
  
  const movie_card_container = useRef(null);
  const [genre, setgenre] = useState();


  if (movie_card_container.current) {
    console.log(movie_card_container.current.clientHeight);
  }

  // Check if movies are loading
  if (!data || !data.movies || data.movies.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" h-full ">
      <Nav />
      <Branding data={data} />

      <div
        className="h-screen overflow-hidden relative w-full"
        ref={movie_card_container}
      >
        <div className="flex w-full h-full ">
          <ul className=" w-full md:w-[20%] px-4 pt-10 h-full overflow-scroll scrollbar-hide">
            <h1 className="text-3xl font-extrabold my-7">genres</h1>
            {data.genre.genres.map((genre) => (
              <li
                key={genre.id}
                className=" m-0 p-2 w-full cursor-pointer hover:bg-yellow-500"
                onClick={() => setgenre(genre.id)}
              >
                {genre.name}
              </li>
            ))}
          </ul>

          <div className="w-[80%] h-full relative px-3 ">
            <div className=" overflow-scroll h-full scrollbar-hide">
              <h1 className="text-5xl font-extrabold my-7">Movies</h1>
              <div className="movie_card_container">
                {data.movies.map((movie) => (
                  <Card movie={movie} key={movie.id} />
                ))}
              </div>
              <div
                className="absolute  m-0 bottom-0 py-6 w-full bg-black bg-opacity-40"
                style={{ backdropFilter: "blur(4px)" }}
              >
                <div className="flex m-0 gap-[20%] w-full justify-center ">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-black w-36"
                    onClick={() => onNextpage((curr) => Math.max(curr - 1, 1))}
                    disabled={nextPage <= 1} // Disable previous button if on the first page
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-black w-36"
                    onClick={() => onNextpage((curr) => curr + 1)}
                    disabled={data.movies.length === 0} // Disable next button if no more movies
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
