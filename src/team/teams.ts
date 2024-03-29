import {createEvent, createStore} from "effector";

export interface Team {

    coords: number[];
    name: string;
    flag: string;
}

export const $teams = createStore<Team[]>([]);
export const update = createEvent<Team>();
export const create = createEvent<Team[]>();

const updateTeams = (state: Team[], data: Team) => {
    const userIndex = state.findIndex((team) => team.name === data.name);

    if (userIndex > -1) {
        state.splice(userIndex, 1, data);
    } else {
        state.push(data);
    }

    return [...state];
};

const createTeams = (state: Team[], data: Team[]) => {
    return [...data];
};

$teams
    .on(update, updateTeams)
    .on(create, createTeams)