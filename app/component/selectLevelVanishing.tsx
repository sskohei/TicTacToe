'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLevelStore } from "@/stores/levelStores"

export default function SelectLevelVanishing(){
    const difficulty = useLevelStore((state) => state.level)
    const changeDifficulty = useLevelStore((state) => state.changeDifficulty)

    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">難易度を選択</h1>
            <div className="flex gap-2">
              <Button onClick={() => changeDifficulty("easy")}>
                <Link href="/vanishingCPU">Easy</Link>
              </Button>
              <Button onClick={() => changeDifficulty("normal")}>
                <Link href="/vanishingCPU">Normal</Link>
              </Button>
              <Button onClick={() => changeDifficulty("hard")}>
                <Link href="/vanishingCPU">Hard</Link>
              </Button>
            </div>
        </div>
    )
}

