// useGravity.js
import { useEffect } from "react";
import { GameAction } from "../types/game";

export const useGravity = (
  dispatch: React.ActionDispatch<[action: GameAction]>,
  gameOver: boolean
) => {
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      dispatch({ type: "MOVE_DOWN" });
    }, 500);

    return () => clearInterval(interval);
  }, [dispatch, gameOver]);
};
