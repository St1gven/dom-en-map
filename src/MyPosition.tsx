import React, {RefObject} from "react";
import {Circle, LayerGroup, LayersControl, Marker} from "react-leaflet";
import {Control, LatLng, LeafletEvent} from "leaflet";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

interface MyPositionState {
    position: GeolocationPosition | null
    leader: boolean

}

interface MyPositionProps {
    cookies: Cookies
}

class MyPosition extends React.Component<MyPositionProps, MyPositionState> {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    checkbox: HTMLInputElement | null
    ws: WebSocket | null
    // @ts-ignore
    layerRef: RefObject<LayerGroup<any>>
    controlRef: Control.Layers | null
    readonly leaderLabel = "Make me a leader"

    readonly options: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
    };

    constructor(props: MyPositionProps) {
        super(props);
        this.state = {
            position: { //todo remove
                coords: {
                    latitude: 53.200513,
                    longitude: 50.193183,
                    accuracy: 20,
                    altitude: null,
                    heading: null,
                    speed: null,
                    altitudeAccuracy: null
                },
                timestamp: 1687615933859
            },
            leader: this.props.cookies.get("leader") || false
        }
        this.ws = null
        this.checkbox = null
        this.layerRef = React.createRef()
        this.controlRef = null
    }

    errors = (err: GeolocationPositionError) => {
        console.warn(`ERROR(${err.code}): ${err.message}`); //todo
    }

    connectWs = () => {
        const ws:WebSocket = new WebSocket("ws://localhost:8080/users/1")
        ws.onclose = (event: CloseEvent) => {
            if (event.code === 1000 || event.code >= 4000) {
                const {cookies} = this.props;
                cookies.remove("leader");
                this.setState({
                    position: this.state.position,
                    leader: false
                })
                this.ws = null;
            } else { //todo error code??
                this.ws = null
                setTimeout(this.connectWs, 1000); //todo interval
            }
        }
        ws.onopen = (event: Event) => {
            this.ws = ws;
        }
        ws.onerror = (event: Event) => {
            this.ws = null
            setTimeout(this.connectWs, 1000); //todo interval
        }
    }

    sendCords = (cords: Array<number>) => {
        if(this.ws) {
            this.ws?.send(JSON.stringify(cords))
        }
    }

    becomeLeader = (event: LeafletEvent) => {
        const {cookies} = this.props;
        cookies.set("leader", true);
        this.connectWs()
        this.setState({
            position: this.state.position,
            leader: true
        })
    }

    leaveLeader = (event: LeafletEvent) => {
        const {cookies} = this.props;
        cookies.remove("leader");
        if (this.ws) {
            this.ws?.close(1000, "User leave leader position")
            this.ws = null
        }
    }

    success = (pos: GeolocationPosition) => {
        //if (this.state.leader) { //todo
            this.setState({
                position: pos
            })
        if (this.state.leader) {
            this.sendCords([pos.coords.latitude, pos.coords.longitude])
        }
    }

    componentDidMount() {
        if (this.state.leader) {
            this.connectWs()
        }
        if (navigator.geolocation) {
            navigator.permissions
                .query({name: "geolocation"})
                .then((result) => {
                    if (result.state === "granted") {
                        //navigator.geolocation.watchPosition(this.success, this.errors, this.options);
                    } else if (result.state === "prompt") {
                        //navigator.geolocation.watchPosition(this.success, this.errors, this.options);
                    } else if (result.state === "denied") {
                        console.log(result.state);
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            alert("Sorry Not available!");
        }
        setInterval(() => {
            if (this.state.position) {
                let pos: GeolocationPosition = {
                    coords: {
                        latitude: this.state.position.coords.latitude,
                        longitude: this.state.position.coords.longitude + 0.0001,
                        accuracy: this.state.position.coords.accuracy,
                        altitude: null,
                        heading: null,
                        speed: null,
                        altitudeAccuracy: null
                    },
                    timestamp: Date.now()
                }
                this.success(pos)
            }
        }, 100)
        /*setTimeout(() => setInterval(() => {
            if (this.state.position) {
                let pos: GeolocationPosition = {
                    coords: {
                        latitude: this.state.position.coords.latitude + 0.0001,
                        longitude: this.state.position.coords.longitude,
                        accuracy: this.state.position.coords.accuracy,
                        altitude: null,
                        heading: null,
                        speed: null,
                        altitudeAccuracy: null
                    },
                    timestamp: Date.now()
                }
                this.success(pos)
            }
        }, 2000), 1000)*/
    }

    componentWillUnmount() {
        this.ws?.close()
    }

    render() {
        let pos = this.state.position ?
            <LayerGroup eventHandlers={{add: this.becomeLeader, remove: this.leaveLeader}}>
                <Circle
                    center={new LatLng(this.state.position.coords.latitude, this.state.position.coords.longitude)}
                    radius={this.state.position.coords.accuracy} className="myposition"/>
                <Marker
                    position={new LatLng(this.state.position.coords.latitude, this.state.position.coords.longitude)}/>
            </LayerGroup> :
            <LayerGroup/>

        return <LayersControl position="topright" collapsed={false} >
            <LayersControl.Overlay name={this.leaderLabel}
                                   checked={this.state.leader}>
                {pos}
            </LayersControl.Overlay>
        </LayersControl>
    }
}

export default withCookies(MyPosition);