"use client";

import HomeButton from "@/components/HomeButton";
import SliderGrid from "@/components/slider/SliderGrid";
import { SliderData } from "@/utility/slider/SliderData";
import { generateTileGrid } from "@/utility/slider/Tile";
import { useEffect, useState } from "react";

export default function Slider() {
    const [sliderData, setSliderData] = useState<SliderData>({
        tiles: [],
    });

    const resetGrid = () => {
        setSliderData((oldData) => ({
            ...oldData,
            tiles: generateTileGrid(),
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
