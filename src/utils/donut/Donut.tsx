import {createElementHook, createElementObject, createLeafComponent, createPathHook} from '@react-leaflet/core'
import {CircleProps} from "react-leaflet";
import {LeafletContextInterface} from "@react-leaflet/core/lib/context";
import {Donut as LeafletDonut} from "./L.Donut.js"

interface DonutProps extends CircleProps {
    innerRadius: number
}


function createDonut(props: DonutProps, context: LeafletContextInterface) {

    //@ts-ignore
    return createElementObject(new LeafletDonut(props.center, props), context)
}

function updateSquare(instance: any, props: DonutProps, prevProps: DonutProps) {
    if (props.innerRadius !== prevProps.innerRadius ||
        props.center !== prevProps.center ||
        props.radius !== prevProps.radius) {
        instance.setInnerRadius(props.innerRadius)
    }
}

const useSquareElement = createElementHook(createDonut, updateSquare)
const useSquare = createPathHook(useSquareElement)
export const Donut = createLeafComponent(useSquare)
