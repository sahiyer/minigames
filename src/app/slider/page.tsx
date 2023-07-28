"use client";

import HomeButton from "@/components/HomeButton";
import SliderGrid from "@/components/slider/SliderGrid";
import { SliderData } from "@/utility/slider/SliderData";
import { generateTileGrid } from "@/utility/slider/Tile";
import { useEffect, useState } from "react";

export default function Slider() {
    const [sliderData, setSliderData] = useState<SliderData>({
        tiles: [],

        nullTileRow: -1,
        nullTileCol: -1,
    });

    const resetGrid = () => {
        let nullTileRow = -1;
        let nullTileCol = -1;
        const tiles = generateTileGrid();

        // Finds the null tile.
        outer: for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (tiles[row][col] == null) {
                    nullTileRow = row;
                    nullTileCol = col;
                    break outer;
                }
            }
        }

        if (nullTileRow == -1 || nullTileCol == -1) {
            console.log("Error: Did not find a null tile.");
            return;
        }

        setSliderData((oldData) => ({
            ...oldData,
            tiles,
            nullTileRow,
            nullTileCol,
        }));
    };

    // Initial call to resetGrid.
    useEffect(resetGrid, []);

    return (
        <>
            <h1>Slider</h1>
            <h3>Use the arrow keys to slide the pieces. Fix the image!</h3>

            <button onClick={resetGrid}>Reset</button>

            <SliderGrid sliderData={sliderData}></SliderGrid>

            <HomeButton></HomeButton>
        </>
    );
}
