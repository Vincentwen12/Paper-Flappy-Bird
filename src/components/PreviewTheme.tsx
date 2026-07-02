// 主题预览缩略图
import type { Theme } from "@/data/themes";

export function PreviewTheme({ theme, size = 200 }: { theme: Theme; size?: number }) {
  return (
    <svg viewBox="0 0 200 120" width="100%" height={size} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`sky-${theme.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.skyColors[0]} />
          <stop offset="0.4" stopColor={theme.skyColors[1]} />
          <stop offset="0.8" stopColor={theme.skyColors[2]} />
          <stop offset="1" stopColor={theme.skyColors[3]} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="120" fill={`url(#sky-${theme.id})`} />
      {/* 远山 */}
      <polygon
        points="0,90 30,55 60,75 90,45 130,70 170,50 200,80 200,120 0,120"
        fill={theme.mountainFar}
        stroke="rgba(0,0,0,0.06)"
      />
      {/* 近山 */}
      <polygon
        points="0,110 40,80 80,100 120,75 160,95 200,85 200,120 0,120"
        fill={theme.mountainNear}
        stroke="rgba(0,0,0,0.06)"
      />
      {/* 管道示意 */}
      <rect x="80" y="20" width="14" height="50" fill={theme.pipeFill} stroke={theme.pipeStroke} />
      <rect x="80" y="80" width="14" height="40" fill={theme.pipeFill} stroke={theme.pipeStroke} />
    </svg>
  );
}
