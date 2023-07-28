import clsx from "clsx";
import styles from "./SliderTile.module.scss";

export default function SliderTile({ row, col }: { row: number; col: number }) {
    return (
        <div
            className={clsx(styles.sliderTile, styles[`tile_${row}_${col}`])}
        ></div>
    );
}
