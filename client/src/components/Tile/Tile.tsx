import React from "react";
import "./tile.css";

type TileProps = {
  isActive: boolean;
  small?: boolean;
};

const Tile: React.FC<TileProps> = ({ isActive, small }) => {
  return (
    <div className={`tile ${isActive ? "active" : ""} ${small ? "small" : ""}`} />
  );
};

export default Tile;
