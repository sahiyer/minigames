import { Tile } from "./Tile";

export interface SliderData {
    tiles: Array<Array<Tile | null>>;

    nullTileRow: number;
    nullTileCol: number;
}
