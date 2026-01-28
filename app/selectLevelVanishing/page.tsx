import { Button } from "@/components/ui/button"

export default function SelectLevelVanishing(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">難易度を選択</h1>
            <div className="flex gap-2">
              <Button>
                <a href="/">Easy</a>
              </Button>
              <Button>
                <a href="/">Normal</a>
              </Button>
              <Button>
                <a href="/">Hard</a>
              </Button>
            </div>
        </div>
    )
}

