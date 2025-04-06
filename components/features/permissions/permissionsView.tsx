import { StyleSheet, Text, View } from "react-native";
import { CameraPermission } from "./camaraPermission";
import { GalleryPermission } from "./galleryPermission";
import { MicPermission } from "./micPermission";
import { GpsPermission } from "./gpsPermission";
import { ContactsPermission } from "./contactsPermission";
import { CalendarPermission } from "./calendarPermission";

export function PermissionsView(){
    
    return(
        <View style={style.container}>
            <Text style={style.tittle}>Permisos</Text>
            <View>

            <CameraPermission/>
            <GalleryPermission/>
            <MicPermission/>
            <GpsPermission/>
            <ContactsPermission/>
            <CalendarPermission/>

            
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingHorizontal: 16,
    },

    tittle: {
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 20
    }
})