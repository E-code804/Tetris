import { Position } from "./position";

export type Piece = {
  shape: number[][];
  position: Position;
  rotationIndex: number;
  type: string;
};
