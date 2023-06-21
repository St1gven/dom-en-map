import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ImageOverlay, MapContainer, TileLayer, Tooltip} from 'react-leaflet'
import {LatLng} from "leaflet";

const root = ReactDOM.createRoot(
    document.getElementById('map') as HTMLElement
);

interface TeamCords {

    cords: number[];
    name: string;
    flag: string;
}

class TeamMarkers extends React.Component {
    render() {
        const globalMess = (document.querySelector('.globalmess')?.childNodes[3])?.textContent;
        let teamCords: TeamCords[] = [];
        if (globalMess != null) {
            teamCords = JSON.parse(globalMess) as TeamCords[];
        }

        return teamCords.map( (teamCord, index) => {
            return <ImageOverlay key={index}
                                 interactive={true}
                                 className={"team"}
                                 url={teamCord.flag}
                                 bounds={new LatLng(teamCord.cords[0], teamCord.cords[1]).toBounds(300)}>
                <Tooltip content={teamCord.name}></Tooltip>
            </ImageOverlay>
        });
    }
}

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
