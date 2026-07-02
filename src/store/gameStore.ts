import { create } from "zustand";
import type { PowerUpKind } from "@/data/powerUps";

export type GamePhase = "ready" | "playing" | "dead" | "paused";

export interface ActivePowerUp {
  kind: PowerUpKind;
  remaining: number; // 秒
}

interface GameState {
  phase: GamePhase;
  score: number;
  bestScore: number;
  starsEarned: number;
  combo: number; // 连续通过
  activePowerUp: ActivePowerUp | null;
  // 简易计数器（不死循环更新）
  powerUpCount: number;
  setPhase: (p: GamePhase) => void;
  setScore: (s: number) => void;
  setBestScore: (s: number) => void;
  setStars: (n: number) => void;
  setCombo: (c: number) => void;
  setActivePowerUp: (p: ActivePowerUp | null) => void;
  incPowerUpCount: () => void;
  reset: (best: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  phase: "ready",
  score: 0,
  bestScore: 0,
  starsEarned: 0,
  combo: 0,
  activePowerUp: null,
  powerUpCount: 0,
  setPhase: (p) => set({ phase: p }),
  setScore: (s) => set({ score: s }),
  setBestScore: (s) => set({ bestScore: s }),
  setStars: (n) => set({ starsEarned: n }),
  setCombo: (c) => set({ combo: c }),
  setActivePowerUp: (p) => set({ activePowerUp: p }),
  incPowerUpCount: () =>
    set((s) => ({ powerUpCount: s.powerUpCount + 1 })),
  reset: (best) =>
    set({
      phase: "ready",
      score: 0,
      bestScore: best,
      starsEarned: 0,
      combo: 0,
      activePowerUp: null,
      powerUpCount: 0,
    }),
}));
