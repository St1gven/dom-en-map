import React, {useEffect, useState} from "react";
import {ImageOverlay, Tooltip} from "react-leaflet";
import {LatLng} from "leaflet";
import {Team} from "./model/teams";

export function TeamMarker(props: { team: Team }) {

    const [teamState, setTeam] = useState(props.team)
    useEffect(() => {
        console.log("rendered")
    })

    return <ImageOverlay key={teamState.name}
                         interactive={true}
                         className={"team"}
                         url={teamState.flag}
                         bounds={new LatLng(teamState.cords[0], teamState.cords[1]).toBounds(300)}>
        <Tooltip content={teamState.name}></Tooltip>
    </ImageOverlay>
}