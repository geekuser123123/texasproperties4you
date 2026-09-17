import clsx from "clsx";

export type LogoVariant = "full-color" | "white" | "dark-green" | "black";
export type LogoLayout = "horizontal" | "stacked" | "icon-only";

interface LogoProps {
  variant?: LogoVariant;
  layout?: LogoLayout;
  className?: string;
  iconClassName?: string;
  /** Height of the icon in pixels (width scales to match the icon's aspect ratio). */
  size?: number;
}

/**
 * Simplified, low-poly outline of Texas with two curved "land" lines in the
 * lower portion representing acreage/land. Single path per color area keeps
 * it legible at favicon size.
 */
const TEXAS_VIEWBOX = "0 0 180 200";
const TEXAS_OUTLINE_PATH =
  "M57 0 L91 0 L91 56 L133 64 L167 72 L180 110 L177 144 L152 170 L124 190 L95 200 L72 180 L38 150 L15 120 L4 100 L19 80 L0 50 L29 35 L29 10 L57 10 Z";

const LAND_LINE_1 =
  "M50 150 C 75 138, 112 138, 142 150 C 150 154, 156 154, 162 149";
const LAND_LINE_2 =
  "M68 173 C 90 163, 118 163, 140 173 C 145 176, 148 176, 152 172";

const VARIANT_COLORS: Record<
  LogoVariant,
  { icon: string; land: string; textPrimary: string; textSecondary: string }
> = {
  "full-color": {
    icon: "#234D3C",
    land: "#C49A57",
    textPrimary: "#234D3C",
    textSecondary: "#6B6B6B",
  },
  white: {
    icon: "#FFFFFF",
    land: "#C49A57",
    textPrimary: "#FFFFFF",
    textSecondary: "#E5D8C4",
  },
  "dark-green": {
    icon: "#17372B",
    land: "#C49A57",
    textPrimary: "#17372B",
    textSecondary: "#6B6B6B",
  },
  black: {
    icon: "#000000",
    land: "#000000",
    textPrimary: "#000000",
    textSecondary: "#242424",
  },
};

export function LogoIcon({
  variant = "full-color",
  className,
  size = 40,
}: {
  variant?: LogoVariant;
  className?: string;
  size?: number;
}) {
  const colors = VARIANT_COLORS[variant];
  return (
    <svg
      viewBox={TEXAS_VIEWBOX}
      width={size * 0.9}
      height={size}
      className={className}
      role="img"
      aria-label="Texas Properties 4 You icon: outline of Texas with two land lines"
    >
      <path d={TEXAS_OUTLINE_PATH} fill={colors.icon} />
      <path
        d={LAND_LINE_1}
        stroke={colors.land}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={LAND_LINE_2}
        stroke={colors.land}
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({
  variant = "full-color",
  layout = "horizontal",
  className,
  iconClassName,
  size = 40,
}: LogoProps) {
  const colors = VARIANT_COLORS[variant];

  if (layout === "icon-only") {
    return (
      <LogoIcon variant={variant} className={clsx(iconClassName, className)} size={size} />
    );
  }

  const wordmark = (
    <span className="flex flex-col leading-none">
      <span
        className="font-heading font-semibold tracking-tight"
        style={{ color: colors.textPrimary, fontSize: size * 0.44 }}
      >
        Texas
      </span>
      <span
        className="font-heading font-semibold tracking-wide uppercase"
        style={{ color: colors.textSecondary, fontSize: size * 0.22 }}
      >
        Properties 4 You
      </span>
    </span>
  );

  if (layout === "stacked") {
    return (
      <span className={clsx("inline-flex flex-col items-center gap-1.5", className)}>
        <LogoIcon variant={variant} size={size} className={iconClassName} />
        <span className="flex flex-col items-center leading-none">
          <span
            className="font-heading font-semibold tracking-tight"
            style={{ color: colors.textPrimary, fontSize: size * 0.44 }}
          >
            Texas
          </span>
          <span
            className="font-heading font-semibold tracking-wide uppercase text-center"
            style={{ color: colors.textSecondary, fontSize: size * 0.2 }}
          >
            Properties 4 You
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={clsx("inline-flex items-center gap-3", className)}>
      <LogoIcon variant={variant} size={size} className={iconClassName} />
      {wordmark}
    </span>
  );
}
