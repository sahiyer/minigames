import styles from "./GameTile.module.scss";
import clsx from "clsx";
import { GameState } from "@/utility/simon/GameState";
import { GameData } from "@/utility/simon/GameData";
import { Dispatch, SetStateAction } from "react";

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
      } else if (newData.userInputPattern.length == newData.pattern.length) {
        setGameState(GameState.WinAnimation);
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
      onClick={userClick}
      style={
        gameState != GameState.UserGuessing
          ? { filter: `brightness(${getBrightness(index, gameState, gameData)})` }
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

      return gameData.shouldHighlightInPattern && gameData.pattern[gameData.patternIndex] == index
        ? 1
        : 0.4;

    case GameState.UserGuessing:
      return 1; // Will be subdued in CSS.

    case GameState.WinAnimation:
      return 0.4;

    case GameState.LoseAnimation:
      return 0.4;
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
