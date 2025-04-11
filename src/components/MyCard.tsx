import { ElementType } from "../types/elementTypes";
import { srcImage } from "../functions/functions";
import "../css/styles.css";
import { Box, Image, Text, Button, Stack, Skeleton } from "@chakra-ui/react"
import { useState } from "react";
import { FALLBACK_IMAGE_URL } from "../constants/images";
import { useNavigate } from 'react-router-dom';
import { useSearch } from "../context/SearchContext";

type CardProps = {
  element: ElementType;
}

export const MyCard = ({ element }: CardProps) => {
  const navigate = useNavigate();
  const { setSelectedElement, setIsModalOpen, openModalWithElement } = useSearch();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null; // Evita loop infiniti
    target.src = FALLBACK_IMAGE_URL; // Usa l'immagine di fallback
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleClick = () => {
    openModalWithElement(element);
  };

  const renderImage = (imagePath: string | undefined) => (
    <Box position="relative" height="250px" width="100%">
      <Skeleton 
        isLoaded={!isImageLoading} 
        position="absolute" 
        top="0" 
        left="0" 
        width="100%" 
        height="100%"
        startColor="whiteAlpha.100"
        endColor="whiteAlpha.300"
      >
        <Image
          src={srcImage(element, imagePath)}
          onError={handleImageError}
          onLoad={handleImageLoad}
          alt={element.title || element.name || 'Media content'}
          width="100%"
          height="100%"
          objectFit="cover"
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.05)' }}
        />
      </Skeleton>
    </Box>
  );

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="whiteAlpha.50"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        borderColor: "red.500",
      }}
    >
      {children}
    </Box>
  );

  if (!element?.media_type) {
    console.warn('Missing media type for element:', element);
    return null;
  }

  switch (element.media_type) {
    case "movie":
      return (
        <CardWrapper>
          {renderImage(element.backdrop_path)}
          <Box p="6">
            <Text fontSize="xl" fontWeight="bold" mb={2} color="white">
              {element.title || 'Untitled'}
            </Text>
            <Text noOfLines={3} color="whiteAlpha.900">
              {element.overview || 'No description available'}
            </Text>
            <Button mt={4} colorScheme="blue" width="full" disabled={isImageLoading} onClick={handleClick}>
              Learn More
            </Button>
          </Box>
        </CardWrapper>
      );

    case "person":
      return (
        <CardWrapper>
          {renderImage(element.profile_path)}
          <Box p="6">
            <Stack gap={2}>
              <Text fontSize="xl" fontWeight="bold" color="white">
                {element.name || 'Unknown'}
              </Text>
              <Text color="whiteAlpha.900">
                <b>Role:</b> {element.known_for_department || 'Not specified'}
              </Text>
              <Text color="whiteAlpha.900">
                <b>Popularity:</b> {element.popularity?.toFixed(1) || 'N/A'}
              </Text>
              <Button colorScheme="blue" width="full" disabled={isImageLoading} onClick={handleClick}>Learn More</Button>
            </Stack>
          </Box>
        </CardWrapper>
      );

    case "tv":
      return (
        <CardWrapper>
          {renderImage(element.backdrop_path)}
          <Box p="6">
            <Text fontSize="xl" fontWeight="bold" mb={2} color="white">
              {element.name || 'Untitled'}
            </Text>
            <Text color="whiteAlpha.900">
              {element.overview || 'No description available'}
            </Text>
            <Button mt={4} colorScheme="blue" width="full" disabled={isImageLoading} onClick={handleClick}>
              Learn More
            </Button>
          </Box>
        </CardWrapper>
      );
      
    default:
      console.warn('Unknown media type:', element.media_type);
      return null;
  }
};