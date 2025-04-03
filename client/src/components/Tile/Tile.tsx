import React from "react";
import "./tile.css";

type TileProps = {
  isActive: boolean;
  color?: string;
  small?: boolean;
};

const Tile: React.FC<TileProps> = ({ isActive, color, small }) => {
  const tileClass = isActive && color ? `tile ${color}` : "tile";

  return <div className={`${tileClass} ${small ? "small" : ""}`} />;
};

export default Tile;
