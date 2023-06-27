import React, {ReactElement, RefObject, useEffect, useState} from "react";
import {TeamMarker} from "./TeamMarker";
import {create, Team} from "./model/teams";
import {$teams, update} from "./model/teams";
import {useList} from "effector-react";
export interface TeamMarkerHandler {

    team: Team
    ref: RefObject<typeof TeamMarker> | null
    marker: ReactElement<typeof TeamMarker>
}

export default function TeamMarkers() {
    console.log("TeamMarkers()")
    let ws: WebSocket | null = null
/*    const buildMarkerHandler = (team: Team): TeamMarkerHandler => {
        const ref = React.createRef()
        return {
            team: team,
            ref: null,
            marker: <TeamMarker key={team.name} ref={ref} team={team}/>
        }
    }*/

    const connectWs = () => {
        const newWS: WebSocket = new WebSocket("ws://localhost:8080/teams/test")
        newWS.onmessage = (event) => {
            console.log("message", event.data)
            const data = JSON.parse(event.data)
            if (Array.isArray(data)) {
                create(data)
                //setTeams(new Map((data as Team[]).map(obj => [obj.name, buildMarkerHandler(obj)])))
            } else {
                update(data)
                // const team: TeamMarkerHandler | undefined = teams.get(data.name)
                // if (team) {
                //     team.ref.current?.setState(data)
                // } else {
                //     update(data)
                //     setTeams(teams.set(data.name, buildMarkerHandler(data)))
                // }
            }
        }
        newWS.onopen = (event: Event) => {
            //console.log('connected')
            ws = newWS
            ws.send("_ready_")
        }
        newWS.onclose = (event: CloseEvent) => {
            if (event.code !== 1000 && event.code < 4000) {
                ws = null
                setTimeout(check, 1000); //todo interval
            }
        }
        newWS.onerror = (event: Event) => {
            ws = null
            setTimeout(check, 1000); //todo interval
        }
    }

    const check = () => {
        if (!ws || ws.readyState === WebSocket.CLOSED) connectWs();
    };

    useEffect( () => {
        console.log("rendered")
        connectWs()
        return () => {
            ws?.close()
        }
    });

    return useList($teams, (team: Team) => (
        <TeamMarker key={team.name} team={team}/>
    ));
}