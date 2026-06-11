import React from "react";

const Modal = ({ modal, selectedMovie, fallbackPoster, closeModal }) => {
  const formatMovieValue = (value, fallback = "Unknown") => {
    return value && value !== "N/A" ? value : fallback;
  };

  if (!modal || !selectedMovie) {
    return null;
  }

  return (
    <div className="modal" onClick={closeModal}>
      <div
        className="modal__dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal__close" type="button" onClick={closeModal}>
          x
        </button>

        <div className="modal__content">
          <img
            className="modal__poster"
            src={
              selectedMovie.Poster && selectedMovie.Poster !== "N/A"
                ? selectedMovie.Poster
                : fallbackPoster
            }
            alt={selectedMovie.Title}
          />

          <div className="modal__body">
            <h3>{formatMovieValue(selectedMovie.Title, "Untitled")}</h3>

            <div className="modal__meta">
              <div>
                <b>Released:</b>{" "}
                {formatMovieValue(selectedMovie.Released || selectedMovie.Year)}
              </div>
              <div>
                <b>Genre:</b> {formatMovieValue(selectedMovie.Genre)}
              </div>
              <div>
                <b>IMDb Rating:</b>{" "}
                {formatMovieValue(selectedMovie.imdbRating, "N/A")}
              </div>
            </div>

            <div className="modal__runtime">
              <b>Runtime: {formatMovieValue(selectedMovie.Runtime)}</b>
            </div>

            <div className="modal__cast">
              <div>
                <b>Director:</b> {formatMovieValue(selectedMovie.Director)}
              </div>
              <div>
                <b>Cast:</b> {formatMovieValue(selectedMovie.Actors)}
              </div>
            </div>

            <div className="modal__plot">
              <p>
                <b>Plot:</b>{" "}
                {formatMovieValue(selectedMovie.Plot, "Plot unavailable.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
