import { useForegroundPermissions } from "expo-location";
import { PermissionLayout } from "./permissionLayout";

export function GpsPermission(){

    const [permission, requestPermission] = useForegroundPermissions();

    return(
        <PermissionLayout
            icon="locate-outline"
            tittle="GPS"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}