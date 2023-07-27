import styles from "./SimonTile.module.scss";
import clsx from "clsx";
import { SimonState } from "@/utility/simon/SimonState";
import { SimonData } from "@/utility/simon/SimonData";
import { Dispatch, SetStateAction } from "react";

const WIN_ANIMATION_TOTAL_TIME = 1500;
const LOSE_ANIMATION_TOTAL_TIME = 1500;

export default function SimonTile({
    index,
    colour,
    gameState,
    setGameState,
    gameData,
    setGameData,
}: {
    index: number;
    colour: string;
    gameState: symbol;
    setGameState: Dispatch<SetStateAction<symbol>>;
    gameData: SimonData;
    setGameData: Dispatch<SetStateAction<SimonData>>;
}) {
    const startAnimation = (win: boolean) => {
        const TIME_PER_UPDATE = 10;
        const interval = setInterval(() => {
            setGameData((oldData) => {
                const newData = {
                    ...oldData,
                    animationTimeLeft:
                        oldData.animationTimeLeft - TIME_PER_UPDATE,
                };

                if (newData.animationTimeLeft <= 0) {
                    clearInterval(interval);
                    setGameState(SimonState.WaitingForStart);

                    if (win) {
                        if (newData.currentLevel > newData.bestLevel) {
                            newData.bestLevel = newData.currentLevel;
                        }

                        newData.currentLevel += 1;
                    } else {
                        newData.currentLevel = 1;
                    }
                }

                return newData;
            });
        });
    };

    const userClick = () => {
        setGameData((oldData) => {
            const newData = {
                ...oldData,
                userInputPattern: [...oldData.userInputPattern, index],
            };

            if (
                !compareArrays(
                    newData.pattern.slice(0, newData.userInputPattern.length),
                    newData.userInputPattern
                )
            ) {
                setGameState(SimonState.LoseAnimation);

                newData.animationTimeLeft = LOSE_ANIMATION_TOTAL_TIME;
                startAnimation(false);
            } else if (
                newData.userInputPattern.length == newData.pattern.length
            ) {
                setGameState(SimonState.WinAnimation);

                newData.animationTimeLeft = WIN_ANIMATION_TOTAL_TIME;
                startAnimation(true);
            }

            return newData;
        });
    };

    return (
        <div
            className={clsx(
                styles.gameTile,
                colour,
                gameState == SimonState.UserGuessing ? styles.clickable : ""
            )}
            onClick={gameState == SimonState.UserGuessing ? userClick : () => {}}
            style={
                gameState != SimonState.UserGuessing
                    ? {
                          filter: `brightness(${getBrightness(
                              index,
                              gameState,
                              gameData
                          )})`,
                      }
                    : {}
            }
        ></div>
    );
}

function getBrightness(index: number, gameState: symbol, gameData: SimonData) {
    switch (gameState) {
        case SimonState.WaitingForStart:
            return 0.4;

        case SimonState.PlayingPattern:
            if (gameData.patternIndex == null) {
                console.log("Error: Playing pattern with null index.");
                return 1;
            }

            return gameData.shouldHighlightInPattern &&
                gameData.pattern[gameData.patternIndex] == index
                ? 1
                : 0.4;

        case SimonState.UserGuessing:
            return 1; // Will be subdued in CSS.

        case SimonState.WinAnimation:
            const elapsed =
                WIN_ANIMATION_TOTAL_TIME - gameData.animationTimeLeft;
            if (
                (elapsed >= 0 && elapsed <= 250) ||
                (elapsed >= 500 && elapsed <= 750) ||
                (elapsed >= 1000 && elapsed <= 1250)
            ) {
                return 1;
            } else {
                return 0.4;
            }

        case SimonState.LoseAnimation:
            return (
                1 -
                (LOSE_ANIMATION_TOTAL_TIME - gameData.animationTimeLeft) /
                    LOSE_ANIMATION_TOTAL_TIME
            );
    }

    console.log("Error: Incomplete switch.", gameState);
    return 1;
}

function compareArrays(array0: any[], array1: any[]): boolean {
    if (array0.length != array1.length) {
        return false;
    }

    for (let i = 0; i < array0.length; i++) {
        if (array0[i] != array1[i]) {
            return false;
        }
    }

    return true;
}
