import { useEffect, useState } from "react";
import { ElementType } from "../types/elementTypes";
import { getElement } from "../api/element";
import { MyCard } from "./MyCard";
import { SimpleGrid, Heading, Box } from "@chakra-ui/react";
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
    const { searchResults } = useSearch();
    const { id, mediaType } = useParams();
    const location = useLocation();
    const selectedElement = location.state?.element;

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

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <>
            <Heading textAlign="left" size="2xl" p={5}>
                {searchResults?.length ? "Search Results" : section}
            </Heading>
            <SimpleGrid columns={3} gap={10}>
                {element?.map((item) => (
                    <MyCard key={item.id} element={item} />
                ))}
            </SimpleGrid>
            <MovieDetail 
                element={selectedElement}
                isOpen={!!id && mediaType === url.split('/')[1]}
                onClose={() => {}}
            />
        </>
    );
};
