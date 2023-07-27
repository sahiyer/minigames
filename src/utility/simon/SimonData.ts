export interface SimonData {
    currentLevel: number;
    bestLevel: number;
    statusIndex: number;

    pattern: number[];
    patternIndex: number | null;
    shouldHighlightInPattern: boolean;

    userInputPattern: number[];

    animationTimeLeft: number;
}
