import React from "react";


function Image({ url }) {
  if (url !== null)
    return (
      <img
        src={url}
        alt="images"
        className=" h-full w-full object-cover"
      />
    );
}

export default Image;
