"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

const items = [
  {
    quote:
      "Dulu rekap absensi dan payroll memakan 4 hari setiap bulan. Dengan SatuHR selesai dalam setengah hari — dan tidak ada lagi komplain slip gaji salah hitung.",
    name: "Ratna Wijaya",
    role: "HR Manager, PT Arunika Teknologi (214 karyawan)",
  },
  {
    quote:
      "Yang paling terasa: karyawan berhenti mengantre di meja HR untuk tanya sisa cuti. Semua mereka cek sendiri di ponsel. Tim saya bisa fokus ke pengembangan orang.",
    name: "Fajar Ramadhan",
    role: "Head of People, Saji Nusantara Group (480 karyawan)",
  },
  {
    quote:
      "Migrasi dari Excel dibantu sampai beres dalam 4 hari. Laporan turnover untuk direksi yang dulu saya buat semalaman, sekarang tinggal klik.",
    name: "Maria Chen",
    role: "HR Manager, PT Cakra Manufaktur (356 karyawan)",
  },
];

const ROTATE_MS = 6000;
const SLIDE_MS = 680;
// Slide terakhir adalah salinan slide pertama — pola "seamless loop":
// track meluncur maju terus, lalu melompat diam-diam kembali ke awal.
const slides = [...items, items[0]];

/** Tanda kutip penutup digabung dengan kata terakhir (nowrap) agar tidak
    menggantung terpisah di baris sendiri — perbaikan isu dari audit. */
function renderQuote(q: string): ReactNode {
  const i = q.lastIndexOf(" ");
  return (
    <>
      “{q.slice(0, i)}{" "}
      <span className="whitespace-nowrap">{q.slice(i + 1)}”</span>
    </>
  );
}

/**
 * Revisi 4 (diperbaiki) — testimoni sebagai track slider:
 * semua slide berjajar menyamping dan track-nya yang bergeser
 * (translateX + transisi), BUKAN slide yang ditumpuk — cara tumpuk
 * membuat teks lama & baru bertabrakan di tengah dan terlihat kasar.
 * Progress bar 6 detik pada indikator; jeda saat hover/fokus;
 * isi slide aktif muncul bertahap (kutipan → inisial → nama, opacity saja).
 */
export default function Testimonials() {
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [run, setRun] = useState(0);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const active = pos % items.length;
  const effectivePaused = paused || !inView;

  // Rotasi hanya hidup saat section terlihat; di luar layar ia berhenti
  // total, sehingga pengguna selalu menyaksikan gerakannya dari awal
  // setiap kali tiba di section ini (keluhan stakeholder: "tidak ada
  // animasi ketika saya scroll ke bagian ini").
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0].intersectionRatio >= 0.3),
      { threshold: [0, 0.3] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sesaat setelah section masuk layar (±1,6 detik), lakukan satu
  // pergantian slide agar gerakannya langsung terlihat oleh pengguna.
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setPos((p) => p + 1);
      setRun((r) => r + 1);
    }, 1600);
    return () => clearTimeout(t);
  }, [inView]);

  // Setelah meluncur ke slide salinan (pos terakhir), lompat diam-diam
  // ke slide pertama asli tanpa transisi, lalu nyalakan lagi transisinya.
  useEffect(() => {
    if (pos !== items.length) return;
    jumpTimer.current = setTimeout(() => {
      setAnimate(false);
      setPos(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimate(true))
      );
    }, SLIDE_MS + 40);
    return () => {
      if (jumpTimer.current) clearTimeout(jumpTimer.current);
    };
  }, [pos]);

  // Rotasi otomatis — timer penuh per slide; jeda saat hover/fokus
  // dan saat section di luar layar
  useEffect(() => {
    if (effectivePaused) return;
    const t = setTimeout(() => {
      setPos((p) => p + 1);
      setRun((r) => r + 1);
    }, ROTATE_MS);
    return () => clearTimeout(t);
  }, [pos, effectivePaused, run]);

  const goToDot = (i: number) => {
    if (i === active) return;
    setAnimate(true);
    setPos(i);
    setRun((r) => r + 1);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Testimoni pelanggan"
      className="bg-primary/[0.05] py-14 lg:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            Kata Mereka
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-8">
        <div className="overflow-hidden" aria-live="polite">
          <div
            className="flex"
            style={{
              transform: `translateX(-${pos * 100}%)`,
              transition: animate
                ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : "none",
              willChange: "transform",
            }}
          >
            {slides.map((item, i) => (
              <figure
                key={`${item.name}-${i}`}
                aria-hidden={i !== pos}
                className={`w-full shrink-0 px-2 ${i === pos ? "t-active" : ""}`}
              >
                <blockquote className="t-fade text-2xl font-bold leading-snug tracking-tight sm:text-[1.75rem]">
                  {renderQuote(item.quote)}
                </blockquote>
                <figcaption className="mt-7">
                  <span
                    className="t-fade mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-sm font-extrabold text-ink"
                    style={{ "--t-delay": "150ms" } as React.CSSProperties}
                  >
                    {item.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div
                    className="t-fade"
                    style={{ "--t-delay": "250ms" } as React.CSSProperties}
                  >
                    <p className="mt-3 font-extrabold">{item.name}</p>
                    <p className="text-sm font-semibold text-ink-soft">{item.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goToDot(i)}
              aria-label={`Tampilkan testimoni ${i + 1}`}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-10 overflow-hidden bg-primary/25"
                  : "w-2.5 bg-ink/20 hover:bg-ink/40"
              }`}
            >
              {i === active && (
                <span
                  key={run}
                  className="t-progress block h-full w-full rounded-full bg-primary"
                  style={{ animationPlayState: effectivePaused ? "paused" : "running" }}
                />
              )}
            </button>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
