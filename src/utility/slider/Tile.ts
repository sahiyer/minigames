export interface Tile {
    solvedRow: number;
    solvedCol: number;
}

export function generateTileGrid() {
    const tiles: Array<Array<Tile | null>> = [];
    for (let row = 0; row < 4; row++) {
        tiles.push([]);

        for (let col = 0; col < 4; col++) {
            tiles[tiles.length - 1].push({ solvedRow: row, solvedCol: col });
        }
    }

    // Randomly remove one tile.
    const rowToRemoveFrom = Math.floor(Math.random() * 4);
    const colToRemoveFrom = Math.floor(Math.random() * 4);
    tiles[rowToRemoveFrom][colToRemoveFrom] = null;

    return tiles;
}
