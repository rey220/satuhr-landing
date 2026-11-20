"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal — animasi masuk berbasis GSAP ScrollTrigger.
 *
 * Kenapa GSAP (bukan CSS manual): laporan stakeholder menyebut animasi
 * versi CSS "tidak terasa berjalan" — gerakannya terlalu kecil/cepat
 * untuk disadari. Di sini jarak gerak diperbesar (56–88px), durasi
 * ±0,95s, easing power3.out, dan pemicu ScrollTrigger yang presisi.
 *
 * Aturan global (PRD Bagian 5) dipenuhi toggleActions
 * "play none none reverse": animasi bermain saat elemen masuk,
 * berbalik saat keluar ke atas, dan BERMAIN LAGI saat dikunjungi ulang.
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
    // Keputusan stakeholder (20 Nov 2026): animasi TIDAK mengacu pada
    // prefers-reduced-motion / setting animasi Windows — animasi selalu
    // berjalan. Karena itu tidak ada gerbang reduced-motion di sini.

    const from: gsap.TweenVars = { opacity: 0 };
    if (variant === "up") from.y = 56;
    if (variant === "left") from.x = -88;
    if (variant === "right") from.x = 88;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.95,
        delay: delay / 1000,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => ctx.revert();
  }, [delay, variant]);

  return (
    <Tag
      // @ts-expect-error ref dinamis per tag
      ref={ref}
      className={className}
    >
      {children}
    </Tag>
  );
}
