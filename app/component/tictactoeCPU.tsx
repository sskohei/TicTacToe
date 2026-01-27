"use client";

import { useEffect, useState } from "react";

// ============================
// 難易度付き CPU 三目並べ
// ============================
const HUMAN = "X";
const CPU = "O";

type Difficulty = "easy" | "normal" | "hard";

export default function TicTacToe() {
  const [board, setBoard] = useState<("X" | "O" | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");

  const winner = calculateWinner(board);

  // ============================
  // プレイヤーの操作
  // ============================
  function handleClick(index: number) {
    if (board[index] || winner) return;

    const next = board.slice();
    next[index] = isXNext ? HUMAN : CPU;

    setBoard(next);
    setIsXNext(!isXNext);
  }

  // ============================
  // CPUターン
  // ============================
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        cpuMove();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, board, difficulty]);

  function cpuMove() {
    const empty = getEmptyCells(board);
    if (empty.length === 0) return;

    let index: number;

    switch (difficulty) {
      case "easy":
        index = randomMove(empty);
        break;

      case "normal":
        index = normalMove(board, empty);
        break;

      case "hard":
        index = minimaxMove(board);
        break;
    }

    handleClick(index);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold">三目並べ（難易度選択）</h1>

      {/* 難易度選択 */}
      <div className="flex gap-2">
        <button
          onClick={() => setDifficulty("easy")}
          className={`px-4 py-1 rounded ${difficulty === "easy" ? "bg-black text-white" : "border"}`}
        >
          Easy
        </button>
        <button
          onClick={() => setDifficulty("normal")}
          className={`px-4 py-1 rounded ${difficulty === "normal" ? "bg-black text-white" : "border"}`}
        >
          Normal
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className={`px-4 py-1 rounded ${difficulty === "hard" ? "bg-black text-white" : "border"}`}
        >
          Hard
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((v, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 text-4xl font-bold border rounded-xl hover:bg-gray-100"
          >
            {v}
          </button>
        ))}
      </div>

      <div className="text-xl">
        {winner
          ? `勝者: ${winner}`
          : board.every(Boolean)
          ? "引き分け"
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

// ============================
// CPUロジック
// ============================

function getEmptyCells(board: ("X" | "O" | null)[]) {
  return board
    .map((v, i) => (v === null ? i : null))
    .filter((v): v is number => v !== null);
}

function randomMove(empty: number[]) {
  return empty[Math.floor(Math.random() * empty.length)];
}

// 勝てる手 or 防ぐ手
function normalMove(board: ("X" | "O" | null)[], empty: number[]) {
  for (const i of empty) {
    const copy = board.slice();
    copy[i] = CPU;
    if (calculateWinner(copy) === CPU) return i;
  }

  for (const i of empty) {
    const copy = board.slice();
    copy[i] = HUMAN;
    if (calculateWinner(copy) === HUMAN) return i;
  }

  return randomMove(empty);
}

// 最強AI（minimax）
function minimaxMove(board: ("X" | "O" | null)[]) {
  let bestScore = -Infinity;
  let bestMove = 0;

  for (const i of getEmptyCells(board)) {
    const copy = board.slice();
    copy[i] = CPU;
    const score = minimax(copy, false);

    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
}

function minimax(
  board: ("X" | "O" | null)[],
  isMaximizing: boolean
): number {
  const winner = calculateWinner(board);

  if (winner === CPU) return 1;
  if (winner === HUMAN) return -1;
  if (board.every(Boolean)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (const i of getEmptyCells(board)) {
      const copy = board.slice();
      copy[i] = CPU;
      best = Math.max(best, minimax(copy, false));
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of getEmptyCells(board)) {
      const copy = board.slice();
      copy[i] = HUMAN;
      best = Math.min(best, minimax(copy, true));
    }
    return best;
  }
}

// ============================
// 勝敗判定
// ============================
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
