import { useParams, useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { ElementType } from '../types/elementTypes';
import { srcImage } from '../functions/functions';

type MovieDetailProps = {
  element?: ElementType;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetail = ({ element, isOpen, onClose }: MovieDetailProps) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(-1);
  };

  if (!element) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{element.title || element.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Image
              src={srcImage(element, element.backdrop_path)}
              alt={element.title || element.name || 'Media content'}
            />
            <Text><strong>Overview:</strong> {element.overview}</Text>
            {element.release_date && (
              <Text><strong>Release Date:</strong> {element.release_date}</Text>
            )}
            {element.vote_average && (
              <Text><strong>Rating:</strong> {element.vote_average}/10</Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
