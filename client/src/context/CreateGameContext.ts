import { createContext } from "react";
import { GameAction, GameState } from "../types/game";

export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);
