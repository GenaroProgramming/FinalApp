import { useEffect, useRef, useState } from "react";
import {Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { DataSource } from "./dataSource/datasource";
import { Location } from "./entities/location";

export function HistoryLocationView() {
    const dataSource = new DataSource();
    const [locations,setLocations] = useState<Location[]>([]);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const results = await dataSource.list();
                setLocations(results);
            } catch (error) {
                Alert.alert("Error", "Error al obtener datos");
            }
    };
    
            fetchLocations();
        }, []);

    useEffect(()=>{
        async function showLocation(){
            if(locations.length){
                const camera = await (mapRef?.current as any).getCamera();
                camera.center = {
                    latitude: locations[0].latitude,
                    longitude: locations[0].longitude
                };
                (mapRef?.current as any).animateCamera(camera, {duration: 1000});
            }
        }
        showLocation();
    }, [locations]);

    return (
        <View style={styles.container}>
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
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '110%',
        marginBottom:80,
        overflow: 'hidden',
    },
});