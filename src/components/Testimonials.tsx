"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Reveal from "./Reveal";

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
 * Revisi 4 — testimoni bergeser horizontal halus:
 * lama keluar ke satu sisi, baru masuk dari sisi berlawanan; arah mengikuti
 * urutan. Indikator berisi progress bar 6 detik; rotasi jeda saat hover/fokus;
 * isi muncul bertahap (kutipan → inisial → nama). Tanpa efek berlebih.
 */
export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);
  const [first, setFirst] = useState(true);

  const goTo = useCallback(
    (n: number, d: 1 | -1) => {
      if (n === idx) return;
      setPrev(idx);
      setDir(d);
      setIdx(n);
      setRun((r) => r + 1);
      setFirst(false);
    },
    [idx]
  );

  // Bersihkan testimoni lama setelah animasi keluar selesai
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 580);
    return () => clearTimeout(t);
  }, [prev]);

  // Rotasi otomatis — timer penuh per slide, jeda saat hover/fokus
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => goTo((idx + 1) % items.length, 1), ROTATE_MS);
    return () => clearTimeout(t);
  }, [idx, paused, run, goTo]);

  return (
    <section
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

        <div className="mt-8 grid" aria-live="polite">
          {items.map((item, i) => {
            const isActive = i === idx;
            const isPrev = i === prev;
            const anim = isActive
              ? first
                ? ""
                : dir === 1
                  ? "t-in-right"
                  : "t-in-left"
              : isPrev
                ? dir === 1
                  ? "t-out-left"
                  : "t-out-right"
                : "pointer-events-none opacity-0";
            return (
              <figure
                key={item.name}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 ${anim} ${isActive ? "t-active" : ""}`}
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
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => goTo(i, i > idx ? 1 : -1)}
              aria-label={`Tampilkan testimoni ${i + 1}`}
              aria-current={i === idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === idx
                  ? "w-10 overflow-hidden bg-primary/25"
                  : "w-2.5 bg-ink/20 hover:bg-ink/40"
              }`}
            >
              {i === idx && (
                <span
                  key={run}
                  className="t-progress block h-full w-full rounded-full bg-primary"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
