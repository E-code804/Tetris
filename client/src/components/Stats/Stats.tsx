import { useGameContext } from "../../hooks/useGameContext";
import "./stats.css";

const Stats = () => {
  const { state } = useGameContext();
  return (
    <div className="stats">
      <div className="stat-block">
        <span className="label">Score</span>
        <span className="value">{state.score}</span>
      </div>
      <div className="stat-block">
        <span className="label">Level</span>
        <span className="value">{state.level}</span>
      </div>
      <div className="stat-block">
        <span className="label">Lines</span>
        <span className="value">{state.linesCleared}</span>
      </div>
    </div>
  );
};

export default Stats;
