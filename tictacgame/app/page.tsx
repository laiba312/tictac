"use client"
import Block from "./components/block/block";
import { useState } from "react";

export default function Home() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (cells:any) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  };

  const isBoardFull = (cells:any[]) => {
    return cells.every((cell) => cell !== null);
  };

  const blockClickHandler = (index:number) => {
    if (gameOver || cells[index]) return;

    const newCells = [...cells];
    newCells[index] = currentTurn;
    setCells(newCells);

    const winner = checkWinner(newCells);
    if (winner) {
      setWinner(winner);
      setGameOver(true);
      return;
    }

    if (isBoardFull(newCells)) {
      setGameOver(true);
      return;
    }

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };

  const resetGame = () => {
    setCells(Array(9).fill(null));
    setCurrentTurn("X");
    setWinner("");
    setGameOver(false);
  };

  return (
    <>
      <div className="bg-indigo-500">
        <p className="text-center font-bold text-black text-7xl">
          Welcome to Tic Tac Toe
        </p>
      </div>
      <div className="board justify-center mt-10">
        <div className="mx-auto flex flex-wrap w-72">
          {cells.map((cell, index) => (
            <Block
              key={index}
              onClick={() => blockClickHandler(index)}
              value={cell}
            />
          ))}
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
      {winner && (
        <div className="text-center mt-4">
          <p className="font-bold text-2xl">
            {winner === "X" ? "Player X" : "Player O"} won the game!
          </p>
        </div>
      )}
      {gameOver && !winner && (
        <div className="text-center mt-4">
          <p className="font-bold text-2xl">Its a draw!</p>
        </div>
      )}
    </>
  );
}
