import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import "./MovieDetails.css";

// Detail page fetches a single movie by imdbID so refresh and direct links still work.
const MovieDetails = () => {
  const { imdbID } = useParams();
  // MovieCard passes this in route state so the back link returns to the same results query.
  const location = useLocation();
  const backTo = location.state?.backTo || "/movie-results";
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const fallbackPoster = "/fallback-poster.png";

  const formatMovieValue = (value, fallback = "Unknown") => {
    return value && value !== "N/A" ? value : fallback;
  };

  useEffect(() => {
    // Mounted flag prevents state updates if the user leaves before the request completes.
    let isMounted = true;

    const fetchMovie = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        // This route fetches by imdbID instead of relying on result-page memory.
        const { data } = await axios.get(
          `http://www.omdbapi.com/?i=${imdbID}&apikey=92fb2c25`,
        );

        if (!isMounted) return;

        if (data.Response === "False") {
          setHasError(true);
          setMovie(null);
          return;
        }

        setMovie(data);
      } catch (error) {
        if (!isMounted) return;
        setHasError(true);
        setMovie(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovie();

    return () => {
      isMounted = false;
    };
  }, [imdbID]);

  return (
    <main className="movie-details-page">
      <section className="movie-details">
        {/* Falls back to plain /movie-results when the page is opened directly. */}
        <Link className="movie-details__back" to={backTo}>
        ← Back to results
        </Link>
        <h1 className="movie-details__brand">Theater6</h1>
        {isLoading ? (
          // Loading state mirrors the results page language but is scoped to one movie fetch.
          <div className="movie-details__status movie-details__status--loading">
            <div
              className="movie-details__loading"
              aria-live="polite"
              aria-label="Loading movie details"
            >
              <span className="movie-details__spinner" aria-hidden="true" />
              <p className="movie-details__status-text">Loading movie details...</p>
            </div>
          </div>
        ) : hasError || !movie ? (
          // Error and missing-data states share one branch because both produce no usable movie record.
          <div className="movie-details__status">
            <h1 className="movie-details__title">Movie not found</h1>
            <p className="movie-details__subtitle">
              We could not load details for this title.
            </p>
          </div>
        ) : (
          <>
            <p className="movie-details__eyebrow">Movie Details</p>
            <div className="movie-details__dialog">
              <div className="movie-details__content">
                <img
                  className="movie-details__poster"
                  src={
                    movie.Poster && movie.Poster !== "N/A"
                      ? movie.Poster
                      : fallbackPoster
                  }
                  alt={movie.Title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackPoster;
                  }}
                />
                <div className="movie-details__body">
                  {/* Plot is intentionally promoted above the metadata grid as the main long-form content. */}
                  <h1 className="movie-details__title">
                    {formatMovieValue(movie.Title, "Untitled")}
                  </h1>
                  <div className="movie-details__plot movie-details__info-card--wide">
                    <p>
                      <b>Plot:</b>{" "}
                      {formatMovieValue(movie.Plot, "Plot unavailable.")}
                    </p>
                  </div>
                  <div className="movie-details__info-grid">
                    <div className="movie-details__info-card movie-details__info-card--wide">
                      <span className="movie-details__info-label">Director</span>
                      <span className="movie-details__info-value">
                        {formatMovieValue(movie.Director)}
                      </span>
                    </div>
                    <div className="movie-details__info-card movie-details__info-card--wide">
                      <span className="movie-details__info-label">Cast</span>
                      <span className="movie-details__info-value">
                        {formatMovieValue(movie.Actors)}
                      </span>
                    </div>
                    <div className="movie-details__info-card">
                      <span className="movie-details__info-label">Released</span>
                      <span className="movie-details__info-value">
                        {formatMovieValue(movie.Released || movie.Year)}
                      </span>
                    </div>
                    <div className="movie-details__info-card">
                      <span className="movie-details__info-label">Genre</span>
                      <span className="movie-details__info-value">
                        {formatMovieValue(movie.Genre)}
                      </span>
                    </div>
                    <div className="movie-details__info-card">
                      <span className="movie-details__info-label">Runtime</span>
                      <span className="movie-details__info-value">
                        {formatMovieValue(movie.Runtime)}
                      </span>
                    </div>
                    <div className="movie-details__info-card">
                      <span className="movie-details__info-label">IMDb Rating</span>
                      <span className="movie-details__info-value">
                        {formatMovieValue(movie.imdbRating, "N/A")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default MovieDetails;
