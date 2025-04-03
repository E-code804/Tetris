import { useGameContext } from "../../hooks/useGameContext";
import Piece from "./Piece";

const NextPiece = () => {
  const { state } = useGameContext();

  return <Piece name="Next Piece" piece={state.nextPiece} />;
};

export default NextPiece;
