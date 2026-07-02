// 折纸管道绘制
import type { PipeState } from "../types";

export interface PipeDrawOptions {
  fill: string;
  stroke: string;
  // 是否摇摆
  swing: boolean;
  time: number;
}

export function drawPipe(
  ctx: CanvasRenderingContext2D,
  pipe: PipeState,
  viewH: number,
  groundY: number,
  opt: PipeDrawOptions,
) {
  const x = pipe.x;
  const w = pipe.width;
  const gapH = pipe.gapHeight;
  const centerY = pipe.gapY + (opt.swing ? Math.sin(opt.time * 1.5 + (pipe.phase ?? 0)) * (pipe.swingAmp ?? 30) : 0);
  const topY = centerY - gapH / 2;
  const botY = centerY + gapH / 2;

  ctx.save();
  // 上管道
  drawSinglePipe(ctx, x, 0, w, topY, opt);
  // 下管道
  drawSinglePipe(ctx, x, botY, w, groundY, opt);
  ctx.restore();
}

function drawSinglePipe(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opt: PipeDrawOptions,
) {
  if (h <= 0) return;
  // 渐变填充
  const grad = ctx.createLinearGradient(x, 0, x + w, 0);
  grad.addColorStop(0, darken(opt.fill, 0.05));
  grad.addColorStop(0.4, opt.fill);
  grad.addColorStop(1, darken(opt.fill, 0.05));
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);

  // 折痕
  ctx.strokeStyle = darken(opt.fill, 0.08);
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(x + w * 0.33, y);
  ctx.lineTo(x + w * 0.33, y + h);
  ctx.moveTo(x + w * 0.66, y);
  ctx.lineTo(x + w * 0.66, y + h);
  ctx.stroke();

  // 描边
  ctx.strokeStyle = opt.stroke;
  ctx.lineWidth = 1.4;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

  // 顶端帽（折纸的"折"）
  const capH = 22;
  const capY = y > 0 ? y : y + h - capH;
  if (y > 0) {
    // 顶帽在 y=0 附近的下方 = y
  }
  // 简单画：在每根管子两端画一条横线加强折纸感
  ctx.fillStyle = darken(opt.fill, 0.04);
  ctx.fillRect(x - 4, y, w + 8, 3);
  ctx.fillRect(x - 4, y + h - 3, w + 8, 3);
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
