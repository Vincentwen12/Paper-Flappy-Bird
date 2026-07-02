// 折纸道具绘制
import type { PowerUpKind } from "@/data/powerUps";
import { findPowerUp } from "@/data/powerUps";
import type { PowerUpState } from "../types";

export function drawPowerUp(
  ctx: CanvasRenderingContext2D,
  pu: PowerUpState,
  time: number,
) {
  const def = findPowerUp(pu.kind);
  ctx.save();
  ctx.translate(pu.pos.x, pu.pos.y);

  // 旋转光晕
  const halo = ctx.createRadialGradient(0, 0, 6, 0, 0, 32);
  halo.addColorStop(0, hexAlpha(def.color, 0.3));
  halo.addColorStop(1, hexAlpha(def.color, 0));
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(pu.rot);
  // 6 边形徽章
  const r = 16;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "#fafaf7";
  ctx.fill();
  ctx.strokeStyle = def.color;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 内部图形
  ctx.rotate(-pu.rot);
  drawKindIcon(ctx, pu.kind, time);

  ctx.restore();
}

function drawKindIcon(
  ctx: CanvasRenderingContext2D,
  kind: PowerUpKind,
  t: number,
) {
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (kind === "umbrella") {
    // 纸伞
    ctx.fillStyle = "#e8b4b8";
    ctx.beginPath();
    ctx.arc(0, -2, 8, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#7a5a5a";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(0, 7);
    ctx.stroke();
  } else if (kind === "boat") {
    // 纸船
    ctx.fillStyle = "#b8c9d8";
    ctx.beginPath();
    ctx.moveTo(-8, 2);
    ctx.lineTo(8, 2);
    ctx.lineTo(5, 7);
    ctx.lineTo(-5, 7);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#5a7080";
    ctx.stroke();
    // 帆
    ctx.beginPath();
    ctx.moveTo(-1, 2);
    ctx.lineTo(-1, -5);
    ctx.lineTo(5, 2);
    ctx.closePath();
    ctx.fillStyle = "#d4dde6";
    ctx.fill();
    ctx.stroke();
  } else if (kind === "lantern") {
    // 纸灯
    const flicker = 0.85 + Math.sin(t * 6) * 0.15;
    ctx.fillStyle = `rgba(255,221,153,${flicker})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#a8865a";
    ctx.stroke();
    // 提手
    ctx.beginPath();
    ctx.moveTo(-4, -8);
    ctx.quadraticCurveTo(0, -12, 4, -8);
    ctx.stroke();
  } else if (kind === "plane") {
    // 纸飞机
    ctx.fillStyle = "#cfc8b8";
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-6, -5);
    ctx.lineTo(-3, 0);
    ctx.lineTo(-6, 5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#7a7368";
    ctx.stroke();
  } else if (kind === "crane") {
    // 纸鹤
    ctx.fillStyle = "#b8c4a0";
    ctx.strokeStyle = "#7a8a60";
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(5, 0);
    ctx.lineTo(0, 6);
    ctx.lineTo(-5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, -2);
    ctx.lineTo(8, 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

function hexAlpha(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
