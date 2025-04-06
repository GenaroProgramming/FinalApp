import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, FlatList } from "react-native";
import { CharacterCard } from "./characterCard";
import { useEffect, useRef, useState } from "react";
import { CharacterResult } from "./characterResult";
import { DataSource } from "./dataSource";

export function CharactersScrollView(){
    const [loading , setLoading] = useState(false);
    const [page, setPage] = useState<number>(1)
    const [data, setData] = useState<CharacterResult>({
        info:{
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },
        results: [],
    })

    // para referencia el flatlist
    const flatListRef = useRef(null);

    {/* 
    const characters : Character[] = [
        {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            origin: "Tierra",
            location: {
                name: "Tierra",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            species: "Human",
        },
    ];
    */}

    const dataSource = new DataSource();

    const handleEndRached = () => {
        //si no hay pagina siguiente o esta cargando no hacer nada o caso contrario
        //incrementar pagina

        /*
        if(data.info.next || loading){
            return;
        }
        setPage(page + 1)
        */

        //forma 2
        if (data.info.next && !loading){
            setPage(page + 1);
        }
    }
    
    useEffect(() =>{
        setLoading(true);
        dataSource.getCharacters(page)
        .then((result) => {
            //conservsar el estado actual de los personajes
            setData((prevData) => ({
                results: [...prevData.results, ...result.results],
                info: result.info
            }));
        })
        .catch((error) => {
            Alert.alert(`Error: ${error.message}`);
        })
        .finally(() => {
            setLoading(false);
        });
        //toDo catch
    }, [page]);

    return(
        <View style={styles.scrollview}>
            <View style={styles.navbar}>
            <Text style={styles.person}>Personajes: <Text style={styles.co}>{data.results.length} de {data.info.count}</Text></Text>
            </View>
                    

            {loading ?(
                <ActivityIndicator size="large" color="05161A"/>
            ):null}

            {/*loading ? null : data.results.map((item) => (
                <CharacterCard
                key={item.id}
                character={item}
                />
            ))*/}

            <FlatList
            ref={flatListRef}
            style={styles.flat}
            data={data.results}
            renderItem={({item})=>(
                <CharacterCard character={item}/>
            )}
            keyExtractor={item=>item.id.toString()}
            onEndReached={handleEndRached}
            onEndReachedThreshold={0.5}
            refreshing={loading}
            ListFooterComponent={loading ? <ActivityIndicator size="large"/> : undefined}

            />

            {/* 
            {data.results.map((item) => (
                <CharacterCard
                key={item.id}
                character={item}
                />
            ))}
            */}
            
        </View>
    )
}

const styles = StyleSheet.create({
    scrollview:{
        width: "100%",
        marginTop: 0,
        padding: 15,
        backgroundColor:"#0C7075"

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
        alignContent: "center"
    },

    text:{
        color: "white",
        fontSize: 25,
        left: "25%",
        textAlign: "center",
        fontWeight: "bold",
        
    },

    button:{
        backgroundColor: "#6DA5C0",
        width: "27%",
        height:"55%",
        color: "#fff",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10
    },

    buttonText:{
        fontSize: 14,
        color: "white",
        fontWeight: "bold"
    },

    flat:{
        height: 670,
    },

    person: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "bold",
        left: "15%",
        top: 5

    },

    co:{
        color: "#6DA5C0",
        fontWeight: "bold"

    },

    buttonDissabled:{
        backgroundColor: "#05161A"
    }
})