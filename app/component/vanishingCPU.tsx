"use client";

import { useEffect, useState } from "react";

const HUMAN = "X";
const CPU = "O";

export default function VanishingCPU() {
  const [board, setBoard] =
    useState<("X" | "O" | null)[]>(Array(9).fill(null));

  const [isXNext, setIsXNext] = useState(true);

  const [xHistory, setXHistory] = useState<number[]>([]);
  const [oHistory, setOHistory] = useState<number[]>([]);

  const [willDisappear, setWillDisappear] =
    useState<number | null>(null);

  const winner = calculateWinner(board);

  function handleClick(index: number) {
    if (board[index] || winner) return;

    const nextBoard = board.slice();

    if (isXNext) {
      const newHistory = [...xHistory, index];

      if (newHistory.length > 3) {
        const remove = newHistory.shift()!;
        setWillDisappear(remove);

        setTimeout(() => {
          nextBoard[remove] = null;
          setBoard([...nextBoard]);
          setWillDisappear(null);
        }, 400);
      }

      nextBoard[index] = HUMAN;
      setXHistory(newHistory);
    } else {
      const newHistory = [...oHistory, index];

      if (newHistory.length > 3) {
        const remove = newHistory.shift()!;
        setWillDisappear(remove);

        setTimeout(() => {
          nextBoard[remove] = null;
          setBoard([...nextBoard]);
          setWillDisappear(null);
        }, 400);
      }

      nextBoard[index] = CPU;
      setOHistory(newHistory);
    }

    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  // 🤖 CPUの自動行動
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        cpuMove();
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [isXNext, board]);

  function cpuMove() {
    const empty = board
      .map((v, i) => (v === null ? i : null))
      .filter((v): v is number => v !== null);

    if (empty.length === 0) return;

    const index =
      empty[Math.floor(Math.random() * empty.length)];

    handleClick(index);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setXHistory([]);
    setOHistory([]);
    setWillDisappear(null);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        消える三目並べ（CPU対戦）
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {board.map((v, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-24 h-24 text-4xl font-bold border rounded-xl
              transition-all
              ${
                willDisappear === i
                  ? "bg-red-500 text-white animate-pulse"
                  : "hover:bg-gray-100"
              }`}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="text-xl">
        {winner
          ? `勝者: ${winner}`
          : isXNext
          ? "あなたの番（X）"
          : "CPU 思考中…"}
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

function calculateWinner(
  board: ("X" | "O" | null)[]
) {
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
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}
