import { GameData } from "@/utility/simon/GameData";
import styles from "./GameGrid.module.scss";
import GameTile from "./GameTile";

export default function GameGrid({
  gameState,
  gameData,
}: {
  gameState: symbol;
  gameData: GameData;
}) {
  const colours = [styles.green, styles.yellow, styles.blue, styles.red];

  return (
    <div className={styles.gameGrid}>
      {colours.map((colour, index) => (
        <GameTile
          key={colour}
          index={index}
          colour={colour}
          gameState={gameState}
          gameData={gameData}
        ></GameTile>
      ))}
    </div>
  );
}
