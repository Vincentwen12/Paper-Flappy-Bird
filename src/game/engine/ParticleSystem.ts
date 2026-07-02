import type { ParticleState, PetalState } from "../types";
import { rand, pick, clamp } from "@/utils/random";

// 粒子对象池
const MAX_PARTICLES = 240;
const MAX_PETALS = 80;

export class ParticleSystem {
  particles: ParticleState[] = [];
  petals: PetalState[] = [];
  private colors: string[] = [];

  setPalette(colors: string[]) {
    this.colors = colors;
  }

  // 爆裂：碰撞时
  burst(x: number, y: number, count = 30) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= MAX_PARTICLES) break;
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(80, 320);
      this.particles.push({
        pos: { x, y },
        vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed - 60 },
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-6, 6),
        size: rand(3, 7),
        color: pick(this.colors),
        life: rand(0.6, 1.2),
        maxLife: 1.2,
        shape: pick(["rect", "tri", "circle"] as const),
      });
    }
  }

  // 飘落纸花瓣（持续环境）
  ambientPetal(x: number, y: number, color: string) {
    if (this.petals.length >= MAX_PETALS) return;
    this.petals.push({
      pos: { x, y },
      vel: { x: rand(-20, 20), y: rand(20, 60) },
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-1, 1),
      size: rand(4, 8),
      color,
      life: rand(4, 8),
      maxLife: 8,
    });
  }

  // 拾取星芒时的小爆
  spark(x: number, y: number) {
    for (let i = 0; i < 8; i++) {
      if (this.particles.length >= MAX_PARTICLES) break;
      const angle = Math.random() * Math.PI * 2;
      const speed = rand(60, 160);
      this.particles.push({
        pos: { x, y },
        vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-3, 3),
        size: rand(2, 4),
        color: "#ffdd99",
        life: 0.4,
        maxLife: 0.4,
        shape: "circle",
      });
    }
  }

  update(dt: number) {
    // 粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      p.vel.y += 240 * dt; // 模拟重力
      p.vel.x *= 0.99;
      p.vel.y *= 0.99;
      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;
      p.rot += p.rotSpeed * dt;
    }
    // 纸花瓣
    for (let i = this.petals.length - 1; i >= 0; i--) {
      const p = this.petals[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.petals.splice(i, 1);
        continue;
      }
      p.pos.x += p.vel.x * dt;
      p.pos.y += p.vel.y * dt;
      p.rot += p.rotSpeed * dt;
      // 横向摇摆
      p.vel.x += Math.sin(p.rot) * 20 * dt;
      p.vel.x = clamp(p.vel.x, -40, 40);
    }
  }

  reset() {
    this.particles = [];
    this.petals = [];
  }
}
