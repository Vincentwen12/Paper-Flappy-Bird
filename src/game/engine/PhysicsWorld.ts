// 简单的物理世界更新（鸟）
import type { BirdState, GameConfig } from "../types";

export class PhysicsWorld {
  updateBird(bird: BirdState, dt: number, cfg: GameConfig, slowFactor = 1) {
    const dtEff = dt * slowFactor;
    bird.vel.y += cfg.gravity * dtEff;
    bird.pos.x += bird.vel.x * dtEff;
    bird.pos.y += bird.vel.y * dtEff;
    // 角度：根据速度倾斜
    const targetRot = Math.max(-0.5, Math.min(1.4, bird.vel.y / 700));
    bird.rot += (targetRot - bird.rot) * 0.18;
  }

  flap(bird: BirdState, cfg: GameConfig) {
    bird.vel.y = cfg.jumpImpulse;
  }
}
