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

  const [acceptingInput, setAcceptingInput] = useState(false);
  const [userInputPattern, setUserInputPattern] = useState<number[]>([]);

  const nextTileInPattern = useCallback(
    (interval: NodeJS.Timer) => {
      if (interval == null) {
        // Should never happen.
        console.log("Interval was null.");
        return;
      }

      setCurrentIndex((oldIndex) => {
        console.log(oldIndex);

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
    // TODO: If the start button is clicked before this is cleared the
    // TODO: first time during initialisation, it will break as the
    // TODO: actual timer we want is cleared.
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
              currentIndex != null &&
                pattern[currentIndex] == index &&
                shouldHighlight
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
