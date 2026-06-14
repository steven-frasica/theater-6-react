# Theater6

Theater6 is a movie search app built with React, React Router, Axios, and the
OMDb API. Users can search for movies, sort results by date or rating, open a
details page for a selected title, and return to the same search they
came from.

This project helped me practice working with routed React views, async API
requests, client-side sorting, defensive UI states, and reusable components.

## Features

- Search movies with the OMDb API
- Debounced search input to reduce unnecessary requests
- Request tracking to prevent stale search results from overwriting newer ones
- Client-side sorting by release date and IMDb rating
- Dedicated movie details route instead of a modal
- Back-to-results navigation that preserves the active search query
- Loading, empty, and error states for stronger user feedback
- Poster and metadata fallbacks for incomplete API responses
- Responsive layout and shared footer across the app

## Tech Stack

- React
- React Router
- Axios
- JavaScript
- CSS
- OMDb API

## How It Works

1. The user starts on the Home page and enters a movie title.
2. The app routes to the results page and keeps the search term in the URL.
3. A debounced effect sends the OMDb search request.
4. The app fetches additional details for each returned movie using the IMDb ID.
5. Results are stored in state and sorted client-side when the dropdown changes.
6. Clicking a movie card routes to a details page that fetches the selected movie by IMDb ID.
7. The details page uses route state so the user can return to the same results view.

## What I Learned

- How to sync React state with the URL for refresh-safe and shareable searches
- How debounce and request tracking solve different async search problems
- How to split a small app into reusable components and routed pages
- How to handle loading, no-results, and error states cleanly
- How to add safe fallbacks for missing posters and `N/A` metadata

## Challenges And Solutions

### 1. Debounce versus stale requests

Debounce reduced how often searches fired, but it did not stop older requests
from finishing later than newer ones. I solved that by tracking the latest
search request and ignoring stale responses.

### 2. Replacing the modal with routed details

Moving from a modal to a dedicated details page meant the app also needed to
work on refresh and direct navigation. Fetching the movie again by IMDb ID on
the details route solved that cleanly.

### 3. Handling incomplete API data

OMDb can return missing values or `N/A`, so the app needed fallbacks for
posters, text fields, and ratings to keep the UI stable.

## Project Structure

- `src/App.js`: route setup and global app shell
- `src/components/Home/Home.jsx`: landing page search form
- `src/components/Movies/Movies.jsx`: search state, fetching, sorting, and results rendering
- `src/components/Navbar/Navbar.jsx`: results-page search and sort controls
- `src/components/MovieCard/MovieCard.jsx`: result card and navigation to details
- `src/components/MovieDetails/MovieDetails.jsx`: routed movie details page
- `src/components/Footer/Footer.jsx`: footer shared across all pages

## Installation And Setup

1. Clone the repository.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your OMDb API key.
4. Start the app with `npm start`.
5. Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm start`: run the app in development mode
- `npm run build`: create a production build

## Future Improvements

- Add filters for year, genre, or rating
- Add pagination or a load-more flow
- Add a favorites or watchlist feature with local storage
- Improve keyboard accessibility and test coverage

## Credits

- Movie data from the OMDb API
- Footer icon attribution: Freepik / Flaticon
