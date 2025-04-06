import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { LocationsResult } from "./locationsResult";
import { DataSource } from "./dataSource";
import { LocationCard } from "./locationCard";

export function LocationView(){
    const [loading , setLoading] = useState(false);
    const [page, setPage] = useState<number>(1)
    const [data, setData] = useState<LocationsResult>({
        info:{
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },
        results: [],
    })

    {/* 
    const characters : Character[] = [
        {
            id: number;
            name: string;
            type: string;
            dimension: string;
            residents: string[];
            created: string;
        },
    ];
    */}

    const dataSource = new DataSource();
    
    useEffect(() =>{
        setLoading(true);
        dataSource.getCharacters(page)
        .then((result) => {
            setData(result);
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
                        <TouchableOpacity
                        style={[styles.button, (data.info.prev === null || loading) && styles.buttonDissabled]}
                        onPress={() => {setPage(page - 1)}}
                        disabled={data.info.prev === null  || loading}
                        >
                           <Text style={styles.buttonText}
                            >Atrás</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Página
                            <Text style={styles.text}> {page}</Text>
                            <Text style={styles.text}> de </Text> 
                            <Text style={styles.text}>{data.info.pages}</Text>
                            </Text>
                        <TouchableOpacity
                        style={[styles.button, (data.info.next === null || loading) && styles.buttonDissabled]}
                        onPress={() => {setPage(page + 1)}}
                        disabled={data.info.next === null || loading}
                        >
                            <Text style={styles.buttonText}>Siguiente</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.person}>Locaciones: <Text style={styles.co}>{data.info.count}</Text></Text>

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
            style={styles.flat}
            data={data.results}
            renderItem={({item})=>(
                <LocationCard location={item}/>
            )}
            keyExtractor={item=>item.id.toString()}
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
        marginBottom: 13
    },

    text:{
        color: "white",
        fontSize: 17,
        textAlign: "center",
        fontWeight: "bold"
        
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
        height: 630
    },

    person: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        marginBottom: 10,
        fontWeight: "bold"
    },

    co:{
        color: "#05161A",
        fontWeight: "bold"
    },

    buttonDissabled:{
        backgroundColor: "#05161A"
    }
})