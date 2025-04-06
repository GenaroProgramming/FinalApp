/* Definir el tipo de dato que
devuelve el endpoint de characters
*/
import { Episodes } from "./episodesType";

export type EpisodesResult = {
    info:{
        pages: number;
        count: number;
        next: string | null;
        prev: string | null;
    }
    results: Episodes[];
}