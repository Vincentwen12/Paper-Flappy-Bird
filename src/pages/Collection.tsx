import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PaperTitle } from "@/components/PaperTitle";
import { PaperCard } from "@/components/PaperCard";
import { PreviewBird } from "@/components/PreviewBird";
import { PreviewTheme } from "@/components/PreviewTheme";
import { useProfileStore } from "@/store/profileStore";
import { SKINS, RARITY_COLORS } from "@/data/skins";
import { THEMES } from "@/data/themes";
import { ArrowLeft, Check, Sparkles, Lock } from "lucide-react";
import { GhostButton } from "@/components/GhostButton";
import clsx from "clsx";

type Tab = "skins" | "themes";
type Rarity = "common" | "rare" | "epic" | "legendary";

const RARITY_LABELS: Record<Rarity, string> = {
  common: "普通",
  rare: "稀有",
  epic: "史诗",
  legendary: "传说",
};

export default function Collection() {
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const equipSkin = useProfileStore((s) => s.equipSkin);
  const equipTheme = useProfileStore((s) => s.equipTheme);
  const unlockSkin = useProfileStore((s) => s.unlockSkin);
  const unlockTheme = useProfileStore((s) => s.unlockTheme);
  const [tab, setTab] = useState<Tab>("skins");
  const [filter, setFilter] = useState<Rarity | "all">("all");
  const [toast, setToast] = useState<string | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPhase((p) => (p + 0.03) % 1), 16);
    return () => window.clearInterval(id);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const rarityFilter = (r?: Rarity) =>
    filter === "all" || r === filter;

  return (
    <div className="page-enter w-full h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* 顶栏 */}
        <div className="flex items-center justify-between">
          <GhostButton
            size="sm"
            variant="subtle"
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={() => navigate("/")}
          >
            返回
          </GhostButton>
          <div className="flex items-center gap-2 text-ink-50 font-mono text-sm">
            <Sparkles className="w-3.5 h-3.5 text-sakura-600" />
            <span>{profile.totalStars}</span>
            <span className="text-ink-50/60 text-xs">星芒</span>
          </div>
        </div>

        <PaperTitle subtitle="造型 · 主题">收藏馆</PaperTitle>

        {/* 稀有度筛选 */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "common", "rare", "epic", "legendary"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={clsx(
                "px-3 py-1.5 text-xs font-serif tracking-widest border rounded-sm transition-all btn-lift",
                filter === r
                  ? r === "all"
                    ? "border-ink-400 text-ink-400 bg-paper-50"
                    : "text-paper-50 border-transparent"
                  : "border-paper-300 text-ink-50 hover:border-ink-100",
              )}
              style={
                filter === r && r !== "all"
                  ? { backgroundColor: RARITY_COLORS[r as Rarity], borderColor: RARITY_COLORS[r as Rarity] }
                  : undefined
              }
            >
              {r === "all" ? "全部" : RARITY_LABELS[r as Rarity]}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-paper-300 pb-3 text-sm font-serif tracking-widest">
          {(
            [
              { k: "skins", t: "纸鸟造型", count: SKINS.length },
              { k: "themes", t: "场景主题", count: THEMES.length },
            ] as { k: Tab; t: string; count: number }[]
          ).map((x) => (
            <button
              key={x.k}
              onClick={() => setTab(x.k)}
              className={clsx(
                "relative pb-1 transition-colors",
                tab === x.k ? "text-ink-400" : "text-ink-50 hover:text-ink-200",
              )}
            >
              {x.t}
              <span className="ml-1.5 text-[10px] text-ink-50/50">{x.count}</span>
              {tab === x.k && (
                <span className="absolute left-0 right-0 -bottom-3 h-px bg-ink-400" />
              )}
            </button>
          ))}
        </div>

        {/* 皮肤 */}
        {tab === "skins" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SKINS.filter((s) => rarityFilter(s.rarity)).map((skin) => {
              const owned = profile.ownedSkins.includes(skin.id);
              const equipped = profile.equippedSkin === skin.id;
              const canAfford = profile.totalStars >= skin.price;
              return (
                <PaperCard
                  key={skin.id}
                  selected={equipped}
                  hover
                  onClick={() => {
                    if (!owned) {
                      if (!canAfford) { showToast("星芒不足"); return; }
                      const ok = unlockSkin(skin.id);
                      showToast(ok ? `已解锁 · ${skin.name}` : "解锁失败");
                    } else if (!equipped) {
                      equipSkin(skin.id);
                      showToast(`已装备 · ${skin.name}`);
                    }
                  }}
                  className="p-4 flex flex-col items-center gap-2"
                >
                  {/* 稀有度标签 */}
                  {skin.rarity && skin.rarity !== "common" && (
                    <span
                      className="self-end text-[9px] font-sans tracking-widest px-1.5 py-0.5 rounded-sm text-paper-50"
                      style={{ backgroundColor: RARITY_COLORS[skin.rarity] }}
                    >
                      {RARITY_LABELS[skin.rarity]}
                    </span>
                  )}
                  <div className="w-full aspect-square flex items-center justify-center bg-paper-100 border border-paper-300 rounded-sm overflow-hidden">
                    <PreviewBird skin={skin} size={90} phase={phase} />
                  </div>
                  <div className="flex flex-col items-center gap-0.5 w-full">
                    <div className="font-serif text-ink-400 tracking-widest text-sm text-center">
                      {skin.name}
                    </div>
                    <div className="text-ink-50 text-[10px] font-sans tracking-wide text-center leading-tight">
                      {skin.desc}
                    </div>
                  </div>
                  <div className="mt-auto pt-1">
                    {equipped ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-serif text-ink-400 tracking-widest border border-ink-400 rounded-sm px-2 py-0.5">
                        <Check className="w-3 h-3" /> 已装备
                      </span>
                    ) : owned ? (
                      <span className="text-[10px] font-serif text-ink-200 tracking-widest border border-paper-300 rounded-sm px-2 py-0.5">
                        点击装备
                      </span>
                    ) : (
                      <span className={clsx(
                        "inline-flex items-center gap-1 text-[10px] font-serif tracking-widest border rounded-sm px-2 py-0.5",
                        canAfford ? "border-paper-300 text-ink-100" : "border-paper-300/50 text-ink-50/50"
                      )}>
                        <Lock className="w-3 h-3" />
                        {skin.price === 0 ? "免费" : `${skin.price} 星芒`}
                      </span>
                    )}
                  </div>
                </PaperCard>
              );
            })}
          </div>
        )}

        {/* 主题 */}
        {tab === "themes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {THEMES.filter((t) => rarityFilter(t.rarity)).map((theme) => {
              const owned = profile.ownedThemes.includes(theme.id);
              const equipped = profile.equippedTheme === theme.id;
              const canAfford = profile.totalStars >= theme.price;
              return (
                <PaperCard
                  key={theme.id}
                  selected={equipped}
                  hover
                  onClick={() => {
                    if (!owned) {
                      if (!canAfford) { showToast("星芒不足"); return; }
                      const ok = unlockTheme(theme.id);
                      showToast(ok ? `已解锁 · ${theme.name}` : "解锁失败");
                    } else if (!equipped) {
                      equipTheme(theme.id);
                      showToast(`已应用 · ${theme.name}`);
                    }
                  }}
                  className="p-4 flex items-stretch gap-4"
                >
                  {/* 预览 */}
                  <div className="w-36 h-20 flex-shrink-0 border border-paper-300 rounded-sm overflow-hidden">
                    <PreviewTheme theme={theme} size={80} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-serif text-ink-400 tracking-widest text-sm">
                        {theme.name}
                      </div>
                      {theme.rarity && theme.rarity !== "common" && (
                        <span
                          className="flex-shrink-0 text-[9px] font-sans tracking-widest px-1.5 py-0.5 rounded-sm text-paper-50"
                          style={{ backgroundColor: RARITY_COLORS[theme.rarity] }}
                        >
                          {RARITY_LABELS[theme.rarity]}
                        </span>
                      )}
                    </div>
                    <div className="text-ink-50 text-xs font-sans tracking-wide leading-tight">
                      {theme.desc}
                    </div>
                    <div className="mt-auto">
                      {equipped ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-serif text-ink-400 tracking-widest border border-ink-400 rounded-sm px-2 py-0.5">
                          <Check className="w-3 h-3" /> 当前主题
                        </span>
                      ) : owned ? (
                        <span className="text-[10px] font-serif text-ink-200 tracking-widest border border-paper-300 rounded-sm px-2 py-0.5">
                          点击装备
                        </span>
                      ) : (
                        <span className={clsx(
                          "inline-flex items-center gap-1 text-[10px] font-serif tracking-widest border rounded-sm px-2 py-0.5",
                          canAfford ? "border-paper-300 text-ink-100" : "border-paper-300/50 text-ink-50/50"
                        )}>
                          <Lock className="w-3 h-3" />
                          {theme.price === 0 ? "免费" : `${theme.price} 星芒`}
                        </span>
                      )}
                    </div>
                  </div>
                </PaperCard>
              );
            })}
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed left-1/2 -translate-x-1/2 bottom-10 z-50 bg-paper-50 border border-ink-100 text-ink-400 font-serif tracking-widest text-sm px-5 py-2.5 rounded-sm shadow-paper-lg page-enter">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
