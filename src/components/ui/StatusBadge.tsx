import clsx from "clsx";
import { PropertyStatus } from "@/types/property";

const STATUS_CONFIG: Record<
  Exclude<PropertyStatus, "hidden">,
  { label: string; bg: string; icon: string }
> = {
  available: { label: "Available", bg: "bg-status-available", icon: "●" },
  pending: { label: "Pending", bg: "bg-status-pending", icon: "◐" },
  sold: { label: "Sold", bg: "bg-status-sold", icon: "✕" },
};

export function StatusBadge({
  status,
  className,
  large,
}: {
  status: PropertyStatus;
  className?: string;
  large?: boolean;
}) {
  if (status === "hidden") return null;
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-[6px] font-heading font-semibold text-white uppercase tracking-wide",
        config.bg,
        large ? "px-4 py-1.5 text-base" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      {/* Icon glyph ensures status isn't conveyed by color alone */}
      <span aria-hidden="true">{config.icon}</span>
      {config.label}
    </span>
  );
}
