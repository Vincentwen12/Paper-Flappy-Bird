import { create } from "zustand";
import { storage } from "@/utils/storage";
import { SKINS } from "@/data/skins";
import { THEMES } from "@/data/themes";
import { EQUIPMENT } from "@/data/equipment";
import { generateDailyTasks, getToday, getTaskDef } from "@/data/tasks";
import type { TaskProgress } from "@/data/tasks";

export interface LeaderboardEntry {
  score: number;
  date: string; // ISO
  starsEarned: number;
}

export interface Profile {
  nickname: string;
  totalStars: number;
  ownedSkins: string[];
  equippedSkin: string;
  ownedThemes: string[];
  equippedTheme: string;
  ownedEquipment: string[];
  equippedTrail: string;
  equippedShield: string;
  equippedAccessory: string;
  bestScore: number;
  leaderboard: LeaderboardEntry[];
  // 任务系统
  dailyTasks: TaskProgress[];
  dailyTaskDate: string;
  // 统计（用于任务进度）
  gamesPlayed: number;
  totalScore: number;
  totalPowerUps: number;
  totalPipes: number;
  totalStarsCollected: number;
  maxCombo: number;
  settings: {
    soundOn: boolean;
    musicOn: boolean;
    quality: "low" | "medium" | "high";
    paperTexture: number;
    language: string;
  };
}

const DEFAULT_PROFILE: Profile = {
  nickname: "Player",
  totalStars: 0,
  ownedSkins: ["classic"],
  equippedSkin: "classic",
  ownedThemes: ["morning"],
  equippedTheme: "morning",
  ownedEquipment: ["trail-basic", "shield-paper", "acc-none"],
  equippedTrail: "trail-basic",
  equippedShield: "shield-paper",
  equippedAccessory: "acc-none",
  bestScore: 0,
  leaderboard: [],
  dailyTasks: [],
  dailyTaskDate: "",
  gamesPlayed: 0,
  totalScore: 0,
  totalPowerUps: 0,
  totalPipes: 0,
  totalStarsCollected: 0,
  maxCombo: 0,
  settings: {
    soundOn: true,
    musicOn: true,
    quality: "high",
    paperTexture: 60,
    language: "zh",
  },
};

const STORAGE_KEY = "profile";

const loadProfile = (): Profile => {
  const p = storage.get<Profile>(STORAGE_KEY, DEFAULT_PROFILE);
  // 合并：新皮肤/主题加入时保证拥有列表存在
  for (const s of SKINS) {
    if (!p.ownedSkins.includes(s.id)) {
      if (s.price === 0) p.ownedSkins.push(s.id);
    }
  }
  for (const t of THEMES) {
    if (!p.ownedThemes.includes(t.id)) {
      if (t.price === 0) p.ownedThemes.push(t.id);
    }
  }
  // 合并：新装备
  for (const e of EQUIPMENT) {
    if (!p.ownedEquipment) p.ownedEquipment = ["trail-basic", "shield-paper", "acc-none"];
    if (!p.ownedEquipment.includes(e.id)) {
      if (e.price === 0) p.ownedEquipment.push(e.id);
    }
  }
  if (!p.ownedSkins.includes(p.equippedSkin)) p.equippedSkin = "classic";
  if (!p.ownedThemes.includes(p.equippedTheme)) p.equippedTheme = "morning";
  if (!p.equippedTrail) p.equippedTrail = "trail-basic";
  if (!p.equippedShield) p.equippedShield = "shield-paper";
  if (!p.equippedAccessory) p.equippedAccessory = "acc-none";
  if (!p.ownedEquipment.includes(p.equippedTrail)) p.equippedTrail = "trail-basic";
  if (!p.ownedEquipment.includes(p.equippedShield)) p.equippedShield = "shield-paper";
  if (!p.ownedEquipment.includes(p.equippedAccessory)) p.equippedAccessory = "acc-none";

  // 确保统计字段存在
  if (p.gamesPlayed === undefined) p.gamesPlayed = 0;
  if (p.totalScore === undefined) p.totalScore = 0;
  if (p.totalPowerUps === undefined) p.totalPowerUps = 0;
  if (p.totalPipes === undefined) p.totalPipes = 0;
  if (p.totalStarsCollected === undefined) p.totalStarsCollected = 0;
  if (p.maxCombo === undefined) p.maxCombo = 0;

  // 每日任务刷新
  const today = getToday();
  if (!p.dailyTaskDate || p.dailyTaskDate !== today) {
    p.dailyTasks = generateDailyTasks();
    p.dailyTaskDate = today;
  }

  return p;
};

interface ProfileState {
  profile: Profile;
  setNickname: (n: string) => void;
  equipSkin: (id: string) => void;
  equipTheme: (id: string) => void;
  equipTrail: (id: string) => void;
  equipShield: (id: string) => void;
  equipAccessory: (id: string) => void;
  unlockSkin: (id: string) => boolean;
  unlockTheme: (id: string) => boolean;
  unlockEquipment: (id: string) => boolean;
  addStars: (n: number) => void;
  setBestScore: (s: number) => void;
  addLeaderboard: (entry: LeaderboardEntry) => void;
  clearLeaderboard: () => void;
  setSetting: <K extends keyof Profile["settings"]>(
    key: K,
    value: Profile["settings"][K],
  ) => void;
  // 任务
  updateTaskProgress: (taskId: string, amount: number) => void;
  claimTaskReward: (taskId: string) => number;
  // 统计
  addGamePlayed: (score: number, stars: number, pipes: number, powerUps: number, combo: number) => void;
  clearAll: () => void;
}

const save = (p: Profile) => storage.set(STORAGE_KEY, p);

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: loadProfile(),
  setNickname: (n) =>
    set((s) => {
      const next = { ...s.profile, nickname: n };
      save(next);
      return { profile: next };
    }),
  equipSkin: (id) =>
    set((s) => {
      if (!s.profile.ownedSkins.includes(id)) return s;
      const next = { ...s.profile, equippedSkin: id };
      save(next);
      return { profile: next };
    }),
  equipTheme: (id) =>
    set((s) => {
      if (!s.profile.ownedThemes.includes(id)) return s;
      const next = { ...s.profile, equippedTheme: id };
      save(next);
      return { profile: next };
    }),
  equipTrail: (id) =>
    set((s) => {
      if (!s.profile.ownedEquipment.includes(id)) return s;
      const next = { ...s.profile, equippedTrail: id };
      save(next);
      return { profile: next };
    }),
  equipShield: (id) =>
    set((s) => {
      if (!s.profile.ownedEquipment.includes(id)) return s;
      const next = { ...s.profile, equippedShield: id };
      save(next);
      return { profile: next };
    }),
  equipAccessory: (id) =>
    set((s) => {
      if (!s.profile.ownedEquipment.includes(id)) return s;
      const next = { ...s.profile, equippedAccessory: id };
      save(next);
      return { profile: next };
    }),
  unlockSkin: (id) => {
    const s = get().profile;
    if (s.ownedSkins.includes(id)) return false;
    const skin = SKINS.find((x) => x.id === id);
    if (!skin) return false;
    if (s.totalStars < skin.price) return false;
    const next = {
      ...s,
      totalStars: s.totalStars - skin.price,
      ownedSkins: [...s.ownedSkins, id],
      equippedSkin: id,
    };
    save(next);
    set({ profile: next });
    return true;
  },
  unlockTheme: (id) => {
    const s = get().profile;
    if (s.ownedThemes.includes(id)) return false;
    const theme = THEMES.find((x) => x.id === id);
    if (!theme) return false;
    if (s.totalStars < theme.price) return false;
    const next = {
      ...s,
      totalStars: s.totalStars - theme.price,
      ownedThemes: [...s.ownedThemes, id],
      equippedTheme: id,
    };
    save(next);
    set({ profile: next });
    return true;
  },
  unlockEquipment: (id) => {
    const s = get().profile;
    if (s.ownedEquipment.includes(id)) return false;
    const equip = EQUIPMENT.find((x) => x.id === id);
    if (!equip) return false;
    if (s.totalStars < equip.price) return false;
    const next = {
      ...s,
      totalStars: s.totalStars - equip.price,
      ownedEquipment: [...s.ownedEquipment, id],
    };
    // 自动装备
    if (equip.kind === "trail") next.equippedTrail = id;
    else if (equip.kind === "shield") next.equippedShield = id;
    else if (equip.kind === "accessory") next.equippedAccessory = id;
    save(next);
    set({ profile: next });
    return true;
  },
  addStars: (n) =>
    set((s) => {
      const next = { ...s.profile, totalStars: s.profile.totalStars + n };
      save(next);
      return { profile: next };
    }),
  setBestScore: (s2) =>
    set((s) => {
      if (s2 <= s.profile.bestScore) return s;
      const next = { ...s.profile, bestScore: s2 };
      save(next);
      return { profile: next };
    }),
  addLeaderboard: (entry) =>
    set((s) => {
      const lb = [...s.profile.leaderboard, entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      const next = { ...s.profile, leaderboard: lb };
      save(next);
      return { profile: next };
    }),
  clearLeaderboard: () =>
    set((s) => {
      const next = { ...s.profile, leaderboard: [] };
      save(next);
      return { profile: next };
    }),
  setSetting: (key, value) =>
    set((s) => {
      const next = {
        ...s.profile,
        settings: { ...s.profile.settings, [key]: value },
      };
      save(next);
      return { profile: next };
    }),
  updateTaskProgress: (taskId, amount) =>
    set((s) => {
      const tasks = s.profile.dailyTasks.map((t) => {
        if (t.taskId !== taskId || t.completed) return t;
        const def = getTaskDef(taskId);
        if (!def) return t;
        const current = Math.min(t.current + amount, def.target);
        return { ...t, current, completed: current >= def.target };
      });
      const next = { ...s.profile, dailyTasks: tasks };
      save(next);
      return { profile: next };
    }),
  claimTaskReward: (taskId) => {
    const s = get().profile;
    const task = s.dailyTasks.find((t) => t.taskId === taskId);
    if (!task || !task.completed || task.claimed) return 0;
    const def = getTaskDef(taskId);
    if (!def) return 0;
    const tasks = s.dailyTasks.map((t) =>
      t.taskId === taskId ? { ...t, claimed: true } : t,
    );
    const next = {
      ...s,
      totalStars: s.totalStars + def.reward,
      dailyTasks: tasks,
    };
    save(next);
    set({ profile: next });
    return def.reward;
  },
  addGamePlayed: (score, stars, pipes, powerUps, combo) =>
    set((s) => {
      const next = {
        ...s.profile,
        gamesPlayed: s.profile.gamesPlayed + 1,
        totalScore: s.profile.totalScore + score,
        totalStarsCollected: s.profile.totalStarsCollected + stars,
        totalPipes: s.profile.totalPipes + pipes,
        totalPowerUps: s.profile.totalPowerUps + powerUps,
        maxCombo: Math.max(s.profile.maxCombo, combo),
      };
      save(next);
      return { profile: next };
    }),
  clearAll: () => {
    storage.clearAll();
    set({ profile: DEFAULT_PROFILE });
  },
}));