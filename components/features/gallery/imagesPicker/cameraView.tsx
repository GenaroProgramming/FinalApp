import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 *  Componente para tomar foto
 * @returns 
 */

type Props = {
    onCancel: ()=> void;
    onTakePicture: (uri?: string) => void;
}

export function CameraComponent(
    { onCancel, onTakePicture }: Props
) {
    const [facing, setFacing] = useState<CameraType>('back');
    const ref = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const TakePicture = async () => {
        const photo = await ref.current?.takePictureAsync();
        //enviar la imagen al componente padre
        onTakePicture(photo?.uri)
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={ref}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Ionicons name="camera-reverse-outline" size={44} color="white" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.button} onPress={TakePicture}>
                        <MaterialIcons name="camera" size={64} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                    onPress={()=> onCancel()}>
                    <Feather name="x" size={44} color="white" />
                    </TouchableOpacity>
        
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
        gap: 40
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    row:{
        flexDirection: "row"
    }
});
