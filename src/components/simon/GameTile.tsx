import styles from "./GameTile.module.scss";
import clsx from "clsx";
import { GameState } from "@/utility/simon/GameState";
import { GameData } from "@/utility/simon/GameData";

export default function GameTile({
  index,
  colour,
  gameState,
  gameData,
}: {
  index: number;
  colour: string;
  gameState: symbol;
  gameData: GameData;
}) {
  return (
    <div
      className={clsx(styles.gameTile, colour)}
      style={{ filter: `brightness(${getBrightness(index, gameState, gameData)})` }}
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
      return 0.4;

    case GameState.WinAnimation:
      return 0.4;

    case GameState.LoseAnimation:
      return 0.4;
  }

  console.log("Error: Incomplete switch.", gameState);
  return 1;
}
