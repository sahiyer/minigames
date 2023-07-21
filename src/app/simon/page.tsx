"use client";

import { useState } from "react";

import styles from "./simon.module.scss";
import clsx from "clsx";

export default function Simon() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [status, setStatus] = useState(`Level ${currentLevel} - Ready?`);

  const [pattern, setPattern] = useState([2, 1, 0, 3, 0]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const [acceptingInput, setAcceptingInput] = useState(false);
  const [userInputPattern, setUserInputPattern] = useState<number[]>([]);

  const nextTileInPattern = (interval: NodeJS.Timer) => {
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

      return oldIndex + 1;
    });
  };

  const startPattern = () => {
    if (pattern && pattern.length > 0) {
      setCurrentIndex(0);
      setStatus(`Level ${currentLevel} - Watch and learn!`);

      const interval = setInterval(() => {
        nextTileInPattern(interval);
      }, 400);
    } else {
      console.log("Cannot start empty pattern.");
    }
  };

  const userTileClick = (tile: number) => {
    setUserInputPattern((oldInputPattern) => {
      const newPattern = [...oldInputPattern, tile];

      if (!compareArrays(pattern.slice(0, newPattern.length), newPattern)) {
        setAcceptingInput(false);
        return newPattern;
      }

      if (newPattern.length == pattern.length) {
        setAcceptingInput(false);
        setCurrentLevel((oldLevel) => {
          setStatus(`Level ${oldLevel + 1} - Ready?`);
          return oldLevel + 1;
        });

        // TODO: Choose new pattern

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
