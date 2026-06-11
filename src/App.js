import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="app__content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movie-results' element={<Movies />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
