import { Board } from "../types/board";
import { Piece } from "../types/piece";
import { Pieces } from "../utils/Pieces";
import { detectCollision } from "./useBoard";

export const getPiece = (): Piece => {
  const options = ["I", "O", "T", "S", "Z", "J", "L"];
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

  const randomType = options[Math.floor(Math.random() * options.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const newPiece: Piece = {
    shape: Pieces[randomType][0],
    position: { x: 0, y: 0 },
    rotationIndex: 0,
    type: randomType,
    color: randomColor,
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

export const dropPiece = (piece: Piece, board: Board): [Piece, number] => {
  let droppedPiece = { ...piece, position: { ...piece.position } };
  let droppedSpaces = 0;

  // See how far down it goes
  while (!detectCollision(board, droppedPiece)) {
    droppedSpaces++;
    droppedPiece = {
      ...droppedPiece,
      position: {
        ...droppedPiece.position,
        y: droppedPiece.position.y + 1,
      },
    };
  }

  droppedPiece = {
    ...droppedPiece,
    position: {
      ...droppedPiece.position,
      y: droppedPiece.position.y - 1,
    },
  };
  droppedSpaces--;

  return [droppedPiece, droppedSpaces];
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
