"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, getButtonClasses } from "@/components/ui/Button";
import { TextUsLink } from "@/components/ContactLinks";
import { siteConfig } from "@/data/site-config";

const HERO_IMAGES = [
  { src: "/properties/tp-1002/main.jpg", alt: "Hill Country acreage with rolling views near Fredericksburg, Texas" },
  { src: "/properties/tp-1001/main.jpg", alt: "Open land ready for a home site near Bryan, Texas" },
  { src: "/properties/tp-1003/main.jpg", alt: "Affordable house on a quiet street in Palestine, Texas" },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-green-dark">
      <div className="absolute inset-0">
        {HERO_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-1000"
            style={{ opacity: i === index ? 0.55 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-brand-green-dark/70 to-brand-green-dark/40" />
      </div>

      <div className="relative container-brand py-20 md:py-32 text-center text-white">
        <h1 className="font-heading font-semibold text-[34px] md:text-[48px] leading-tight max-w-3xl mx-auto mb-5 text-white">
          {siteConfig.headline}
        </h1>
        <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8">
          {siteConfig.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
          <Button href="/available-properties" variant="gold" size="lg">
            View Available Properties
          </Button>
          <Button href="/apply" variant="secondary" size="lg">
            Apply Online
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button href="/buyer-list" variant="outline" size="md" className="!border-white !text-white hover:!bg-white hover:!text-brand-green-dark">
            Join Buyer List
          </Button>
          <TextUsLink
            className={getButtonClasses({
              variant: "outline",
              size: "md",
              className: "!border-white !text-white hover:!bg-white hover:!text-brand-green-dark",
            })}
          >
            Text Us
          </TextUsLink>
        </div>
      </div>
    </section>
  );
}
