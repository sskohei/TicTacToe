"use client";

import { useState } from "react";

// 消える三目並べ（各プレイヤーは最大3手まで保持）
export default function TicTacToe() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // 各プレイヤーの着手履歴（古い順）
  const [xHistory, setXHistory] = useState<number[]>([]);
  const [oHistory, setOHistory] = useState<number[]>([]);

  const winner = calculateWinner(board);

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const nextBoard = board.slice();

    if (isXNext) {
      const newHistory = [...xHistory, index];

      // 4手目以降は一番古いコマを消す
      if (newHistory.length > 3) {
        const removeIndex = newHistory.shift()!;
        nextBoard[removeIndex] = null;
      }

      nextBoard[index] = "X";
      setXHistory(newHistory);
    } else {
      const newHistory = [...oHistory, index];

      if (newHistory.length > 3) {
        const removeIndex = newHistory.shift()!;
        nextBoard[removeIndex] = null;
      }

      nextBoard[index] = "O";
      setOHistory(newHistory);
    }

    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setXHistory([]);
    setOHistory([]);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">消える三目並べ</h1>

      <p className="text-gray-600">
        各プレイヤーは最大3つまで。4つ目を置くと一番古いコマが消えます。
      </p>

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
