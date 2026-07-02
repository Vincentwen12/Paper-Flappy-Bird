// 游戏共享类型
import type { PowerUpKind } from "@/data/powerUps";

export interface Vec2 {
  x: number;
  y: number;
}

export interface BirdState {
  pos: Vec2;
  vel: Vec2;
  radius: number;
  rot: number; // 角度
  alive: boolean;
  scaleMod: number; // 受道具影响后的额外缩放
  invuln: number; // 剩余无敌时间（护盾）
  hasShield: boolean;
}

export interface PipeState {
  x: number; // 左上 x
  gapY: number; // 缺口中心 y
  gapHeight: number;
  width: number;
  passed: boolean;
  // 上下管道摇摆（>20 分解锁）
  swing: boolean;
  swingAmp: number;
  swingSpeed: number;
  phase: number;
}

export interface PowerUpState {
  kind: PowerUpKind;
  pos: Vec2;
  collected: boolean;
  rot: number;
  pulse: number;
}

export interface PetalState {
  pos: Vec2;
  vel: Vec2;
  rot: number;
  rotSpeed: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface StarState {
  pos: Vec2;
  collected: boolean;
  rot: number;
}

export interface ParticleState {
  pos: Vec2;
  vel: Vec2;
  rot: number;
  rotSpeed: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  shape: "rect" | "tri" | "circle";
}

export interface GameConfig {
  gravity: number;
  jumpImpulse: number;
  pipeSpeed: number;
  pipeGap: number;
  pipeWidth: number;
  pipeInterval: number; // 生成间隔（秒）
  groundY: number; // 地面顶部
}

export const DEFAULT_CONFIG: GameConfig = {
  gravity: 1800,
  jumpImpulse: -500,
  pipeSpeed: 220,
  pipeGap: 180,
  pipeWidth: 70,
  pipeInterval: 1.6,
  groundY: 0, // 运行时注入
};
