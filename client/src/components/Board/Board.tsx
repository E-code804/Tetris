import { useGameContext } from "../../hooks/useGameContext";
import { useGravity } from "../../hooks/useGravity";
import { useKeyboard } from "../../hooks/useKeyboard";
import { computeDisplayBoard } from "../../utils/gameLogic";
// import NextPiece from "../NextPiece/NextPiece";
// import Stats from "../Stats/Stats";
import Tile from "../Tile/Tile";
import "./board.css";

const Board = () => {
  const { state, dispatch } = useGameContext();

  // Derived displayBoard can be memoized if needed
  const displayBoard = computeDisplayBoard(state.board, state.piece);

  useGravity(dispatch, state.gameOver);
  useKeyboard(dispatch);

  return (
    <div className="board">
      {displayBoard.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <Tile key={`${rowIdx}-${colIdx}`} isActive={cell !== 0} />
        ))
      )}
    </div>
  );
};

export default Board;
