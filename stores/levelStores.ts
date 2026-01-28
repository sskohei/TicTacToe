import { create } from "zustand";

type Difficulty = {
    level:string;
}

type Action = {
    changeDifficulty:(by:string) => void;
};

export const useLevelStore = create<Difficulty & Action>()((set) => ({
    level:'easy',
    changeDifficulty:(by) => set((state) => ({level:by})),
}));