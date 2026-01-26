import { Button } from "@/components/ui/button"

export default function Home(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center gap-6">
            <h1 className="text-3xl font-bold">モードを選択</h1>
            <div className="flex gap-2">
              <Button>
                <a href="/">一人用</a>
              </Button>
              <Button>
                <a href="/vanishing">二人用</a>
              </Button>
            </div>
        </div>
    )
}

