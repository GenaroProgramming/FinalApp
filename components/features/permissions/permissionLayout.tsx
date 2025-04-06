import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { green } from "react-native-reanimated/lib/typescript/Colors";


type Props = {
    icon: any,
    tittle: string,
    granted: boolean,
    requestPermission: () => void,
}

export function PermissionLayout({ icon, tittle, granted, requestPermission}: Props){
    return(
        <View style={style.root}>
            <Ionicons name={icon} size={32}/>

            <Text style={style.tittle}>{tittle}</Text>

            {granted ?(
                <Ionicons style={style.icon} name={"checkmark-outline"} size={40} color="green"/>
            ):(
                <TouchableOpacity
                style={style.button}
                onPress={() => requestPermission()}>
                    <Text style={style.buttonText}>Autorizar</Text>
                </TouchableOpacity>
            )
            }
        </View>
    )
}

const style = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        marginTop: 20

    },

    tittle: {
        fontSize: 16,
        fontWeight: "bold",
        width: "60%"
    },

    button:{
        backgroundColor: "#007BFF",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    buttonText: {
        color: "white",
        fontWeight: 600,
    },

    icon:{
        paddingLeft: "7%"
    }
});