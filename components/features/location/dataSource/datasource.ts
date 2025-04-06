import { collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";
import { firebase_db } from "@/lib/firebase";
import { Location } from "../entities/location";

export class DataSource {
    
    async save(location: Location) {
        try {
            await addDoc(collection(firebase_db, "locations"), location);
            console.log("Ubicación guardada en Firestore");
        } catch (error) {
            console.error("Error al guardar la ubicación:", error);
            throw error;
        }
    }

    async list(): Promise<Location[]> {
        try {
            const locationCollect = collection(firebase_db, "locations");
            const q = query(locationCollect, orderBy("timestamp","desc"), limit(15));
            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    timestamp: data.timestamp
                } as Location;
            });
        } catch (error) {
            console.error("Error al obtener ubicaciones:", error);
            throw error;
        }
    }
}
