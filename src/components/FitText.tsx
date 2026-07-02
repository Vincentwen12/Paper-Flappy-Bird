import { useRef, useLayoutEffect, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** 基准字号 px */
  baseSize?: number;
  /** 最小字号 px */
  minSize?: number;
  /** 步进 px */
  step?: number;
  className?: string;
}

/**
 * 根据容器宽度动态缩放文字，确保不溢出。
 * 从 baseSize 开始，逐步 -step 直到文字宽度 <= 容器宽度，或触达 minSize。
 */
export function FitText({ children, baseSize = 14, minSize = 8, step = 0.5, className }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState(baseSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    let current = baseSize;
    measure.style.fontSize = `${current}px`;
    // 等待一帧让布局稳定
    const raf = requestAnimationFrame(() => {
      while (current > minSize && measure && measure.scrollWidth > container.clientWidth) {
        current -= step;
        measure.style.fontSize = `${current}px`;
      }
      setSize(current);
    });
    return () => cancelAnimationFrame(raf);
  }, [children, baseSize, minSize, step]);

  return (
    <span ref={containerRef} className={className} style={{ fontSize: `${size}px`, overflow: "hidden" }}>
      {/* 隐藏的测量元素 */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontSize: `${baseSize}px`,
        }}
      >
        {children}
      </span>
      {children}
    </span>
  );
}