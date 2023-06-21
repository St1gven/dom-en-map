import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {MapContainer, TileLayer} from 'react-leaflet'
import {TeamMarkers} from "./TeamMarkers";

const root = ReactDOM.createRoot(
    document.getElementById('map') as HTMLElement
);




root.render(
    <React.StrictMode>
        <MapContainer center={[53.200513, 50.163183]} zoom={13}>
            <TileLayer
                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TeamMarkers/>
        </MapContainer>
    </React.StrictMode>
);
