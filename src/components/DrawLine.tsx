"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * DrawLine — garis Cara Kerja yang "menggambar" dirinya dari kiri
 * ke kanan (scaleX 0 → 1) berbasis GSAP ScrollTrigger; berulang
 * sesuai aturan global lewat toggleActions reverse.
 */
export default function DrawLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          delay: 0.15,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformOrigin: "left center" }}
      aria-hidden
    />
  );
}
