import React from 'react'

const MovieCard = ( { movie, fallbackPoster, openModal }) => {
  const formatMovieValue = (value, fallback = "Unknown") => {
    return value && value !== "N/A" ? value : fallback;
  }
  
  return (
    <div className="movie-card" onClick={() => openModal(movie)}>
            <div className="movie-card__media">
              <figure>
                <img 
                  src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : fallbackPoster}  
                  alt={movie.Title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackPoster
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
          )
}

export default MovieCard