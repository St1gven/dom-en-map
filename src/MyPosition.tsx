import React, {useCallback, useEffect, useRef, useState} from "react";
import {Circle, LayerGroup, LayersControl, Marker} from "react-leaflet";
import {Icon, LatLng, LeafletEvent} from "leaflet";
import {useCookies} from "react-cookie";
import markerIconPng from "leaflet/dist/images/marker-icon.png"


export default function MyPosition() {

    const leaderLabel = "Make me a leader"

    const wss = useRef(null as WebSocket | null)

    const [cookies, setCookie, removeCookie] = useCookies(["leader"]);

    /*let {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });*/

    const [coords, setCoords] = useState({
        latitude: 53.200513,
        longitude: 50.193183,
        accuracy: 20,
        altitude: null,
        heading: null,
        speed: null,
        altitudeAccuracy: null
    } as GeolocationCoordinates)
    const [interval, setIinterval] = useState(false)

    const becomeLeader = (event: LeafletEvent) => {
        setCookie("leader", true)
    }

    const leaveLeader = (event: LeafletEvent) => {
        removeCookie("leader")
        if (wss.current) {
            wss.current?.close(1000, "User leave leader position")
            wss.current = null
        }
    }


    useEffect(() => {
        const connectWs = (userId: number) => {
            const ws:WebSocket = new WebSocket(`ws://localhost:8080/users/${userId}`)
            ws.onclose = (event: CloseEvent) => {
                if (event.code === 1000 || event.code >= 4000) {
                    removeCookie("leader")
                    wss.current = null
                } else { //todo error code??
                   // setTimeout(connect, 1000); //todo interval
                }
            }
            ws.onopen = (event: Event) => {
                wss.current = ws
            }
            ws.onerror = (event: Event) => {
                wss.current = null
                //setTimeout(connect, 1000); //todo interval
            }
        }
        const connect = () => {
            fetch("http://localhost:8080/GameEngines/Encounter/Play/{gameId}") //todo gameid
                .then((response) => response.json())
                .then((data) => connectWs(data.UserId as number));
        }
        if (cookies.leader) {
            connect()
        }
    }, [cookies.leader, removeCookie])

    useEffect(() => {
        const sendCords = (cords: Array<number>) => {
            if (wss.current) {
                wss.current?.send(JSON.stringify(cords))
            }
        }
        if (cookies.leader) {
            sendCords([coords.latitude, coords.longitude])
        }
    }, [cookies.leader, coords])

    useEffect(() => {
        if (!interval && cookies.leader) {
            setIinterval(true)
            setInterval(() => {
                if (cookies.leader) {
                    setCoords((prevCoords) => ({
                        latitude: prevCoords.latitude,
                        longitude: prevCoords.longitude + 0.001,
                        accuracy: prevCoords.accuracy,
                        altitude: null,
                        heading: null,
                        speed: null,
                        altitudeAccuracy: null
                    }))
                }
            }, 1000)
        }
    }, [cookies.leader, coords, interval])


    let pos = coords ? <LayerGroup eventHandlers={{add: becomeLeader, remove: leaveLeader}}>
            <Circle
                center={new LatLng(coords.latitude, coords.longitude)}
                radius={coords.accuracy} className="myposition"/>
            <Marker icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
                    position={new LatLng(coords.latitude, coords.longitude)}/>
        </LayerGroup> :
        <LayerGroup eventHandlers={{add: becomeLeader, remove: leaveLeader}}/>

    return <LayersControl position="topright" collapsed={false} >
        <LayersControl.Overlay name={leaderLabel}
                               checked={cookies.leader}>
            {pos}
        </LayersControl.Overlay>
    </LayersControl>
}