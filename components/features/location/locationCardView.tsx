import { useEffect, useState } from "react";
import { DataSource } from "./dataSource/datasource";
import { Location } from "./entities/location";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export function LocationCardView() {
    const dataSource = new DataSource();
    const [ locations, setLocations ] = useState<Location[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLocations(await dataSource.list());
            } catch (error) {
                Alert.alert("Error", "Error al obtener datos");
            }
        };
        fetchLocations();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Ubicaciones</Text>
            <FlatList
                data={locations}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Punto de Ubicación</Text>
                        <View style={styles.divider} />
                        <View style={styles.detailsLocation}>
                            <View style={styles.row}>
                                <Text style={styles.detailsText}>Latitud:</Text>
                                <Text style={styles.value}>{item.latitude.toFixed(6)}°</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.detailsText}>Longitud:</Text>
                                <Text style={styles.value}>{item.longitude.toFixed(6)}°</Text>
                            </View>
                            <View style={styles.dateRow}>
                                <Ionicons name="time-outline" size={16} color="#666" />
                                <Text style={styles.dateText}>{item.timestamp.toDate().toLocaleString()}</Text>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#F5F7FA", 
        paddingHorizontal: 16 
    },
    title: { 
        fontSize: 24, 
        fontWeight: "700", 
        color: "#2C3E50", 
        paddingVertical: 20,
        textAlign:"center"
    },
    listContainer: { 
        paddingBottom: 80 
    },
    card: { 
        backgroundColor: "#FFF", 
        borderRadius: 16, 
        marginBottom: 16, 
        padding: 16, 
        elevation: 3, 
        shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 2 
        }, 
        shadowOpacity: 0.1, 
        shadowRadius: 8 
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: "600", 
        color: "#2C3E50", 
        marginBottom: 12,
        textAlign: "center"
    },
    divider: { 
        height: 1, 
        backgroundColor: "#E0E6ED", 
        marginBottom: 8 
    },
    detailsLocation: { 
        gap: 8 
    },
    row: { 
        flexDirection: 'row',
        alignItems: 'center' 
    },
    detailsText: { 
        fontSize: 15, 
        color: "#666", 
        fontWeight: "500" 
    },
    value: { 
        fontSize: 15, 
        color: "#2C3E50", 
        fontWeight: "600" 
    },
    dateRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6, 
        paddingTop: 8, 
        borderTopWidth: 1, 
        borderTopColor: "#E0E6ED" 
    },
    dateText: { 
        fontSize: 14, 
        color: "#666" 
    }
});
