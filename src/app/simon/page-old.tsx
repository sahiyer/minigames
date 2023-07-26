"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "./simon.module.scss";
import clsx from "clsx";

export default function Simon() {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [status, setStatus] = useState(`Level ${currentLevel} - Ready?`);

    const [pattern, setPattern] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [shouldHighlight, setShouldHighlight] = useState(false);
    const [animatingTiles, setAnimatingTiles] = useState(false);
    const [loseAnimationBrightness, setLoseAnimationBrightness] = useState(100);

    const [acceptingInput, setAcceptingInput] = useState(false);
    const [userInputPattern, setUserInputPattern] = useState<number[]>([]);
    const [canStartRound, setCanStartRound] = useState(true);

    const [bestLevel, setBestLevel] = useState(-1);

    const nextTileInPattern = useCallback(
        (interval: NodeJS.Timer) => {
            if (interval == null) {
                // Should never happen.
                console.log("Interval was null.");
                return;
            }

            setCurrentIndex((oldIndex) => {
                if (oldIndex == null) {
                    clearInterval(interval);

                    return null;
                }

                if (oldIndex >= pattern.length - 1) {
                    setStatus(`Level ${currentLevel} - Your turn!`);
                    setAcceptingInput(true);
                    setUserInputPattern([]);

                    clearInterval(interval);
                    return null;
                }

                // Highlights the next tile, but stops after a certain amount of time.
                setShouldHighlight(true);
                setTimeout(() => {
                    setShouldHighlight(false);
                }, 300);

                return oldIndex + 1;
            });
        },
        [currentLevel, pattern]
    );

    useEffect(() => {
        const interval = setInterval(() => {
            nextTileInPattern(interval);
        }, 400);

        nextTileInPattern(interval);
    }, [nextTileInPattern]);

    const startPattern = () => {
        // Chooses a pattern
        const pattern: number[] = [];

        // Plus three because level 1 starts at a pattern of length 4.
        for (let i = 0; i < currentLevel + 3; i++) {
            pattern.push(Math.floor(Math.random() * 4));
        }

        setPattern(pattern);
        setStatus(`Level ${currentLevel} - Watch and learn!`);
        setCurrentIndex(-1); // We call nextTileInPattern immediately, which will set this to 0.
    };

    const userTileClick = (tile: number) => {
        setUserInputPattern((oldInputPattern) => {
            const newPattern = [...oldInputPattern, tile];

            if (
                !compareArrays(pattern.slice(0, newPattern.length), newPattern)
            ) {
                setAcceptingInput(false);
                setCanStartRound(false);
                setCurrentLevel(1);

                const loseStatuses = [
                    "Not quite!",
                    "Unlucky!",
                    "Better luck next time!",
                    "Oops - you lost!",
                    "That's not it!",
                ];

                setStatus(
                    loseStatuses[
                        Math.floor(Math.random() * loseStatuses.length)
                    ]
                );

                setAnimatingTiles(true);
                setShouldHighlight(true);
                setLoseAnimationBrightness(100);

                const timeout = 10;
                const animationTime = 1500;
                const interval = setInterval(() => {
                    setLoseAnimationBrightness((oldBrightness) => {
                        if (oldBrightness <= 0) {
                            setAnimatingTiles(false);
                            setStatus("Level 1 - Ready?");
                            setCanStartRound(true);
                            setLoseAnimationBrightness(100);

                            clearInterval(interval);
                        }

                        const decrement = (timeout / animationTime) * 100; // Multiply by 100 to get percent.
                        return oldBrightness - decrement;
                    });
                }, timeout);
            } else if (newPattern.length == pattern.length) {
                setAcceptingInput(false);
                setCanStartRound(false);

                setCurrentLevel((oldLevel) => {
                    const winStatuses = [
                        "Excellent!",
                        "WOW!",
                        "You got it!",
                        "That's right!",
                        "Nothing can stop you!",
                    ];

                    setStatus(
                        winStatuses[
                            Math.floor(Math.random() * winStatuses.length)
                        ]
                    );

                    setAnimatingTiles(true);
                    setShouldHighlight(true);

                    let count = 0;
                    const interval = setInterval(() => {
                        count += 1;

                        if (count >= 6) {
                            setAnimatingTiles(false);
                            setStatus(`Level ${oldLevel + 1} - Ready?`);
                            setCanStartRound(true);

                            clearInterval(interval);
                        }

                        setShouldHighlight(
                            (oldShouldHighlight) => !oldShouldHighlight
                        );
                    }, 200);

                    if (oldLevel > bestLevel) {
                        setBestLevel(oldLevel);
                    }

                    return oldLevel + 1;
                });
            }

            return newPattern;
        });
    };

    const colours = [styles.green, styles.yellow, styles.blue, styles.red];

    return (
        <>
            <h1>Simon</h1>
            <h3>{status}</h3>
            <h5>Best: {bestLevel == -1 ? "None" : `Level ${bestLevel}`}</h5>

            <button onClick={startPattern} disabled={!canStartRound}>
                Start
            </button>

            <div className={styles.gameGrid}>
                {colours.map((colour, index) => (
                    <div
                        key={index}
                        onClick={
                            acceptingInput
                                ? () => userTileClick(index)
                                : () => {}
                        }
                        className={clsx(
                            styles.gameTile,
                            colour,
                            (currentIndex != null &&
                                pattern[currentIndex] == index &&
                                shouldHighlight) ||
                                (animatingTiles && shouldHighlight)
                                ? ""
                                : styles.subdued,
                            acceptingInput ? styles.clickable : ""
                        )}
                        style={
                            animatingTiles && shouldHighlight
                                ? {
                                      filter: `brightness(${loseAnimationBrightness}%)`,
                                  }
                                : {}
                        }
                    ></div>
                ))}
            </div>
        </>
    );
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
