import { Image, StyleSheet, Text, View } from "react-native";
import { Episodes } from "./episodesType";

type Props = {
    episodes: Episodes;
};

export function EpisodesCard({ episodes }: Props) {
    const getImageBySeason = () => {
        const seasonCode = episodes.episode.slice(0, 3);
        switch (seasonCode) {
            case "S01":
                return require("../../../../assets/RickAndMorty/Temp1.jpg");
            case "S02":
                return require("../../../../assets/RickAndMorty/Temp2.jpg");
            case "S03":
                return require("../../../../assets/RickAndMorty/Temp3.jpg");
            case "S04":
                return require("../../../../assets/RickAndMorty/Temp3.jpg");
            case "S05":
                return require("../../../../assets/RickAndMorty/Temp5.jpg");
            default:
                return require("../../../../assets/RickAndMorty/Temp3.jpg");
        }
    };

    return (
        <View style={styles.card}>
            <Image style={styles.image} source={getImageBySeason()} />
            <View style={styles.content}>
                <Text style={styles.info}>{episodes.name}</Text>

                <Text style={styles.label}>Episodio</Text>
                <Text style={styles.info}>{episodes.episode}</Text>

                <Text style={styles.label}>Personajes Participantes</Text>
                <Text style={styles.info}>{episodes.characters.length}</Text>

                <Text style={styles.label}>Fecha de emisión</Text>
                <Text style={styles.info}>{episodes.air_date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        flexDirection: "row",
        width: "100%",
        borderWidth: 4,
        borderColor: "#6DA5C0",
        backgroundColor: "rgb(104, 213, 193)",
        marginTop: 20,
        overflow: "hidden",
    },
    image: {
        width: "40%",
        height: 200,
        borderColor: "#6DA5C0",
        borderRightWidth: 3,
    },
    content: {
        padding: 10,
        flex: 1,
        justifyContent: "center",
    },
    label: {
        fontWeight: "600",
        fontSize: 18,
        color: "rgb(119, 4, 213)",
        fontFamily: "Roboto",
        marginBottom: 2,
    },
    info: {
        fontSize: 16,
        fontFamily: "Arial",
        marginBottom: 6,
    },
});
