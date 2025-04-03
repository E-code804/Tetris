import { useGameContext } from "../../hooks/useGameContext";
import Tile from "../Tile/Tile";
import "./nextpiece.css";

const NextPiece = () => {
  const { state } = useGameContext();
  const rows = state.nextPiece.shape.length;
  const cols = state.nextPiece.shape[0].length;

  return (
    <div className="next-piece">
      <div className="label">Next Piece</div>
      <div
        className="mini-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 16px)`,
          gridTemplateRows: `repeat(${rows}, 16px)`,
        }}
      >
        {state.nextPiece.shape.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile key={`${rowIdx}-${colIdx}`} isActive={cell !== 0} small />
          ))
        )}
      </div>
    </div>
  );
};

export default NextPiece;
