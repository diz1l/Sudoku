export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export type Cell = {
  value: CellValue;
  isInitial: boolean;
  notes: number[];
};

export type Board = Cell[][];

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type GameState = {
    board: Board;
    solution: Board;
    difficulty: Difficulty;
    mistaces: number;
    isCompleted: boolean;   
}

export type Position = {
  row: number;
  col: number;
};