import {createEvent, createStore} from "effector";
import {useStore} from "effector-react";

export interface GameInfo {
    UserId: number,
    TeamName: string,
    Login: string,
    TeamId: number

}

export const $gameInfo = createStore<GameInfo | null>(null);
export const update = createEvent<GameInfo>();

const updateGameInfo = (state: GameInfo | null, data: GameInfo) => {
    return data;
};

$gameInfo
    .on(update, updateGameInfo)

export function useGameInfo(): GameInfo | null {
    const gameInfo = useStore($gameInfo)
    if (!gameInfo) {
        const gameId: string | undefined = window.location.href.split("/").at(-2) //todo error
        fetch(`http://localhost:8080/GameEngines/Encounter/Play/${gameId}`)
            .then((response) => response.json())
            .then((data) => {
                update(data)
            }).catch()
    }
    return gameInfo
}
