// src/App.tsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CardContainer } from './components/CardContainer';
import { SearchBar } from './components/SearchBar';
import { SearchProvider } from './context/SearchContext';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';

function App() {
  return (
    <Router>
      <SearchProvider>
        <Box 
          bg="black" 
          minH="100vh" 
          w="100%" 
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          overflowY="auto"
        >
          <Container maxW="container.xl" py={8}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading as="h1" size="2xl" mb={6} textAlign="center" color="red.500">
                  MovieApp
                </Heading>
                <SearchBar />
              </Box>
              
              <Routes>
                <Route path="/" element={
                  <VStack spacing={16} align="stretch">
                    <CardContainer url="trending/movie/day" section="Trending Movies" />
                    <CardContainer url="trending/tv/day" section="Trending TV" />
                    <CardContainer url="trending/person/day" section="Trending People"/>
                  </VStack>
                } />
                <Route path="/:mediaType/:id" element={
                  <CardContainer url="trending/movie/day" section="Related Content" />
                } />
              </Routes>
            </VStack>
          </Container>
        </Box>
      </SearchProvider>
    </Router>
  );
}

export default App;
