import React from "react";
import {ImageOverlay} from "react-leaflet";
import {LatLng, LeafletMouseEvent} from "leaflet";
import {Item, select} from "./items";

export function ItemMarker(props: { item: Item }) {

    const onClick = (event: LeafletMouseEvent) => {
        select(props.item)
    }
    return <ImageOverlay className="item"
                         eventHandlers={{click: onClick}}
                         interactive={true}
                         url={props.item.url ? props.item.url : 'https://www.svgrepo.com/show/470933/aid.svg'}
                         bounds={new LatLng(props.item.coords[0], props.item.coords[1]).toBounds(300)}>
    </ImageOverlay>
}