// 星芒 / 樱花瓣 / 道具的 draw
import type { StarState } from "../types";

export function drawStar(ctx: CanvasRenderingContext2D, s: StarState) {
  ctx.save();
  ctx.translate(s.pos.x, s.pos.y);
  ctx.rotate(s.rot);
  // 6 角星
  ctx.fillStyle = "#ffdd99";
  ctx.strokeStyle = "#a8865a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let i = 0; i < 12; i++) {
    const r = i % 2 === 0 ? 6 : 3;
    const a = (i / 12) * Math.PI * 2;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export function drawPetal(
  ctx: CanvasRenderingContext2D,
  pos: { x: number; y: number },
  rot: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(rot);
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(0,0,0,0.06)";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo(size * 0.6, -size * 0.3, 0, size);
  ctx.quadraticCurveTo(-size * 0.6, -size * 0.3, 0, -size);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
