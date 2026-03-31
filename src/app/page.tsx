import { Header } from "@/components/Header";
import { StampGrid } from "@/components/StampGrid";

export default function Home() {
  return (
    <>
      <Header title="京都スタンプラリー" subtitle="京都のローカルなお店を巡ろう" />
      <div className="max-w-lg mx-auto px-4 py-6">
        <StampGrid />
      </div>
    </>
  );
}
