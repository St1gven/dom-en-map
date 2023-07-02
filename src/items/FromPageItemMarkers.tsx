import React, {useEffect} from "react";
import {ItemMarker} from "./ItemMarker";
import {useList} from "effector-react";
import {$items, create, createSectors, Item, Sector} from "./items";
import parseWithType from "../utils/parseWithType";

export default function FromPageItemMarkers() {

    useEffect(() => {
        const items: Item[] = parseWithType("sector")
        const answers: Item[] = parseWithType("answer")
        const finalItems = items.map(item => {
            const answer = answers.find((answer) => answer.name === item.name)
            if (answer) {
                answer.coords = item.coords
                answer.url = item.url
                return answer
            }
            return item
        })
        create(finalItems)

        const cols = document.getElementsByClassName("cols w100per") as HTMLCollectionOf<HTMLDivElement>
        const children = cols.item(0)?.children
        if (children) {
            const sectors = Array.from(children).map(item => {
                const pItem = item as HTMLParagraphElement
                const text = pItem.textContent
                if (text) {
                    return {
                        name: text.split(":")[0],
                        correct: pItem.getElementsByTagName("span").item(0)?.className === 'color_correct'
                    } as Sector
                } else {
                    return null
                }
            }).filter((sector): sector is Sector => !!sector)
            createSectors(sectors)
        }
    })

    return useList($items, (item: Item, key: number) => <ItemMarker key={key} item={item}/>);
}