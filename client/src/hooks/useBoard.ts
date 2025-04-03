import { Board } from "../types/board";
import { Piece } from "../types/piece";

export const resetBoard = (): Board => {
  const board = Array.from({ length: 24 }, () => Array(10).fill(0));
  return board;
};

// Make detect collision -> t/f
export const detectCollision = (board: Board, piece: Piece): boolean => {
  const { shape, position } = piece;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] !== 0) {
        const boardY = position.y + r;
        const boardX = position.x + c;

        // Out of bounds (left, right, bottom)
        if (
          boardY >= board.length ||
          boardX < 0 ||
          boardX >= board[0].length ||
          (boardY >= 0 && board[boardY][boardX] !== 0)
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

// Call after a collision
export const mergePieceToBoard = (board: Board, piece: Piece): Board => {
  const newBoard = board.map((row) => [...row]);
  const { shape, position } = piece;

  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] !== 0) {
        const boardY = position.y + r;
        const boardX = position.x + c;

        // Ensure within bounds before placing
        if (
          boardY >= 0 &&
          boardY < newBoard.length &&
          boardX >= 0 &&
          boardX < newBoard[0].length
        ) {
          newBoard[boardY][boardX] = shape[r][c];
        }
      }
    }
  }

  return newBoard;
};

// Clears any full rows from the board
export const clearRows = (board: Board): { board: Board; linesCleared: number } => {
  const newBoard: Board = [];
  let linesCleared = 0;

  for (let r = 0; r < board.length; r++) {
    if (board[r].every((cell) => cell !== 0)) {
      linesCleared++;
    } else {
      newBoard.push([...board[r]]);
    }
  }

  // Add new empty rows at the top
  while (newBoard.length < board.length) {
    newBoard.unshift(Array(board[0].length).fill(0));
  }

  return { board: newBoard, linesCleared };
};
