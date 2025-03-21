import { ElementType } from "../types/elementTypes";
import { FALLBACK_IMAGE_URL } from "../constants/images";

export const srcImage = (element: ElementType, path: string | undefined) => {
    if (!path) {
        console.warn('Missing image path or invalid element:', element);
        return FALLBACK_IMAGE_URL; // Usa l'immagine di fallback
    }

    try {
        return `https://image.tmdb.org/t/p/w500${path}`;
    } catch (error) {
        console.error('Error creating image URL:', error);
        return FALLBACK_IMAGE_URL; // Usa l'immagine di fallback in caso di errore
    }
};