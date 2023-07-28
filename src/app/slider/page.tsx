"use client";

import HomeButton from "@/components/HomeButton";
import SliderGrid from "@/components/slider/SliderGrid";
import { SliderData } from "@/utility/slider/SliderData";
import { generateTileGrid } from "@/utility/slider/Tile";
import { useEffect, useState } from "react";
import styles from "./slider.module.scss";
import Options from "@/components/slider/Options";

export default function Slider() {
    const [sliderData, setSliderData] = useState<SliderData>({
        tiles: [],

        solvedNullTileRow: -1,
        solvedNullTileCol: -1,

        showTargetCoordinates: false,
        difficulty: "easy",
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

            solvedNullTileRow: nullTileRow,
            solvedNullTileCol: nullTileCol,
        }));
    };

    // Initial setup on mount.
    useEffect(resetGrid, []);

    return (
        <>
            <div className={styles.pageLayout}>
                <div className={styles.mainContent}>
                    <h1>Slider</h1>
                    <h3>
                        Use the arrow keys to slide the pieces. Fix the image!
                    </h3>

                    <button onClick={resetGrid}>Reset</button>

                    <SliderGrid
                        sliderData={sliderData}
                        setSliderData={setSliderData}
                    ></SliderGrid>

                    <HomeButton></HomeButton>
                </div>

                <Options
                    sliderData={sliderData}
                    setSliderData={setSliderData}
                ></Options>
            </div>
        </>
    );
}
