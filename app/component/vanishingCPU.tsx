'use client';

import { useEffect, useState } from 'react';
import { useLevelStore } from '@/stores/levelStores';

type Player = 'X' | 'O' | null;
type Difficulty = 'easy' | 'normal' | 'hard';

export default function Page() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xQueue, setXQueue] = useState<number[]>([]);
  const [oQueue, setOQueue] = useState<number[]>([]);
  const [isXNext, setIsXNext] = useState(true);
  //const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const difficulty = useLevelStore((state) => state.level)

  const winner = calculateWinner(board);
   // 🔴 消える予定のマス
  const [willDisappear, setWillDisappear] = useState<number | null>(null);

  // ===============================
  // CPUターン
  // ===============================
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(cpuMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, difficulty]);

  // ===============================
  // プレイヤー操作
  // ===============================
  function handleClick(i: number) {
    if (!isXNext || board[i] || winner) return;

    const newBoard = [...board];
    const newQueue = [...xQueue, i];

    // 古いコマを消す
    if (newQueue.length > 3) {
        const removeIndex = newQueue.shift()!;

        // 🔴 消える予定として一旦保存
        setWillDisappear(removeIndex);

        // 少し遅れて消す（赤く光らせる時間）
        setTimeout(() => {
          newBoard[removeIndex] = null;
          setBoard([...newBoard]);
          setWillDisappear(null);
        }, 500);
      }

    newBoard[i] = 'X';

    setBoard(newBoard);
    setXQueue(newQueue);
    setIsXNext(false);
  }

  // ===============================
  // CPU思考
  // ===============================
  function cpuMove() {
    const empty = board
      .map((v, i) => (v === null ? i : null))
      .filter(v => v !== null) as number[];

    if (empty.length === 0) return;

    let move = 0;

    if (difficulty === 'easy') {
      move = empty[Math.floor(Math.random() * empty.length)];
    }

    else if (difficulty === 'normal') {
      move = normalMove(board, empty);
    }

    else {
      move = minimaxMove(board, oQueue, xQueue);
    }

    const newBoard = [...board];
    const newQueue = [...oQueue, move];

    if (newQueue.length > 3) {
      const removed = newQueue.shift()!;
      newBoard[removed] = null;
    }

    newBoard[move] = 'O';

    setBoard(newBoard);
    setOQueue(newQueue);
    setIsXNext(true);
  }

  // ===============================
  // リセット
  // ===============================
  function reset() {
    setBoard(Array(9).fill(null));
    setXQueue([]);
    setOQueue([]);
    setIsXNext(true);
  }

  // ===============================
  // UI
  // ===============================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold">消える三目並べ</h1>

      {/* 難易度 */}
      

      {/* 盤面 */}
      <div
        className="grid grid-cols-3 gap-2">
        {board.map((v, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`
              w-24 h-24 text-4xl font-bold border rounded-xl
              transition-all duration-300
              ${willDisappear === i ? "bg-red-500 text-white animate-pulse" : "hover:bg-gray-100"}
            `}
          >
            {v}
          </button>
        ))}
      </div>

      <div className="text-xl">
        {winner
          ? `勝者：${winner}`
          : isXNext
          ? 'あなたの番(X)'
          : 'CPU思考中…'}
      </div>
        <button onClick={reset} className="px-6 py-2 bg-black text-white rounded-lg">
          リセット
        </button>
    </div>
  );
}

/* =====================================
   勝利判定
===================================== */
function calculateWinner(b: Player[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (const [a, b1, c] of lines) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a];
    }
  }
  return null;
}

/* =====================================
   Normal CPU
===================================== */
function normalMove(board: Player[], empty: number[]) {
  // 勝てる手
  for (const i of empty) {
    const copy = [...board];
    copy[i] = 'O';
    if (calculateWinner(copy) === 'O') return i;
  }

  // 防御
  for (const i of empty) {
    const copy = [...board];
    copy[i] = 'X';
    if (calculateWinner(copy) === 'X') return i;
  }

  // ランダム
  return empty[Math.floor(Math.random() * empty.length)];
}

/* =====================================
   Hard CPU（消える三目並べ対応）
===================================== */
function minimaxMove(
  board: Player[],
  oQueue: number[],
  xQueue: number[]
) {
  let bestScore = -Infinity;
  let bestMove = 0;

  const MAX_DEPTH = 6;
  for (let i = 0; i < 9; i++) {
    if (board[i]) continue;

    const b = [...board];
    const oq = [...oQueue, i];

    if (oq.length > 3) {
      b[oq.shift()!] = null;
    }

    b[i] = 'O';

    const score = minimax(b, oq, xQueue, false,MAX_DEPTH - 1);

    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }

  return bestMove;
}

function minimax(
  board: Player[],
  oQueue: number[],
  xQueue: number[],
  isMax: boolean,
  depth: number
): number {
  const winner = calculateWinner(board);
  if (winner === 'O') return 10 + depth;
  if (winner === 'X') return -10 - depth;

  if (depth === 0) return 0;
  
  const empty = board
    .map((v, i) => (v ? null : i))
    .filter(v => v !== null) as number[];

  if (empty.length === 0) return 0;

  if (isMax) {
    let best = -Infinity;
    for (const i of empty) {
      const b = [...board];
      const oq = [...oQueue, i];

      if (oq.length > 3) b[oq.shift()!] = null;
      b[i] = 'O';

      best = Math.max(best, minimax(b, oq, xQueue, false,depth - 1));
    }
    return best;
  } else {
    let best = Infinity;
    for (const i of empty) {
      const b = [...board];
      const xq = [...xQueue, i];

      if (xq.length > 3) b[xq.shift()!] = null;
      b[i] = 'X';

      best = Math.min(best, minimax(b, oQueue, xq, true,depth - 1));
    }
    return best;
  }
}
