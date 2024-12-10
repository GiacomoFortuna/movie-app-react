// src/types/responseTypes.ts
import { ElementType } from "./elementTypes";

export type ResponseType = {
    results: ElementType[];
    page: number;
    total_pages: number;
    total_results: number;
};
