import React from "react";
// import { Pieces } from "../../utils/Pieces"; // adjust path as needed
import { Piece } from "../../types/piece";
import Tile from "../Tile/Tile";

type NextPieceProps = {
  piece: Piece;
};

const NextPiece: React.FC<NextPieceProps> = ({ piece }) => {
  const rows = piece.shape.length;
  const cols = piece.shape[0].length;

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
        {piece.shape.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile key={`${rowIdx}-${colIdx}`} isActive={cell !== 0} small />
          ))
        )}
      </div>
    </div>
  );
};

export default NextPiece;
