"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Counter — Animated Number Counter (Count-Up) berbasis GSAP.
 * - Berjalan ±2,4 detik dengan easing power3.out saat elemen masuk layar
 * - BERULANG sesuai aturan global (PRD Bagian 5): ScrollTrigger
 *   toggleActions reverse membuat angka menghitung turun kembali
 *   saat section ditinggalkan, dan naik lagi saat dikunjungi ulang —
 *   gerakannya selalu terlihat dua arah, tidak pernah "sudah selesai"
 *   sebelum pengguna sempat melihat.
 * - Format Indonesia (ribuan titik, desimal koma): 12.500 / 4,9
 * - prefers-reduced-motion: langsung angka akhir, tanpa animasi
 */
export default function Counter({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2400,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fmt = (v: number) =>
      v.toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = `${prefix}${fmt(end)}${suffix}`;
      return;
    }

    const obj = { v: 0 };
    el.textContent = `${prefix}${fmt(0)}${suffix}`;

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: end,
        duration: duration / 1000,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${prefix}${fmt(obj.v)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
    return () => ctx.revert();
  }, [end, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toLocaleString("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
