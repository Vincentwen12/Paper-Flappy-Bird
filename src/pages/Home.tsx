import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GhostButton } from "@/components/GhostButton";
import { PaperTitle } from "@/components/PaperTitle";
import { PreviewBird } from "@/components/PreviewBird";
import { useProfileStore } from "@/store/profileStore";
import { findSkin } from "@/data/skins";
import { Sparkles, Trophy, Settings as SettingsIcon, BookHeart, Store, Gift } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);

  const skin = findSkin(profile.equippedSkin);
  const [phase, setPhase] = useState(0);
  const completedTasks = profile.dailyTasks.filter((t) => t.completed && !t.claimed).length;

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhase((p) => (p + 0.02) % 1);
    }, 16);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="page-enter w-full h-full flex flex-col items-center justify-center px-8 py-10">
      {/* 顶部 logo 区域 */}
      <div className="flex flex-col items-center gap-10 max-w-2xl w-full">
        <div className="relative flex flex-col items-center gap-4">
          <div className="text-ink-50 tracking-[0.6em] text-xs font-sans uppercase">
            A paper-craft arcade
          </div>
          <PaperTitle subtitle="纸 艺 天 空 · vol.1" align="center">
            Paper Flap
          </PaperTitle>
          <div className="font-serif text-ink-50 italic text-sm tracking-widest">
            “折一只纸鸟，让它飞过和纸的早晨”
          </div>
        </div>

        {/* 鸟预览 */}
        <div className="relative">
          <div className="absolute -inset-12 bg-sakura-200/30 rounded-full blur-3xl" aria-hidden />
          <PreviewBird skin={skin} size={180} phase={phase} className="relative drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)]" />
        </div>

        {/* 状态条 */}
        <div className="flex gap-8 items-center font-mono text-ink-50 text-xs tracking-widest">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sakura-600" />
            <span>{profile.totalStars}</span>
            <span className="text-ink-50/60">星芒</span>
          </div>
          <span className="opacity-30">·</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-mist-600" />
            <span>{profile.bestScore}</span>
            <span className="text-ink-50/60">最高分</span>
          </div>
        </div>

        {/* 主操作 */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <GhostButton
            size="lg"
            variant="primary"
            onClick={() => navigate("/game")}
            className="w-full"
          >
            BEGIN · 开始
          </GhostButton>

          <div className="grid grid-cols-4 gap-3 w-full pt-2">
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/collection")}
              icon={<BookHeart className="w-3.5 h-3.5" />}
              className="w-full"
            >
              收藏
            </GhostButton>
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/shop")}
              icon={<Store className="w-3.5 h-3.5" />}
              className="w-full relative"
            >
              商城
              {completedTasks > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sakura-600 text-[8px] text-paper-50 font-sans flex items-center justify-center">
                  {completedTasks}
                </span>
              )}
            </GhostButton>
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/leaderboard")}
              icon={<Trophy className="w-3.5 h-3.5" />}
              className="w-full"
            >
              排行
            </GhostButton>
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/settings")}
              icon={<SettingsIcon className="w-3.5 h-3.5" />}
              className="w-full"
            >
              设置
            </GhostButton>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-ink-50/60 text-[10px] font-sans tracking-[0.4em] mt-2 uppercase">
          Press · SPACE / TAP to begin
        </div>
      </div>

      {/* 角落装饰：纸纹折角 */}
      <div className="absolute top-6 left-6 hidden md:block">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path
            d="M2 46 L46 46 L46 2 L2 2 Z"
            fill="none"
            stroke="rgba(122,115,104,0.2)"
            strokeWidth="0.5"
          />
          <path d="M2 46 L46 2" stroke="rgba(122,115,104,0.2)" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-6 right-6 hidden md:block rotate-180">
        <svg width="48" height="48" viewBox="0 0 48 48">
          <path
            d="M2 46 L46 46 L46 2 L2 2 Z"
            fill="none"
            stroke="rgba(122,115,104,0.2)"
            strokeWidth="0.5"
          />
          <path d="M2 46 L46 2" stroke="rgba(122,115,104,0.2)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}
