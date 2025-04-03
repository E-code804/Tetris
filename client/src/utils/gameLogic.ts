import { detectCollision } from "../hooks/useBoard";
import { Board } from "../types/board";
import { Piece } from "../types/piece";

export const calcScore = (level: number, linesCleared: number) => {
  const multiplier = level + 1;
  console.log(multiplier);

  switch (linesCleared) {
    case 1:
      return 40 * multiplier;
    case 2:
      return 100 * multiplier;
    case 3:
      return 300 * multiplier;
    case 4:
      return 1200 * multiplier;
    default:
      return 0;
  }
};

export const computeDisplayBoard = (
  board: Board,
  piece: Piece,
  ghostPiece: Piece
): Board => {
  const newDisplayBoard = board.map((row) => [...row]);

  ghostPiece.shape.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell !== 0) {
        const y = ghostPiece.position.y + rIdx;
        const x = ghostPiece.position.x + cIdx;
        if (
          y >= 0 &&
          y < newDisplayBoard.length &&
          x >= 0 &&
          x < newDisplayBoard[0].length
        ) {
          newDisplayBoard[y][x] = ghostPiece.color;
        }
      }
    });
  });

  piece.shape.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell !== 0) {
        const y = piece.position.y + rIdx;
        const x = piece.position.x + cIdx;
        if (
          y >= 0 &&
          y < newDisplayBoard.length &&
          x >= 0 &&
          x < newDisplayBoard[0].length
        ) {
          newDisplayBoard[y][x] = piece.color;
        }
      }
    });
  });

  return newDisplayBoard;
};

export const computeGhostPiece = (board: Board, piece: Piece): Piece => {
  let ghostPiece = { ...piece, position: { ...piece.position }, color: "ghost" };

  // See how far down it goes
  while (!detectCollision(board, ghostPiece)) {
    ghostPiece = {
      ...ghostPiece,
      position: {
        ...ghostPiece.position,
        y: ghostPiece.position.y + 1,
      },
    };
  }

  ghostPiece = {
    ...ghostPiece,
    position: {
      ...ghostPiece.position,
      y: ghostPiece.position.y - 1,
    },
  };

  return ghostPiece;
};
