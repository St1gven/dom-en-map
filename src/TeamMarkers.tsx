import React, {JSX} from "react";
import {ImageOverlay, Tooltip} from "react-leaflet";
import {LatLng} from "leaflet";

interface TeamCords {

    cords: number[];
    name: string;
    flag: string;
}

type TeamsState = {
    teams: Map<string, TeamCords>
}

export class TeamMarkers extends React.Component<{}, TeamsState> {
    ws: WebSocket
    constructor(props: {}) {
        super(props)
        this.state = {
            teams: new Map<string, TeamCords>()
        }
        this.ws = new WebSocket("ws://localhost:8080/start-websocket/test")
    }


    loadTeams = () => {
        fetch("http://localhost:8080/hello")
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({
                    teams: response
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    teams: new Map<string, TeamCords>()
                })
            });
    }

    componentDidMount() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (Array.isArray(data)) {
                this.setState({
                    teams: new Map(data.map(obj => [obj.name, obj]),)
                })
            } else {
                this.setState({
                    teams: this.state.teams.set(data.name, data)
                })
            }
        }
        this.ws.onopen = (event) => {
            console.log('connected')
            this.ws.send("_ready_")
        }
    }

    componentWillUnmount() {
        this.ws.close()
    }

    render() {
        console.log(this.state.teams)
        let result: JSX.Element[] = []
        this.state.teams.forEach( (teamCord, name ) => {
            result.push(<ImageOverlay key={name}
                                 interactive={true}
                                 className={"team"}
                                 url={teamCord.flag}
                                 bounds={new LatLng(teamCord.cords[0], teamCord.cords[1]).toBounds(300)}>
                <Tooltip content={teamCord.name}></Tooltip>
            </ImageOverlay>)
        });
        return result;
    }
}