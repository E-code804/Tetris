import React from "react";
import "./tile.css";

type TileProps = {
  // isActive: boolean;
  color?: string;
  small?: boolean;
};

const Tile: React.FC<TileProps> = ({ color, small }) => {
  // const tileClass = isActive && color ? `tile ${color}` : "tile";

  return <div className={`tile ${color} ${small ? "small" : ""}`} />;
};

export default Tile;
