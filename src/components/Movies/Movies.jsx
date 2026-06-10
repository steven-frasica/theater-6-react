import React, { useState, useEffect } from "react";
import "./Movies.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  // searchTerm in input
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const fallbackPoster = "/fallback-poster.png"

  function onSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    if (!searchTerm.trim()) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      const { data } = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=92fb2c25`,
      );
      setMovies(data.Search ? data.Search.slice(0, 6) : []);
      console.log(data.Search);
      console.log(searchTerm);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const clearSearch = () => {
    console.log("clearSearch");
    setSearchTerm("");
  };

  const openModal = () => {
    setModal(true);
    console.log(modal, 'modal')
  }



  return (
    <>
      <Navbar
        onSearchChange={onSearchChange}
        searchTerm={searchTerm}
        clearSearch={clearSearch}
      />
      <section id="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" onClick={openModal}>
            <div className="movie-card__media">
              <figure>
                <img 
                  src={movie.Poster}  
                  alt=""
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackPoster
                  }}
                  />
              </figure>
            </div>
            <div className="movie-card__details">
              <h3>{movie.Title}</h3>
              <p>Released: {movie.Year}</p>
            </div>
          </div>
        ))}
        {!searchTerm ? (
          <div className="movie-grid-message-container">
            <p className="movie-grid-message">
              <span className="movie-grid__message-icon" aria-hidden="true">
                i
              </span>
              Use the search bar to find movies
            </p>
          </div>
        ) : isLoading ? (
          <div className="movie-grid-message-container">
            <div className="movie-grid-loading" aria-live="polite" aria-label="Loading movies">
              <span className="movie-grid-spinner" aria-hidden="true" />
              <p className="movie-grid-message">Loading movies...</p>
            </div>
          </div>
        ) : movies.length === 0 ? (
          <div className="movie-grid-message-container">
            <p className="movie-grid-message">
              <span className="movie-grid__message-icon" aria-hidden="true">
                i
              </span>
              No results found, try searching again
            </p>
          </div>
        ) : null}
      </section>
      {modal ? <div>hello this will be the modal</div> : <div>Not showing the modal</div>}
    </>
  );
};

export default Movies;
