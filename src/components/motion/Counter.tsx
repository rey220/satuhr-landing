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
 * - Keputusan stakeholder (20 Nov 2026): animasi selalu berjalan,
 *   tidak mengacu pada prefers-reduced-motion / setting animasi Windows
 * - dashboard (dipakai counter dashboard hero): siklus kunjungannya
 *   disetarakan dengan counter section lain — menghitung NAIK saat
 *   pengguna tiba di hero, menghitung TURUN saat hero ditinggalkan,
 *   berulang setiap kunjungan. Karena dashboard sudah tampil sejak
 *   halaman dimuat, geometri pemicunya berbeda: zona aktif berakhir
 *   saat elemen keluar di tepi atas layar (end "top top"), berangkat
 *   memutar reverse dan tiba kembali memutar play. Khusus pemuatan
 *   awal/refresh: angka langsung tampil final TANPA bergerak —
 *   refresh bukan "kunjungan", jadi tidak boleh jadi satu-satunya
 *   pemicu seperti perilaku lama yang dikeluhkan stakeholder.
 */
export default function Counter({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2400,
  dashboard = false,
  className = "",
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  dashboard?: boolean;
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

    const obj = { v: 0 };
    el.textContent = `${prefix}${fmt(0)}${suffix}`;

    let tween: gsap.core.Tween | undefined;
    const ctx = gsap.context(() => {
      tween = gsap.to(obj, {
        v: end,
        duration: duration / 1000,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${prefix}${fmt(obj.v)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          // Dashboard: berangkat (keluar tepi atas) = reverse/menghitung
          // turun, tiba kembali = play/menghitung naik — siklus yang sama
          // dengan counter section lain. Counter biasa: pakai konfigurasi
          // standar masuk/keluar tepi bawah.
          ...(dashboard
            ? { end: "top top", toggleActions: "play reverse play none" }
            : { toggleActions: "play none none reverse" }),
        },
      });
    });
    // Dashboard hero: elemen sudah di layar sejak halaman dimuat, jadi
    // ScrollTrigger langsung menembakkan onEnter saat refresh. Lewati
    // pemutaran perdana itu — lompat ke angka final tanpa gerakan;
    // siklus scroll di atas yang menjadi pemicu gerakannya.
    if (dashboard && tween?.scrollTrigger) {
      ScrollTrigger.refresh();
      if (tween.scrollTrigger.isActive) tween.progress(1);
    }
    return () => ctx.revert();
  }, [end, prefix, suffix, decimals, duration, dashboard]);

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
