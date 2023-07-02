import React from "react";
import {ImageOverlay, Tooltip} from "react-leaflet";
import {LatLng, LeafletMouseEvent} from "leaflet";
import {Team} from "./teams";

export function TeamMarker(props: { team: Team, yours: boolean }) {

    const onClick = (event: LeafletMouseEvent) => {
        console.log('team clicked', props.team.name)
    }

    return <ImageOverlay eventHandlers={{click: onClick}}
                         key={props.team.name}
                         interactive={true}
                         className={props.yours ? "yourTeam" : "enemyTeam"}
                         url={props.team.flag}
                         bounds={new LatLng(props.team.coords[0], props.team.coords[1]).toBounds(300)}>
        <Tooltip content={props.team.name}></Tooltip>
    </ImageOverlay>
}