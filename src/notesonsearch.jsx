// import React, { useState, useEffect } from "react";
// import "./Movies.css";
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";

// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // async function getMovies() {
//   //   const { data } = await axios.get(
//   //     `http://www.omdbapi.com/?s=fast&apikey=92fb2c25`,
//   //   );
//   //   setMovies(data.Search.slice(0, 6));
//   // }

//   useEffect(() => {
//     const trimmedQuery = searchTerm.trim();

//     if (!trimmedQuery) {
//       setMovies([]);
//       return undefined;
//     }

//     let ignoreResponse = false;

//     const timeoutId = window.setTimeout(async () => {
//       try {
//         const { data } = await axios.get(
//           `http://www.omdbapi.com/?s=${trimmedQuery}&apikey=92fb2c25`,
//         );

//         if (!ignoreResponse) {
//           setMovies(data.Search?.slice(0, 6) ?? []);
//         }
//       } catch (error) {
//         if (!ignoreResponse) {
//           setMovies([]);
//         }
//       }
//     }, 500);

//     return () => {
//       ignoreResponse = true;
//       window.clearTimeout(timeoutId);
//     };
//   }, [searchTerm]);


//   return (
//     <>
//       <Navbar
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//       />
//       <section id="movie-grid">
//         {movies.map((movie) => (
//           <div key={movie.imdbID} className="movie-card">
//             <div className="movie-card__media">
//               <figure>
//                 <img src={movie.Poster} alt="" />
//               </figure>
//             </div>
//             <div className="movie-card__details">
//               <h3>{movie.Title}</h3>
//               <p>Released: {movie.Year}</p>
//               <p>Runtime:</p>
//               <p>Genre:</p>
//               <p>imdb Rating:</p>
//             </div>
//           </div>
//         ))}
//         {/* <div className="movie-grid-message-container">
//         <p className="movie-grid-message">
//           <span class="movie-grid__message-icon" aria-hidden="true">
//             i
//           </span>
//           Use the search bar to find movies
//         </p>
//       </div> */}
//       </section>
//     </>
//   );
// };

// export default Movies;


// ***********************************************************

// import React from "react";
// import './Navbar.css'

// const Navbar = ({ searchTerm, onSearchChange }) => {
//   return (
//     <div className="nav">
//       <h1>Theater6</h1>
//       <h2>Search for your next viewing experience</h2>
//       <div className="nav__controls">
//         <div className="search-bar">
//           <input
//             id="search-input"
//             type="text"
//             value={searchTerm}
//             onChange={(event) => onSearchChange(event.target.value)}
//             placeholder="Type to Search"
//           />
//           <button
//             className="search-bar__clear"
//             type="button"
//             onClick={() => onSearchChange("")}
//           >
//             &times;
//           </button>
//         </div>
//         <select name="sort" id="sort-select" className="sort-select">
//           <option value="" disabled defaultValue>Sort</option>
//           <option value="NEW_TO_OLD">Newest First</option>
//           <option value="OLD_TO_NEW">Oldest First</option>
//           <option value="RATING_HIGH_TO_LOW">Rating, High to Low</option>
//           <option value="RATING_LOW_TO_HIGH">Rating, Low to High</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
