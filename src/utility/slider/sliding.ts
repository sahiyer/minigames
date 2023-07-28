import { Dispatch, SetStateAction } from "react";
import { SliderData } from "./SliderData";

export function slideUp(
    sliderData: SliderData,
    setSliderData: Dispatch<SetStateAction<SliderData>>
) {
    if (sliderData.nullTileRow == 3) {
        // Nothing to slide.
        return;
    }

    setSliderData((oldData) => {
        const newData: SliderData = { ...oldData };

        for (let row = newData.nullTileRow + 1; row < 4; row++) {
            newData.tiles[row - 1][newData.nullTileCol] =
                newData.tiles[row][newData.nullTileCol];
        }

        newData.nullTileRow = 3;
        newData.tiles[newData.nullTileRow][newData.nullTileCol] = null;

        return newData;
    });
}

export function slideDown(
    sliderData: SliderData,
    setSliderData: Dispatch<SetStateAction<SliderData>>
) {
    if (sliderData.nullTileRow == 0) {
        // Nothing to slide.
        return;
    }

    setSliderData((oldData) => {
        const newData: SliderData = { ...oldData };

        for (let row = newData.nullTileRow - 1; row >= 0; row--) {
            newData.tiles[row + 1][newData.nullTileCol] =
                newData.tiles[row][newData.nullTileCol];
        }

        newData.nullTileRow = 0;
        newData.tiles[newData.nullTileRow][newData.nullTileCol] = null;

        return newData;
    });
}

export function slideLeft(
    sliderData: SliderData,
    setSliderData: Dispatch<SetStateAction<SliderData>>
) {
    if (sliderData.nullTileCol == 3) {
        // Nothing to slide.
        return;
    }

    setSliderData((oldData) => {
        const newData: SliderData = { ...oldData };

        for (let col = newData.nullTileCol + 1; col < 4; col++) {
            newData.tiles[newData.nullTileRow][col - 1] =
                newData.tiles[newData.nullTileRow][col];
        }

        newData.nullTileCol = 3;
        newData.tiles[newData.nullTileRow][newData.nullTileCol] = null;

        return newData;
    });
}

export function slideRight(
    sliderData: SliderData,
    setSliderData: Dispatch<SetStateAction<SliderData>>
) {
    if (sliderData.nullTileCol == 0) {
        // Nothing to slide.
        return;
    }

    setSliderData((oldData) => {
        const newData: SliderData = { ...oldData };

        for (let col = newData.nullTileCol - 1; col >= 0; col--) {
            newData.tiles[newData.nullTileRow][col + 1] =
                newData.tiles[newData.nullTileRow][col];
        }

        newData.nullTileCol = 0;
        newData.tiles[newData.nullTileRow][newData.nullTileCol] = null;

        return newData;
    });
}
