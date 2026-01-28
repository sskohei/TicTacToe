import { create } from "zustand";

type Difficulty = {
    level:string;
}

type Action = {
    changeDiffhculty:(by:string) => void;
};

export const useLvelStore = create<Difficulty & Action>()((set) => ({
    level:'easy',
    changeDiffhculty:(by) => set((state) => ({level:by})),
}));