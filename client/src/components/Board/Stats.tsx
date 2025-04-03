type StatsProps = {
  score: number;
  level: number;
  linesCleared: number;
};

const Stats: React.FC<StatsProps> = ({ score, level, linesCleared }) => {
  return (
    <div className="stats">
      <div className="stat-block">
        <span className="label">Score</span>
        <span className="value">{score}</span>
      </div>
      <div className="stat-block">
        <span className="label">Level</span>
        <span className="value">{level}</span>
      </div>
      <div className="stat-block">
        <span className="label">Lines</span>
        <span className="value">{linesCleared}</span>
      </div>
    </div>
  );
};

export default Stats;
