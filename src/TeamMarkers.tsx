import React, {ReactElement, RefObject} from "react";
import {TeamMarker} from "./TeamMarker";

export interface TeamCords {

    cords: number[];
    name: string;
    flag: string;
}

export interface TeamMarkerHandler {

    team: TeamCords
    ref: RefObject<TeamMarker>
    marker: ReactElement<TeamMarker>
}

type TeamsState = {
    teams: Map<string, TeamMarkerHandler>
}

export class TeamMarkers extends React.Component<{}, TeamsState> {
    ws: WebSocket | null
    constructor(props: {}) {
        super(props)
        this.state = {
            teams: new Map()
        }
        this.ws = null
    }

    private buildMarkerHandler(team: TeamCords): TeamMarkerHandler {
        const ref: RefObject<TeamMarker> = React.createRef()
        return {
            team: team,
            ref: ref,
            marker: <TeamMarker key={team.name} ref={ref} team={team} />
        }
    }

    connectWs = () => {
        const ws: WebSocket = new WebSocket("ws://localhost:8080/teams/test")
        ws.onmessage = (event) => {
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
        ws.onopen = (event: Event) => {
            //console.log('connected')
            this.ws = ws
            this.ws.send("_ready_")
        }
        ws.onclose = (event: CloseEvent) => {
            if (event.code !== 1000 && event.code < 4000) {
                this.ws = null
                setTimeout(this.connectWs, 1000); //todo interval
            }
        }
        ws.onerror = (event: Event) => {
            this.ws = null
            setTimeout(this.connectWs, 1000); //todo interval
        }
    }

    componentDidMount() {
        this.connectWs()
    }

    componentWillUnmount() {
        this.ws?.close()
    }

    render() {
        const result: ReactElement<TeamMarker>[] = []
        this.state.teams.forEach((teamCord) => {
            if (teamCord.marker != null) {
                result.push(teamCord.marker)
            }
        });
        return result;
    }
}