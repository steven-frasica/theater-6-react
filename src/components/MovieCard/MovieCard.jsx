import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

// Presentational card plus navigation bridge from results into a movie detail route.
const MovieCard = ({ movie, fallbackPoster, searchTerm }) => {
  const navigate = useNavigate();

  const formatMovieValue = (value, fallback = "Unknown") => {
    return value && value !== "N/A" ? value : fallback;
  };

  // Pass the current results URL along so MovieDetails can link back to the same search state.
  const trimmedSearch = searchTerm.trim();
  const backTo = trimmedSearch
    ? `/movie-results?search=${encodeURIComponent(trimmedSearch)}`
    : "/movie-results";

  return (
    <div
      className="movie-card"
      // Route state preserves search context without needing a global store.
      onClick={() =>
        navigate(`/movie/${movie.imdbID}`, {
          state: { backTo },
        })
      }
    >
      <div className="movie-card__media">
        <figure className="movie-card__figure">
          <img
            className="movie-card__image"
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
        </figure>
      </div>
      <div className="movie-card__details">
        <h4>{formatMovieValue(movie.Title, "Untitled")}</h4>
        <p>Released: {formatMovieValue(movie.Released || movie.Year)}</p>
        <p>Genre: {formatMovieValue(movie.Genre)}</p>
        <p>IMDb Rating: {formatMovieValue(movie.imdbRating, "N/A")}</p>
      </div>
    </div>
  );
};

export default MovieCard;