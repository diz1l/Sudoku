// import { makepuzzle, solvepuzzle } from 'sudoku';

export function isValidMove(
    board: (number | null)[][],
    row: number,
    col: number,
    num: number
): boolean {
    // Проверка 1: Число num нет в этой строке
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) {
            return false;
        }
    }

    for (let y = 0; y < 9; y++) {
        if (board[y][col] === num) {
            return false;
        }
    }

    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function shuffleArray(array: number[]): number[] {
    const shaffled = [...array];
    for (let i = shaffled.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shaffled[i], shaffled[j]] = [shaffled[j], shaffled[i]];
    }
    return shaffled;
}


function fillBoard(board: (number | null)[][]): boolean {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === null) {
                const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of numbers) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;
                        if (fillBoard(board)) {
                            return true;
                        }
                        board[row][col] = null;
                    }
                }
                return false;
            }
    }    }
    return true;
}

function createFullBoard(board: (number | null)[][], cellsToRemove: number)  {
    const puzzlee = board.map(row => [...row]);
    let removed = 0;
    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (puzzlee[row][col] !== null) {
            puzzlee[row][col] = null;
            removed++;
        }
    }
    return puzzlee;
}

export { createFullBoard, fillBoard };



