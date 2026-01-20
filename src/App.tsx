import './App.css'
import Buttons from './component/buttons'
import Grid from './component/grid'
import { useGameState } from './hooks/useGameState'

function App() {
  const {
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
  } = useGameState();

  return (
    <div style={{ textAlign: "center", }}>
      <h1>Sudoku</h1>
      <h4 style={{ color: message.includes('ошибки') ? '#c0392b' : '#27ae60' }}>{message}</h4>
      <Grid
        board={board}
        puzzle={puzzle}
        selectedNumber={selectedNumber}
        setSelectedNumber={setSelectedNumber}
        invalidCells={invalidCells}
      />
      <Buttons
        selectButton={selectButton}
        setSelectButton={setSelectButton}
        handleNewGame={handleNewGame}
        handleReset={handleReset}
        handleCheck={handleCheck}
        handleSolve={handleSolve}
      />
    </div>
  )
}

export default App