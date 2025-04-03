import {
  clearRows,
  detectCollision,
  mergePieceToBoard,
  resetBoard,
} from "./hooks/useBoard";
import {
  getPiece,
  moveDown,
  moveLeft,
  moveRight,
  rotatePiece,
} from "./hooks/usePiece";
import { GameAction, GameState } from "./types/game";
import { calcScore } from "./utils/gameLogic";

export const initialState = {
  board: resetBoard(),
  piece: getPiece(),
  nextPiece: getPiece(),
  score: 0,
  level: 0,
  linesCleared: 0,
  gameOver: false,
};

export const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case "MOVE_LEFT": {
      const newPiece = moveLeft(state.piece, state.board);
      return { ...state, piece: newPiece };
    }
    case "MOVE_RIGHT": {
      const newPiece = moveRight(state.piece, state.board);
      return { ...state, piece: newPiece };
    }
    case "MOVE_DOWN": {
      const newPiece = moveDown(state.piece, state.board);

      if (newPiece === state.piece) {
        const mergedBoard = mergePieceToBoard(state.board, state.piece);
        const { board: clearedBoard, linesCleared } = clearRows(mergedBoard);
        const newScore = state.score + calcScore(state.level, linesCleared);
        const updatedLinesCleared = state.linesCleared + linesCleared;
        const newLevel =
          updatedLinesCleared / 10 > state.level ? state.level + 1 : state.level;

        const newState = {
          board: clearedBoard,
          piece: state.nextPiece,
          nextPiece: getPiece(),
          score: newScore,
          level: newLevel,
          linesCleared: updatedLinesCleared,
        };

        return {
          ...newState,
          gameOver: detectCollision(clearedBoard, state.nextPiece), // If a collision if detected here, gameOver
        };
      }

      return { ...state, piece: newPiece };
    }
    case "ROTATE": {
      const rotatedPiece = rotatePiece(state.piece, state.board);
      return { ...state, piece: rotatedPiece };
    }
    case "UPDATE_ON_DOWN_PRESS": {
      return { ...state, score: state.score + 1 };
    }
    case "RESET": {
      return initialState;
    }
    default:
      return state;
  }
};
