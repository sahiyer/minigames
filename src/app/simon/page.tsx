"use client";

import GameGrid from "@/components/simon/GameGrid";
import { GameData } from "@/utility/simon/GameData";
import { GameState } from "@/utility/simon/GameState";
import { useEffect, useState } from "react";

export default function Simon() {
  const [gameState, setGameState] = useState(GameState.WaitingForStart);
  const [gameData, setGameData] = useState<GameData>({
    currentLevel: 1,
    bestLevel: -1,

    pattern: new Array<number>(),
    patternIndex: null,
    shouldHighlightInPattern: false,
  });

  const nextTileInPattern = (interval: NodeJS.Timer) => {
    setGameData((oldData) => {
      if (oldData.patternIndex == null) {
        clearInterval(interval);
        return oldData;
      }

      setTimeout(() => {
        setGameData((oldData) => ({ ...oldData, shouldHighlightInPattern: false }));
      }, TIME_PATTERN_TILE_SHOWN);

      return {
        ...oldData,

        patternIndex: oldData.patternIndex + 1,
        shouldHighlightInPattern: true,
      };
    });
  };

  const playPattern = () => {
    setGameState(GameState.PlayingPattern);
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

  return (
    <>
      <h1>Simon</h1>
      <h3>{getStatus(gameState, gameData)}</h3>
      <h5>Best: {gameData.bestLevel == -1 ? "None" : `Level ${gameData.bestLevel}`}</h5>

      <button onClick={playPattern} disabled={gameState != GameState.WaitingForStart}>
        Start
      </button>

      <GameGrid gameState={gameState} gameData={gameData}></GameGrid>
    </>
  );
}

// Each tile flashes on and off. TIME_PATTERN_TILE_SHOWN is the number of
// milliseconds it stays alight. TIME_PATTERN_TILE_BLANK is the number of
// milliseconds it pauses before the next tile.
const TIME_PATTERN_TILE_SHOWN = 300;
const TIME_PATTERN_TILE_BLANK = 100;

function getStatus(gameState: symbol, gameData: { currentLevel: number }) {
  switch (gameState) {
    case GameState.WaitingForStart:
      return `Level ${gameData.currentLevel} - Ready?`;

    case GameState.PlayingPattern:
      return `Level ${gameData.currentLevel} - Watch and learn!`;

    case GameState.UserGuessing:
      return `Level ${gameData.currentLevel} - Your turn!`;

    case GameState.WinAnimation:
      const winStatuses = [
        "Excellent!",
        "WOW!",
        "You got it!",
        "That's right!",
        "Nothing can stop you!",
      ];

      return winStatuses[Math.floor(Math.random() * winStatuses.length)];

    case GameState.LoseAnimation:
      const loseStatuses = [
        "Not quite!",
        "Unlucky!",
        "Better luck next time!",
        "Oops - you lost!",
        "That's not it!",
      ];

      return loseStatuses[Math.floor(Math.random() * loseStatuses.length)];
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
