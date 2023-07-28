import SliderTile from "./SliderTile";
import styles from "./SliderGrid.module.scss";

export default function SliderGrid() {
    const tiles: number[][] = [];
    for (let i = 0; i < 4; i++) {
        tiles.push([0, 1, 2, 3]);
    }

    return (
        <div className={styles.sliderGrid}>
            {tiles.map((row: number[], rowIndex: number) => {
                return (
                    <>
                        {row.map((col: number) => {
                            return (
                                <SliderTile
                                    row={rowIndex}
                                    col={col}
                                ></SliderTile>
                            );
                        })}
                    </>
                );
            })}
        </div>
    );
}
