import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../component/Card";
import Branding from "../component/Branding";

function Home() {
  const [data, setdata] = useState([]);
  const [nextpage, setnextpage] = useState(1);

  async function movies() {
    const url = `${import.meta.env.VITE_API_URL}/movies`;
    try {
      const response = await axios.post(url, { page: nextpage });
      const result = response.data;
      setdata(result);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  useEffect(() => {
    movies();
  }, [nextpage]);
  return (
    <div>
      <Branding />
      <div className="movie_card_container">
        {data.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
      <div className="flex justify-center border-2 ">
        <div className=" flex justify-around w-1/2">
          <button
            className=" px-4 py-2 bg-orange-500 text-white"
            onClick={() => setnextpage((curr) => curr - 1)}
          >
            previous
          </button>
          <button
            className=" px-4 py-2 bg-orange-500 text-white"
            onClick={() => {
              setnextpage((curr) => curr + 1);
            }}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
