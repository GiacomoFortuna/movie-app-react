// src/App.tsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CardContainer } from './components/CardContainer';
import { SearchBar } from './components/SearchBar';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <Router>
      <SearchProvider>
        <div>
          <SearchBar />
          <h1>MovieApp</h1>
          
          <Routes>
            <Route path="/" element={
              <>
                <CardContainer url="trending/movie/day" section="Trending Movies" />
                <CardContainer url="trending/person/day" section="Trending People"/>
                <CardContainer url="trending/tv/day" section="Trending TV" />
              </>
            } />
            <Route path="/:mediaType/:id" element={
              <>
                <CardContainer url="trending/movie/day" section="Trending Movies" />
                <CardContainer url="trending/person/day" section="Trending People"/>
                <CardContainer url="trending/tv/day" section="Trending TV" />
              </>
            } />
          </Routes>
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;
