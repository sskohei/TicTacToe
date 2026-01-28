import { create } from "zustand";

type Difficulty = "easy" | "normal" | "hard";

type Action = {
  level: Difficulty;
  changeDifficulty: (by: Difficulty) => void;
};

export const useLevelStore = create<Action>()((set) => ({
  level: "easy",
  changeDifficulty: (level) => set({ level }),
}));