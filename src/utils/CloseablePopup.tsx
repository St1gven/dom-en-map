import {Avatar, Card, CardContent, CardHeader, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

interface CloseablePopupProps {
    avatar?: React.ReactNode,
    subheader?: React.ReactNode,
    title: string,
    onClose: () => void
}

//todo close other popups
export default function CloseablePopup(props: React.PropsWithChildren<CloseablePopupProps>) {
    return <Card className="popup" >
        <CardHeader style={{borderBottom: "1px solid"}}
                    avatar={props.avatar ? <Avatar className="popup-avatar">{props.avatar}</Avatar> : null}
                    action={<IconButton aria-label="close" onClick={props.onClose}><CloseIcon/></IconButton>}
                    title={props.title}
                    subheader={props.subheader}/>
        <CardContent className="popup-content">
                {props.children}
        </CardContent>
    </Card>
}