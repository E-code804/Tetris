import { Board } from "../types/board";
import { Piece } from "../types/piece";
import { Pieces } from "../utils/Pieces";
import { detectCollision } from "./useBoard";

export const getPiece = (): Piece => {
  const options = ["I", "O", "T", "S", "Z", "J", "L"];
  const randomType = options[Math.floor(Math.random() * options.length)];
  const newPiece: Piece = {
    shape: Pieces[randomType][0],
    position: { x: 0, y: 0 },
    rotationIndex: 0,
    type: randomType,
  };

  return newPiece;
};

export const rotatePiece = (piece: Piece, board: Board): Piece => {
  const nextRotationIndex = (piece.rotationIndex + 1) % Pieces[piece.type].length;
  console.log(nextRotationIndex, Pieces[piece.type][nextRotationIndex]);

  const testPiece = {
    ...piece,
    rotationIndex: nextRotationIndex,
    shape: Pieces[piece.type][nextRotationIndex],
  };

  if (!detectCollision(board, testPiece)) {
    return testPiece;
  }

  return piece;
};

const attemptMove = (piece: Piece, board: Board, dx: number, dy: number): Piece => {
  const newPosition = {
    x: piece.position.x + dx,
    y: piece.position.y + dy,
  };
  const newPiece = { ...piece, position: newPosition };

  return !detectCollision(board, newPiece) ? newPiece : piece;
};

export const moveRight = (piece: Piece, board: Board) =>
  attemptMove(piece, board, 1, 0);
export const moveDown = (piece: Piece, board: Board) =>
  attemptMove(piece, board, 0, 1);
export const moveLeft = (piece: Piece, board: Board) =>
  attemptMove(piece, board, -1, 0);
