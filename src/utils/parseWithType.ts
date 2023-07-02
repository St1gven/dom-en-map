export interface WithType {
    type: string
}


export default function parseWithType<Type extends WithType>(type: string) {
    const helps = document.getElementById("ordinary_helps") as HTMLDivElement
    const pItems = Array.from(helps.getElementsByTagName("p"))
    const bonuses = document.getElementById("bonuses") as HTMLDivElement
    pItems.push(...bonuses.getElementsByTagName("p"))

    return Array.from(pItems).map((item: HTMLParagraphElement) => {

        if (item.innerText) {
            const arr = item.innerText.split(/\n/)
            return arr.map((text) => {
                const itemWithType = JSON.parse(text) as WithType
                if (itemWithType.type === type) {
                    return itemWithType as Type
                }
                return null
            })

        }
        return []
    }).flat().filter((element): element is Type => !!element)
}