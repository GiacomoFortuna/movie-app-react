// src/App.tsx
import './App.css';
import { CardContainer } from './components/CardContainer';
// import { SimpleGrid } from "@chakra-ui/react"

function App() {
  return (
    <div>
      <h1>MovieApp</h1>

      {/* Componenti CardContainer per i diversi tipi di contenuto */}
      
      {/* <SimpleGrid columns={3} gap={40}> */}
        <CardContainer url="movie/day" section="Trending Movies" />
      {/* </SimpleGrid> */}
      <CardContainer url="person/day" section="Trending People"/>
      <CardContainer url="tv/day" section="Trending TV" />
    </div>
  );
}

export default App;
