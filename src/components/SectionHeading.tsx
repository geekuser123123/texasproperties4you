import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  light,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={clsx("mb-10", center && "text-center")}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold mb-2">{eyebrow}</p>
      )}
      <h2
        className={clsx(
          "font-heading font-semibold text-[25px] md:text-[30px]",
          light ? "text-white" : "text-brand-charcoal"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={clsx("mt-3 max-w-2xl text-[17px] leading-relaxed", center && "mx-auto", light ? "text-white/85" : "text-brand-gray")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
