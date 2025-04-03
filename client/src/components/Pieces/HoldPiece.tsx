import { useGameContext } from "../../hooks/useGameContext";
import Tile from "../Tile/Tile";
import "./nextpiece.css";

const HoldPiece = () => {
  const { state } = useGameContext();
  const rows = state.heldPiece?.shape.length;
  const cols = state.heldPiece?.shape[0].length;

  return (
    <div className="next-piece">
      <div className="label">Held Piece</div>
      <div
        className="mini-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 16px)`,
          gridTemplateRows: `repeat(${rows}, 16px)`,
        }}
      >
        {state.heldPiece?.shape.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile
              key={`${rowIdx}-${colIdx}`}
              isActive={cell !== 0}
              color={state.heldPiece?.color}
              small
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HoldPiece;
