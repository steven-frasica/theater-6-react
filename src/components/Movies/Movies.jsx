import React, { useState, useEffect, useRef } from "react";
import "./Movies.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import MovieCard from "./MovieCard";
import Modal from "../Modal/Modal";
import { useSearchParams } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  // searchTerm in input
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const latestSearchId = useRef(0);
  const fallbackPoster = "/fallback-poster.png";
  const [sortValue, setSortValue] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  function onSearchChange(event) {
    const nextValue = event.target.value;
    setSearchTerm(nextValue);

    if (!nextValue.trim()) {
      setSortValue("");
    }
  }

  useEffect(() => {
    const trimmedSearch = searchTerm.trim();
    const currentSearchParam = searchParams.get("search") || "";
  

    if (!trimmedSearch) {
      if (currentSearchParam) {
        setSearchParams({})
      }
      return;
    }

    if (trimmedSearch !== currentSearchParam) {
      setSearchParams({ search: trimmedSearch})
    }
  }, [searchTerm, searchParams, setSearchParams])

  useEffect(() => {
    const trimmedQuery = searchTerm.trim();
    const searchId = ++latestSearchId.current;

    if (!trimmedQuery) {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `http://www.omdbapi.com/?s=${trimmedQuery}&apikey=92fb2c25`,
        );

        if (searchId !== latestSearchId.current) return;

        const searchResults = data.Search ? data.Search.slice(0, 6) : [];

        const detailedMovies = await Promise.all(
          searchResults.map(async (movie) => {
            try {
              const { data } = await axios.get(
                `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=92fb2c25`,
              );
              return data.Response === "False" ? movie : data;
            } catch (error) {
              return movie;
            }
          }),
        );

        if (searchId !== latestSearchId.current) return;

        setMovies(detailedMovies);
      } catch (error) {
        if (searchId !== latestSearchId.current) return;
        setMovies([]);
      } finally {
        if (searchId === latestSearchId.current) {
          setIsLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
    setSortValue("");
  };

  const openModal = (movie) => {
    setSelectedMovie(movie)
    setModal(true);

  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModal(false);
  }

  useEffect(() => {
    if (!modal) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [modal])

  const getSortedMovies = (moviesToSort, currentSortValue) => {
    const sortedMovies = [...moviesToSort];

    if (currentSortValue === "NEW_TO_OLD") {
      sortedMovies.sort((a, b) => {
        const releasedA = new Date(a.Released).getTime() || 0;
        const releasedB = new Date(b.Released).getTime() || 0;
        return releasedB - releasedA;
      });
    } else if (currentSortValue === "OLD_TO_NEW") {
      sortedMovies.sort((a, b) => {
        const releasedA = new Date(a.Released).getTime() || 0;
        const releasedB = new Date(b.Released).getTime() || 0;
        return releasedA - releasedB;
      });
    } else if (currentSortValue === "RATING_HIGH_TO_LOW") {
      sortedMovies.sort((a, b) => {
        const ratingA = Number(a.imdbRating) || 0;
        const ratingB = Number(b.imdbRating) || 0;
        return ratingB - ratingA;
      });
    } else if (currentSortValue === "RATING_LOW_TO_HIGH") {
      sortedMovies.sort((a, b) => {
        const ratingA = Number(a.imdbRating) || 0;
        const ratingB = Number(b.imdbRating) || 0;
        return ratingA - ratingB;
      })
    }

    return sortedMovies;
  };

  const sortedMovies = getSortedMovies(movies, sortValue);

  return (
    <>
      <Navbar
        onSearchChange={onSearchChange}
        searchTerm={searchTerm}
        clearSearch={clearSearch}
        sortValue={sortValue}
        onSortChange={(event) => setSortValue(event.target.value)}
      />
      <section id="movie-grid">
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            openModal={openModal}
            fallbackPoster={fallbackPoster}
          />
        ))}
        {!searchTerm.trim() ? (
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
            <div
              className="movie-grid-loading"
              aria-live="polite"
              aria-label="Loading movies"
            >
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
      <Modal
        modal={modal}
        selectedMovie={selectedMovie}
        fallbackPoster={fallbackPoster}
        closeModal={closeModal}
      />
    </>
  );
};

export default Movies;
