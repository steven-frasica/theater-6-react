import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      return;
    }

    navigate(`/movie-results?search=${encodeURIComponent(trimmedSearch)}`);
  };
  return (
    <main className="home">
      <section className="home__hero">
        <p className="home__eyebrow">Movie Search</p>
        <h1 className="home__title">Find your next viewing experience</h1>
        <p className="home__subtitle">
          Search for movies, then jump straight into the results page.
        </p>
        <form onSubmit={handleSubmit} className="home__search">
          <input type="text" className="home__input" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search for a movie"/>
          <button className="home__button" type="submit" aria-label="Search movies">
  <span className="home__button-icon" aria-hidden="true">
    🔍
  </span>
</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
