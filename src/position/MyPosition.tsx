import React, {useEffect, useState} from "react";
import {Circle, LayerGroup, Marker} from "react-leaflet";
import {Icon, LatLng} from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {update} from "./position";
import {useGeolocated} from "react-geolocated";


export default function MyPosition(props: {/*gameInfo: GameInfo*/}) {

    //const leaderLabel = "Make me a leader"

    //const [cookies, setCookie, removeCookie] = useCookies(["leader"]);

    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    // const [coords] = useState({
    //     latitude: 53.210513,
    //     longitude: 50.207183,
    //     accuracy: 20,
    //     altitude: null,
    //     heading: null,
    //     speed: null,
    //     altitudeAccuracy: null
    // } as GeolocationCoordinates)
    /*const [leader, setLeader] = useState(cookies.leader)

    const becomeLeader = () => {
        setCookie("leader", true)
        setLeader(true)
    }

    const leaveLeader = () => {
        removeCookie("leader")
        setLeader(false)
        //todo disconnect
    }*/

    /*const {sendJsonMessage, readyState} = useWebSocket(`ws://localhost:8080/users/${props.gameInfo.UserId}`, {
        shouldReconnect: (event: CloseEvent) => event.code !== 1000,
        onClose: (event: CloseEvent) => {
            console.log("close", event.code)
            if (event.code === 1000 || event.code >= 4000) {
                leaveLeader()
            }
        },
        reconnectInterval: 1000
    })

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            if (leader) {
                update(coords)
                sendJsonMessage([coords.latitude, coords.longitude])
            }
        }
    }, [leader, coords])*/

    useEffect(() => {
        //if (leader) {
        if (coords) {
            update(coords)
        }
        //}
    }, [coords])


    //todo remove
    /*const [interval, setIinterval] = useState(null as NodeJS.Timer | null)
    useEffect(() => {
        if (!interval) {
            setIinterval(setInterval(() => {
                setCoords((prevCoords) => ({
                    latitude: prevCoords.latitude,
                    longitude: prevCoords.longitude + 0.001,
                    accuracy: prevCoords.accuracy,
                    altitude: null,
                    heading: null,
                    speed: null,
                    altitudeAccuracy: null
                }))
            }, 1000))
        }
        return () => {
            if (interval) {
                clearTimeout(interval)
            }
        }
    }, [leader, coords, interval])*/

    return coords ? <LayerGroup>
            <Circle interactive={false}
                center={new LatLng(coords.latitude, coords.longitude)}
                radius={coords.accuracy} className="myposition"/>
            <Marker interactive={false} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
                    position={new LatLng(coords.latitude, coords.longitude)}/>
        </LayerGroup> : null
        // :<LayerGroup eventHandlers={{add: becomeLeader, remove: leaveLeader}}/>

    // return <LayersControl position="topright" collapsed={false} >
    //     <LayersControl.Overlay name={leaderLabel}
    //                            checked={true}>
    //         {pos}
    //     </LayersControl.Overlay>
    // </LayersControl>
}