export type ElementType = {
    id: number;
    adult: boolean;
    media_type: string; 
    popularity: number;
    backdrop_path?: string;
    overview?: string;
    poster_path?: string;
    genre_ids?: number[];
    vote_average?: number;
    vote_count?: number;
    title?: string;
    original_title?: string;
    original_language?: string;
    release_date?: string;
    video?: boolean;
    name?: string;
    original_name?: string;
    gender?: number;
    known_for_department?: string;
    profile_path?: string;
    known_for?: ElementType[];
    first_air_date?: string;
    origin_country?: string[];
};


