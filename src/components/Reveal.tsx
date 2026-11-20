"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Reveal — membungkus section/kartu agar muncul dengan animasi halus
 * saat masuk viewport. Hanya transform + opacity (GPU-friendly).
 *
 * Aturan global (PRD Bagian 5): animasi BERULANG. Class .is-visible
 * dipasang saat elemen cukup terlihat (≥15%) dan DILEPAS hanya saat
 * elemen benar-benar keluar layar (0%) — jadi scroll kecil di
 * perbatasan tidak membuat animasi tersendat mulai ulang.
 *
 * variant: "up" (default) | "left" | "right" — arah masuk elemen.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  variant?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.15) {
            e.target.classList.add("is-visible");
          } else if (e.intersectionRatio === 0) {
            e.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: [0, 0.15], rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const variantClass =
    variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : "";

  return (
    <Tag
      // @ts-expect-error ref dinamis per tag
      ref={ref}
      className={`reveal ${variantClass} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
