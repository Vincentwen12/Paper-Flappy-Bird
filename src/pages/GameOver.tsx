import { useNavigate } from "react-router-dom";
import { GhostButton } from "@/components/GhostButton";
import { PaperCard } from "@/components/PaperCard";
import { useGameStore } from "@/store/gameStore";
import { useProfileStore } from "@/store/profileStore";
import { Trophy, Sparkles, ArrowRight, Home, RotateCcw } from "lucide-react";
import { useMemo, useEffect, useState } from "react";

export default function GameOver() {
  const navigate = useNavigate();
  const { score, starsEarned, combo, bestScore } = useGameStore();
  const profile = useProfileStore((s) => s.profile);
  const [showConfetti, setShowConfetti] = useState(false);

  const isNewRecord = useMemo(
    () => score > 0 && score >= profile.bestScore,
    [score, profile.bestScore],
  );

  useEffect(() => {
    if (isNewRecord) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 3200);
      return () => clearTimeout(t);
    }
  }, [isNewRecord]);

  return (
    <div className="page-enter w-full h-full flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* 礼花 */}
      {showConfetti && <Confetti />}

      <PaperCard className="w-full max-w-md p-10 flex flex-col items-center gap-6 bg-paper-50">
        <div className="text-ink-50 tracking-[0.5em] text-[10px] font-sans uppercase">
          {isNewRecord ? "A new chapter" : "A quiet ending"}
        </div>
        <div className="font-display text-4xl tracking-[0.3em] text-ink-400 text-emboss">
          {isNewRecord ? "NEW RECORD" : "GAME OVER"}
        </div>
        <div className="h-px w-20 bg-paper-300" />

        {/* 分数 */}
        <div className="flex flex-col items-center gap-1">
          <div className="font-mono text-7xl text-ink-400 font-light score-pop">
            {score}
          </div>
          <div className="text-ink-50 font-serif tracking-widest text-xs uppercase">
            得分 · Score
          </div>
        </div>

        {/* 数据卡 */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <DataCell
            label="最高"
            value={Math.max(score, bestScore)}
            icon={<Trophy className="w-3.5 h-3.5 text-mist-600" />}
          />
          <DataCell
            label="星芒"
            value={starsEarned}
            icon={<Sparkles className="w-3.5 h-3.5 text-sakura-600" />}
          />
          <DataCell
            label="连击"
            value={combo}
            icon={<span className="text-[10px] text-matcha-600">×N</span>}
          />
        </div>

        <div className="font-serif italic text-ink-50 text-sm tracking-widest text-center">
          “折痕是飞翔的来路”
        </div>

        {/* 操作 */}
        <div className="grid grid-cols-2 gap-3 w-full pt-2">
          <GhostButton
            variant="secondary"
            onClick={() => navigate("/")}
            icon={<Home className="w-3.5 h-3.5" />}
            className="w-full"
          >
            主菜单
          </GhostButton>
          <GhostButton
            variant="primary"
            onClick={() => navigate("/game")}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            className="w-full"
          >
            再来
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </GhostButton>
        </div>
      </PaperCard>
    </div>
  );
}

function DataCell({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="border border-paper-300 rounded-sm bg-paper-100 px-3 py-3 flex flex-col items-center gap-1">
      <div className="flex items-center gap-1 text-[10px] tracking-widest text-ink-50 uppercase">
        {icon}
        {label}
      </div>
      <div className="font-mono text-xl text-ink-400 font-light">{value}</div>
    </div>
  );
}

function Confetti() {
  // 程序化礼花 - 36 颗纸屑
  const pieces = Array.from({ length: 36 }, (_, i) => i);
  const colors = ["#e8b4b8", "#b8c9d8", "#b8c4a0", "#ffdd99", "#cfc8b8"];
  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.6;
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${left}%`,
              top: "-20px",
              backgroundColor: color,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
