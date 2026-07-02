// 主游戏引擎
import { findSkin } from "@/data/skins";
import { findTheme } from "@/data/themes";
import { findEquipment } from "@/data/equipment";
import { POWERUPS, type PowerUpKind } from "@/data/powerUps";
import { getTaskDef } from "@/data/tasks";
import { rand, randInt, pick, clamp } from "@/utils/random";
import type { Theme } from "@/data/themes";
import type { Skin } from "@/data/skins";
import type { Equipment } from "@/data/equipment";

import { InputManager } from "./InputManager";
import { PhysicsWorld } from "./PhysicsWorld";
import { ParticleSystem } from "./ParticleSystem";
import { drawBird } from "../assets/drawBird";
import { drawPipe } from "../assets/drawPipe";
import { drawBackground } from "../assets/drawBackground";
import { drawPowerUp } from "../assets/drawPowerUp";
import { drawStar, drawPetal } from "../assets/drawStar";

import { useGameStore, type GamePhase } from "@/store/gameStore";
import { useProfileStore } from "@/store/profileStore";
import { Audio } from "../audio/AudioManager";
import type {
  BirdState,
  GameConfig,
  ParticleState,
  PetalState,
  PipeState,
  PowerUpState,
  StarState,
} from "../types";
import { DEFAULT_CONFIG } from "../types";

export interface EngineSnapshot {
  phase: GamePhase;
  score: number;
  bestScore: number;
  starsEarned: number;
  combo: number;
  activePowerUp: { kind: PowerUpKind; remaining: number } | null;
}

export interface EngineCallbacks {
  onDeath: (snapshot: EngineSnapshot) => void;
  onScore: (score: number, delta: number, combo: number) => void;
  onPickPowerUp: (kind: PowerUpKind) => void;
  onPickStar: (count: number) => void;
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: GameConfig = { ...DEFAULT_CONFIG };
  private input: InputManager;
  private physics: PhysicsWorld;
  private particles: ParticleSystem;

  // 实体
  private bird: BirdState;
  private pipes: PipeState[] = [];
  private powerUps: PowerUpState[] = [];
  private stars: StarState[] = [];
  private particlesList: ParticleState[] = []; // 备用
  private ambientPetals: PetalState[] = []; // 备用（用 ParticleSystem）

  // 状态
  private phase: GamePhase = "ready";
  private score = 0;
  private combo = 0;
  private starsEarned = 0;
  private pipeTimer = 0;
  private starTimer = 0;
  private powerUpTimer = 0;
  private petalTimer = 0;
  private lastTime = 0;
  private elapsed = 0;
  private running = false;
  private rafId = 0;
  private flapPhase = 0;
  private invulnFlash = 0;

  // 视口
  private viewW = 0;
  private viewH = 0;
  private dpr = 1;

  // 道具生效
  private activeKind: PowerUpKind | null = null;
  private activeRemaining = 0;
  // 受道具影响后的鸟属性
  private birdScaleMod = 1;
  private slowFactor = 1;
  private scoreMult = 1;

  // 皮肤/主题/装备
  private skin: Skin;
  private theme: Theme;
  private trail: Equipment;
  private shieldEquip: Equipment;
  private accessory: Equipment;
  private quality: "low" | "medium" | "high" = "high";
  private musicOn = true;
  private soundOn = true;
  private textureStrength = 60;
  // 任务进度追踪
  private trackedGameScore = 0;
  private trackedStars = 0;
  private trackedPipes = 0;
  private trackedPowerUps = 0;
  private trackedCombo = 0;

  // 回调
  private cb: EngineCallbacks;

  constructor(
    canvas: HTMLCanvasElement,
    cb: EngineCallbacks,
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("无法获取 Canvas 2D 上下文");
    this.ctx = ctx;
    this.cb = cb;
    this.input = new InputManager();
    this.physics = new PhysicsWorld();
    this.particles = new ParticleSystem();
    this.bird = this.makeBird();
    this.skin = findSkin("classic");
    this.theme = findTheme("morning");
    this.trail = findEquipment("trail-basic");
    this.shieldEquip = findEquipment("shield-paper");
    this.accessory = findEquipment("acc-none");
  }

  private makeBird(): BirdState {
    return {
      pos: { x: 0, y: 0 },
      vel: { x: 0, y: 0 },
      radius: 18,
      rot: 0,
      alive: true,
      scaleMod: 1,
      invuln: 0,
      hasShield: false,
    };
  }

  setQuality(q: "low" | "medium" | "high") {
    this.quality = q;
  }

  setSkin(id: string) {
    this.skin = findSkin(id);
  }

  setTheme(id: string) {
    this.theme = findTheme(id);
  }

  setAudioOptions(opts: { musicOn: boolean; soundOn: boolean; texture: number }) {
    this.musicOn = opts.musicOn;
    this.soundOn = opts.soundOn;
    this.textureStrength = opts.texture;
  }

  start() {
    this.syncFromStores();
    this.resize();
    window.addEventListener("resize", this.resize);
    this.input.attach(this.canvas);
    this.input.on((e) => this.handleInput(e));
    this.reset();
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
    window.removeEventListener("resize", this.resize);
    this.input.detach();
    cancelAnimationFrame(this.rafId);
    Audio.stopMusic();
  }

  // 软暂停（菜单显示时）
  pause() {
    if (this.phase === "playing") this.setPhase("paused");
  }
  resume() {
    if (this.phase === "paused") {
      this.setPhase("playing");
      this.lastTime = performance.now();
    }
  }

  restart() {
    this.reset();
  }

  private syncFromStores() {
    const p = useProfileStore.getState().profile;
    this.skin = findSkin(p.equippedSkin);
    this.theme = findTheme(p.equippedTheme);
    this.trail = findEquipment(p.equippedTrail);
    this.shieldEquip = findEquipment(p.equippedShield);
    this.accessory = findEquipment(p.equippedAccessory);
    this.quality = p.settings.quality;
    this.musicOn = p.settings.musicOn;
    this.soundOn = p.settings.soundOn;
    this.textureStrength = p.settings.paperTexture;
  }

  private resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    const rect = this.canvas.getBoundingClientRect();
    this.viewW = rect.width;
    this.viewH = rect.height;
    this.canvas.width = Math.floor(rect.width * dpr);
    this.canvas.height = Math.floor(rect.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 重设地面高度（占视口 80%）
    this.config.groundY = Math.floor(this.viewH * 0.82);
  };

  private reset() {
    this.syncFromStores();
    this.particles.setPalette([
      this.theme.particleColor,
      "#fafaf7",
      "#e8e3d6",
    ]);
    this.particles.reset();
    this.bird = this.makeBird();
    this.bird.pos.x = this.viewW * 0.28;
    this.bird.pos.y = this.viewH * 0.4;
    this.pipes = [];
    this.powerUps = [];
    this.stars = [];
    this.pipeTimer = 0;
    this.starTimer = 0;
    this.powerUpTimer = 0;
    this.petalTimer = 0;
    this.score = 0;
    this.combo = 0;
    this.starsEarned = 0;
    this.trackedGameScore = 0;
    this.trackedStars = 0;
    this.trackedPipes = 0;
    this.trackedPowerUps = 0;
    this.trackedCombo = 0;
    this.activeKind = null;
    this.activeRemaining = 0;
    this.birdScaleMod = 1;
    this.slowFactor = 1;
    this.scoreMult = 1;
    this.setPhase("ready");
    useGameStore.getState().setScore(0);
    useGameStore.getState().setCombo(0);
    useGameStore.getState().setStars(0);
    useGameStore.getState().setActivePowerUp(null);
    useGameStore.getState().setBestScore(useProfileStore.getState().profile.bestScore);
  }

  private setPhase(p: GamePhase) {
    this.phase = p;
    useGameStore.getState().setPhase(p);
    if (p === "playing" && this.musicOn) Audio.startMusic();
    if (p !== "playing" && p !== "ready") Audio.stopMusic();
  }

  private handleInput(e: "flap" | "pause" | "restart") {
    if (e === "flap") {
      if (this.phase === "ready") {
        this.setPhase("playing");
        this.physics.flap(this.bird, this.config);
        if (this.soundOn) Audio.flap();
      } else if (this.phase === "playing") {
        this.physics.flap(this.bird, this.config);
        if (this.soundOn) Audio.flap();
      } else if (this.phase === "dead") {
        // 静默等待用户主动点击 restart
      }
    } else if (e === "pause") {
      if (this.phase === "playing") {
        this.setPhase("paused");
      } else if (this.phase === "paused") {
        this.setPhase("playing");
        this.lastTime = performance.now();
      }
    } else if (e === "restart") {
      if (this.phase === "dead" || this.phase === "paused") {
        this.restart();
      }
    }
  }

  private loop = () => {
    if (!this.running) return;
    const now = performance.now();
    let dt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    if (dt > 0.1) dt = 0.1; // 避免长时暂停后跳跃

    // 仅在 playing 时累加 elapsed，避免暂停时背景继续滚动
    if (this.phase === "playing") {
      this.elapsed += dt;
      this.update(dt);
    }
    this.render();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    this.flapPhase = (this.flapPhase + dt * 8) % 1;

    // 鸟物理
    this.physics.updateBird(this.bird, dt, this.config, this.slowFactor);

    // 鸟自动受慢动作影响
    this.bird.scaleMod = this.birdScaleMod;
    if (this.bird.invuln > 0) {
      this.bird.invuln -= dt;
      this.invulnFlash = (this.invulnFlash + dt * 10) % 1;
    }

    // 边界（地面 / 顶部）
    if (this.bird.pos.y + this.bird.radius >= this.config.groundY) {
      this.bird.pos.y = this.config.groundY - this.bird.radius;
      this.die();
    } else if (this.bird.pos.y - this.bird.radius <= 0) {
      this.bird.pos.y = this.bird.radius;
      this.bird.vel.y = Math.max(0, this.bird.vel.y);
    }

    // 管道移动 + 得分
    const speed = this.config.pipeSpeed * (1 + Math.floor(this.score / 10) * 0.02);
    for (const p of this.pipes) {
      p.x -= speed * dt;
      if (!p.passed && p.x + p.width < this.bird.pos.x - this.bird.radius) {
        p.passed = true;
        this.combo += 1;
        this.trackedPipes += 1;
        this.trackedCombo = Math.max(this.trackedCombo, this.combo);
        const delta = 1 * this.scoreMult;
        this.score += delta;
        this.starsEarned += 1;
        useGameStore.getState().setScore(this.score);
        useGameStore.getState().setCombo(this.combo);
        useGameStore.getState().setStars(this.starsEarned);
        if (this.soundOn) Audio.score();
        this.cb.onScore(this.score, delta, this.combo);
      }
    }
    // 移除出屏
    this.pipes = this.pipes.filter((p) => p.x + p.width > -50);

    // 道具 / 星芒
    for (const pu of this.powerUps) {
      if (pu.collected) continue;
      pu.pos.x -= speed * dt;
      pu.rot += dt * 1.4;
      pu.pulse = (pu.pulse + dt) % 1;
    }
    this.powerUps = this.powerUps.filter(
      (p) => !p.collected && p.pos.x > -30,
    );

    for (const s of this.stars) {
      if (s.collected) continue;
      s.pos.x -= speed * dt;
      s.rot += dt * 2;
    }
    this.stars = this.stars.filter((s) => !s.collected && s.pos.x > -30);

    // 道具/星芒生成
    this.pipeTimer += dt;
    if (this.pipeTimer >= this.config.pipeInterval) {
      this.pipeTimer = 0;
      this.spawnPipe();
    }
    this.powerUpTimer += dt;
    if (this.powerUpTimer >= 6 && this.powerUps.length < 1) {
      this.powerUpTimer = 0;
      if (Math.random() < 0.5) this.spawnPowerUp();
    }
    this.starTimer += dt;
    if (this.starTimer >= 2.2) {
      this.starTimer = 0;
      if (Math.random() < 0.65) this.spawnStar();
    }

    // 环境纸屑
    this.petalTimer += dt;
    if (this.petalTimer >= 0.6) {
      this.petalTimer = 0;
      this.particles.ambientPetal(
        this.viewW + 20,
        rand(40, this.config.groundY - 40),
        pick(["#fafaf7", "#e8b4b8", "#b8c9d8", "#b8c4a0"]),
      );
    }

    // 鸟与道具/星芒碰撞
    this.checkPickups();

    // 鸟与管道碰撞
    this.checkPipeCollision();

    // 道具倒计时
    if (this.activeKind) {
      this.activeRemaining -= dt;
      useGameStore
        .getState()
        .setActivePowerUp({ kind: this.activeKind, remaining: Math.max(0, this.activeRemaining) });
      if (this.activeRemaining <= 0) {
        this.deactivatePowerUp();
      }
    }

    // 粒子系统
    this.particles.update(dt);
    // 尾迹粒子
    if (this.trail && this.trail.colors && this.trail.id !== "trail-basic") {
      const trailColors = this.trail.colors;
      this.particles.ambientPetal(
        this.bird.pos.x - this.bird.radius * 0.8,
        this.bird.pos.y,
        trailColors[Math.floor(Math.random() * trailColors.length)] ?? "#fafaf7",
      );
    }
  }

  private spawnPipe() {
    const minY = 100;
    const maxY = this.config.groundY - 100 - this.config.pipeGap;
    const centerY = rand(minY + this.config.pipeGap / 2, maxY);
    const swing = this.score >= 20 && Math.random() < 0.4;
    this.pipes.push({
      x: this.viewW + 50,
      gapY: centerY,
      gapHeight: this.config.pipeGap,
      width: this.config.pipeWidth,
      passed: false,
      swing,
      swingAmp: swing ? rand(20, 50) : 0,
      swingSpeed: swing ? rand(0.7, 1.3) : 0,
      phase: Math.random() * Math.PI * 2,
    });
  }

  private spawnPowerUp() {
    const kind = pick(POWERUPS).kind;
    const y = rand(
      this.config.groundY * 0.3,
      this.config.groundY - 80,
    );
    this.powerUps.push({
      kind,
      pos: { x: this.viewW + 30, y },
      collected: false,
      rot: 0,
      pulse: 0,
    });
  }

  private spawnStar() {
    const y = rand(this.config.groundY * 0.25, this.config.groundY - 60);
    this.stars.push({
      pos: { x: this.viewW + 30, y },
      collected: false,
      rot: 0,
    });
  }

  private checkPickups() {
    const r = this.bird.radius * this.birdScaleMod;
    // 道具
    for (const pu of this.powerUps) {
      if (pu.collected) continue;
      const dx = pu.pos.x - this.bird.pos.x;
      const dy = pu.pos.y - this.bird.pos.y;
      if (dx * dx + dy * dy < (r + 16) ** 2) {
        pu.collected = true;
        this.trackedPowerUps += 1;
        this.activatePowerUp(pu.kind);
        this.particles.spark(pu.pos.x, pu.pos.y);
        if (this.soundOn) Audio.pickup();
        this.cb.onPickPowerUp(pu.kind);
      }
    }
    // 星芒（受纸鹤磁吸影响）
    const magnet = this.activeKind === "crane";
    const magnetR = magnet ? 100 : 0;
    for (const s of this.stars) {
      if (s.collected) continue;
      if (magnet) {
        const dx = s.pos.x - this.bird.pos.x;
        const dy = s.pos.y - this.bird.pos.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < magnetR * magnetR) {
          const d = Math.sqrt(d2) || 1;
          s.pos.x -= (dx / d) * 200 * (1 / 60);
          s.pos.y -= (dy / d) * 200 * (1 / 60);
        }
      }
      const dx = s.pos.x - this.bird.pos.x;
      const dy = s.pos.y - this.bird.pos.y;
      if (dx * dx + dy * dy < (r + 8) ** 2) {
        s.collected = true;
        this.trackedStars += 1;
        this.starsEarned += 1;
        useGameStore.getState().setStars(this.starsEarned);
        this.particles.spark(s.pos.x, s.pos.y);
        if (this.soundOn) Audio.pickup();
        this.cb.onPickStar(1);
      }
    }
  }

  private activatePowerUp(kind: PowerUpKind) {
    const def = POWERUPS.find((p) => p.kind === kind)!;
    this.activeKind = kind;
    this.activeRemaining = def.duration;
    useGameStore
      .getState()
      .setActivePowerUp({ kind, remaining: def.duration });
    useGameStore.getState().incPowerUpCount();
    switch (kind) {
      case "umbrella":
        this.bird.hasShield = true;
        break;
      case "boat":
        this.birdScaleMod = 0.5;
        break;
      case "lantern":
        this.slowFactor = 0.5;
        break;
      case "plane":
        this.scoreMult = 2;
        break;
      case "crane":
        break;
    }
  }

  private deactivatePowerUp() {
    const kind = this.activeKind;
    this.activeKind = null;
    this.activeRemaining = 0;
    useGameStore.getState().setActivePowerUp(null);
    if (kind === "boat") this.birdScaleMod = 1;
    if (kind === "lantern") this.slowFactor = 1;
    if (kind === "plane") this.scoreMult = 1;
  }

  private checkPipeCollision() {
    const r = this.bird.radius * this.birdScaleMod;
    for (const p of this.pipes) {
      const swingOffset = p.swing
        ? Math.sin(this.elapsed * 1.5 + (p.phase ?? 0)) * (p.swingAmp ?? 0)
        : 0;
      const centerY = p.gapY + swingOffset;
      const topRect = { x: p.x, y: 0, w: p.width, h: centerY - p.gapHeight / 2 };
      const botRect = {
        x: p.x,
        y: centerY + p.gapHeight / 2,
        w: p.width,
        h: this.config.groundY - (centerY + p.gapHeight / 2),
      };
      if (
        circleRectHit(this.bird.pos.x, this.bird.pos.y, r, topRect) ||
        circleRectHit(this.bird.pos.x, this.bird.pos.y, r, botRect)
      ) {
        if (this.bird.hasShield) {
          // 抵消一次
          this.bird.hasShield = false;
          this.bird.invuln = 1.5;
          if (this.soundOn) Audio.shield();
          this.particles.burst(this.bird.pos.x, this.bird.pos.y, 18);
        } else {
          this.die();
        }
        return;
      }
    }
  }

  private die() {
    if (this.phase === "dead") return;
    this.bird.alive = false;
    this.particles.burst(this.bird.pos.x, this.bird.pos.y, 50);
    if (this.soundOn) Audio.die();
    this.setPhase("dead");
    // 提交分数
    const profile = useProfileStore.getState();
    profile.setBestScore(this.score);
    profile.addStars(this.starsEarned);
    profile.addLeaderboard({
      score: this.score,
      date: new Date().toISOString(),
      starsEarned: this.starsEarned,
    });
    // 更新统计
    profile.addGamePlayed(this.score, this.starsEarned, this.trackedPipes, this.trackedPowerUps, this.trackedCombo);
    // 更新任务进度
    this.updateTaskProgress(profile);
    this.cb.onDeath({
      phase: "dead",
      score: this.score,
      bestScore: Math.max(this.score, profile.profile.bestScore),
      starsEarned: this.starsEarned,
      combo: this.combo,
      activePowerUp: this.activeKind
        ? { kind: this.activeKind, remaining: this.activeRemaining }
        : null,
    });
  }

  private updateTaskProgress(profile: ReturnType<typeof useProfileStore.getState>) {
    const tasks = profile.profile.dailyTasks;
    for (const t of tasks) {
      const def = getTaskDef(t.taskId);
      if (!def || t.completed) continue;
      switch (def.type) {
        case "play_games":
          profile.updateTaskProgress(t.taskId, 1);
          break;
        case "score_total":
          profile.updateTaskProgress(t.taskId, this.score);
          break;
        case "score_single":
          if (this.score >= def.target) profile.updateTaskProgress(t.taskId, 1);
          break;
        case "collect_powerups":
          profile.updateTaskProgress(t.taskId, this.trackedPowerUps);
          break;
        case "pass_pipes":
          profile.updateTaskProgress(t.taskId, this.trackedPipes);
          break;
        case "get_combo":
          if (this.trackedCombo >= def.target) profile.updateTaskProgress(t.taskId, 1);
          break;
        case "collect_stars":
          profile.updateTaskProgress(t.taskId, this.trackedStars);
          break;
        case "die_early":
          if (this.score < 10) profile.updateTaskProgress(t.taskId, 1);
          break;
        case "perfect_run":
          if (this.score >= 20 && this.trackedPowerUps === 0) profile.updateTaskProgress(t.taskId, 1);
          break;
      }
    }
  }

  // === 渲染 ===
  private render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.viewW, this.viewH);

    // 背景
    drawBackground(ctx, {
      theme: this.theme,
      width: this.viewW,
      height: this.viewH,
      groundY: this.config.groundY,
      time: this.elapsed,
      scroll: this.elapsed * this.config.pipeSpeed * 0.01,
    });

    // 环境纸屑
    for (const p of this.particles.petals) {
      const a = clamp(p.life / p.maxLife, 0, 1);
      ctx.globalAlpha = a * 0.7;
      drawPetal(ctx, p.pos, p.rot, p.size, p.color);
    }
    ctx.globalAlpha = 1;

    // 星芒
    for (const s of this.stars) drawStar(ctx, s);

    // 管道
    for (const p of this.pipes) {
      drawPipe(ctx, p, this.viewH, this.config.groundY, {
        fill: this.theme.pipeFill,
        stroke: this.theme.pipeStroke,
        swing: !!p.swing,
        time: this.elapsed,
      });
    }

    // 道具
    for (const pu of this.powerUps) {
      if (pu.collected) continue;
      drawPowerUp(ctx, pu, this.elapsed);
    }

    // 慢动作泛色
    if (this.activeKind === "lantern") {
      ctx.save();
      ctx.fillStyle = "rgba(255, 235, 200, 0.18)";
      ctx.fillRect(0, 0, this.viewW, this.config.groundY);
      ctx.restore();
    }

    // 鸟
    const alive = this.phase !== "dead";
    if (alive || this.bird.pos.y < this.config.groundY - 10) {
      drawBird(ctx, this.bird, {
      body: this.skin.colors[0] ?? "#fafaf7",
      shadow: this.skin.colors[1] ?? "#d8d3c5",
        scale: this.skin.scale,
        flapPhase: this.flapPhase,
        tilt: this.bird.rot,
        shield: this.bird.hasShield,
        invuln: this.bird.invuln,
        effect:
          this.activeKind === "umbrella" || this.activeKind === "plane" || this.activeKind === "crane"
            ? this.activeKind
            : null,
        effectTime: this.elapsed,
      });
    }

    // 粒子
    for (const p of this.particles.particles) {
      const a = clamp(p.life / p.maxLife, 0, 1);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(p.pos.x, p.pos.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.strokeStyle = "rgba(0,0,0,0.05)";
      ctx.lineWidth = 0.5;
      if (p.shape === "rect") {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else if (p.shape === "tri") {
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size, p.size);
        ctx.lineTo(-p.size, p.size);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;

    // 准备态提示
    if (this.phase === "ready") {
      ctx.save();
      ctx.fillStyle = "rgba(26,26,26,0.6)";
      ctx.font = "300 18px 'Noto Serif SC', serif";
      ctx.textAlign = "center";
      ctx.fillText("轻点屏幕 / 按空格 起飞", this.viewW / 2, this.viewH * 0.18);
      ctx.restore();
    }

    // 纸纹叠加
    if (this.textureStrength > 0) {
      ctx.save();
      ctx.globalAlpha = this.textureStrength / 200;
      const pat = ctx.createPattern(this.makeNoiseTile(), "repeat");
      if (pat) {
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, this.viewW, this.viewH);
      }
      ctx.restore();
    }
  }

  private noiseTileCache: HTMLCanvasElement | null = null;
  private makeNoiseTile(): HTMLCanvasElement {
    if (this.noiseTileCache) return this.noiseTileCache;
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const cx = c.getContext("2d")!;
    const img = cx.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 200 + Math.floor(Math.random() * 55);
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 20;
    }
    cx.putImageData(img, 0, 0);
    this.noiseTileCache = c;
    return c;
  }
}

function circleRectHit(
  cx: number,
  cy: number,
  r: number,
  rect: { x: number; y: number; w: number; h: number },
) {
  if (rect.h <= 0 || rect.w <= 0) return false;
  const nx = clamp(cx, rect.x, rect.x + rect.w);
  const ny = clamp(cy, rect.y, rect.y + rect.h);
  const dx = cx - nx;
  const dy = cy - ny;
  return dx * dx + dy * dy < r * r;
}
