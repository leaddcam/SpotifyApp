import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Login, Home} from './pages'; // Home, TopArtists, TopSongs

/*
        <Route path='/top-artists' element={<TopArtists />} />
        <Route path='/top-songs' element={<TopSongs />} />
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
