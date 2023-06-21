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
        this.setState({
            teams: []
        })
    }

    componentDidMount() {
        fetch("http://localhost:8080/hello")
            .then(response => response.json())
            .then(response => this.setState({
                teams: response
            }))
            .catch(error => {
                console.log(error);
                this.setState({
                    teams: []
                })
            });
    }

    render() {
        const globalMess = (document.querySelector('.globalmess')?.childNodes[3])?.textContent;
        let teamCords: TeamCords[] = [];
        if (globalMess != null) {
            teamCords = JSON.parse(globalMess) as TeamCords[];
        }

        return teamCords.map( (teamCord, index) => {
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

export function TeamMarkers2() {

    /* const globalMess = (document.querySelector('.globalmess')?.childNodes[3])?.textContent;
 let teamCords: TeamCords[] = [];
 if (globalMess != null) {
     teamCords = JSON.parse(globalMess) as TeamCords[];
 }*/
    const [apiResponse, setApiResponse] = useState([] as TeamCords[]);

    const callRestApi = async () => {
        const response = await fetch("http://localhost:8080/hello");
        return await response.json() as TeamCords[];
    };

    useEffect(() => {
        callRestApi().then(result => setApiResponse(result));
    }, []);

    return apiResponse.map((teamCord, index) => {
        return <React.Fragment>
            <ImageOverlay key={index}
        interactive={true}
        className={"team"}
        url={teamCord.flag}
        bounds={new LatLng(teamCord.cords[0], teamCord.cords[1]).toBounds(300)}>
        <Tooltip content={teamCord.name}></Tooltip>
            </ImageOverlay>
            </React.Fragment>
    });
}