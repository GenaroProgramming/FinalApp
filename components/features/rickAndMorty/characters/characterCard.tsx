import { useState } from "react";
import { Character } from "./characterType";
import { TouchableOpacity, View, Text, Image, StyleSheet, Modal, Alert } from "react-native";

type Props = {
    character: Character;
}

export function CharacterCard({ character }: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    const getStatusColor = () => {
        switch (character.status) {
            case "Alive":
                return styles.alive;
            case "Dead":
                return styles.dead;
            case "unknown":
            default:
                return styles.unknown;
        }
    };

    const getType = () => {
        return character.type === "" ? "unknown" : character.type;
    };

    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                <Image style={styles.image} source={{ uri: character.image }} />
                <View style={styles.content}>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.info}>{character.name}</Text>

                    <Text style={styles.label}>Estatus y Especie</Text>
                    <View style={styles.row}>
                        <View style={[styles.status, getStatusColor()]}></View>
                        <Text style={styles.info}>{character.status} - {character.especies}</Text>
                    </View>

                    <Text style={styles.label}>Ubicación</Text>
                    <Text style={styles.info}>{character.location.name}</Text>

                    <Text style={styles.label}>Origen</Text>
                    <Text style={styles.info}>{character.origin.name}</Text>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal Cerrado");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{character.name}</Text>
                        <Text style={styles.modalLabel}>Tipo</Text>
                        <Text style={styles.modalText}>{getType()}</Text>

                        <Text style={styles.modalLabel}>Género</Text>
                        <Text style={styles.modalText}>{character.gender}</Text>

                        <Text style={styles.modalLabel}>Cameos en Capítulos</Text>
                        <Text style={styles.modalText}>{character.episode.length}</Text>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 14,
        flexDirection: "row",
        width: '100%',
        borderWidth: 3,
        borderColor: "#6DA5C0",
        backgroundColor: "rgb(104, 213, 193)",
        marginVertical: 10,
        overflow: "hidden",
        elevation: 4,
    },
    image: {
        width: "40%",
        height: "100%",
        resizeMode: "cover",
    },
    content: {
        padding: 8,
        flex: 1,
    },
    label: {
        fontWeight: "bold",
        fontSize: 18,
        color: "rgb(119, 4, 213)",
    },
    info: {
        fontSize: 16,
        marginBottom: 4,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    status: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    alive: {
        backgroundColor: "green",
    },
    dead: {
        backgroundColor: "red",
    },
    unknown: {
        backgroundColor: "orange",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgb(119, 4, 213)",
        marginTop: 10,
    },
    modalText: {
        fontSize: 16,
    },
    modalButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#6DA5C0",
        borderRadius: 8,
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
