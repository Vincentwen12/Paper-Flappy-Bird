import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PaperTitle } from "@/components/PaperTitle";
import { PaperCard } from "@/components/PaperCard";
import { GhostButton } from "@/components/GhostButton";
import { useProfileStore } from "@/store/profileStore";
import { EQUIPMENT, RARITY_COLORS_EQUIP, findEquipment } from "@/data/equipment";
import { getTaskDef } from "@/data/tasks";
import { ArrowLeft, Check, Sparkles, Lock, Gift, ClipboardList } from "lucide-react";
import clsx from "clsx";

type Tab = "equipment" | "tasks";
type Rarity = "common" | "rare" | "epic" | "legendary";
type EquipKind = "trail" | "shield" | "accessory";

const RARITY_LABELS: Record<Rarity, string> = {
  common: "普通",
  rare: "稀有",
  epic: "史诗",
  legendary: "传说",
};

const EQUIP_LABELS: Record<EquipKind, string> = {
  trail: "尾迹",
  shield: "护盾",
  accessory: "配饰",
};

export default function Shop() {
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const equipTrail = useProfileStore((s) => s.equipTrail);
  const equipShield = useProfileStore((s) => s.equipShield);
  const equipAccessory = useProfileStore((s) => s.equipAccessory);
  const unlockEquipment = useProfileStore((s) => s.unlockEquipment);
  const claimTaskReward = useProfileStore((s) => s.claimTaskReward);
  const [tab, setTab] = useState<Tab>("equipment");
  const [equipKind, setEquipKind] = useState<EquipKind>("trail");
  const [filter, setFilter] = useState<Rarity | "all">("all");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const rarityFilter = (r?: Rarity) =>
    filter === "all" || r === filter;

  const equipmentByKind = EQUIPMENT.filter((e) => e.kind === equipKind);

  const completedTasks = profile.dailyTasks.filter((t) => t.completed && !t.claimed).length;
  const totalTasks = profile.dailyTasks.length;

  // 每日任务数据
  const dailyTasks = profile.dailyTasks;

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

        <PaperTitle subtitle="装备 · 任务">商城</PaperTitle>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-paper-300 pb-3 text-sm font-serif tracking-widest">
          {(
            [
              { k: "equipment" as Tab, t: "装备", count: EQUIPMENT.length },
              { k: "tasks" as Tab, t: "每日任务", count: totalTasks },
            ]
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
              {x.k === "tasks" && completedTasks > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-sakura-600 text-[8px] text-paper-50 font-sans">
                  {completedTasks}
                </span>
              )}
              {tab === x.k && (
                <span className="absolute left-0 right-0 -bottom-3 h-px bg-ink-400" />
              )}
            </button>
          ))}
        </div>

        {/* 装备 Tab */}
        {tab === "equipment" && (
          <>
            {/* 装备子Tab */}
            <div className="flex gap-2">
              {(["trail", "shield", "accessory"] as EquipKind[]).map((k) => (
                <button
                  key={k}
                  onClick={() => { setEquipKind(k); setFilter("all"); }}
                  className={clsx(
                    "px-4 py-1.5 text-xs font-serif tracking-widest border rounded-sm transition-all btn-lift",
                    equipKind === k
                      ? "border-ink-400 text-ink-400 bg-paper-50"
                      : "border-paper-300 text-ink-50 hover:border-ink-100",
                  )}
                >
                  {EQUIP_LABELS[k]}
                </button>
              ))}
            </div>

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
                      ? { backgroundColor: RARITY_COLORS_EQUIP[r], borderColor: RARITY_COLORS_EQUIP[r] }
                      : undefined
                  }
                >
                  {r === "all" ? "全部" : RARITY_LABELS[r]}
                </button>
              ))}
            </div>

            {/* 装备列表 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {equipmentByKind.filter((e) => rarityFilter(e.rarity)).map((equip) => {
                const owned = profile.ownedEquipment.includes(equip.id);
                const equipped =
                  (equipKind === "trail" && profile.equippedTrail === equip.id) ||
                  (equipKind === "shield" && profile.equippedShield === equip.id) ||
                  (equipKind === "accessory" && profile.equippedAccessory === equip.id);
                const canAfford = profile.totalStars >= equip.price;
                return (
                  <PaperCard
                    key={equip.id}
                    selected={equipped}
                    hover
                    onClick={() => {
                      if (!owned) {
                        if (!canAfford) { showToast("星芒不足"); return; }
                        const ok = unlockEquipment(equip.id);
                        showToast(ok ? `已解锁 · ${equip.name}` : "解锁失败");
                      } else if (!equipped) {
                        if (equipKind === "trail") equipTrail(equip.id);
                        else if (equipKind === "shield") equipShield(equip.id);
                        else equipAccessory(equip.id);
                        showToast(`已装备 · ${equip.name}`);
                      }
                    }}
                    className="p-4 flex flex-col items-center gap-2"
                  >
                    {equip.rarity && equip.rarity !== "common" && (
                      <span
                        className="self-end text-[9px] font-sans tracking-widest px-1.5 py-0.5 rounded-sm text-paper-50"
                        style={{ backgroundColor: RARITY_COLORS_EQUIP[equip.rarity] }}
                      >
                        {RARITY_LABELS[equip.rarity]}
                      </span>
                    )}
                    {/* 预览 */}
                    <div className="w-full aspect-square flex items-center justify-center bg-paper-100 border border-paper-300 rounded-sm overflow-hidden">
                      {equip.kind === "trail" && equip.colors && (
                        <div className="flex gap-1 flex-wrap justify-center p-2">
                          {equip.colors.map((c, i) => (
                            <div
                              key={i}
                              className="w-5 h-5 rounded-full border border-paper-300"
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      )}
                      {equip.kind === "shield" && equip.shieldColor && (
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className="w-16 h-16 rounded-full border-4 border-paper-300"
                            style={{
                              backgroundColor: equip.shieldColor + "40",
                              borderColor: equip.shieldColor,
                              boxShadow: `0 0 20px ${equip.shieldColor}40`,
                            }}
                          />
                        </div>
                      )}
                      {equip.kind === "accessory" && (
                        <div className="text-4xl">
                          {equip.icon === "ribbon" && "🎀"}
                          {equip.icon === "hat" && "🎩"}
                          {equip.icon === "glasses" && "👓"}
                          {equip.icon === "crown" && "👑"}
                          {equip.icon === "scarf" && "🧣"}
                          {equip.icon === "halo" && "😇"}
                          {equip.icon === "horns" && "👿"}
                          {equip.icon === "mask" && "🦊"}
                          {equip.icon === "wings" && "🪽"}
                          {equip.icon === "circle" && "⭕"}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-0.5 w-full">
                      <div className="font-serif text-ink-400 tracking-widest text-sm text-center">
                        {equip.name}
                      </div>
                      <div className="text-ink-50 text-[10px] font-sans tracking-wide text-center leading-tight">
                        {equip.desc}
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
                          {equip.price === 0 ? "免费" : `${equip.price} 星芒`}
                        </span>
                      )}
                    </div>
                  </PaperCard>
                );
              })}
            </div>
          </>
        )}

        {/* 任务 Tab */}
        {tab === "tasks" && (
          <div className="flex flex-col gap-4">
            {dailyTasks.length === 0 ? (
              <PaperCard className="p-12 flex flex-col items-center gap-3">
                <ClipboardList className="w-8 h-8 text-paper-400" strokeWidth={1.2} />
                <div className="font-serif text-ink-50 tracking-widest text-sm">
                  暂无任务
                </div>
                <div className="text-ink-50/60 text-xs font-sans tracking-widest">
                  每日任务将在次日刷新
                </div>
              </PaperCard>
            ) : (
              dailyTasks.map((task) => {
                const def = getTaskDef(task.taskId);
                if (!def) return null;
                const progress = Math.min(task.current, def.target);
                const pct = (progress / def.target) * 100;
                return (
                  <PaperCard key={task.taskId} className="p-4 flex items-center gap-4">
                    <div className="text-2xl flex-shrink-0">{def.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-ink-400 tracking-widest text-sm">
                        {def.title}
                      </div>
                      <div className="text-ink-50 text-xs font-sans tracking-wide">
                        {def.desc}
                      </div>
                      {/* 进度条 */}
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-paper-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: task.completed ? "#88b898" : "#a8a192",
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-ink-50">
                          {progress}/{def.target}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1 text-sakura-600 text-xs font-mono">
                        <Sparkles className="w-3 h-3" />
                        {def.reward}
                      </div>
                      {task.claimed ? (
                        <span className="text-[10px] text-ink-50/50 font-serif tracking-widest">
                          已领取
                        </span>
                      ) : task.completed ? (
                        <button
                          onClick={() => {
                            const reward = claimTaskReward(task.taskId);
                            if (reward > 0) showToast(`领取成功！+${reward} 星芒`);
                          }}
                          className="btn-lift px-3 py-1 text-[10px] font-serif tracking-widest bg-sakura-600 text-paper-50 border border-sakura-600 rounded-sm hover:bg-sakura-700 transition"
                        >
                          <Gift className="w-3 h-3 inline mr-1" />
                          领取
                        </button>
                      ) : (
                        <span className="text-[10px] text-ink-50/50 font-serif tracking-widest">
                          进行中
                        </span>
                      )}
                    </div>
                  </PaperCard>
                );
              })
            )}
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