import { useEffect, useState } from "react";
import { PermissionLayout } from "./permissionLayout";
import { getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from "expo-contacts";

export function ContactsPermission(){

    // estado para el permiso de contactos
    const [permission, setPermission] = useState<PermissionResponse | undefined>(undefined);

    //funcion para solicitar acceso a contactos
    const requestPermission = () => {
        requestPermissionsAsync()
        .then((result)=> {
            setPermission(result);
        });
    }

    //verificar el status del permiso
    useEffect(() => {
        getPermissionsAsync()
        .then((result) => {
            console.log(result);
            setPermission(result);
        });
    }, []);
    return(
        <PermissionLayout
            icon="person-add-outline"
            tittle="Contactos"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}