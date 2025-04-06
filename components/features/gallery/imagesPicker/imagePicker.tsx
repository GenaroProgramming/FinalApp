/**
 * Componente donde seleccionamos el origen de la imagen
 * Galeria o Camara
 * @returns 
 */
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraComponent } from './cameraView';
import { PhotoPreview } from './photoPreview';
import * as PhotoPicker from 'expo-image-picker';

export function ImagePicker({ onImageSelected }: { onImageSelected: (uri: string) => void }) {
    const [open, setOpen] = useState(false);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [image, setImage] = useState<string | undefined | null>(null)

    const onPictureTaked = (uri?: string) => {
        setCameraOpen(false);
        setImage(uri);
    }

    // Imagen desde la galeria
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await PhotoPicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const uri = result.assets[0].uri
            setImage(uri);
        }
    };

    const onNewPhoto = () => {
        setImage(undefined);
        setCameraOpen(true);

    }

    const onSavePhoto = (uri: string) => {
        onImageSelected(uri);

        //reset del componente
        Alert.alert("foto guardada.");
        setOpen(false);
        setImage(null);
        setCameraOpen(false);
    }


    const renderMenu = (
        <View style={styles.modalContent}>
            <Text style={{fontWeight: "bold", fontSize: 27, marginBottom: "5%"}}>Origen de la imagen</Text>
            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.button, styles.galleryButton]}
                    onPress={pickImage}>
                    <Text style={styles.buttonText}>Galería</Text>
                    <SimpleLineIcons name="picture" size={30} color="white" style={{alignItems:"center"}}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.galleryButton]}
                    onPress={() => setCameraOpen(true)}>
                    <Text style={styles.buttonText}>Cámara</Text>
                    <Ionicons name="camera-outline" size={30} color="white" style={{alignItems:"center"}}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setOpen(false)}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => {
                    setImage(null);
                    setOpen(true);
                }}>
                    <View style={styles.buttonCamara}>
                        <Ionicons
                            name="camera-outline"
                            size={32}
                            color={'white'}
                        />
                    </View>
                </TouchableOpacity>

                <Modal
                    visible={open}
                    transparent={true}
                    animationType='slide'
                >
                    {/* si la camara no esta abierta y tampoco hay image, entonces mostrar el menu */}
                    {!cameraOpen && !image ? renderMenu : null}

                    {cameraOpen ? (
                        <CameraComponent
                            onCancel={() => setCameraOpen(false)}
                            onTakePicture={onPictureTaked} />
                    ) : null}

                    {/* Si hay imagen, mostrar PhotoPreview */}
                    {image ? (
                        <PhotoPreview
                            uri={image}
                            onCancel={() => setImage(undefined)}
                            newPhoto={onNewPhoto}
                            onSave={onSavePhoto} />
                    ) : null}

                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "aqua",
        borderRadius: 15,
        width: "80%",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%",
        marginLeft: "10%"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 20
    },
    textArea: {
        height: 400,
        textAlignVertical: "top",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#f44336",
    },
    galleryButton: {
        backgroundColor: "#228B22",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    row: {
        flexDirection: "row",
        marginTop: 10,
        gap: 20,
        alignItems: "center",
        marginBottom: 10
    },

    buttonCamara: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    }
});
