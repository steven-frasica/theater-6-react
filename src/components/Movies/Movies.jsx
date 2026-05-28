import React, { useState, useEffect } from "react";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(["hello ", "goodbye "]);
  }, []);

  return (
    <section id="movie-grid">
      <div className="movie-grid-message-container">
        <p className="movie-grid-message">
          <span class="movie-grid__message-icon" aria-hidden="true">
            i
          </span>
          Use the search bar to find movies
        </p>
      </div>
    </section>
  );
};

export default Movies;
