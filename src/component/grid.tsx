// import type {CellValue, Cell, Board, GameState, Position} from '../types'

interface GridProps {
    board: (number | null)[][];
    puzzle: (number | null)[][];
    selectedNumber: [number, number] | null;
    setSelectedNumber: (value: [number, number] | null) => void;
    invalidCells: Set<string>;
}

export default function Grid({ board, puzzle, selectedNumber: _selectedNumber, setSelectedNumber, invalidCells }: GridProps) {

    return (
        <div className="sudoku-container">
            <table className="sudoku-table">
                <tbody className="sudoku-body">
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex} className="sudoku-row">
                            {row.map((cell, colIndex) => {
                                const isPrefilled = puzzle[rowIndex][colIndex] !== null;
                                const isInvalid = invalidCells.has(`${rowIndex}-${colIndex}`);  
                                const cellClass = `sudoku-cell ${isPrefilled ? 'prefilled' : ''} ${isInvalid ? 'invalid' : ''} ${colIndex % 3 === 2 ? 'right-border' : ''} ${rowIndex % 3 === 2 ? 'bottom-border' : ''}`;
                                return (
                                    <td key={colIndex} className={cellClass}
                                        onClick={() => { setSelectedNumber([rowIndex, colIndex]) }}
                                    >
                                        <div className="cell-input">
                                            {cell === null ? '' : cell}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}