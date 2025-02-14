import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import YouTube from "react-youtube";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  // Fetch Trailer from TMDB
  const handlePlay = async () => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close if already open
    } else {
      const request = await axios.get(
        `/movie/${movie?.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`
      );
      const trailer = request.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerUrl(trailer ? trailer.key : "");
    }
  };

  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
          : "",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__overlay" />
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
        <div className="banner__buttons">
          <button className="banner__button banner__button--play" onClick={handlePlay}>
            ▶ Play
          </button>
          <button className="banner__button banner__button--list">+ My List</button>
        </div>
      </div>
      <div className="banner--fadeBottom" />

      {/* Video Modal */}
      {trailerUrl && (
        <div className="video__modal">
          <span className="close__video" onClick={() => setTrailerUrl("")}>✖</span>
          <YouTube videoId={trailerUrl} opts={{ width: "100%", height: "100" }} />
        </div>
      )}
    </header>
  );
}

export default Banner;
