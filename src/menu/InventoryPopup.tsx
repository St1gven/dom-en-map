import {$inventoryOpened, closeInventory} from "./menu";
import {useStore} from "effector-react";
import CloseablePopup from "../utils/CloseablePopup";
import Image from "mui-image"
import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material";
import React, {useEffect, useState} from "react";
import parseWithType, {WithType} from "../utils/parseWithType";

interface InventoryItem extends WithType{

    url: string;
    name: string;
}

export default function InventoryPopup() {

    const opened = useStore($inventoryOpened)

    const [inventoryItems, setInventoryItems] = useState([] as InventoryItem[])


    useEffect(() => {
        setInventoryItems(parseWithType("inventory"))
    }, [])

    return opened ? <CloseablePopup onClose={closeInventory} title="Инвентарь">
        <ImageList variant="masonry" gap={8}>
            {inventoryItems.map((item, index) => <ImageListItem key={index}>
                    <Image duration={0} src={item.url}/>
                    <ImageListItemBar style={{fontSize: 12}} title={item.name}/>
                </ImageListItem>)}
        </ImageList>

    </CloseablePopup> : null
}