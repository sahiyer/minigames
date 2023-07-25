import styles from "./GameGrid.module.scss";
import GameTile from "./GameTile";

export default function GameGrid({ gameState, setGameState, gameData, setGameData }: any) {
  const colours = [styles.green, styles.yellow, styles.blue, styles.red];

  return (
    <div className={styles.gameGrid}>
      {colours.map((colour, index) => (
        <GameTile key={colour} colour={colour}></GameTile>
      ))}
    </div>
  );
}
