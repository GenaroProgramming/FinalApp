
export type Character = {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    origin: {
        name: string;
    }
    especies: string;
    location: {
        name: string;
    }
    image: string;
    type: string;
    gender: string;
    episode: string[];
}