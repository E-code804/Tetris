import { useEffect, useRef, useState } from "react";
import {
  clearRows,
  detectCollision,
  mergePieceToBoard,
  resetBoard,
} from "../../hooks/useBoard";
import {
  getPiece,
  moveDown,
  moveLeft,
  moveRight,
  rotatePiece,
} from "../../hooks/usePiece";
import Tile from "../Tile/Tile";
import "./board.css";

const Board = () => {
  const [board, setBoard] = useState(() => resetBoard());
  const [piece, setPiece] = useState(() => getPiece());
  const [displayBoard, setDisplayBoard] = useState(() => resetBoard());
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [linesCleared, setLinesCleared] = useState(0);

  // Refs to track real-time values without causing re-renders
  const pieceRef = useRef(piece);
  const boardRef = useRef(board);
  const keyHoldRef = useRef<{ [key: string]: boolean }>({});
  const lastRotateTimeRef = useRef<number>(0);

  // Keep refs in sync with state
  useEffect(() => {
    pieceRef.current = piece;
    boardRef.current = board;

    const newDisplayBoard = board.map((row) => [...row]);

    piece.shape.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (cell !== 0) {
          const y = piece.position.y + rIdx;
          const x = piece.position.x + cIdx;

          if (
            y >= 0 &&
            y < newDisplayBoard.length &&
            x >= 0 &&
            x < newDisplayBoard[0].length
          ) {
            newDisplayBoard[y][x] = cell;
          }
        }
      });
    });

    setDisplayBoard(newDisplayBoard);
  }, [board, piece]);

  // Gravity (auto piece drop)
  useEffect(() => {
    const interval = setInterval(() => {
      const prevPiece = pieceRef.current;
      const board = boardRef.current;

      const newPiece = moveDown(prevPiece, board);

      if (newPiece === prevPiece) {
        const mergedBoard = mergePieceToBoard(board, prevPiece);
        const { board: clearedBoard, linesCleared: newLinesCleared } =
          clearRows(mergedBoard);

        setScore((prevScore) => prevScore + level * newLinesCleared);
        setLinesCleared((prevLinesCleared) => {
          const updatedLines = prevLinesCleared + newLinesCleared;

          setLevel((prevLevel) => {
            if (updatedLines / 10 > prevLevel) {
              return prevLevel + 1;
            }
            return prevLevel;
          });

          return updatedLines;
        });

        setBoard(clearedBoard);
        boardRef.current = clearedBoard;

        const nextPiece = getPiece();

        if (detectCollision(clearedBoard, nextPiece)) {
          console.log("Game Over");
          clearInterval(interval);
          return;
        }

        setPiece(nextPiece);
        pieceRef.current = nextPiece;
      } else {
        setPiece(newPiece);
        pieceRef.current = newPiece;
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // User controls
  useEffect(() => {
    const ROTATE_DELAY = 150; // ms

    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyHoldRef.current[e.key]) return;
      keyHoldRef.current[e.key] = true;

      const now = Date.now();

      setPiece((prev) => {
        let updated = prev;

        switch (e.key) {
          case "ArrowLeft":
          case "a":
            updated = moveLeft(prev, boardRef.current);
            break;
          case "ArrowRight":
          case "d":
            updated = moveRight(prev, boardRef.current);
            break;
          case "ArrowDown":
          case "s":
            updated = moveDown(prev, boardRef.current);
            setScore((prevScore) => prevScore + 1);
            break;
          case "z":
            if (now - lastRotateTimeRef.current > ROTATE_DELAY) {
              const rotated = rotatePiece(prev, boardRef.current);
              pieceRef.current = rotated;
              lastRotateTimeRef.current = now;
              return rotated;
            }
            return prev;
        }

        pieceRef.current = updated;
        return updated;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keyHoldRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="game">
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

      <div className="board">
        {displayBoard.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile key={`${rowIdx}-${colIdx}`} isActive={cell !== 0} />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
