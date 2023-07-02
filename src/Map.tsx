import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import MyPosition from "./position/MyPosition";
import 'leaflet/dist/leaflet.css'
import ItemPopup from "./items/ItemPopup";
import {createTheme, ThemeProvider} from "@mui/material";
import FromPageItemMarkers from "./items/FromPageItemMarkers";
import MenuPlaceholder from "./menu/MenuPlaceholder";
import InventoryPopup from "./menu/InventoryPopup";
import TaskPopup from "./menu/TaskPopup";

export default function Map() {

    //const gameInfo = useGameInfo()

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    //if (gameInfo) {
    return <ThemeProvider theme={darkTheme}>
        <div style={{
            position: 'relative',
        }}>
            <MapContainer center={[53.200513, 50.197183]} zoom={13}>
                <TileLayer
                    attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/*<TeamMarkers gameInfo={gameInfo}/>*/}
                <FromPageItemMarkers/>
                <MyPosition/>
            </MapContainer>
            <ItemPopup/>
            <MenuPlaceholder/>
            <InventoryPopup />
            <TaskPopup />
        </div>
    </ThemeProvider>

    // } else {
    //     return <CircularProgress/>
    // }
}