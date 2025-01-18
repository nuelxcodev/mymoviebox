import React from "react";

const { VITE_API_PIC_URL } = import.meta.env;

function Image({ url }) {
  if (url !== null)
    return (
      <img
        src={url}
        alt="images"
        className=" h-full w-full"
      />
    );
}

export default Image;
