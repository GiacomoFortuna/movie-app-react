import { ElementType } from "../types/elementTypes";
const Image =  "../images/Naruto.jpg";
export const srcImage = (element: ElementType, path: string | null | undefined): string => {
  if (!element || !path || path === '') {
    console.warn('Missing image path or invalid element');
    return Image;
  }

  try {
    const url = new URL(`https://image.tmdb.org/t/p/w500${path}`);
    return url.toString();
  } catch (error) {
    console.error('Error creating image URL:', error);
    return Image;
  }
};
