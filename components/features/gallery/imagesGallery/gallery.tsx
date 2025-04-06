import { FlatList, StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { ImagePicker } from "../imagesPicker/imagePicker";
import { useState } from "react";


export function ImagesGallery() {

    //ToDo: Estado para las images: string[]
    const [images, setImages] = useState<string[]>([]);


    // ToDo: función para recibir la imagen
    const handleImageSelected = (uri: string) => {
        setImages(prev => [...prev, uri]);
    };

    // desde ImagePicker y pasarla a la coleccion o estado de imagenes


    return (
        <View
            style={styles.container}>
            <View style={styles.header}>
                <ImagePicker
                    // ToDo: prop para recibir la imagen
                    onImageSelected={handleImageSelected}
                />
                <Text style={styles.text}>Imágenes</Text>
            </View>
            {/* ToDo: Mostrar el grid de imáges */}
            <View style={styles.pictures}>
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 45,
        paddingHorizontal: 24,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 10,
    },
    text: {
        fontWeight: "bold",
        fontSize: 32,
        textAlign: "center",
        top: 20
    },

    pictures: {
        marginTop: "10%",
        alignItems: "center"

    },

    header: {
        marginTop: -30
    }

})