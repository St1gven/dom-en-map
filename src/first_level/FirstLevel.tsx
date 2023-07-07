import {Button, Stack} from "@mui/material";

export default function FirstLevel() {

    const submitAnswer = (val: string) => {

        if (val) {
            const answer = document.getElementById("Answer") as HTMLInputElement
            answer.value = val
            const form = answer.parentElement as HTMLFormElement
            form.submit()
        }
    }

    const submitYes = () => {
        submitAnswer("OH YEAH")
    }

    const submitNo = () => {
        submitAnswer("Oh,No!")
    }

    const replacePage = () => {
        // eslint-disable-next-line import/no-webpack-loader-syntax
        const __html = require('raw-loader!./final.html');
        const t = document.getElementsByClassName("timer")[0] as HTMLElement
        t.style.display = "none"
        document.write(__html.default)
        document.body.appendChild(t)
        document.body.setAttribute("background", "https://cdn.endata.cx/images/v2/en/old/mainframe.gif")
    }

    const incorrectList = document.getElementsByClassName("color_incorrect") as HTMLCollectionOf<HTMLSpanElement>
    for (const incorrect of incorrectList) {
        if (incorrect.textContent?.trim() === "Oh,No!") {
            replacePage()
        }
    }

    let foundCorrect = false
    const correctList = document.getElementsByClassName("color_bonus") as HTMLCollectionOf<HTMLSpanElement>
    for (const correct of correctList) {
        if (correct.textContent?.trim() === "OH YEAH") {
            foundCorrect = true
        }
    }
    return !foundCorrect ? <Stack direction="row" gap={2}>
        <Button variant="outlined" onClick={submitYes}>
            Да
        </Button>
        <Button variant="outlined" onClick={submitNo}>
            Нет
        </Button>
    </Stack> : null

}