import { createContext, ReactNode, useReducer } from "react";
import { gameReducer, initialState } from "../gameReducer";
import { GameAction, GameState } from "../types/game";

// eslint-disable-next-line react-refresh/only-export-components
export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
