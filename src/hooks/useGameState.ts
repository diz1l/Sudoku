import { useState, useEffect } from 'react';
import { createFullBoard, fillBoard } from '../utils/sudoku';

export function useGameState() {
  const [selectedNumber, setSelectedNumber] = useState<[number, number] | null>(null);
  const [selectButton, setSelectButton] = useState<number | null>(null);

  const [board, setBoard] = useState<(number | null)[][]>(
    Array(9).fill(null).map(() => Array(9).fill(null))
  );
  const [puzzle, setPuzzle] = useState<(number | null)[][]>(
    Array(9).fill(null).map(() => Array(9).fill(null))
  );
  const [solution, setSolution] = useState<(number | null)[][]>(
    Array(9).fill(null).map(() => Array(9).fill(null))
  );
  const [invalidCells, setInvalidCells] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    console.log('Selected Cell:', selectedNumber);
    console.log('Selected Button:', selectButton);

    if (selectedNumber && selectButton !== null) {
      const row = selectedNumber[0];
      const col = selectedNumber[1];

      if (puzzle[row][col] !== null) {
        setSelectButton(null);
        return;
      }

      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === selectedNumber[0] && colIndex === selectedNumber[1]
            ? selectButton
            : cell
        )
      );
      setBoard(newBoard);
      setSelectButton(null);
    }
  }, [selectedNumber, selectButton, board, puzzle]);

  const handleNewGame = () => {
    setInvalidCells(new Set());
    setMessage('');
    const filledBoard = Array(9).fill(null).map(() => Array(9).fill(null));
    fillBoard(filledBoard);
    const newPuzzle = createFullBoard(filledBoard, 40);
    setBoard(newPuzzle);
    setPuzzle(newPuzzle);
    setSolution(filledBoard);
    setSelectedNumber(null);
    setSelectButton(null);
  };

  const handleReset = () => {
    setInvalidCells(new Set());
    setMessage('');
    setBoard(puzzle.map(row => [...row]));
    setSelectedNumber(null);
    setSelectButton(null);
  };

  const handleCheck = () => {
    const newInvalidCells = new Set<string>();
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellValue = board[row][col];
        if (cellValue !== null && cellValue !== solution[row][col]) {
          newInvalidCells.add(`${row}-${col}`);
        }
      }
    }
    setInvalidCells(newInvalidCells);

    const isBoardFull = board.every(row => row.every(cell => cell !== null));

    if (newInvalidCells.size === 0 && isBoardFull) {
      setMessage('Congratulations! You got it right! 🎉');
    } else if (newInvalidCells.size === 0) {
      setMessage('So far so good! Keep going! 👍');
    } else {
      setMessage('There are errors. They are highlighted in red.');
    }
  };

  const handleSolve = () => {
    setBoard(solution.map(row => [...row]));
    setInvalidCells(new Set());
    setMessage('');
    setSelectedNumber(null);
    setSelectButton(null);
  };

  return {
    board,
    puzzle,
    selectedNumber,
    setSelectedNumber,
    selectButton,
    setSelectButton,
    invalidCells,
    message,
    handleNewGame,
    handleReset,
    handleCheck,
    handleSolve,
  };
}
