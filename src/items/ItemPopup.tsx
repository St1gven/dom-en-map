import {useStore} from "effector-react";
import {$selected, close, Item} from "./items";
import {Button, IconButton, Input, Link, Stack, Typography} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PublishIcon from '@mui/icons-material/Publish';
import React, {useRef} from "react";
import {$position} from "../position/position";
import {getDistance} from "geolib";
import CloseablePopup from "../utils/CloseablePopup";
import InventoryIcon from "@mui/icons-material/Inventory";
import {openInventory} from "../menu/menu";

export default function ItemPopup() {

    const item: Item | null = useStore($selected)
    const position: GeolocationCoordinates | null = useStore($position)
    const inputRef = useRef<HTMLInputElement>()

    const submitAnswer = () => {
        const val = inputRef.current?.value

        if (val) {
            const answer = document.getElementById("Answer") as HTMLInputElement
            answer.value = val
            const form = answer.parentElement as HTMLFormElement
            form.submit()
        }
    }

    const goToInventory = () => {
        close()
        openInventory()
    }

    if (item) {
        const copyTextToClipboard = async () => {
            const text: string = `${item.coords[0]}, ${item.coords[1]}`
            if ('clipboard' in navigator) {
                return await navigator.clipboard.writeText(text);
            } else {
                return document.execCommand('copy', true, text);
            }
        }

        const isCorrect = () => {
            return item.type === 'answer'
        }

        if (position) {
            const distance = getDistance(position, {
                latitude: item.coords[0],
                longitude: item.coords[1]
            });
            const distanceReached = distance < 20
            //todo android href
            const coordsLink = <React.Fragment>
                <Link style={{verticalAlign: "bottom"}}
                      href={`https://yandex.ru/maps/?text=${item.coords[0]},${item.coords[1]}`} underline="hover"
                      target="_blank"
                      rel="noopener noreferrer">
                    {item.coords[0]}, {item.coords[1]}
                </Link>
                <IconButton style={{padding: "0px 0px 0px 5px"}} size="small" aria-label="copy"
                            onClick={copyTextToClipboard}><ContentCopyIcon/></IconButton>
            </React.Fragment>

            return <CloseablePopup title={item.name}
                                   subheader={!isCorrect()  ? coordsLink : null}
                                   onClose={close}
                                   avatar={<img src={item.url} alt={item.name}/>}>
                {isCorrect() ? <React.Fragment>
                    <Typography>{item.task}</Typography>
                    {item.inventory ?<Button variant="outlined" startIcon={<InventoryIcon />} onClick={goToInventory}>
                        Инвентарь
                    </Button>: null }
                </React.Fragment> : null}
                {distanceReached && !isCorrect()  ? <Stack>
                        <Typography>{item.task}</Typography>
                        <Typography><span style={{color: "yellow"}}>Примечание:</span> {item.note}</Typography>
                    </Stack>
                    : null}
                {!isCorrect()  ? <Stack direction="row">
                    <Input inputRef={inputRef} fullWidth placeholder="Введите ответ" type="text"/>
                    <IconButton onClick={submitAnswer}><PublishIcon/></IconButton>
                </Stack> : null}
            </CloseablePopup>
        }
    }
    return null
}