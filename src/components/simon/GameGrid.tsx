import { GameData } from "@/utility/simon/GameData";
import styles from "./GameGrid.module.scss";
import GameTile from "./GameTile";
import { Dispatch, SetStateAction } from "react";

export default function GameGrid(props: {
  gameState: symbol;
  setGameState: Dispatch<SetStateAction<symbol>>;
  gameData: GameData;
  setGameData: Dispatch<SetStateAction<GameData>>;
}) {
  const colours = [styles.green, styles.yellow, styles.blue, styles.red];

  return (
    <div className={styles.gameGrid}>
      {colours.map((colour, index) => (
        <GameTile key={colour} index={index} colour={colour} {...props}></GameTile>
      ))}
    </div>
  );
}
