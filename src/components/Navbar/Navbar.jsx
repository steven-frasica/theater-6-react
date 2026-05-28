import React from "react";
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav">
      <h1>Theater6</h1>
      <h2>Search for your next viewing experience</h2>
      <div className="nav__controls">
        <div className="search-bar">
          <input id="search-input" type="text" placeholder="Type to Search"/>
          <button className="search-bar__clear">&times;</button>
        </div>
        <select name="sort" id="sort-select" className="sort-select">
          <option value="" disabled defaultValue>Sort</option>
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
