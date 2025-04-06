import { Image, StyleSheet, Text, View } from "react-native";
import { Location } from "./locationType";

type Props = {
    location: Location;
};

export function LocationCard({ location }: Props) {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image}
                source={require("../../../../assets/RickAndMorty/Locations.jpg")}
            />
            <View style={styles.content}>
                <Text style={styles.info}>{location.name}</Text>

                <Text style={styles.label}>Tipo</Text>
                <Text style={styles.info}>{location.type}</Text>

                <Text style={styles.label}>Dimensión</Text>
                <Text style={styles.info}>{location.dimension}</Text>

                <Text style={styles.label}>Residentes</Text>
                <Text style={styles.info}>{location.residents.length}</Text>
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
