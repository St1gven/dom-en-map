import React, {JSX, Ref, RefObject} from "react";
import {ImageOverlay, Tooltip} from "react-leaflet";
import {LatLng} from "leaflet";
import {TeamMarker} from "./TeamMarker";

export interface TeamCords {

    cords: number[];
    name: string;
    flag: string;

}

export interface TeamMarkerHandler {

    team: TeamCords
    ref: RefObject<TeamMarker>

    marker: JSX.Element
}

type TeamsState = {
    teams: Map<string, TeamMarkerHandler>
}

export class TeamMarkers extends React.Component<{}, TeamsState> {
    ws: WebSocket
    constructor(props: {}) {
        super(props)
        this.state = {
            teams: new Map()
        }
        this.ws = new WebSocket("ws://localhost:8080/start-websocket/test")
    }

    private buildMarkerHandler(team: TeamCords): TeamMarkerHandler {
        const ref: RefObject<TeamMarker> = React.createRef()
        return {
            team: team,
            ref: ref,
            marker: <TeamMarker key={team.name} ref={ref} team={team}></TeamMarker>
        }
    }

    componentDidMount() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (Array.isArray(data)) {
                this.setState({
                    teams: new Map((data as TeamCords[]).map(obj => [obj.name, this.buildMarkerHandler(obj)]),)
                })
            } else {
                const team: TeamMarkerHandler | undefined = this.state.teams.get(data.name)
                if (team) {
                    team.ref.current?.setState(data)
                } else {
                    this.setState({
                       teams: this.state.teams.set(data.name, this.buildMarkerHandler(data))
                    })
                }

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
        let result: JSX.Element[] = []
        this.state.teams.forEach( (teamCord) => {
            if (teamCord.marker != null) {
                result.push(teamCord.marker)
            }
        });
        return result;
    }
}