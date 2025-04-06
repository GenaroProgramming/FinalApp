import { useCameraPermissions } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";

export function CameraPermission(){
    
    const [permission, requestPermission] = useCameraPermissions();

    return(
        <PermissionLayout
            icon="camera-outline"
            tittle="Cámara"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}