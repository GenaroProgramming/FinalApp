import { usePermissions } from "expo-media-library";
import { PermissionLayout } from "./permissionLayout";

export function GalleryPermission(){

    const [permission, requestPermission] = usePermissions();
    return(
        <PermissionLayout
            icon="image-outline"
            tittle="Galeria"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}