import React from "react";
import "./tile.css";

type TileProps = {
  color: string;
  small?: boolean;
};

const Tile: React.FC<TileProps> = ({ color, small }) => {
  return <div className={`tile ${color} ${small ? "small" : ""}`} />;
};

export default Tile;
