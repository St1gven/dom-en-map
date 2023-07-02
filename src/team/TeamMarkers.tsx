import React, {useEffect} from "react";
import {TeamMarker} from "./TeamMarker";
import {$teams, create, Team, update} from "./teams";
import {useList} from "effector-react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {GameInfo} from "../position/gameInfo";

export default function TeamMarkers(props: {gameInfo: GameInfo}) {

    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8080/teams/test", {
        shouldReconnect: (event) => event.code !== 1000,
        reconnectInterval: 1000
    })

    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            sendMessage("_ready_");
        }
    }, [readyState, sendMessage]);


    useEffect(() => {
        if (lastMessage) {
            const data = JSON.parse(lastMessage.data)
            if (Array.isArray(data)) {
                create(data)
            } else {
                update(data)
            }
        }
    }, [lastMessage]);

    return useList($teams, (team: Team) => {
        return <TeamMarker key={team.name} team={team} yours={props.gameInfo.TeamName === team.name} />
    });
}