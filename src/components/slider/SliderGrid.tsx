import SliderTile from "./SliderTile";
import styles from "./SliderGrid.module.scss";
import { Tile } from "@/utility/slider/Tile";
import { SliderData } from "@/utility/slider/SliderData";
import { Fragment } from "react";

export default function SliderGrid({ sliderData }: { sliderData: SliderData }) {
    return (
        <div className={styles.sliderGrid}>
            {sliderData.tiles.map(
                (row: Array<Tile | null>, rowIndex: number) => {
                    return (
                        <Fragment key={rowIndex}>
                            {row.map((tile: Tile | null, colIndex) => {
                                return tile == null ? (
                                    <Fragment
                                        key={`${sliderData.solvedNullTileRow} ${sliderData.solvedNullTileCol}`}
                                    ></Fragment>
                                ) : (
                                    <SliderTile
                                        key={`${tile.solvedRow} ${tile.solvedCol}`}
                                        {...tile}
                                        currentRow={rowIndex}
                                        currentCol={colIndex}
                                    ></SliderTile>
                                );
                            })}
                        </Fragment>
                    );
                }
            )}
        </div>
    );
}
