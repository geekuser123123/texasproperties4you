"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PropertyPhoto } from "@/types/property";
import { trackEvent } from "@/lib/tracking";

export function PhotoGallery({ photos, title }: { photos: PropertyPhoto[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % photos.length);
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, photos.length]);

  function openAt(index: number) {
    setActiveIndex(index);
    setLightboxOpen(true);
    trackEvent("photo_gallery_viewed", { title, index });
  }

  if (photos.length === 0) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => openAt(0)}
        className="relative block w-full aspect-[4/3] md:aspect-[16/9] rounded-[10px] overflow-hidden bg-brand-sand"
      >
        <Image
          src={photos[0].src}
          alt={photos[0].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 900px"
          className="object-cover"
        />
      </button>

      {photos.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {photos.slice(1, 5).map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => openAt(i + 1)}
              className="relative aspect-square rounded-[8px] overflow-hidden bg-brand-sand"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="200px"
                loading="lazy"
                className="object-cover"
              />
              {i === 3 && photos.length > 5 && (
                <span className="absolute inset-0 bg-black/50 text-white flex items-center justify-center font-heading font-semibold">
                  +{photos.length - 5} more
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo gallery`}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
        >
          <div className="flex justify-between items-center p-4 text-white">
            <p className="text-sm">
              {activeIndex + 1} of {photos.length}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close photo gallery"
              className="text-white text-2xl leading-none px-2"
            >
              &times;
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              src={photos[activeIndex].src}
              alt={photos[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white text-2xl"
                >
                  &#8249;
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setActiveIndex((i) => (i + 1) % photos.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 text-white text-2xl"
                >
                  &#8250;
                </button>
              </>
            )}
          </div>
          {photos[activeIndex].caption && (
            <p className="text-center text-white/80 text-sm p-4">{photos[activeIndex].caption}</p>
          )}
        </div>
      )}
    </div>
  );
}
