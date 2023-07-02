import {$taskOpened, closeTask} from "./menu";
import {useStore} from "effector-react";
import CloseablePopup from "../utils/CloseablePopup";
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import parseWithType, {WithType} from "../utils/parseWithType";

interface TaskItem extends WithType {

    content: string;
}

export default function TaskPopup() {

    const opened = useStore($taskOpened)

    const [taskItems, setTaskItems] = useState([] as TaskItem[])

    useEffect(() => {
        setTaskItems(parseWithType("task"))
    }, [])

    return opened ? <CloseablePopup onClose={closeTask} title="Задание">
        {taskItems.map((item, index) => <Typography key={index}>
            {item.content}
        </Typography>)}
    </CloseablePopup> : null
}