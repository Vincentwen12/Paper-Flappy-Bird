// 随机数 / 工具
export const rand = (min: number, max: number): number =>
  min + Math.random() * (max - min);

export const randInt = (min: number, max: number): number =>
  Math.floor(rand(min, max + 1));

export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export const pick = <T>(arr: T[]): T => arr[randInt(0, arr.length - 1)];
