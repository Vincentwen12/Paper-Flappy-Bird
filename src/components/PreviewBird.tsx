// 用于收藏馆预览 / 主菜单的折纸鸟 SVG
import type { Skin } from "@/data/skins";

interface PreviewBirdProps {
  skin: Skin;
  size?: number;
  className?: string;
  // 0..1 动画相位
  phase?: number;
}

export function PreviewBird({ skin, size = 120, className, phase = 0 }: PreviewBirdProps) {
  const body = skin.colors[0] ?? "#fafaf7";
  const shadow = skin.colors[1] ?? "#d8d3c5";
  const wingY = Math.sin(phase * Math.PI * 2) * 6;
  const wingTilt = Math.sin(phase * Math.PI * 2) * 18 - 12;

  return (
    <svg
      viewBox="-60 -50 120 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {/* 主体菱形 */}
      <polygon
        points="-30,0 0,-22 30,0 0,18"
        fill={body}
        stroke={shadow}
        strokeWidth="1.2"
      />
      {/* 亮面 */}
      <polygon
        points="-30,0 0,-22 0,0"
        fill={lighten(body, 0.06)}
        stroke={shadow}
        strokeWidth="1.2"
      />
      {/* 暗面 */}
      <polygon
        points="0,0 30,0 0,18"
        fill={darken(body, 0.06)}
        stroke={shadow}
        strokeWidth="1.2"
      />
      {/* 翅膀 */}
      <g transform={`translate(-6,${wingY}) rotate(${wingTilt})`}>
        <polygon
          points="0,0 -22,-6 -18,8"
          fill={darken(body, 0.12)}
          stroke={shadow}
          strokeWidth="1.2"
        />
      </g>
      {/* 尾 */}
      <polygon
        points="-30,0 -45,-6 -45,8 -30,6"
        fill={shadow}
        stroke={shadow}
        strokeWidth="1.2"
      />
      {/* 眼 */}
      <circle cx="6" cy="-6" r="3.2" fill="#1a1a1a" />
      <circle cx="7" cy="-7" r="1" fill="#fafaf7" />
      {/* 嘴 */}
      <polygon
        points="16,-1 28,2 16,5"
        fill={shadow}
        stroke={shadow}
        strokeWidth="1.2"
      />
    </svg>
  );
}

function lighten(hex: string, amt: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.min(255, Math.round(v + 255 * amt)).toString(16).padStart(2, "0"))
      .join("")
  );
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
