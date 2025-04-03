import { Piece as PieceType } from "../../types/piece";
import Tile from "../Tile/Tile";
import "./piece.css";

type PieceProps = {
  name: string;
  piece: PieceType | null;
};

const Piece: React.FC<PieceProps> = ({ name, piece }) => {
  const rows = piece?.shape.length;
  const cols = piece?.shape[0].length;

  return (
    <div className="next-piece">
      <div className="label">{name}</div>
      <div
        className="mini-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 16px)`,
          gridTemplateRows: `repeat(${rows}, 16px)`,
        }}
      >
        {piece?.shape.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile
              key={`${rowIdx}-${colIdx}`}
              color={cell !== 0 ? piece?.color : ""}
              small
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Piece;
