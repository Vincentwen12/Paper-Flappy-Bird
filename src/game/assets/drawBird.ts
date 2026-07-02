// 程序化绘制折纸鸟
import type { BirdState } from "../types";

export interface BirdDrawOptions {
  body: string;
  shadow: string;
  scale: number; // 皮肤基础缩放
  flapPhase: number; // 0..1
  tilt: number; // 弧度
  shield?: boolean;
  invuln?: number; // 0..1 闪烁
  // 受道具影响
  effect?: "umbrella" | "boat" | "plane" | "crane" | null;
  effectTime?: number;
}

export function drawBird(
  ctx: CanvasRenderingContext2D,
  bird: BirdState,
  opt: BirdDrawOptions,
) {
  const r = bird.radius * opt.scale;
  const cx = bird.pos.x;
  const cy = bird.pos.y;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(opt.tilt);

  const effScale = bird.scaleMod || 1;
  ctx.scale(effScale, effScale);

  // 护盾圈
  if (opt.shield) {
    ctx.save();
    ctx.rotate(-opt.tilt);
    const grad = ctx.createRadialGradient(0, 0, r * 1.1, 0, 0, r * 1.9);
    grad.addColorStop(0, "rgba(255,255,255,0.0)");
    grad.addColorStop(0.6, "rgba(184,201,216,0.35)");
    grad.addColorStop(1, "rgba(184,201,216,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.9, 0, Math.PI * 2);
    ctx.fill();
    // 描边
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = `rgba(184,201,216,${0.5 + 0.3 * Math.sin(Date.now() / 200)})`;
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 折纸鸟主体 - 7 个折面（菱形主体 + 头 + 翅膀 + 尾）
  // 身体（菱形）
  ctx.fillStyle = opt.body;
  ctx.strokeStyle = opt.shadow;
  ctx.lineWidth = 1.2;
  drawFacetedBody(ctx, 0, 0, r, opt.body, opt.shadow, opt.flapPhase);

  // 眼睛
  ctx.fillStyle = "#1a1a1a";
  ctx.beginPath();
  ctx.arc(r * 0.18, -r * 0.18, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fafaf7";
  ctx.beginPath();
  ctx.arc(r * 0.2, -r * 0.2, r * 0.04, 0, Math.PI * 2);
  ctx.fill();

  // 嘴
  ctx.fillStyle = opt.shadow;
  ctx.beginPath();
  ctx.moveTo(r * 0.55, -r * 0.05);
  ctx.lineTo(r * 0.9, r * 0.05);
  ctx.lineTo(r * 0.55, r * 0.15);
  ctx.closePath();
  ctx.fill();

  // 受道具影响叠加层
  if (opt.effect === "umbrella" && opt.effectTime !== undefined) {
    drawUmbrella(ctx, 0, -r * 1.2, r * 1.1, opt.effectTime);
  }
  if (opt.effect === "plane" && opt.effectTime !== undefined) {
    drawPlaneTrail(ctx, r, opt.effectTime);
  }
  if (opt.effect === "crane" && opt.effectTime !== undefined) {
    drawCranes(ctx, r, opt.effectTime);
  }

  ctx.restore();
}

function drawFacetedBody(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  body: string,
  shadow: string,
  flapPhase: number,
) {
  // 折面 = 主菱形 + 上下 2 个亮面 + 1 个暗面
  // 主面
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx, cy - r * 0.7);
  ctx.lineTo(cx + r, cy);
  ctx.lineTo(cx, cy + r * 0.6);
  ctx.closePath();
  ctx.fillStyle = body;
  ctx.fill();
  ctx.strokeStyle = shadow;
  ctx.lineWidth = 1;
  ctx.stroke();

  // 上亮面
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx, cy - r * 0.7);
  ctx.lineTo(cx, cy);
  ctx.closePath();
  ctx.fillStyle = lighten(body, 0.06);
  ctx.fill();
  ctx.stroke();

  // 下暗面
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + r, cy);
  ctx.lineTo(cx, cy + r * 0.6);
  ctx.closePath();
  ctx.fillStyle = darken(body, 0.06);
  ctx.fill();
  ctx.stroke();

  // 翅膀（拍打）
  const wingY = cy + Math.sin(flapPhase * Math.PI * 2) * r * 0.4;
  const wingTilt = Math.sin(flapPhase * Math.PI * 2) * 0.5 - 0.2;
  ctx.save();
  ctx.translate(cx - r * 0.2, cy);
  ctx.rotate(wingTilt);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-r * 0.9, -r * 0.2);
  ctx.lineTo(-r * 0.7, r * 0.4);
  ctx.closePath();
  ctx.fillStyle = darken(body, 0.1);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 尾
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx - r * 1.5, cy - r * 0.2);
  ctx.lineTo(cx - r * 1.5, cy + r * 0.3);
  ctx.lineTo(cx - r, cy + r * 0.2);
  ctx.closePath();
  ctx.fillStyle = shadow;
  ctx.fill();
  ctx.stroke();
}

function drawUmbrella(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
) {
  // 油纸伞 - 8 折
  const colors = ["#e8b4b8", "#d49898", "#f4d4d8"];
  const N = 8;
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI - Math.PI;
    const a1 = ((i + 1) / N) * Math.PI - Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a0, a1);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    ctx.strokeStyle = "#a88080";
    ctx.lineWidth = 0.6;
    ctx.stroke();
  }
  // 伞柄
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy + r * 1.2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#5a5448";
  ctx.stroke();
  // 旋转微动
  const sway = Math.sin(t * 2) * 0.1;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(sway);
  ctx.restore();
}

function drawPlaneTrail(
  ctx: CanvasRenderingContext2D,
  r: number,
  t: number,
) {
  // 拖尾 3 个虚线折纸飞机
  for (let i = 0; i < 3; i++) {
    const k = i + 1;
    const phase = (t * 2 + i * 0.3) % 1;
    const x = -r - 12 - phase * 40;
    const alpha = 1 - phase;
    ctx.save();
    ctx.translate(x, Math.sin(t * 4 + i) * 2);
    ctx.rotate(-0.1);
    ctx.globalAlpha = alpha * 0.6;
    ctx.fillStyle = "#cfc8b8";
    ctx.strokeStyle = "#7a7368";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -4);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-10, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawCranes(ctx: CanvasRenderingContext2D, r: number, t: number) {
  // 3 只小纸鹤环绕
  for (let i = 0; i < 3; i++) {
    const a = t * 1.6 + (i * Math.PI * 2) / 3;
    const x = Math.cos(a) * r * 1.4;
    const y = Math.sin(a) * r * 1.4;
    const angle = a + Math.PI / 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "#b8c4a0";
    ctx.strokeStyle = "#7a8a60";
    ctx.lineWidth = 0.8;
    // 简单纸鹤剪影
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(5, 0);
    ctx.lineTo(0, 6);
    ctx.lineTo(-5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // 翅
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, -2);
    ctx.lineTo(8, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

function lighten(hex: string, amt: number): string {
  const c = hexToRgb(hex);
  return rgbToHex(
    Math.min(255, c[0] + 255 * amt),
    Math.min(255, c[1] + 255 * amt),
    Math.min(255, c[2] + 255 * amt),
  );
}
function darken(hex: string, amt: number): string {
  const c = hexToRgb(hex);
  return rgbToHex(
    Math.max(0, c[0] - 255 * amt),
    Math.max(0, c[1] - 255 * amt),
    Math.max(0, c[2] - 255 * amt),
  );
}
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
  );
}
