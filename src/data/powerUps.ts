// 道具目录
export type PowerUpKind = "umbrella" | "boat" | "lantern" | "plane" | "crane";

export interface PowerUpDef {
  kind: PowerUpKind;
  name: string;
  duration: number; // 秒
  // 道具主色
  color: string;
  desc: string;
}

export const POWERUPS: PowerUpDef[] = [
  {
    kind: "umbrella",
    name: "纸伞",
    duration: 8,
    color: "#e8b4b8",
    desc: "抵消一次碰撞",
  },
  {
    kind: "boat",
    name: "纸船",
    duration: 6,
    color: "#b8c9d8",
    desc: "鸟体积减半",
  },
  {
    kind: "lantern",
    name: "纸灯",
    duration: 5,
    color: "#ffdd99",
    desc: "游戏速度减半",
  },
  {
    kind: "plane",
    name: "纸飞机",
    duration: 10,
    color: "#cfc8b8",
    desc: "分数翻倍",
  },
  {
    kind: "crane",
    name: "纸鹤",
    duration: 6,
    color: "#b8c4a0",
    desc: "自动吸附星芒",
  },
];

export const findPowerUp = (kind: PowerUpKind): PowerUpDef =>
  POWERUPS.find((p) => p.kind === kind) ?? POWERUPS[0];
