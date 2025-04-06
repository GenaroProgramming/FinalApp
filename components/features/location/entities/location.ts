import { Timestamp } from "firebase/firestore";

export class Location {
    latitude: number;
    longitude: number;
    timestamp:Timestamp;

    constructor(latitude:number,longitude:number,timestamp:Timestamp){
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
    }
}