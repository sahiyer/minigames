"use client";

import HomeButton from "@/components/HomeButton";
import SliderGrid from "@/components/slider/SliderGrid";
import { SliderData } from "@/utility/slider/SliderData";
import { generateTileGrid } from "@/utility/slider/Tile";
import {
    slideDown,
    slideLeft,
    slideRight,
    slideUp,
} from "@/utility/slider/sliding";
import { useEffect, useState } from "react";

export default function Slider() {
    const [sliderData, setSliderData] = useState<SliderData>({
        tiles: [],

        solvedNullTileRow: -1,
        solvedNullTileCol: -1,
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

            solvedNullTileRow: nullTileRow,
            solvedNullTileCol: nullTileCol,
            nullTileRow,
            nullTileCol,
        }));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        const { key } = event;
        switch (key) {
            case "ArrowUp":
                slideUp(sliderData, setSliderData);
                event.preventDefault(); // Stops scrolling with arrow keys in the browser.
                break;

            case "ArrowDown":
                slideDown(sliderData, setSliderData);
                event.preventDefault(); // Stops scrolling with arrow keys in the browser.
                break;

            case "ArrowLeft":
                slideLeft(sliderData, setSliderData);
                event.preventDefault(); // Stops scrolling with arrow keys in the browser.
                break;

            case "ArrowRight":
                slideRight(sliderData, setSliderData);
                event.preventDefault(); // Stops scrolling with arrow keys in the browser.
                break;
        }
    };

    // Initial setup on mount.
    useEffect(() => {
        resetGrid();
        window.addEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <h1>Slider</h1>
            <h3>Use the arrow keys to slide the pieces. Fix the image!</h3>

            <button onClick={resetGrid}>Reset</button>

            <SliderGrid
                sliderData={sliderData}
                setSliderData={setSliderData}
            ></SliderGrid>

            <HomeButton></HomeButton>
        </>
    );
}
