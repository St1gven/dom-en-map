import {createEvent, createStore} from "effector";

export const $position = createStore<GeolocationCoordinates | null>(null);
export const update = createEvent<GeolocationCoordinates>();

const updatePosition = (state: GeolocationCoordinates | null, data: GeolocationCoordinates) => {
    return data;
};

$position
    .on(update, updatePosition)
