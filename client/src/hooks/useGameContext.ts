import { useContext } from "react";
import { GameContext } from "../context/GameContext"; // Adjust the path as needed

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameContextProvider");
  }
  return context;
};
