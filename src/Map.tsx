import React from "react";
import {MapContainer, TileLayer, useMap, useMapEvent, useMapEvents} from "react-leaflet";
import MyPosition from "./position/MyPosition";
import 'leaflet/dist/leaflet.css'
import ItemPopup from "./items/ItemPopup";
import {createTheme, IconButton, ThemeProvider} from "@mui/material";
import FromPageItemMarkers from "./items/FromPageItemMarkers";
import MenuPlaceholder from "./menu/MenuPlaceholder";
import InventoryPopup from "./menu/InventoryPopup";
import TaskPopup from "./menu/TaskPopup";
import {useCookies} from "react-cookie";
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import {useStore} from "effector-react";
import {$position} from "./position/position";
import {LatLng} from "leaflet";

function MapHandler() {

    const [, setCookie] = useCookies(["zoom", "center"]);
    const position = useStore($position)

    const map = useMap()
    useMapEvent("zoom", (event) => {
        setCookie("zoom", map.getZoom())
    })
    useMapEvent("dragend", (event) => {
        setCookie("center", map.getCenter())
    })

    const flyToMyPosition = () => {
        if (position) {
            map.flyTo(new LatLng(position.latitude, position.longitude));
        }
    }

    return position ? <IconButton className="my-location" disableRipple onClick={flyToMyPosition}><MyLocationOutlinedIcon /></IconButton> : null
}

export default function Map() {

    const [cookies] = useCookies(["zoom", "center"]);

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
            <MapContainer center={cookies.center ? cookies.center : [53.200513, 50.197183]}
                          zoom={cookies.zoom ? cookies.zoom : 13}
                          maxZoom={17}>
                <TileLayer
                    attribution='<a href="http://stamen.com">Stamen Design</a> | <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> | &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | st1gven'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
                />
                {/*<TeamMarkers gameInfo={gameInfo}/>*/}
                <FromPageItemMarkers/>
                <MyPosition/>
                <MapHandler/>
            </MapContainer>
            <ItemPopup/>
            <MenuPlaceholder/>
            <InventoryPopup/>

            <TaskPopup/>
        </div>
    </ThemeProvider>

    // } else {
    //     return <CircularProgress/>
    // }
}