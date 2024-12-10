import { useEffect, useState } from "react";
import { ElementType } from "../types/elementTypes";
import { getElement } from "../api/element";
import { MyCard } from "./MyCard";
import { SimpleGrid, Heading } from "@chakra-ui/react"

type CardContainerProps = {
    url: string,
    section: string
}

export const CardContainer = ({ url, section }: CardContainerProps) => {
    const [element, setElement] = useState<ElementType[]>([]);

    useEffect(() => {
        const fetchElement = async () => setElement(await getElement(url));
        fetchElement();
    }, [url]);

    return (
        <>
        <Heading textAlign="left" size="2xl" p={5}>{section}</Heading>
        <SimpleGrid columns={3} gap={10}>
            { element.map((element) => <MyCard key={element.id} element={element} /> ) }
        </SimpleGrid>
        </>
    );
};
