import styles from "./GameTile.module.scss";
import clsx from "clsx";
import { GameState } from "@/utility/simon/GameState";
import { GameData } from "@/utility/simon/GameData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const WIN_ANIMATION_TOTAL_TIME = 1500;
const LOSE_ANIMATION_TOTAL_TIME = 1500;

export default function GameTile({
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
    gameData: GameData;
    setGameData: Dispatch<SetStateAction<GameData>>;
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
                    setGameState(GameState.WaitingForStart);

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
                setGameState(GameState.LoseAnimation);

                newData.animationTimeLeft = LOSE_ANIMATION_TOTAL_TIME;
                startAnimation(false);
            } else if (
                newData.userInputPattern.length == newData.pattern.length
            ) {
                setGameState(GameState.WinAnimation);

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
                gameState == GameState.UserGuessing ? styles.clickable : ""
            )}
            onClick={gameState == GameState.UserGuessing ? userClick : () => {}}
            style={
                gameState != GameState.UserGuessing
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

function getBrightness(index: number, gameState: symbol, gameData: GameData) {
    switch (gameState) {
        case GameState.WaitingForStart:
            return 0.4;

        case GameState.PlayingPattern:
            if (gameData.patternIndex == null) {
                console.log("Error: Playing pattern with null index.");
                return 1;
            }

            return gameData.shouldHighlightInPattern &&
                gameData.pattern[gameData.patternIndex] == index
                ? 1
                : 0.4;

        case GameState.UserGuessing:
            return 1; // Will be subdued in CSS.

        case GameState.WinAnimation:
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

        case GameState.LoseAnimation:
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
