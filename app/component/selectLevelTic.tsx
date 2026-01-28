'use client'

import { Button } from "@/components/ui/button"
import { useLevelStore } from "@/stores/levelStores"

export default function SelectLevelTic(){
    const difficulty = useLevelStore((state) => state.level)
    const changeDifficulty = useLevelStore((state) => state.changeDifficulty)

    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">難易度を選択</h1>
            <div className="flex gap-2">
              <Button onClick={() => changeDifficulty('easy')}>
                <a href="/tictactoeCPU">Easy</a>
              </Button>
              <Button onClick={() => changeDifficulty('normal')}>
                Normal
              </Button>
              <Button onClick={() => changeDifficulty('hard')}>
                Hard
              </Button>
              <Button onClick={() => console.log(difficulty)}>
                テスト
              </Button>
            </div>
        </div>
    )
}

