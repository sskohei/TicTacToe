import { Button } from "@/components/ui/button"

export default function Home(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">ゲームを選択</h1>
            <div className="flex gap-2">
              <Button>
                <a href="/selectTic">三目並べ</a>
              </Button>
              <Button>
                <a href="/selectVanish">消える三目並べ</a>
              </Button>
            </div>
        </div>
    )
}

