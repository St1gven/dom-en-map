import {createEvent, createStore} from "effector";
import {WithType} from "../utils/parseWithType";



export interface Item extends WithType {

    name: string;
    task: string;
    note: string;
    correct: string;
    coords: number[];
    url: string;
    closeAfter?: string;
    inventory?: boolean
}

export interface Sector {
    name: string,
    correct: boolean
}

export const $items = createStore<Item[]>([]);
//export const update = createEvent<Item>();
export const create = createEvent<Item[]>();
export const select = createEvent<Item>();
export const close = createEvent();

export const $selected = createStore<Item | null>(null)

export const $sectors= createStore<Sector[]>([]);

export const createSectors = createEvent<Sector[]>();

const createItems = (state: Item[], data: Item[]) => {
    return [...data];
};

const selectItem = (state: Item | null, data: Item) => {
    return data;
};

const closePopup = (state: Item | null) => {
    return null;
};

const createSectorsReducer = (state: Sector[], data: Sector[]) => {
    return [...data]
}


$items
    .on(create, createItems)

$selected
    .on(select, selectItem)
    .on(close, closePopup)

$sectors
    .on(createSectors, createSectorsReducer)