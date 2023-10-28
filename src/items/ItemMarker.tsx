import React, {useEffect} from "react";
import {Circle, ImageOverlay, Polygon, SVGOverlay, useMap} from "react-leaflet";
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

    const map = useMap();
    const showTriangle = map.getZoom() > 14
    const triangleSize = 70
    const itemSize = showTriangle ? 250 : 300
    const triangleBounds = new LatLng(props.item.coords[0], props.item.coords[1]).toBounds(triangleSize)
    const largeBounds = new LatLng(props.item.coords[0], props.item.coords[1]).toBounds(itemSize + triangleSize * 1.4)
    const itemCenter = showTriangle ?
        new LatLng(largeBounds.getNorth(), props.item.coords[1]) :
        new LatLng(props.item.coords[0], props.item.coords[1])
    const itemBounds = itemCenter.toBounds(itemSize)

    const triangle = showTriangle ? <Polygon interactive={false} color="black" fillOpacity={1}
                                             positions={[new LatLng(props.item.coords[0], props.item.coords[1]),
                                                 triangleBounds.getNorthWest(),
                                                 triangleBounds.getNorthEast()
                                             ]}/> : null
    if (props.item.url) {
        return <ImageOverlay className="item"
                             eventHandlers={{click: onClick}}
                             interactive={true}
                             url={props.item.url}
                             bounds={itemBounds}>
            <Circle weight={2} fillColor="none" color={props.item.type === "answer" ? "green" : "yellow"}
                    center={itemCenter} radius={itemSize / 2}/>
            {triangle}
        </ImageOverlay>
    } else {
        return <SVGOverlay className="item"
                           interactive={true}
                           eventHandlers={{click: onClick}}
                           bounds={itemBounds}>
            {props.item.type === "answer" ? <CheckCircleOutlineRoundedIcon/> : <HelpOutlineRoundedIcon/>}
            {triangle}
        </SVGOverlay>
    }

}