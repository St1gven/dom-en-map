import React, {useEffect} from "react";
import {ItemMarker} from "./ItemMarker";
import {useList, useStore} from "effector-react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {$items, $sectors, create, Item, Sector} from "./items";

export default function ItemMarkers() {

    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:8080/items", {
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
                //update(data)
            }
        }
    }, [lastMessage]);

    return useList($items, (item: Item, key:number) => {
        return <ItemMarker key={key} item={item}/>
    });
}