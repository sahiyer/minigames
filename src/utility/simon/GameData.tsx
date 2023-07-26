export interface GameData {
  currentLevel: number;
  bestLevel: number;
  statusIndex: number;

  pattern: number[];
  patternIndex: number | null;
  shouldHighlightInPattern: boolean;

  userInputPattern: number[];

  animationTimeLeft: number;
}
