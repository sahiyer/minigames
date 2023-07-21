"use client";

import { useCallback, useEffect, useState } from "react";

import styles from "./simon.module.scss";
import clsx from "clsx";

export default function Simon() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [status, setStatus] = useState(`Level ${currentLevel} - Ready?`);

  const [pattern, setPattern] = useState<number[]>([2, 3, 0, 1]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [acceptingInput, setAcceptingInput] = useState(false);
  const [userInputPattern, setUserInputPattern] = useState<number[]>([]);

  const nextTileInPattern = (interval: NodeJS.Timer) => {
    setCurrentIndex((oldIndex) => {
      if (oldIndex == null) {
        clearInterval(interval);
        return null;
      }

      console.log(oldIndex, pattern.length - 1);
      if (oldIndex >= pattern.length - 1) {
        setStatus(`Level ${currentLevel} - Your turn!`);
        setAcceptingInput(true);
        setUserInputPattern([]);

        clearInterval(interval);
        return null;
      }

      return oldIndex + 1;
    });
  };

  const startPattern = () => {
    // Chooses a pattern
    const pattern: number[] = [];

    // Plus three because level 1 starts at a pattern of length 4.
    for (let i = 0; i < currentLevel + 3; i++) {
      pattern.push(Math.floor(Math.random() * 4));
    }

    // setPattern(pattern);
    setStatus(`Level ${currentLevel} - Watch and learn!`);
    setCurrentIndex(0);

    const interval = setInterval(() => {
      nextTileInPattern(interval);
    }, 400);
  };

  const userTileClick = (tile: number) => {
    setUserInputPattern((oldInputPattern) => {
      const newPattern = [...oldInputPattern, tile];

      if (!compareArrays(pattern.slice(0, newPattern.length), newPattern)) {
        console.log("LOSE");
        setAcceptingInput(false);
        return newPattern;
      }

      if (newPattern.length == pattern.length) {
        console.log("WIN");

        setAcceptingInput(false);
        setCurrentLevel((oldLevel) => {
          setStatus(`Level ${oldLevel + 1} - Ready?`);
          return oldLevel + 1;
        });

        return newPattern;
      }

      return newPattern;
    });
  };

  const colours = [styles.green, styles.yellow, styles.blue, styles.red];

  return (
    <>
      <h1>Simon</h1>
      <h3>{status}</h3>

      <button onClick={startPattern}>Start</button>

      <div className={styles.gameGrid}>
        {colours.map((colour, index) => (
          <div
            key={index}
            onClick={acceptingInput ? () => userTileClick(index) : () => {}}
            className={clsx(
              styles.gameTile,
              colour,
              currentIndex != null && pattern[currentIndex] == index
                ? ""
                : styles.subdued,
              acceptingInput ? styles.clickable : ""
            )}
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
