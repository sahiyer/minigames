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
                gridRow: solvedRow + 1,
                gridColumn: solvedCol + 1,
            }}
        ></div>
    );
}
