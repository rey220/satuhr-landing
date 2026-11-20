"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counter — Animated Number Counter (Count-Up Animation).
 * - Mulai menghitung HANYA saat elemen masuk viewport (IntersectionObserver)
 * - Memakai requestAnimationFrame + easing easeOutExpo (±1,6 detik)
 * - Format angka Indonesia (pemisah ribuan titik): 12.500
 * - Menghormati prefers-reduced-motion: langsung tampil angka akhir
 */
export default function Counter({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
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
  const [value, setValue] = useState(0);
  const started = useRef(false);

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

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(2, -10 * p); // easeOutExpo
          setValue(end * (p === 1 ? 1 : eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
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
