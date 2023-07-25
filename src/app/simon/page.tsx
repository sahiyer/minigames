"use client";

import { useState } from "react";

export default function Simon() {
  const [gameState, setGameState] = useState(GameState.WaitingForStart);
  const [gameData, setGameData] = useState({
    currentLevel: 1,
  });

  return (
    <>
      <h1>Simon</h1>
      <h3>{getStatus(gameState, gameData)}</h3>
    </>
  );
}

const GameState = {
  WaitingForStart: Symbol("Waiting for start"),
  PlayingPattern: Symbol("Playing pattern"),
  UserGuessing: Symbol("User guessing"),
  WinAnimation: Symbol("Win animation"),
  LoseAnimation: Symbol("Lose animation"),
};

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
