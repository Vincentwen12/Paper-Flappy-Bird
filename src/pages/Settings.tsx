import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaperTitle } from "@/components/PaperTitle";
import { PaperCard } from "@/components/PaperCard";
import { GhostButton } from "@/components/GhostButton";
import { useProfileStore } from "@/store/profileStore";
import { ArrowLeft, Volume2, Music2, Image as ImageIcon, Trash2 } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const setSetting = useProfileStore((s) => s.setSetting);
  const clearAll = useProfileStore((s) => s.clearAll);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="page-enter w-full h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <GhostButton
            size="sm"
            variant="subtle"
            icon={<ArrowLeft className="w-3.5 h-3.5" />}
            onClick={() => navigate("/")}
          >
            返回
          </GhostButton>
        </div>

        <PaperTitle subtitle="音频 · 画面 · 数据">设置</PaperTitle>

        {/* 音频 */}
        <PaperCard className="p-6 flex flex-col gap-5">
          <SectionTitle>音频</SectionTitle>
          <Toggle
            label="音效"
            desc="跳跃、得分、拾取与失败的程序化声音"
            icon={<Volume2 className="w-4 h-4" />}
            value={profile.settings.soundOn}
            onChange={(v) => setSetting("soundOn", v)}
          />
          <Toggle
            label="背景音乐"
            desc="循环播放的和风轻钢琴琶音"
            icon={<Music2 className="w-4 h-4" />}
            value={profile.settings.musicOn}
            onChange={(v) => setSetting("musicOn", v)}
          />
        </PaperCard>

        {/* 画面 */}
        <PaperCard className="p-6 flex flex-col gap-5">
          <SectionTitle>画面</SectionTitle>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-ink-400 font-serif tracking-widest text-sm">
                <ImageIcon className="w-4 h-4" />
                <span>画面质量</span>
              </div>
              <div className="flex gap-1">
                {(["low", "medium", "high"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setSetting("quality", q);
                      showToast(`画面 · ${q}`);
                    }}
                    className={`px-3 py-1 text-xs font-sans tracking-widest uppercase border rounded-sm transition ${
                      profile.settings.quality === q
                        ? "border-ink-400 text-ink-400 bg-paper-50"
                        : "border-paper-300 text-ink-50 hover:border-ink-100"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-serif tracking-widest text-ink-400">
                  纸纹强度
                </span>
                <span className="font-mono text-ink-50">
                  {profile.settings.paperTexture}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={profile.settings.paperTexture}
                onChange={(e) =>
                  setSetting("paperTexture", parseInt(e.target.value, 10))
                }
                className="w-full accent-ink-100"
                style={{
                  background: `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${profile.settings.paperTexture}%, #e8e3d6 ${profile.settings.paperTexture}%, #e8e3d6 100%)`,
                  height: 2,
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
              />
            </div>
          </div>
        </PaperCard>

        {/* 数据 */}
        <PaperCard className="p-6 flex flex-col gap-3">
          <SectionTitle>数据</SectionTitle>
          <p className="text-ink-50 text-xs font-sans tracking-widest">
            清空所有本地数据，包括星芒、造型、主题、排行榜与设置。
          </p>
          <button
            onClick={() => {
              if (confirm("确定要清空所有数据？此操作不可撤销。")) {
                clearAll();
                showToast("已重置");
              }
            }}
            className="self-start inline-flex items-center gap-2 px-4 py-2 text-sm font-serif tracking-widest text-ink-200 border border-paper-300 rounded-sm btn-lift hover:border-ink-100 hover:text-ink-400"
          >
            <Trash2 className="w-3.5 h-3.5" /> 清空所有数据
          </button>
        </PaperCard>

        {toast && (
          <div className="fixed left-1/2 -translate-x-1/2 bottom-10 bg-paper-50 border border-ink-100 text-ink-400 font-serif tracking-widest text-sm px-5 py-2.5 rounded-sm shadow-paper-lg page-enter">
            {toast}
          </div>
        )}

        <div className="text-center text-ink-50/50 text-[10px] font-sans tracking-[0.4em] mt-2">
          Paper Flap · v1.0 · made with paper & code
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="font-serif text-ink-400 text-base tracking-widest">
        {children}
      </h3>
      <span className="flex-1 h-px bg-paper-300" />
    </div>
  );
}

function Toggle({
  label,
  desc,
  icon,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  icon: React.ReactNode;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="text-ink-200 mt-0.5">{icon}</div>
        <div className="flex flex-col gap-0.5">
          <span className="font-serif text-ink-400 tracking-widest text-sm">
            {label}
          </span>
          <span className="text-ink-50 text-xs font-sans">{desc}</span>
        </div>
      </div>
      <button
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative w-12 h-6 rounded-full border transition-colors ${
          value ? "bg-ink-100 border-ink-200" : "bg-paper-200 border-paper-400"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-paper-50 rounded-full shadow-paper transition-transform duration-200 ${
            value ? "translate-x-6" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
