export interface GameData {
  currentLevel: number;
  bestLevel: number;

  pattern: number[];
  patternIndex: number | null;
  shouldHighlightInPattern: boolean;

  userInputPattern: number[];
}
