import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { DataSource } from "./dataSource/datasource";
import { Timestamp } from "firebase/firestore";
import GLocationHistory from "../../../app/drawer/TabsLocation"


export function LocationView() {
    const dataSource = new DataSource();
    const [permission, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const mapRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        async function getCurrentLocation() {
            if (!permission?.granted) {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log(location);
        }

        getCurrentLocation();
    }, [permission]);

    useEffect(() => {
        async function showLocation() {
            if (location) {
                const camera = await (mapRef?.current as any).getCamera();
                camera.center = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                };
                (mapRef?.current as any).animateCamera(camera, { duration: 2000 });
            }
        }
        showLocation();
    }, [location]);

    useEffect(() => {
        async function saveLocation() {
            if (location) {
                const transformedLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    timestamp: Timestamp.fromDate(new Date()),
                };
                const save = await dataSource.save(transformedLocation);
            }
        }
        saveLocation();
    })

    if (!permission?.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Debes permitir el acceso a la ubicación</Text>
                <Button
                    onPress={requestPermission}
                    title="Permitir Ubicación"
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.locationView}>
                    <View style={styles.coordinateContainer}>
                        <Ionicons name="location" size={20} color="#1E90FF" />
                        <Text style={styles.coordinateText}>Latitud:</Text>
                        <Text style={styles.coordinateValue}>
                            {location?.coords.latitude.toFixed(6)}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.coordinateContainer}>
                        <Text style={styles.coordinateText}>Longitud:</Text>
                        <Text style={styles.coordinateValue}>
                            {location?.coords.longitude.toFixed(6)}
                        </Text>
                    </View>
                </View>
            </View>

            <MapView
                ref={mapRef}
                style={styles.map}
                zoomEnabled
                initialRegion={{
                    latitude: 18.5955558,
                    longitude: -98.4907685,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
            >
                {location ? (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                    />
                ) : null}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffedb6',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    permissionText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    locationView: {
        fontSize: 14,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontWeight: "bold",
        fontSize: 10
    },
    map: {
        width: '100%',
        height: '100%',
    },

    permissionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 16,
    },
    coordinateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    coordinateText: {
        fontSize: 14,
        color: '#666',
    },
    coordinateValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: '#ddd',
        marginHorizontal: 12,
    },
    box: {
        position: 'absolute',
        top: 10,
        left: '5%',
        right: '5%',
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        zIndex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#1E90FF',
        borderRadius: 25,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600",
    },
});