import {Avatar, Card, CardContent, CardHeader, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect} from "react";
import {createEvent, createStore} from "effector";

const $opened = createStore(false)
const open = createEvent()
const close = createEvent()
$opened
    .on(close, () => false)
    .on(open, () => true)

interface CloseablePopupProps {
    avatar?: React.ReactNode,
    subheader?: React.ReactNode,
    title: string,
    onClose: () => void
}

//todo close other popups
export default function CloseablePopup(props: React.PropsWithChildren<CloseablePopupProps>) {

    useEffect(() => {
        open()
        return $opened.watch(open, (state, payload) => {
            props.onClose();
        })
    }, [props])

    const closePopup = () => {
        props.onClose()
        close()
    }

    return <Card className="popup" >
        <CardHeader style={{borderBottom: "1px solid"}}
                    avatar={props.avatar ? <Avatar className="popup-avatar">{props.avatar}</Avatar> : null}
                    action={<IconButton aria-label="close" onClick={closePopup}><CloseIcon/></IconButton>}
                    title={props.title}
                    subheader={props.subheader}/>
        <CardContent className="popup-content">
                {props.children}
        </CardContent>
    </Card>
}