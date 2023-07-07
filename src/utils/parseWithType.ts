export interface WithType {
    type: string
}


export default function parseWithType<Type extends WithType>(type: string) {
    const helps = document.getElementById("ordinary_helps") as HTMLDivElement
    const pItems = helps ? Array.from(helps.getElementsByTagName("p")) : []
    const bonuses = document.getElementById("bonuses") as HTMLDivElement
    if (bonuses) {
        pItems.push(...bonuses.getElementsByTagName("p"))
    }

    return Array.from(pItems).map((item: HTMLParagraphElement) => {

        if (item.innerText) {

            const arr = item.innerText.split(/\n|(?<=})\s*(?={)/)
            return arr.map((text) => {
                try {
                    const itemWithType = JSON.parse(text) as WithType
                    if (itemWithType.type === type) {
                        return itemWithType as Type
                    }
                } catch (e) {
                    console.log("Failed to parse '", text, "'", e)
                }
                return null
            })
        }
        return []
    }).flat().filter((element): element is Type => !!element)
}