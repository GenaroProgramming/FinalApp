//dataSource.ts

import { CharacterResult } from "./characterResult";

// crear una clase DataSource

export class DataSource {

    constructor() {}
    //metodo para cargar personajes

    async getCharacters(page: number) : Promise<CharacterResult> {
        //consumir la api
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);

        return response.json();
    }
}