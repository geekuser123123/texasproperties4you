import Link from "next/link";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "gold" | "ghost";
type Size = "md" | "lg" | "sm";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-green text-white hover:bg-brand-green-dark active:bg-brand-green-dark",
  secondary:
    "bg-brand-sand text-brand-charcoal hover:bg-brand-sand/70 active:bg-brand-sand/70",
  outline:
    "bg-transparent text-brand-green border-2 border-brand-green hover:bg-brand-green hover:text-white",
  gold: "bg-brand-gold text-brand-green-dark hover:brightness-95",
  ghost: "bg-transparent text-brand-green hover:bg-brand-sand/50",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-5 py-3",
  lg: "text-base px-7 py-4",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

interface ActualButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[8px] font-semibold font-body transition-colors duration-150 whitespace-nowrap select-none min-h-[48px]";

/** Exposes Button's visual classes for cases that need a non-<button> element (e.g. an <a> from TextUsLink) without nesting interactive elements. */
export function getButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return clsx(baseClasses, variantClasses[variant], sizeClasses[size], fullWidth && "w-full", className);
}

export function Button(props: LinkButtonProps | ActualButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    icon,
    fullWidth,
  } = props;

  const classes = getButtonClasses({ variant, size, fullWidth, className });

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        onClick={props.onClick}
        className={classes}
      >
        {icon}
        {children}
      </Link>
    );
  }

  // Strip custom Button-only props so only valid DOM button attributes are spread.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _variant, size: _size, className: _className, children: _children, icon: _icon, fullWidth: _fullWidth, ...domProps } =
    props as ActualButtonProps;
  return (
    <button {...domProps} className={classes}>
      {icon}
      {children}
    </button>
  );
}
