import React, { useState } from "react";
import Card from "./Card";

function Pagination({ source }) {
  const [currentpage, setcurrentpage] = useState(1);
  const [pagenumindex, setpagenumindex] = useState(1);
  const [disable, setdisable] = useState(false);

  const itemsPerPage = 12;

  const last_index = currentpage * itemsPerPage;
  const first_index = last_index - itemsPerPage;

  const data = source.slice(first_index, last_index);
  const pagetotal = Math.ceil(source.length / itemsPerPage);
  const pagunumber = [...Array(pagetotal).keys()];

  const split_numbering = pagunumber.slice(pagenumindex, pagenumindex + 7);
  console.log(pagenumindex, split_numbering);

  return (
    <div>
      <div className="movie_card_container">
        {data.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
      <div className=" p-6 w-full flex justify-center">
        <button
          className="bg-neutral-400 py-2 px-4 m-1"
          onClick={() =>
            setpagenumindex((curr) =>
              curr < split_numbering.length
                ? 1
                : split_numbering[0] - split_numbering.length
            )
          }
        >
          previous
        </button>
        {split_numbering.map((num, index) => (
          <span
            onClick={() => setcurrentpage(num)}
            className={"bg-neutral-400 py-2 px-4 m-1"}
            key={num}
          >
            {num}
          </span>
        ))}
        <span className={"bg-neutral-400 py-2 px-4 m-1"}>...</span>
        <span className="bg-neutral-400 py-2 px-4 m-1">
          {pagunumber.length}
        </span>
        <button
          disabled={disable}
          className="bg-neutral-400 py-2 px-4 m-1 disabled:bg-black"
          onClick={() => {
            setcurrentpage(split_numbering[0]+ 1);
            setpagenumindex((curr) =>
              curr > pagunumber[pagunumber.length - 5]
                ? split_numbering[0]
                : split_numbering[split_numbering.length - 1] + 1
            );
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
