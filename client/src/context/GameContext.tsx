import { ReactNode, useReducer } from "react";
import { GameContext } from "./CreateGameContext";
import { gameReducer, initialState } from "./gameReducer";

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
