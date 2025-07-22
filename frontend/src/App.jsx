import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Login} from './pages'; // Home, TopArtists, TopSongs

/*
        <Route path='/top-artists' element={<TopArtists />} />
        <Route path='/top-songs' element={<TopSongs />} />
        <Route path='/home' element={<Home />} />
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
