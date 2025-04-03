import Board from "../Board/Board";
import HoldPiece from "../Pieces/HoldPiece";
import NextPiece from "../Pieces/NextPiece";
import Stats from "../Stats/Stats";
import "./singleplayergame.css";

const SinglePlayerGame = () => {
  return (
    <div className="game">
      <Board />

      <div className="game-ui-elements">
        <Stats />

        <NextPiece />

        <HoldPiece />
      </div>
    </div>
  );
};

export default SinglePlayerGame;
