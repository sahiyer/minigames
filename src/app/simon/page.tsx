"use client";

import HomeButton from "@/components/HomeButton";
import SimonGrid from "@/components/simon/SimonGrid";
import { SimonData } from "@/utility/simon/SimonData";
import { SimonState } from "@/utility/simon/SimonState";
import Link from "next/link";
import { useEffect, useState } from "react";

const winStatuses = [
    "Excellent!",
    "WOW!",
    "You got it!",
    "That's right!",
    "Nothing can stop you!",
];

const loseStatuses = [
    "Not quite!",
    "Unlucky!",
    "Better luck next time!",
    "Oops - you lost!",
    "That's not it!",
];

export default function Simon() {
    const [gameState, setGameState] = useState(SimonState.WaitingForStart);
    const [gameData, setGameData] = useState<SimonData>({
        currentLevel: 1,
        bestLevel: -1,
        statusIndex: 0,

        pattern: new Array<number>(),
        patternIndex: null,
        shouldHighlightInPattern: false,

        userInputPattern: new Array<number>(),

        animationTimeLeft: 0,
    });

    const nextTileInPattern = (interval: NodeJS.Timer) => {
        setGameData((oldData) => {
            if (oldData.patternIndex == null) {
                clearInterval(interval);
                return oldData;
            }

            if (oldData.patternIndex >= oldData.pattern.length - 1) {
                clearInterval(interval);
                setGameState(SimonState.UserGuessing);

                return {
                    ...oldData,
                    userInputPattern: new Array<number>(),
                };
            }

            setTimeout(() => {
                setGameData((oldData) => ({
                    ...oldData,
                    shouldHighlightInPattern: false,
                }));
            }, TIME_PATTERN_TILE_SHOWN);

            return {
                ...oldData,

                patternIndex: oldData.patternIndex + 1,
                shouldHighlightInPattern: true,
            };
        });
    };

    const playPattern = () => {
        setGameState(SimonState.PlayingPattern);
        setGameData((oldData) => ({
            ...oldData,

            pattern: chooseRandomPattern(gameData),
            patternIndex: -1, // We will call nextTileInPattern immediately (useEffect) to set this to 0.
            shouldHighlightInPattern: false,
        }));
    };

    useEffect(() => {
        if (gameData.patternIndex == -1) {
            const interval = setInterval(() => {
                nextTileInPattern(interval);
            }, TIME_PATTERN_TILE_SHOWN + TIME_PATTERN_TILE_BLANK);

            nextTileInPattern(interval);
        }
    }, [gameData.patternIndex]);

    useEffect(() => {
        setGameData((oldData) => ({
            ...oldData,
            statusIndex: oldData.statusIndex + Math.floor(Math.random() * 3),
        }));
    }, [gameState]);

    return (
        <>
            <h1>Simon</h1>
            <h3>{getStatus(gameState, gameData)}</h3>
            <h5>
                Best:{" "}
                {gameData.bestLevel == -1
                    ? "None"
                    : `Level ${gameData.bestLevel}`}
            </h5>

            <button
                onClick={playPattern}
                disabled={gameState != SimonState.WaitingForStart}
            >
                Start
            </button>

            <SimonGrid
                gameState={gameState}
                setGameState={setGameState}
                gameData={gameData}
                setGameData={setGameData}
            ></SimonGrid>

            <HomeButton></HomeButton>
        </>
    );
}

// Each tile flashes on and off. TIME_PATTERN_TILE_SHOWN is the number of
// milliseconds it stays alight. TIME_PATTERN_TILE_BLANK is the number of
// milliseconds it pauses before the next tile.
const TIME_PATTERN_TILE_SHOWN = 300;
const TIME_PATTERN_TILE_BLANK = 100;

function getStatus(gameState: symbol, gameData: SimonData) {
    switch (gameState) {
        case SimonState.WaitingForStart:
            return `Level ${gameData.currentLevel} - Ready?`;

        case SimonState.PlayingPattern:
            return `Level ${gameData.currentLevel} - Watch and learn!`;

        case SimonState.UserGuessing:
            return `Level ${gameData.currentLevel} - Your turn!`;

        case SimonState.WinAnimation:
            return winStatuses[gameData.statusIndex % winStatuses.length];

        case SimonState.LoseAnimation:
            return loseStatuses[gameData.statusIndex % loseStatuses.length];
    }
}

function chooseRandomPattern(gameData: { currentLevel: number }) {
    const pattern: number[] = [];

    // Plus three because level 1 starts at a pattern of length 4.
    for (let i = 0; i < gameData.currentLevel + 3; i++) {
        pattern.push(Math.floor(Math.random() * 4));
    }

    return pattern;
}
