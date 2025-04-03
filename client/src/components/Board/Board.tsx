import { useGameContext } from "../../hooks/useGameContext";
import { useGravity } from "../../hooks/useGravity";
import { useKeyboard } from "../../hooks/useKeyboard";
import { computeDisplayBoard, computeGhostPiece } from "../../utils/gameLogic";
import Tile from "../Tile/Tile";
import "./board.css";

const Board = () => {
  const { state, dispatch } = useGameContext();

  // Derived displayBoard - can be memoized if nec.
  const ghostPiece = computeGhostPiece(state.board, state.piece);
  const displayBoard = computeDisplayBoard(state.board, state.piece, ghostPiece);

  useGravity(dispatch, state.gameOver);
  useKeyboard(dispatch, state.gameOver);

  return (
    <div className="board">
      {displayBoard.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <Tile
            key={`${rowIdx}-${colIdx}`}
            // isActive={cell !== 0}
            color={cell !== 0 ? cell : undefined}
          />
        ))
      )}
    </div>
  );
};

export default Board;
