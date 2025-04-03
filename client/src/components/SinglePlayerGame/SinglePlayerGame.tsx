import Board from "../Board/Board";
import GameOverMenu from "../Menu/GameOverMenu";
import HoldPiece from "../Pieces/HoldPiece";
import NextPiece from "../Pieces/NextPiece";
import Stats from "../Stats/Stats";
import "./singleplayergame.css";

const SinglePlayerGame = () => {
  return (
    <div className="game">
      <GameOverMenu />
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
