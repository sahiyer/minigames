import { Tile } from "./Tile";

export interface SliderData {
    tiles: Array<Array<Tile | null>>;

    solvedNullTileRow: number;
    solvedNullTileCol: number;
    nullTileRow: number;
    nullTileCol: number;
}
