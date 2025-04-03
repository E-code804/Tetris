import React from "react";
import "./tile.css";

type TileProps = {
  isActive: boolean;
  small?: boolean;
};

const Tile: React.FC<TileProps> = ({ isActive, small }) => {
  // const colors = ["red", "blue", "green"];
  // const color = colors[Math.floor(Math.random() * colors.length)];
  return (
    <div className={`tile ${isActive ? "active" : ""} ${small ? "small" : ""}`} />
  );
};

export default Tile;
