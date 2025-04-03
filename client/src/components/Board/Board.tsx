import { useEffect } from "react";
// import {
//   clearRows,
//   detectCollision,
//   mergePieceToBoard,
//   resetBoard,
// } from "../../hooks/useBoard";
// import {
//   getPiece,
//   moveDown,
//   moveLeft,
//   moveRight,
//   rotatePiece,
// } from "../../hooks/usePiece";
// import { calcScore } from "../../utils/gameLogic";
import Tile from "../Tile/Tile";
import "./board.css";
import NextPiece from "./NextPiece";
import Stats from "./Stats";

// const Board = () => {
//   const [board, setBoard] = useState(() => resetBoard());
//   const [piece, setPiece] = useState(() => getPiece());
//   const [displayBoard, setDisplayBoard] = useState(() => resetBoard());
//   const [score, setScore] = useState(0);
//   const [level, setLevel] = useState(0);
//   const [linesCleared, setLinesCleared] = useState(0);
//   const [nextPiece, setNextPiece] = useState(() => getPiece());

//   // Refs to track real-time values without causing re-renders
//   const pieceRef = useRef(piece);
//   const nextPieceRef = useRef(nextPiece);
//   const boardRef = useRef(board);
//   const keyHoldRef = useRef<{ [key: string]: boolean }>({});
//   const lastRotateTimeRef = useRef<number>(0);

//   useEffect(() => {
//     // Update the ref whenever nextPiece changes
//     nextPieceRef.current = nextPiece;
//   }, [nextPiece]);

//   // Keep refs in sync with state
//   useEffect(() => {
//     pieceRef.current = piece;
//     boardRef.current = board;

//     const newDisplayBoard = board.map((row) => [...row]);

//     piece.shape.forEach((row, rIdx) => {
//       row.forEach((cell, cIdx) => {
//         if (cell !== 0) {
//           const y = piece.position.y + rIdx;
//           const x = piece.position.x + cIdx;

//           if (
//             y >= 0 &&
//             y < newDisplayBoard.length &&
//             x >= 0 &&
//             x < newDisplayBoard[0].length
//           ) {
//             newDisplayBoard[y][x] = cell;
//           }
//         }
//       });
//     });

//     setDisplayBoard(newDisplayBoard);
//   }, [board, piece]);

//   // Gravity (auto piece drop)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const prevPiece = pieceRef.current;
//       const board = boardRef.current;

//       const newPiece = moveDown(prevPiece, board);

//       if (newPiece === prevPiece) {
//         console.log("Same piece");

//         const mergedBoard = mergePieceToBoard(board, prevPiece);
//         const { board: clearedBoard, linesCleared: newLinesCleared } =
//           clearRows(mergedBoard);

//         setScore((prevScore) => prevScore + calcScore(level, newLinesCleared));
//         setLinesCleared((prevLinesCleared) => {
//           const updatedLines = prevLinesCleared + newLinesCleared;

//           setLevel((prevLevel) => {
//             if (updatedLines / 10 > prevLevel) {
//               return prevLevel + 1;
//             }
//             return prevLevel;
//           });

//           return updatedLines;
//         });

//         setBoard(clearedBoard);
//         boardRef.current = clearedBoard;

//         // Use the ref to get the updated nextPiece
//         const upcoming = nextPieceRef.current;

//         if (detectCollision(clearedBoard, upcoming)) {
//           console.log("Game Over");
//           clearInterval(interval);
//           return;
//         }

//         setPiece(upcoming);
//         pieceRef.current = upcoming;
//         const newNext = getPiece();
//         console.log(newNext);

//         setNextPiece(newNext);
//       } else {
//         setPiece(newPiece);
//         pieceRef.current = newPiece;
//       }
//     }, 500);

//     return () => clearInterval(interval);
//   }, [level]);

//   // User controls
//   useEffect(() => {
//     const ROTATE_DELAY = 150; // ms

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (keyHoldRef.current[e.key]) return;
//       keyHoldRef.current[e.key] = true;

//       const now = Date.now();

//       setPiece((prev) => {
//         let updated = prev;

//         switch (e.key) {
//           case "ArrowLeft":
//           case "a":
//             updated = moveLeft(prev, boardRef.current);
//             break;
//           case "ArrowRight":
//           case "d":
//             updated = moveRight(prev, boardRef.current);
//             break;
//           case "ArrowDown":
//           case "s":
//             updated = moveDown(prev, boardRef.current);
//             setScore((prevScore) => prevScore + 0.5);
//             break;
//           case "z":
//             if (now - lastRotateTimeRef.current > ROTATE_DELAY) {
//               const rotated = rotatePiece(prev, boardRef.current);
//               pieceRef.current = rotated;
//               lastRotateTimeRef.current = now;
//               return rotated;
//             }
//             return prev;
//         }

//         pieceRef.current = updated;
//         return updated;
//       });
//     };

//     const handleKeyUp = (e: KeyboardEvent) => {
//       keyHoldRef.current[e.key] = false;
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     window.addEventListener("keyup", handleKeyUp);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       window.removeEventListener("keyup", handleKeyUp);
//     };
//   }, []);

//   return (
//     <div className="game">
//       <div className="board">
//         {displayBoard.map((row, rowIdx) =>
//           row.map((cell, colIdx) => (
//             <Tile key={`${rowIdx}-${colIdx}`} isActive={cell !== 0} />
//           ))
//         )}
//       </div>

//       <div className="game-ui-elements">
//         <Stats score={score} level={level} linesCleared={linesCleared} />

//         <NextPiece piece={nextPiece} />
//       </div>
//     </div>
//   );
// };

// export default Board;
import { useReducer } from "react";
import { gameReducer, initialState } from "../../gameReducer";
// import { Board as BoardType } from "../../types/board";
// import { Piece } from "../../types/piece";
import { useGravity } from "../../hooks/useGravity";
import { useKeyboard } from "../../hooks/useKeyboard";
import { computeDisplayBoard } from "../../utils/gameLogic";

const Board = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Derived displayBoard can be memoized if needed
  const displayBoard = computeDisplayBoard(state.board, state.piece);

  // Gravity timer
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       dispatch({ type: "MOVE_DOWN" });
  //       if (state.gameOver) {
  //         return;
  //       }
  //     }, 500);
  //     return () => clearInterval(interval);
  //   }, [state.gameOver, state.level]);
  useGravity(dispatch, state.gameOver);
  useKeyboard(dispatch);

  // Key event handling
  //   useEffect(() => {
  //     const handleKeyDown = (e: KeyboardEvent) => {
  //       switch (e.key) {
  //         case "ArrowLeft":
  //         case "a":
  //           dispatch({ type: "MOVE_LEFT" });
  //           break;
  //         case "ArrowRight":
  //         case "d":
  //           dispatch({ type: "MOVE_RIGHT" });
  //           break;
  //         case "ArrowDown":
  //         case "s":
  //           dispatch({ type: "MOVE_DOWN" });
  //           dispatch({ type: "UPDATE_ON_DOWN_PRESS" });
  //           break;
  //         case "z":
  //           dispatch({ type: "ROTATE" });
  //           break;
  //         default:
  //           break;
  //       }
  //     };

  //     window.addEventListener("keydown", handleKeyDown);
  //     return () => window.removeEventListener("keydown", handleKeyDown);
  //   }, []);

  return (
    <div className="game">
      <div className="board">
        {displayBoard.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile key={`${rowIdx}-${colIdx}`} isActive={cell !== 0} />
          ))
        )}
      </div>

      <div className="game-ui-elements">
        <Stats
          score={state.score}
          level={state.level}
          linesCleared={state.linesCleared}
        />
        <NextPiece piece={state.nextPiece} />
      </div>
    </div>
  );
};

export default Board;
