import React from "react";
import "./tile.css";

type TileProps = {
  isActive: boolean;
};

const Tile: React.FC<TileProps> = ({ isActive }) => {
  return <div className={`tile ${isActive ? "active" : ""}`}></div>;
};

export default Tile;
