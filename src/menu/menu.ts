import {createEvent, createStore} from "effector";

export const $inventoryOpened = createStore(false)
export const $taskOpened = createStore(false)

export const openInventory= createEvent()
export const closeInventory = createEvent()
export const openTask = createEvent()
export const closeTask = createEvent()

$taskOpened
    .on(openTask, () => true)
    .on(closeTask, () => false)

$inventoryOpened
    .on(openInventory, () => true)
    .on(closeInventory, () => false)