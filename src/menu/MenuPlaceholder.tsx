import {Card, CardHeader, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import InventoryIcon from '@mui/icons-material/Inventory';
import TaskIcon from '@mui/icons-material/Task';
import {openInventory, openTask} from "./menu";


export default function MenuPlaceholder() {
    const [hover, setHover] = useState(false)

    const globalClickListener = useCallback(() => {
        setHover(false)
    }, [])

    useEffect(() => {
        if (hover) {
            document.addEventListener('click', globalClickListener)
        } else {
            document.removeEventListener('click', globalClickListener)
        }
        return () => {
            document.removeEventListener('click', globalClickListener)
        }
    }, [globalClickListener, hover])

    return <div>
        {!hover ?
            <Card className="menu menu-hidden" onClick={(event) => {setHover(true); event.stopPropagation()}}>
                <CardHeader title="Меню"/>
            </Card> :
            <Card className="menu" onClick={event => event.stopPropagation()}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {openInventory(); setHover(false);}}>
                            <ListItemIcon>
                                <InventoryIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Инвентарь"/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => {openTask(); setHover(false);}}>
                            <ListItemIcon>
                                <TaskIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Задание"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Card>}
    </div>

}