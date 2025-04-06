//implementar la estructura base
//datasource
//implementar metodo: getNotes() => Note[]

import {supabase} from "../../../lib/supabaseNote"
import { Note } from "./note";

// crear una clase DataSource

export class DataSource {
    constructor() { }

    async getNotes(): Promise<Note[]> {
        try {
            // Conectar a Supabase y leer todas las notas
            const { data, error } = await supabase
                .from("notes")
                .select("*")
                .order("date", { ascending: false });

            if (error) {
                throw new Error(`Error al obtener notas: ${error.message}`);
            }

            return data || [];
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}