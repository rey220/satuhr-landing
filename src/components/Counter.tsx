"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counter — Animated Number Counter (Count-Up Animation).
 * - Mulai menghitung saat elemen masuk viewport (IntersectionObserver)
 * - requestAnimationFrame + easing easeOutQuint selama ±2 detik:
 *   cepat di awal, melambat sangat halus di akhir (Revisi 2 — lebih smooth)
 * - BERULANG sesuai aturan global (PRD Bagian 5): saat elemen benar-benar
 *   keluar layar, hitungan direset ke 0 dan berjalan lagi saat kembali.
 * - Format angka Indonesia (pemisah ribuan titik): 12.500
 * - Menghormati prefers-reduced-motion: langsung tampil angka akhir
 */
export default function Counter({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
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
  const raf = useRef<number>(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    const start = () => {
      cancelAnimationFrame(raf.current);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 5); // easeOutQuint
        setValue(end * eased);
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.intersectionRatio >= 0.35) {
          start();
        } else if (e.intersectionRatio === 0) {
          cancelAnimationFrame(raf.current);
          setValue(0);
        }
      },
      { threshold: [0, 0.35] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [end, duration]);

  const formatted = value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
