import React, {useCallback, useEffect} from "react";
import {TeamMarker} from "./TeamMarker";
import {$teams, create, Team, update} from "./model/teams";
import {useList} from "effector-react";

export default function TeamMarkers() {
    const connectWs = useCallback(() => {
        const ws: WebSocket = new WebSocket("ws://localhost:8080/teams/test")
        const check = () => {
            if (!ws || ws.readyState === WebSocket.CLOSED)  connectWs();
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (Array.isArray(data)) {
                create(data)
            } else {
                update(data)
            }
        }
        ws.onopen = (event: Event) => {
            ws.send("_ready_")
        }
        ws.onclose = (event: CloseEvent) => {
            if (event.code !== 1000 && event.code < 4000) {
              //  setTimeout(check, 1000); //todo interval
            }
        }
        ws.onerror = (event: Event) => {
            //setTimeout(check, 1000); //todo interval and when lose connection
        }
        return ws;
    }, [])

    useEffect(() => {
        const ws = connectWs()
        return () => {
            ws.close()
        }
    }, [connectWs]);

    return useList($teams, (team: Team) => {
        return <TeamMarker key={team.name} team={team}/>
    });
}