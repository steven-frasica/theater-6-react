import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Movies from './components/Movies/Movies';
import Home from './components/Home/Home';

function App() {




  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movie-results' element={<Movies />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
