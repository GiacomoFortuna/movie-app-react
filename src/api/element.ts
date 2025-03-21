import { ResponseType } from "../types/responseTypes";
import { ElementType } from "../types/elementTypes";
import { VITE_API_KEY, VITE_BASE_URL } from "./api";

export const getElement = async (endpoint: string): Promise<ElementType[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}${endpoint}?api_key=${VITE_API_KEY}`);
    if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
    const data: ResponseType = await response.json();
    return data.results.slice(0, 3);
  } catch (error) {
    console.error(`Errore nel recupero dei contenuti per ${endpoint}:`, error);
    return [];
  }
};

export const searchElements = async (query: string): Promise<ElementType[]> => {
  if (!query) return [];
  try {
    const response = await fetch(
      `${VITE_BASE_URL}search/multi?api_key=${VITE_API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Error in TMDB search request");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching content:", error);
    return [];
  }
};
