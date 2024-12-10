import { ResponseType } from "../types/responseTypes";
import { ElementType } from "../types/elementTypes";
import { VITE_API_KEY, VITE_BASE_URL } from "./api";

export const getElement = async (endpoint: string): Promise<ElementType[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}${endpoint}?api_key=${VITE_API_KEY}`);
    if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
    const data: ResponseType = await response.json();
    return data.results.slice(0, 3); // Restituisce i primi 3 elementi
  } catch (error) {
    console.error(`Errore nel recupero dei contenuti per ${endpoint}:`, error);
    return []; // Restituisce un array vuoto in caso di errore
  }
};
