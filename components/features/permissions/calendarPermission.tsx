import { useCalendarPermissions } from "expo-calendar";
import { PermissionLayout } from "./permissionLayout";

export function CalendarPermission(){
    const [permission, requestPermission] = useCalendarPermissions();

    return(
        <PermissionLayout
            icon="calendar-outline"
            tittle="Calendario"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    )
}