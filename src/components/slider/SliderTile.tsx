import clsx from "clsx";
import styles from "./SliderTile.module.scss";

export default function SliderTile({
    solvedRow,
    solvedCol,
    currentRow,
    currentCol,
}: {
    solvedRow: number;
    solvedCol: number;
    currentRow: number;
    currentCol: number;
}) {
    return (
        <div
            className={clsx(
                styles.sliderTile,
                styles[`tile_${solvedRow}_${solvedCol}`]
            )}
            style={{
                // gridRow and gridColumn are 1-based.
                gridRow: currentRow + 1,
                gridColumn: currentCol + 1,
            }}
        ></div>
    );
}
