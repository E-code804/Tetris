import "./App.css";
import SinglePlayerGame from "./components/SinglePlayerGame/SinglePlayerGame";
import { GameContextProvider } from "./context/GameContext";

function App() {
  return (
    <div className="main">
      <GameContextProvider>
        <SinglePlayerGame />
      </GameContextProvider>
    </div>
  );
}

export default App;
