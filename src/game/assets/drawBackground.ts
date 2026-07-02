// 背景绘制：水彩天空 + 折纸山 + 远云 + 地面
import type { Theme } from "@/data/themes";

export interface BackgroundDrawOptions {
  theme: Theme;
  width: number;
  height: number;
  groundY: number;
  time: number;
  // 视差偏移（0..1）
  scroll: number;
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  opt: BackgroundDrawOptions,
) {
  const { theme, width, height, groundY, time, scroll } = opt;

  // 天空渐变
  const sky = ctx.createLinearGradient(0, 0, 0, groundY);
  sky.addColorStop(0, theme.skyColors[0]);
  sky.addColorStop(0.4, theme.skyColors[1]);
  sky.addColorStop(0.8, theme.skyColors[2]);
  sky.addColorStop(1, theme.skyColors[3]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, groundY);

  // 远云
  drawClouds(ctx, width, groundY, time, theme, scroll * 0.2);

  // 远山（多边形）
  drawPaperMountain(
    ctx,
    width,
    groundY,
    theme.mountainFar,
    scroll * 0.3,
    0.35,
    0.6,
  );

  // 中山
  drawPaperMountain(
    ctx,
    width,
    groundY,
    theme.mountainNear,
    scroll * 0.5,
    0.5,
    0.78,
  );

  // 地面（折纸台地）
  drawPaperGround(ctx, width, height, groundY, theme);
}

function drawClouds(
  ctx: CanvasRenderingContext2D,
  w: number,
  groundY: number,
  t: number,
  theme: Theme,
  offset: number,
) {
  // 简单的"折纸云"——用白色多边形
  const cloudY = groundY * 0.25;
  const clouds = 5;
  for (let i = 0; i < clouds; i++) {
    const baseX = (i / clouds) * w * 1.5 - (offset * 100);
    const x = ((baseX + t * 8) % (w * 1.5)) - w * 0.25;
    const y = cloudY + Math.sin(t * 0.4 + i) * 8;
    drawPaperCloud(ctx, x, y, 60 + (i % 3) * 14);
  }
}

function drawPaperCloud(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.strokeStyle = "rgba(168,161,146,0.35)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  // 折纸感的多边形云
  ctx.moveTo(-size, 0);
  ctx.lineTo(-size * 0.7, -size * 0.3);
  ctx.lineTo(-size * 0.3, -size * 0.5);
  ctx.lineTo(size * 0.1, -size * 0.45);
  ctx.lineTo(size * 0.5, -size * 0.3);
  ctx.lineTo(size * 0.8, -size * 0.1);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.5, size * 0.15);
  ctx.lineTo(0, size * 0.2);
  ctx.lineTo(-size * 0.4, size * 0.15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPaperMountain(
  ctx: CanvasRenderingContext2D,
  w: number,
  groundY: number,
  color: string,
  offset: number,
  sizeFactor: number,
  yFactor: number,
) {
  const peakY = groundY * yFactor;
  const amplitude = groundY * sizeFactor;
  // 多边形山脊
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = darken(color, 0.08);
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  const segs = 10;
  for (let i = 0; i <= segs; i++) {
    const x = (i / segs) * w * 1.4 - offset;
    const y =
      groundY -
      Math.abs(Math.sin(i * 0.8 + 1.3)) * amplitude -
      Math.abs(Math.cos(i * 0.5 + 0.5)) * amplitude * 0.5;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineTo(w * 1.4, groundY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 折面细分（亮面）
  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  for (let i = 0; i <= segs; i++) {
    const x = (i / segs) * w * 1.4 - offset;
    const y =
      groundY -
      Math.abs(Math.sin(i * 0.8 + 1.3)) * amplitude -
      Math.abs(Math.cos(i * 0.5 + 0.5)) * amplitude * 0.5;
    if (i === 0) ctx.lineTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.lineTo(0, peakY);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawPaperGround(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  groundY: number,
  theme: Theme,
) {
  // 折纸台地
  const gh = h - groundY;
  const grad = ctx.createLinearGradient(0, groundY, 0, h);
  grad.addColorStop(0, darken(theme.mountainNear, 0.04));
  grad.addColorStop(0.4, theme.mountainNear);
  grad.addColorStop(1, darken(theme.mountainNear, 0.12));
  ctx.fillStyle = grad;
  ctx.fillRect(0, groundY, w, gh);

  // 折痕横线
  ctx.strokeStyle = darken(theme.mountainNear, 0.18);
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 3; i++) {
    const ly = groundY + gh * (0.3 + i * 0.25);
    ctx.beginPath();
    ctx.moveTo(0, ly);
    ctx.lineTo(w, ly);
    ctx.stroke();
  }

  // 顶部 1px 描边
  ctx.strokeStyle = theme.pipeStroke;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(w, groundY);
  ctx.stroke();
}

function darken(hex: string, amt: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.round(v - 255 * amt)).toString(16).padStart(2, "0"))
      .join("")
  );
}
