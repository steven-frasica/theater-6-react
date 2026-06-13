import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

// Landing page that collects the initial search term and routes into results.
const Home = () => {
  // Local input state only lives on Home long enough to build the results-page URL.
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // The results page reads the query from the URL, so Home writes it there.
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    // Empty searches should keep the user on Home instead of navigating to an empty results page.
    if (!trimmedSearch) {
      return;
    }

    // Encoding protects spaces and special characters before they become part of the query string.
    navigate(`/movie-results?search=${encodeURIComponent(trimmedSearch)}`);
  };
  return (
    <main className="home">
      <section className="home__hero">
        <h1 className="home__brand">Theater6</h1>
        <h2 className="home__title">Find your next viewing experience</h2>
        <p className="home__eyebrow">Movie Search</p>
        {/* Controlled form keeps the input state in sync before routing to results. */}
        <form onSubmit={handleSubmit} className="home__search">
          {/* The input updates state on every keystroke so submit always uses the latest value. */}
          <input type="text" className="home__input" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search for a movie"/>
          {/* Submit stays semantic so Enter and button clicks share the same handler. */}
          <button className="home__button" type="submit" aria-label="Search movies">
            <svg
              className="home__button-icon"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="6.5" />
              <line x1="15.5" y1="15.5" x2="20" y2="20" />
            </svg>
          </button>
        </form>
        {/* Decorative asset served from /public so it can be referenced by root-relative path. */}
        <img 
          className="home__movie-image"
          src="/movie.svg" 
          alt="movie night" />
      </section>
    </main>
  );
};

export default Home;
