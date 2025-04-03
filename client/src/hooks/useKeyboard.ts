// useKeyboard.js
import { useEffect } from "react";
import { GameAction } from "../types/game";

export const useKeyboard = (
  dispatch: React.ActionDispatch<[action: GameAction]>
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          dispatch({ type: "DROP_PIECE" });
          break;
        case "ArrowLeft":
        case "a":
          dispatch({ type: "MOVE_LEFT" });
          break;
        case "ArrowRight":
        case "d":
          dispatch({ type: "MOVE_RIGHT" });
          break;
        case "ArrowDown":
        case "s":
          dispatch({ type: "MOVE_DOWN" });
          dispatch({ type: "UPDATE_ON_DOWN_PRESS" });
          break;
        case "z":
          dispatch({ type: "ROTATE" });
          break;
        case "x":
          dispatch({ type: "HELD_PIECE" });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);
};
