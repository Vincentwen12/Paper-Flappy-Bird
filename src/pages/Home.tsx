import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n";
import { GhostButton } from "@/components/GhostButton";
import { PaperTitle } from "@/components/PaperTitle";
import { PreviewBird } from "@/components/PreviewBird";
import { FitText } from "@/components/FitText";
import { useProfileStore } from "@/store/profileStore";
import { useGameStore } from "@/store/gameStore";
import { findSkin } from "@/data/skins";
import { GAME_MODES, getModeName, getModeDesc, type GameModeId } from "@/data/gameModes";
import { Sparkles, Trophy, Settings as SettingsIcon, BookHeart, Store, Gift, Lock } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const currentMode = useGameStore((s) => s.currentMode);
  const setCurrentMode = useGameStore((s) => s.setCurrentMode);

  const { t, lang } = useI18n();
  const skin = findSkin(profile.equippedSkin);
  const [phase, setPhase] = useState(0);
  const completedTasks = profile.dailyTasks.filter((t) => t.completed && !t.claimed).length;

  const handleSelectMode = (id: GameModeId) => {
    const mode = GAME_MODES.find((m) => m.id === id);
    if (!mode) return;
    if (profile.bestScore >= mode.unlockScore) {
      setCurrentMode(id);
    }
  };

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
            {t.home.subtitleEn}
          </div>
          <PaperTitle subtitle={t.home.subtitle} align="center">
            Paper Flap
          </PaperTitle>
          <div className="font-serif text-ink-50 italic text-sm tracking-widest">
            {t.home.tagline}
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
            <span className="text-ink-50/60">{t.common.stars}</span>
          </div>
          <span className="opacity-30">·</span>
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-mist-600" />
            <span>{profile.bestScore}</span>
            <span className="text-ink-50/60">{t.common.bestScore}</span>
          </div>
        </div>

        {/* 模式选择 */}
        <div className="w-full max-w-sm">
          <div className="text-ink-50/50 text-[10px] font-sans tracking-[0.3em] uppercase mb-2 text-center">
            {t.home.modeSelect}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {GAME_MODES.map((mode) => {
              const unlocked = profile.bestScore >= mode.unlockScore;
              const selected = currentMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleSelectMode(mode.id)}
                  disabled={!unlocked}
                  className={`flex-shrink-0 w-[72px] py-2 px-1 rounded-sm border transition-all duration-200 flex flex-col items-center gap-1 ${
                    selected
                      ? "border-ink-200 bg-ink-200/5 shadow-paper"
                      : unlocked
                        ? "border-paper-300 bg-paper-50/50 hover:border-ink-100"
                        : "border-paper-300/50 bg-paper-100/30 opacity-50 cursor-not-allowed"
                  }`}
                  title={unlocked ? getModeDesc(mode.id, lang) : `${t.home.modeUnlock} ${mode.unlockScore}`}
                >
                  <span className="text-lg leading-none">{mode.icon}</span>
                  <FitText baseSize={10} minSize={7}>
                    {getModeName(mode.id, lang)}
                  </FitText>
                  {!unlocked && (
                    <Lock className="w-2.5 h-2.5 text-ink-50/40" />
                  )}
                </button>
              );
            })}
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
            {t.home.begin}
          </GhostButton>

          <div className="grid grid-cols-4 gap-2 w-full pt-2">
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/collection")}
              icon={<BookHeart className="w-3 h-3 flex-shrink-0" />}
              className="w-full px-1.5 py-2"
            >
              <FitText baseSize={12} minSize={8}>{t.home.collection}</FitText>
            </GhostButton>
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/shop")}
              icon={<Store className="w-3 h-3 flex-shrink-0" />}
              className="w-full relative px-1.5 py-2"
            >
              <FitText baseSize={12} minSize={8}>{t.home.shop}</FitText>
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
              icon={<Trophy className="w-3 h-3 flex-shrink-0" />}
              className="w-full px-1.5 py-2"
            >
              <FitText baseSize={12} minSize={8}>{t.home.leaderboard}</FitText>
            </GhostButton>
            <GhostButton
              size="sm"
              variant="secondary"
              onClick={() => navigate("/settings")}
              icon={<SettingsIcon className="w-3 h-3 flex-shrink-0" />}
              className="w-full px-1.5 py-2"
            >
              <FitText baseSize={12} minSize={8}>{t.home.settings}</FitText>
            </GhostButton>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-ink-50/60 text-[10px] font-sans tracking-[0.4em] mt-2 uppercase">
          {t.home.hint}
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
