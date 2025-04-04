import { Board } from "./board";
import { Piece } from "./piece";

export type GameState = {
  board: Board;
  piece: Piece;
  nextPiece: Piece;
  heldPiece: Piece | null;
  score: number;
  level: number;
  linesCleared: number;
  gameOver: boolean;
};

export type GameAction =
  | { type: "MOVE_LEFT" }
  | { type: "MOVE_RIGHT" }
  | { type: "MOVE_DOWN" }
  | { type: "ROTATE" }
  | { type: "UPDATE_ON_DOWN_PRESS" }
  | { type: "HELD_PIECE" }
  | { type: "DROP_PIECE" }
  | { type: "RESET"; payload?: { board?: number[][]; score?: number } };
