import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

type Props = {
    uri: string;
    onSave: (uri: string) => void;
    onCancel: () => void;
    newPhoto: () => void;
}

export function PhotoPreview({
    uri,
    onSave,
    onCancel,
    newPhoto,

}: Props) {

    //Tarea agarrar una imagen de la galeria 
    //ia

    return (
        <View style={styles.container}>
            <Image
                source={{ uri }}
                style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }}
            >

            </Image>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={newPhoto}>
                    <FontAwesome name="file-picture-o" size={44} color={"white"}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => onSave(uri)}>
                    <MaterialIcons name="save" size={64} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                    onPress={() => onCancel()}>
                    <Feather name="x" size={44} color="white" />
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "black"
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 10,
    },

    cancelButton: {
        backgroundColor: "#f44336",
    },
    galleryButton: {
        backgroundColor: "#f44336",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
})