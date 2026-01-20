interface ButtonsProps {
    selectButton: number | null;
    setSelectButton: (value: number | null) => void;
    handleNewGame: () => void;
    handleReset: () => void;
    handleCheck: () => void;
    handleSolve: () => void;
}

export default function Buttons({ selectButton: _selectButton, setSelectButton, handleNewGame, handleReset, handleCheck, handleSolve }: ButtonsProps) {
    const controlButtons = ['New Game', 'Check', 'Solve', 'Reset'];
    const numberOfButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="buttons-container">
            <div className="number-buttons">
                {numberOfButtons.map((number) => (

                    <button
                        key={number}
                        className="button-input"
                        type="button"
                        onClick={() => setSelectButton(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <div className="control-buttons">
                {controlButtons.map((button, index) => (
                    <button key={index} className="button-input" type="button" 
                    onClick={() => {
                        if (button === 'New Game') {
                            handleNewGame();
                        }
                        if (button === 'Reset') {
                            handleReset();
                        }
                        if (button === 'Solve') {
                            handleSolve();
                            console.log('Solve button clicked');
                        }
                        if (button === 'Check') {
                            handleCheck();
                        }
                    }}
                    >
                        {button}
                    </button>
                ))}
            </div>
        </div>
    )
}
