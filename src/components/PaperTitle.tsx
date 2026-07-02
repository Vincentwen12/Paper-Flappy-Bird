import clsx from "clsx";

interface PaperTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
}

export function PaperTitle({
  children,
  subtitle,
  className,
  align = "center",
}: PaperTitleProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <h1
        className={clsx(
          "font-display font-light tracking-[0.2em] text-ink-400",
          "text-5xl md:text-6xl leading-none text-emboss",
        )}
      >
        {children}
      </h1>
      {subtitle && (
        <p className="font-serif text-ink-50 text-sm tracking-[0.4em] uppercase">
          {subtitle}
        </p>
      )}
      <span
        aria-hidden
        className="block h-px w-16 bg-gradient-to-r from-transparent via-ink-50 to-transparent"
      />
    </div>
  );
}
