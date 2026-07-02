import clsx from "clsx";
import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "subtle";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const variantClasses: Record<NonNullable<GhostButtonProps["variant"]>, string> = {
  primary:
    "bg-paper-100 text-ink-400 border-ink-100 hover:border-ink-400 hover:shadow-paper-hover",
  secondary:
    "bg-paper-50 text-ink-200 border-paper-300 hover:border-ink-50 hover:bg-paper-100",
  subtle:
    "bg-transparent text-ink-50 border-transparent hover:text-ink-400 hover:border-paper-300",
};

const sizeClasses: Record<NonNullable<GhostButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm tracking-widest",
  md: "px-7 py-3 text-base tracking-widest",
  lg: "px-10 py-4 text-lg tracking-[0.3em]",
};

export const GhostButton = forwardRef<HTMLButtonElement, GhostButtonProps>(
  (
    { children, className, variant = "primary", size = "md", icon, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "btn-lift group relative inline-flex items-center justify-center gap-3",
          "border rounded-sm font-serif select-none",
          "shadow-paper",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...rest}
      >
        {icon && <span className="opacity-80">{icon}</span>}
        <span>{children}</span>
        {/* 底部细线 */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-6px] h-px w-0 bg-ink-100 group-hover:w-3/4 transition-all duration-300"
        />
      </button>
    );
  },
);
GhostButton.displayName = "GhostButton";
