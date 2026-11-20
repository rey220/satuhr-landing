"use client";

import { useEffect, useState } from "react";
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

export default function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, []);

  const item = items[idx];

  return (
    <section aria-label="Testimoni pelanggan" className="bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            Kata Mereka
          </p>
          <figure key={idx} className="crossfade mt-8">
            <blockquote className="text-2xl font-bold leading-snug tracking-tight sm:text-[1.75rem]">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-7">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-sm font-extrabold text-ink">
                {item.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <p className="mt-3 font-extrabold">{item.name}</p>
              <p className="text-sm font-semibold text-ink-soft">{item.role}</p>
            </figcaption>
          </figure>
          <div className="mt-8 flex justify-center gap-2.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Tampilkan testimoni ${i + 1}`}
                aria-current={i === idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === idx ? "w-9 bg-primary" : "w-2.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
