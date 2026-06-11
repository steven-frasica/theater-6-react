import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Movies from './components/Movies/Movies';

function App() {




  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/movieresults' element={<Movies />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
