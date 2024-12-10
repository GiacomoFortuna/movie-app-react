import { ElementType } from "../types/elementTypes";

// Funzione per visualizzare l'immagine, passo il percoso dell'immagine
export const srcImage = (element: ElementType, path: string | undefined) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}`: element.media_type === 'person'
        ? '../images/user.png'
        : '../images/movie.png';
};

/* Funzione per settare l'url di ricerca quando clicco sul pulsante learnMore
export const learnMore = (element: ElementType) : string => {
    let searchQuery = element.title || element.name || "";  // Inizia con il titolo o il nome
    if (element.media_type === 'movie')
        searchQuery += " (movie)";  // Aggiungi "(movie)" se è un film
    else if (element.media_type === 'tv')
        searchQuery += " (TV series)";
    return searchQuery;
}*/