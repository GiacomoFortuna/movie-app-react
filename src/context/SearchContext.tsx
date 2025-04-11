import { createContext, useContext, useState, ReactNode } from "react";
import { ElementType } from "../types/elementTypes";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: ElementType[];
  setSearchResults: (results: ElementType[]) => void;
  selectedElement: ElementType | null;
  setSelectedElement: (element: ElementType | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  openModalWithElement: (element: ElementType) => void;
};

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ElementType[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalWithElement = (element: ElementType) => {
    setSelectedElement(element);
    setIsModalOpen(true);
  };

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      searchResults, 
      setSearchResults,
      selectedElement,
      setSelectedElement,
      isModalOpen,
      setIsModalOpen,
      openModalWithElement
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
