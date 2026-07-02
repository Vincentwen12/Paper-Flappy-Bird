// 每日任务系统

export type TaskType =
  | "play_games"
  | "score_total"
  | "score_single"
  | "collect_powerups"
  | "pass_pipes"
  | "get_combo"
  | "play_skin"
  | "play_theme"
  | "collect_stars"
  | "die_early"
  | "perfect_run";

export interface TaskDef {
  id: string;
  type: TaskType;
  title: string;
  desc: string;
  target: number;
  reward: number;
  icon: string; // emoji or identifier
}

export interface TaskProgress {
  taskId: string;
  current: number;
  completed: boolean;
  claimed: boolean;
}

export interface DailyTasks {
  date: string; // YYYY-MM-DD
  tasks: TaskProgress[];
}

const TASK_POOL: TaskDef[] = [
  // 游玩次数
  {
    id: "play_1",
    type: "play_games",
    title: "初试身手",
    desc: "完成 1 局游戏",
    target: 1,
    reward: 10,
    icon: "🎮",
  },
  {
    id: "play_3",
    type: "play_games",
    title: "飞行练习",
    desc: "完成 3 局游戏",
    target: 3,
    reward: 25,
    icon: "🎮",
  },
  {
    id: "play_5",
    type: "play_games",
    title: "折纸大师",
    desc: "完成 5 局游戏",
    target: 5,
    reward: 40,
    icon: "🎮",
  },
  // 累计得分
  {
    id: "score_30",
    type: "score_total",
    title: "小有成就",
    desc: "累计获得 30 分",
    target: 30,
    reward: 15,
    icon: "🏆",
  },
  {
    id: "score_80",
    type: "score_total",
    title: "展翅高飞",
    desc: "累计获得 80 分",
    target: 80,
    reward: 30,
    icon: "🏆",
  },
  {
    id: "score_150",
    type: "score_total",
    title: "云端漫步",
    desc: "累计获得 150 分",
    target: 150,
    reward: 50,
    icon: "🏆",
  },
  // 单局高分
  {
    id: "single_10",
    type: "score_single",
    title: "突破自我",
    desc: "单局获得 10 分",
    target: 10,
    reward: 20,
    icon: "⭐",
  },
  {
    id: "single_20",
    type: "score_single",
    title: "穿越云霄",
    desc: "单局获得 20 分",
    target: 20,
    reward: 35,
    icon: "⭐",
  },
  {
    id: "single_40",
    type: "score_single",
    title: "传奇飞行",
    desc: "单局获得 40 分",
    target: 40,
    reward: 60,
    icon: "⭐",
  },
  // 收集道具
  {
    id: "powerup_3",
    type: "collect_powerups",
    title: "道具收集者",
    desc: "收集 3 个道具",
    target: 3,
    reward: 20,
    icon: "🎁",
  },
  {
    id: "powerup_8",
    type: "collect_powerups",
    title: "道具猎人",
    desc: "收集 8 个道具",
    target: 8,
    reward: 40,
    icon: "🎁",
  },
  // 通过管道
  {
    id: "pipes_10",
    type: "pass_pipes",
    title: "穿越管道",
    desc: "通过 10 根管道",
    target: 10,
    reward: 15,
    icon: "🔶",
  },
  {
    id: "pipes_30",
    type: "pass_pipes",
    title: "管道穿梭",
    desc: "通过 30 根管道",
    target: 30,
    reward: 30,
    icon: "🔶",
  },
  {
    id: "pipes_50",
    type: "pass_pipes",
    title: "管道之王",
    desc: "通过 50 根管道",
    target: 50,
    reward: 50,
    icon: "🔶",
  },
  // 连击
  {
    id: "combo_5",
    type: "get_combo",
    title: "连续穿过",
    desc: "达成 5 连击",
    target: 5,
    reward: 20,
    icon: "🔥",
  },
  {
    id: "combo_10",
    type: "get_combo",
    title: "手到擒来",
    desc: "达成 10 连击",
    target: 10,
    reward: 40,
    icon: "🔥",
  },
  // 收集星芒
  {
    id: "stars_20",
    type: "collect_stars",
    title: "星光收集者",
    desc: "收集 20 颗星芒",
    target: 20,
    reward: 15,
    icon: "✨",
  },
  {
    id: "stars_50",
    type: "collect_stars",
    title: "星河漫步",
    desc: "收集 50 颗星芒",
    target: 50,
    reward: 30,
    icon: "✨",
  },
  {
    id: "stars_100",
    type: "collect_stars",
    title: "星海遨游",
    desc: "收集 100 颗星芒",
    target: 100,
    reward: 50,
    icon: "✨",
  },
  // 早期失败
  {
    id: "die_early",
    type: "die_early",
    title: "不屈不挠",
    desc: "10 分以内结束一局",
    target: 1,
    reward: 5,
    icon: "💪",
  },
  // 完美飞行
  {
    id: "perfect",
    type: "perfect_run",
    title: "完美无伤",
    desc: "不使用护盾获得 20 分",
    target: 1,
    reward: 50,
    icon: "💎",
  },
];

// 每日生成 5-10 个任务
export function generateDailyTasks(): TaskProgress[] {
  const count = 5 + Math.floor(Math.random() * 6); // 5-10
  const shuffled = [...TASK_POOL].sort(() => Math.random() - 0.5);
  const selected = new Set<TaskType>();
  const result: TaskDef[] = [];

  for (const t of shuffled) {
    if (result.length >= count) break;
    // 避免同类型任务过多
    const sameType = result.filter((r) => r.type === t.type).length;
    if (sameType >= 2) continue;
    result.push(t);
  }

  return result.map((t) => ({
    taskId: t.id,
    current: 0,
    completed: false,
    claimed: false,
  }));
}

export function getTaskDef(taskId: string): TaskDef | undefined {
  return TASK_POOL.find((t) => t.id === taskId);
}

export function getToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}