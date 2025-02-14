import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Row.css";
import axios from "../../../Utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const rowRef = useRef(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [fetchUrl]);

  // Function to scroll right
  const handleScrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Function to handle movie click and fetch trailer
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close trailer if clicking again
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error("Error fetching trailer:", error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__container">
        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title || movie.name || "Movie Poster"}
              onClick={() => handleClick(movie)}
            />
          ))}
        </div>
        <div className="indicator-icon icon-rightCaret" onClick={handleScrollRight}>
          ❯
        </div>
      </div>

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={{ height: "390", width: "100%", playerVars: { autoplay: 1 } }}
        />
      )}
    </div>
  );
};

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  isLargeRow: PropTypes.bool,
};

export default Row;
