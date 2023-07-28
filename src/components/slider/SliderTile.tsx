import clsx from "clsx";
import styles from "./SliderTile.module.scss";
import { SliderData } from "@/utility/slider/SliderData";
import { Dispatch, SetStateAction } from "react";

export default function SliderTile({
    solvedRow,
    solvedCol,
    currentRow,
    currentCol,
    sliderData,
    setSliderData,
}: {
    solvedRow: number;
    solvedCol: number;
    currentRow: number;
    currentCol: number;
    sliderData: SliderData;
    setSliderData: Dispatch<SetStateAction<SliderData>>;
}) {
    const onClick = () => {
        if (
            currentRow > 0 &&
            sliderData.tiles[currentRow - 1][currentCol] == null
        ) {
            setSliderData((oldData) => {
                const newData = { ...oldData };
                newData.tiles[currentRow - 1][currentCol] =
                    newData.tiles[currentRow][currentCol];
                newData.tiles[currentRow][currentCol] = null;

                return newData;
            });
            return;
        }

        if (
            currentRow < 3 &&
            sliderData.tiles[currentRow + 1][currentCol] == null
        ) {
            setSliderData((oldData) => {
                const newData = { ...oldData };
                newData.tiles[currentRow + 1][currentCol] =
                    newData.tiles[currentRow][currentCol];
                newData.tiles[currentRow][currentCol] = null;

                return newData;
            });
            return;
        }

        if (
            currentCol > 0 &&
            sliderData.tiles[currentRow][currentCol - 1] == null
        ) {
            setSliderData((oldData) => {
                const newData = { ...oldData };
                newData.tiles[currentRow][currentCol - 1] =
                    newData.tiles[currentRow][currentCol];
                newData.tiles[currentRow][currentCol] = null;

                return newData;
            });
            return;
        }

        if (
            currentCol < 3 &&
            sliderData.tiles[currentRow][currentCol + 1] == null
        ) {
            setSliderData((oldData) => {
                const newData = { ...oldData };
                newData.tiles[currentRow][currentCol + 1] =
                    newData.tiles[currentRow][currentCol];
                newData.tiles[currentRow][currentCol] = null;

                return newData;
            });
            return;
        }
    };

    return (
        <div
            className={clsx(
                styles.sliderTile,
                styles[`tile_${solvedRow}_${solvedCol}`]
            )}
            onClick={onClick}
            style={{
                // gridRow and gridColumn are 1-based.
                gridRow: currentRow + 1,
                gridColumn: currentCol + 1,
            }}
        ></div>
    );
}
