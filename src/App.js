import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';

const routerBasename = process.env.NODE_ENV === 'production' ? '/theater-6-react' : '/';

function App() {
  return (
    <Router basename={routerBasename}>
      <div className="App">
        <div className="app__content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie-results' element={<Movies />} />
            <Route path='/movie/:imdbID' element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
