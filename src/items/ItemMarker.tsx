import React, {useEffect} from "react";
import {Circle, ImageOverlay, SVGOverlay} from "react-leaflet";
import {LatLng, LeafletMouseEvent} from "leaflet";
import {Item, select} from "./items";
import {useCookies} from "react-cookie";
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

export function ItemMarker(props: { item: Item }) {

    const [cookies, setCookie] = useCookies(["selectedItem"]);

    const onClick = (event: LeafletMouseEvent) => {
        select(props.item)
        setCookie('selectedItem', props.item.name)
    }

    useEffect(() => {
        const selectedItem = cookies.selectedItem
        if (selectedItem === props.item.name) {
            select(props.item)
        }
    }, [cookies.selectedItem, props.item])

    if (props.item.url) {
        return <ImageOverlay className="item"
                          eventHandlers={{click: onClick}}
                          interactive={true}
                          url={props.item.url}
                          bounds={new LatLng(props.item.coords[0], props.item.coords[1]).toBounds(300)}>
                <Circle weight={2} fillColor="none" color="green" center={new LatLng(props.item.coords[0], props.item.coords[1])} radius={150} />
            </ImageOverlay>
    } else {
        return <SVGOverlay className="item"
                           interactive={true}
                           eventHandlers={{click: onClick}}
                           bounds={new LatLng(props.item.coords[0], props.item.coords[1]).toBounds(300)}>
            {props.item.type === "answer" ? <CheckCircleOutlineRoundedIcon/> : <HelpOutlineRoundedIcon/> }
        </SVGOverlay>
    }


}