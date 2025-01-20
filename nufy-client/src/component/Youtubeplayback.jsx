import React, { useState } from "react";

function VideoPlayer({ videoId }) {
  const [error, setError] = useState(false);

  const handleVideoError = () => {
    setError(true);
  };

  return (
    <div className=" w-full h-full">
      {error ? (
        <div style={{ textAlign: "center" }}>
          <h1>An error occurred</h1>
          <p>Please try again later. Check your internet connection or contact support.</p>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleVideoError}
          style={{ width: "100%", height: "400px" }}
        ></iframe>
      )}
    </div>
  );
}

export default VideoPlayer;
