import React, { useState, useEffect } from "react";
import "./Movies.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  // searchTerm in input
  const [searchTerm, setSearchTerm] = useState("");

  // async function getMovies() {
  //   const { data } = await axios.get(
  //     `http://www.omdbapi.com/?s=fast&apikey=92fb2c25`,
  //   );
  //   setMovies(data.Search.slice(0, 6));
  // }

  // useEffect(() => {
  //   onSearchChange();
  // }, [movies]);

  function onSearchChange(event) {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
    console.log("searchTerm", searchTerm);
  }

  const clearSearch = () => {
    console.log('clearSearch')
    setSearchTerm("")
  };
  // async function onSearchChange(event){
  //   const query = event.target.value;
  //   const { data } = await axios.get(
  //     `http://www.omdbapi.com/?s=${query}&apikey=92fb2c25`,
  //   );
  //   setMovies(data.Search.slice(0, 6));
  //   console.log(movies);
  //   // console.log(event.target.value.trim())
  // }

  return (
    <>
      <Navbar onSearchChange={onSearchChange} searchTerm={searchTerm} clearSearch={clearSearch}/>
      <section id="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <div className="movie-card__media">
              <figure>
                <img src={movie.Poster} alt="" />
              </figure>
            </div>
            <div className="movie-card__details">
              <h3>{movie.Title}</h3>
              <p>Released: {movie.Year}</p>
              <p>Runtime:</p>
              <p>Genre:</p>
              <p>imdb Rating:</p>
            </div>
          </div>
        ))}
        {/* <div className="movie-grid-message-container">
        <p className="movie-grid-message">
          <span class="movie-grid__message-icon" aria-hidden="true">
            i
          </span>
          Use the search bar to find movies
        </p>
      </div> */}
      </section>
    </>
  );
};

export default Movies;
