import { Input, Button, HStack, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useSearch } from "../context/SearchContext";
import { searchElements } from "../api/element";
import { SearchIcon } from "@chakra-ui/icons";

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, setSearchResults } = useSearch();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchElements(searchQuery);
      setSearchResults(results);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <HStack spacing={4} w="full" maxW="container.md" mx="auto">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="whiteAlpha.700" />
        </InputLeftElement>
        <Input
          placeholder="Search movies, TV shows, and people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          bg="whiteAlpha.100"
          border="1px solid"
          borderColor="whiteAlpha.300"
          color="white"
          _placeholder={{ color: 'whiteAlpha.600' }}
          _hover={{ borderColor: "red.500" }}
          _focus={{ 
            borderColor: "red.500", 
            boxShadow: "0 0 0 1px var(--chakra-colors-red-500)",
            color: "white"
          }}
        />
      </InputGroup>
      <Button 
        onClick={handleSearch}
        colorScheme="red"
        px={8}
        _hover={{ transform: "translateY(-2px)" }}
        transition="all 0.2s"
      >
        Search
      </Button>
    </HStack>
  );
};
