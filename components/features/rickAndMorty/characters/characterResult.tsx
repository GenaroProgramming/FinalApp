import { Character } from "./characterType";

export type CharacterResult = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
};