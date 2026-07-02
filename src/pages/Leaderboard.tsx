import { useNavigate } from "react-router-dom";
import { PaperTitle } from "@/components/PaperTitle";
import { PaperCard } from "@/components/PaperCard";
import { GhostButton } from "@/components/GhostButton";
import { useProfileStore } from "@/store/profileStore";
import { ArrowLeft, Trophy, Trash2 } from "lucide-react";

export default function Leaderboard() {
  const navigate = useNavigate();
  const profile = useProfileStore((s) => s.profile);
  const clearLeaderboard = useProfileStore((s) => s.clearLeaderboard);

  const lb = profile.leaderboard;

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
          {lb.length > 0 && (
            <button
              onClick={() => {
                if (confirm("确定清空所有记录？")) clearLeaderboard();
              }}
              className="text-ink-50 text-xs font-serif tracking-widest hover:text-ink-200 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> 清空
            </button>
          )}
        </div>

        <PaperTitle subtitle="Local · Top 10">排行榜</PaperTitle>

        {lb.length === 0 ? (
          <PaperCard className="p-12 flex flex-col items-center gap-3 bg-paper-50">
            <Trophy className="w-8 h-8 text-paper-400" strokeWidth={1.2} />
            <div className="font-serif text-ink-50 tracking-widest text-sm">
              还没有飞行记录
            </div>
            <div className="text-ink-50/60 text-xs font-sans tracking-widest">
              Start your first paper flight
            </div>
            <GhostButton
              size="md"
              variant="primary"
              onClick={() => navigate("/game")}
              className="mt-4"
            >
              开始游戏
            </GhostButton>
          </PaperCard>
        ) : (
          <PaperCard className="p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-ink-50 text-[10px] font-sans tracking-[0.3em] uppercase">
                  <th className="text-left px-6 py-4">名次</th>
                  <th className="text-right px-6 py-4">得分</th>
                  <th className="text-right px-6 py-4">星芒</th>
                  <th className="text-right px-6 py-4">日期</th>
                </tr>
              </thead>
              <tbody>
                {lb.map((entry, i) => {
                  const rank = i + 1;
                  const isTop = rank <= 3;
                  return (
                    <tr
                      key={entry.date + i}
                      className={`font-mono text-sm border-t border-paper-200 ${
                        i % 2 === 0 ? "bg-paper-50" : "bg-paper-100"
                      }`}
                    >
                      <td className="px-6 py-3 text-ink-400">
                        {isTop ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 border border-ink-100 rounded-full text-[10px] tracking-widest text-ink-400">
                            {rank}
                          </span>
                        ) : (
                          <span className="text-ink-50 pl-2">{rank}</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-right text-ink-400 font-light text-base">
                        {entry.score}
                      </td>
                      <td className="px-6 py-3 text-right text-ink-200">
                        {entry.starsEarned}
                      </td>
                      <td className="px-6 py-3 text-right text-ink-50 text-xs">
                        {formatDate(entry.date)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </PaperCard>
        )}

        {/* 最高分卡片 */}
        {lb.length > 0 && (
          <div className="grid grid-cols-2 gap-3 text-center">
            <PaperCard className="p-4">
              <div className="text-ink-50 text-[10px] tracking-widest uppercase mb-1">
                最高分
              </div>
              <div className="font-mono text-3xl text-ink-400 font-light">
                {Math.max(...lb.map((e) => e.score))}
              </div>
            </PaperCard>
            <PaperCard className="p-4">
              <div className="text-ink-50 text-[10px] tracking-widest uppercase mb-1">
                总星芒
              </div>
              <div className="font-mono text-3xl text-ink-400 font-light">
                {lb.reduce((s, e) => s + e.starsEarned, 0)}
              </div>
            </PaperCard>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${y}-${m}-${day} ${hh}:${mm}`;
  } catch {
    return iso;
  }
}
