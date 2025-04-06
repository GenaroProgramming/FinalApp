/* Definir el tipo de dato que
devuelve el endpoint de characters
*/
import { Location } from "./locationType";

export type LocationsResult = {
    info:{
        pages: number;
        count: number;
        next: string | null;
        prev: string | null;
    }
    results: Location[];
}