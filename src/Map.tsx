import React from "react";
import {TeamMarkers} from "./TeamMarkers";
import {MapContainer, TileLayer} from "react-leaflet";
import MyPosition from "./MyPosition";


export class Map extends React.Component {

    render() {
        return <MapContainer center={[53.200513, 50.163183]} zoom={13} >
            <TileLayer
                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TeamMarkers/>
            <MyPosition />
        </MapContainer>
    }
}