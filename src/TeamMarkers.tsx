import React, {useEffect, useState} from "react";
import {ImageOverlay, Tooltip} from "react-leaflet";
import {LatLng} from "leaflet";

interface TeamCords {

    cords: number[];
    name: string;
    flag: string;
}

type TeamsState = {
    teams: TeamCords[]
}

export class TeamMarkers extends React.Component<{}, TeamsState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
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
                    teams: []
                })
            });
    }

    render() {

        return this.state.teams.map( (teamCord, index) => {
            return <ImageOverlay key={index}
                                 interactive={true}
                                 className={"team"}
                                 url={teamCord.flag}
                                 bounds={new LatLng(teamCord.cords[0], teamCord.cords[1]).toBounds(300)}>
                <Tooltip content={teamCord.name}></Tooltip>
            </ImageOverlay>
        });
    }
}