import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Results-page header. It stays dumb: Movies owns the state and passes handlers in.
const Navbar = ({
  searchTerm,
  onSearchChange,
  clearSearch,
  sortValue,
  onSortChange,
}) => {
  return (
    <div className="nav">
      {/* Direct route back to Home; unlike MovieDetails, results do not need route state. */}
      <Link className="nav__home-link" to="/">
      ← Back to Home
      </Link>
      <h1>Theater6</h1>
      <h2>Search for your next viewing experience</h2>
      <div className="nav__controls">
        <div className="search-bar">
          {/* Controlled input stays synced with the query state in Movies.jsx. */}
          <input
            id="search-input"
            value={searchTerm}
            type="text"
            onChange={onSearchChange}
            placeholder="Type to Search"
          />
          {/* Clear button resets both the input and the current sort in the parent page. */}
          <button className="search-bar__clear" onClick={clearSearch}>
            &times;
          </button>
        </div>
        {/* Sort only reorders already-fetched movies; it does not trigger a new API request. */}
        <select name="sort" id="sort-select" className="sort-select" value={sortValue} onChange={onSortChange}>
          <option value="" disabled>
            Sort
          </option>
          <option value="NEW_TO_OLD">Newest First</option>
          <option value="OLD_TO_NEW">Oldest First</option>
          <option value="RATING_HIGH_TO_LOW">Rating, High to Low</option>
          <option value="RATING_LOW_TO_HIGH">Rating, Low to High</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
