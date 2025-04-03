import Board from "../Board/Board";
import NextPiece from "../NextPiece/NextPiece";
import Stats from "../Stats/Stats";
import "./singleplayergame.css";

const SinglePlayerGame = () => {
  return (
    <div className="game">
      <Board />

      <div className="game-ui-elements">
        <Stats />

        <NextPiece />
      </div>
    </div>
  );
};

export default SinglePlayerGame;
