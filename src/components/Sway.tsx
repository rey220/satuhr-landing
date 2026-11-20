"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Sway — Revisi 1a: gerakan bergoyang kiri–kanan yang halus (GSAP).
 * Timeline 6 detik (1,5 + 3 + 1,5; easing sine.inOut): berangkat ke
 * kanan, menyapu ke kiri, kembali ke tengah, lalu BERHENTI diam —
 * sesuai keputusan stakeholder. Berjalan lagi setiap kali elemen
 * masuk layar (onEnter / onEnterBack), sesuai aturan global.
 */
export default function Sway({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, delay });
      tl.to(el, { x: 10, duration: 1.5, ease: "sine.inOut" })
        .to(el, { x: -10, duration: 3, ease: "sine.inOut" })
        .to(el, { x: 0, duration: 1.5, ease: "sine.inOut" });
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
