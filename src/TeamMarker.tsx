import React, {JSX} from "react";
import {ImageOverlay, Tooltip} from "react-leaflet";
import {LatLng} from "leaflet";
import {TeamCords} from "./TeamMarkers";

interface TeamMarkerProps {
    team: TeamCords
}
export class TeamMarker extends React.Component<TeamMarkerProps, TeamCords> {

    constructor(props: TeamMarkerProps) {
        super(props);
        this.state = this.props.team
    }

    componentDidMount() {
        console.log("TeamMarker mounted")
    }

    render() {
        console.log("Team marker rendered")
        return <ImageOverlay key={this.state.name}
                             interactive={true}
                             className={"team"}
                             url={this.state.flag}
                             bounds={new LatLng(this.state.cords[0], this.state.cords[1]).toBounds(300)}>
            <Tooltip content={this.state.name}></Tooltip>
        </ImageOverlay>
    }
}