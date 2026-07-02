import clsx from "clsx";
import { type ReactNode } from "react";

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export function PaperCard({
  children,
  className,
  hover = false,
  onClick,
  selected = false,
}: PaperCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative bg-paper-50 border rounded-sm shadow-paper",
        "transition-all duration-200",
        selected
          ? "border-ink-400 shadow-paper-hover"
          : "border-paper-300",
        hover && "btn-lift hover:border-ink-100 hover:shadow-paper-hover cursor-pointer",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  );
}
