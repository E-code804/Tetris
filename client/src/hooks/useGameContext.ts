import { useContext } from "react";
import { GameContext } from "../context/CreateGameContext";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
