import { useGameContext } from "../../hooks/useGameContext";
import Piece from "./Piece";

const HoldPiece = () => {
  const { state } = useGameContext();

  return <Piece name="Held Piece" piece={state.heldPiece} />;
};

export default HoldPiece;
