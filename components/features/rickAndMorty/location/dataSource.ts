//dataSource.ts

import { LocationsResult } from "./locationsResult";

// crear una clase DataSource

export class DataSource {

    constructor() {}
    //metodo para cargar personajes

    async getCharacters(page: number) : Promise<LocationsResult> {
        //consumir la api
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);

        return response.json();
    }
}