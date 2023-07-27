import { SimonData } from "@/utility/simon/SimonData";
import styles from "./SimonGrid.module.scss";
import SimonTile from "./SimonTile";
import { Dispatch, SetStateAction } from "react";

export default function SimonGrid(props: {
    gameState: symbol;
    setGameState: Dispatch<SetStateAction<symbol>>;
    gameData: SimonData;
    setGameData: Dispatch<SetStateAction<SimonData>>;
}) {
    const colours = [styles.green, styles.yellow, styles.blue, styles.red];

    return (
        <div className={styles.gameGrid}>
            {colours.map((colour, index) => (
                <SimonTile
                    key={colour}
                    index={index}
                    colour={colour}
                    {...props}
                ></SimonTile>
            ))}
        </div>
    );
}
