"use client";

import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index: number) {
    if (board[index] || winner) return;
    const nextBoard = board.slice();
    nextBoard[index] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">三目並べ（Tic Tac Toe）</h1>

      <div className="grid grid-cols-3 gap-2">
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 text-4xl font-bold border rounded-xl hover:bg-gray-100"
          >
            {value}
          </button>
        ))}
      </div>

      <div className="text-xl">
        {winner
          ? `勝者: ${winner}`
          : board.every(Boolean)
          ? "引き分け"
          : `次の手番: ${isXNext ? "X" : "O"}`}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-black text-white rounded-lg"
      >
        リセット
      </button>
    </div>
  );
}

function calculateWinner(board: ("X" | "O" | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}
