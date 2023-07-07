import React, {useEffect} from "react";
import {ItemMarker} from "./ItemMarker";
import {useList} from "effector-react";
import {$items, create, createSectors, Item, Sector} from "./items";
import parseWithType from "../utils/parseWithType";

export default function FromPageItemMarkers() {

    useEffect(() => {
        const items: Item[] = parseWithType("sector")
        const answers: Item[] = parseWithType("answer")
        const removeAnswers = [] as number[]
        const finalItems = items.map(item => {
            const ind = answers.findIndex((answer) => answer.name === item.name)
            if (ind > -1) {
                const answer = answers[ind]
                removeAnswers.push(ind)
                if (!answer.coords) {
                    answer.coords = item.coords
                }
                if (!answer.url) {
                    answer.url = item.url
                }
                return answer
            }
            return item
        })

        finalItems.push(...answers.filter( (answer, index) => !removeAnswers.includes(index)))
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