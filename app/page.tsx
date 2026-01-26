import Image from "next/image";
import Home from "./home/page";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Home/>
    </div>
  );
}
