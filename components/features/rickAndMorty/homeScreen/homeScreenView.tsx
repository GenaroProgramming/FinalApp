import { Link, router } from "expo-router"
import { useState } from "react"
import { Alert, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export function HomeScreenView(){

    const [modalVisible, setModalVisible] = useState(false);
   
    return(
        <View style={style.fondo}>
            <View style={style.navbar}>
                <Text style={style.title}>La API de Rick y Morty</Text>
            </View>
            <Image style={style.image}
            source={require("../../assets/RickAndMorty/Temp3.jpg")}/>
            <View>
                <TouchableOpacity style={style.button2}
                onPress={()=>{router.push("/(characters)")}}>
                    <Text style={style.button2Text}>Personajes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.button2}
                onPress={()=>{router.push("/(episodes)")}}>
                    <Text style={style.button2Text}>Episodios</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.button2}
                onPress={()=>{router.push("/(location)")}}>
                    <Text style={style.button2Text}>Ubicación</Text>
                </TouchableOpacity>

                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={()=>{
                    Alert.alert("modal Cerrado");
                    setModalVisible(!modalVisible);
                }}>
                    <View style={style.Modal}>
                        <Text style={style.titu}>Creado Por</Text>
                        <Text style={style.titutu}>Genaro Alfredo Silva Espinoza</Text>
                        <Text style={style.titutu}>5A DSM</Text>

                        <TouchableOpacity
                        style={style.buttonModal}
                        onPress={()=>{setModalVisible(false)
                        }}>
                            <Text style={style.button2Text}>Cerrar</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
                
                <TouchableOpacity style={style.button2}
                onPress={()=>setModalVisible(true)}>
                    <Text style={style.button2Text}>Acerca de</Text>
                </TouchableOpacity>

            </View> 
        </View>
    )
}

const style = StyleSheet.create({
    fondo: {
        width: "100%",
        height: "100%",
        marginTop: 0,
        padding: 15,
        backgroundColor: "#0C7075",
    },

    image:{
        width: "70%",
        height: "50%",
        marginLeft: "15%",
        
    },

    navbar:{
        backgroundColor: "#072E33",
        width: "100%",
        height: 65,
        borderRadius: 12,
        display: "flex",
        position:"fixed",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        marginBottom: 13,
    },

    title:{
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginLeft: "15%"
    },

    button: {
        backgroundColor: "white",
        width: "50%",
        height: "auto"
    },

    button2:{
        backgroundColor:"#6DA5C0",
        borderRadius:12,
        height:40,
        width:140,
        marginTop:15,
        marginLeft: "30%"
    },

    button2Text:{
        textAlign:"center",
        marginTop:10,
        fontFamily: "Arial",
        fontSize:18,
        fontWeight:"300",
    },

    Modal:{
        width: "70%",
        height: "33%",
        backgroundColor: "#072E33",
        alignItems:"center",
        marginTop: "90%",
        marginLeft: "15%",
        borderRadius: 12
    },

    titu:{
        color:"white",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: "15%"
    },

    titutu:{
        color:"white",
        fontWeight: "bold",
        fontSize: 30,
    },
    buttonModal:{
        backgroundColor:"#6DA5C0",
        borderRadius:12,
        height:40,
        width:140,
        marginTop:15,
    }

})
