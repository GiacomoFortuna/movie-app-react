import { Input, Button, HStack } from "@chakra-ui/react";
import { useSearch } from "../context/SearchContext";
import { searchElements } from "../api/element";

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
    <HStack marginBottom={4}>
      <Input
        placeholder="Cerca..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button onClick={handleSearch} colorScheme="blue">
        VAI
      </Button>
    </HStack>
  );
};
