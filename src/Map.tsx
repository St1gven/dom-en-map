import React from "react";
import TeamMarkers from "./TeamMarkers";
import {MapContainer, TileLayer} from "react-leaflet";
import MyPosition from "./MyPosition";
import 'leaflet/dist/leaflet.css'

export default function Map() {

    return <MapContainer center={[53.200513, 50.163183]} zoom={13}>
        <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TeamMarkers/>
        <MyPosition/>
    </MapContainer>
}