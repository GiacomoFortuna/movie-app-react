import { ElementType } from "../types/elementTypes";
import { srcImage } from "../functions/functions";
import "../css/styles.css";
import { Box, Image, Text, Button, Stack, Skeleton } from "@chakra-ui/react"
import { useState } from "react";
import { FALLBACK_IMAGE_URL } from "../constants/images";
import { useNavigate } from 'react-router-dom';

type CardProps = {
  element: ElementType;
}

export const MyCard = ({ element }: CardProps) => {
  const navigate = useNavigate();
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
    navigate(`/${element.media_type}/${element.id}`, { state: { element } });
  };

  const renderImage = (imagePath: string | undefined) => (
    <Box position="relative" height="200px" width="100%">
      <Skeleton isLoaded={!isImageLoading} position="absolute" top="0" left="0" width="100%" height="100%">
        <Image
          src={srcImage(element, imagePath)}
          onError={handleImageError}
          onLoad={handleImageLoad}
          alt={element.title || element.name || 'Media content'}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Skeleton>
    </Box>
  );

  if (!element?.media_type) {
    console.warn('Missing media type for element:', element);
    return null;
  }

  switch (element.media_type) {
    case "movie":
      return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          {renderImage(element.backdrop_path)}
          <Box p="6">
            <Text fontSize="xl" fontWeight="bold" mb={2}>{element.title || 'Untitled'}</Text>
            <Text noOfLines={3}>{element.overview || 'No description available'}</Text>
            <Button mt={4} colorScheme="blue" width="full" disabled={isImageLoading} onClick={handleClick}>
              Learn More
            </Button>
          </Box>
        </Box>
      );

    case "person":
      return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          {renderImage(element.profile_path)}
          <Box p="6">
            <Stack gap={2}>
              <Text fontSize="xl" fontWeight="bold">{element.name || 'Unknown'}</Text>
              <Text><b>Role:</b> {element.known_for_department || 'Not specified'}</Text>
              <Text><b>Popularity:</b> {element.popularity?.toFixed(1) || 'N/A'}</Text>
              <Button colorScheme="blue" width="full" disabled={isImageLoading} onClick={handleClick}>Learn More</Button>
            </Stack>
          </Box>
        </Box>
      );

    case "tv":
      return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          {renderImage(element.backdrop_path)}
          <Box p="6">
            <Text fontSize="xl" fontWeight="bold" mb={2}>{element.name || 'Untitled'}</Text>
            <Text>{element.overview || 'No description available'}</Text>
            <Button mt={4} colorScheme="blue" width="full" disabled={isImageLoading} onClick={handleClick}>
              Learn More
            </Button>
          </Box>
        </Box>
      );
      
    default:
      console.warn('Unknown media type:', element.media_type);
      return null;
  }
};