import { useMicrophonePermissions } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";

export function MicPermission(){
    
    const [permission, requestPermission] = useMicrophonePermissions();
    

    return(
        <PermissionLayout
            icon="mic-outline"
            tittle="Micrófono"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}