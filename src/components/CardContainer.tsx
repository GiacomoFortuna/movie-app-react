import { useEffect, useState } from "react";
import { ElementType } from "../types/elementTypes";
import { getElement } from "../api/element";
import { MyCard } from "./MyCard";
import { SimpleGrid, Heading, Box, Skeleton, VStack } from "@chakra-ui/react";
import { useSearch } from "../context/SearchContext";
import { useParams, useLocation } from 'react-router-dom';
import { MovieDetail } from './MovieDetail';

type CardContainerProps = {
    url: string,
    section: string
}

export const CardContainer = ({ url, section }: CardContainerProps) => {
    const [element, setElement] = useState<ElementType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchResults, selectedElement, isModalOpen, setIsModalOpen } = useSearch();
    // Removed unused destructuring of useParams

    useEffect(() => {
        const fetchElement = async () => {
            try {
                setIsLoading(true);
                if (searchResults?.length > 0) {
                    setElement(searchResults);
                } else {
                    const data = await getElement(url);
                    setElement(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setElement([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchElement();
    }, [url, searchResults]);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    if (isLoading) {
        return (
            <VStack spacing={4} w="full">
                <Heading textAlign="left" size="xl" w="full" color="red.500">
                    {section}
                </Heading>
                <SimpleGrid columns={[1, 2, 3]} gap={8} w="full">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} height="400px" borderRadius="lg" />
                    ))}
                </SimpleGrid>
            </VStack>
        );
    }

    // Don't render if there are search results and this isn't the first container
    if (searchResults?.length > 0 && section !== "Trending Movies") {
        return null;
    }

    return (
        <VStack spacing={4} w="full">
            <Heading textAlign="left" size="xl" w="full" color="red.500">
                {searchResults?.length ? "Search Results" : section}
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} gap={8} w="full">
                {element?.map((item) => (
                    <MyCard key={item.id} element={item} />
                ))}
            </SimpleGrid>
            <MovieDetail 
                element={selectedElement}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </VStack>
    );
};
