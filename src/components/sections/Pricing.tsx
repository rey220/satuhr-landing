"use client";

import { useState } from "react";
import Reveal from "@/components/motion/Reveal";

const plans = [
  {
    name: "Starter",
    monthly: 29000,
    desc: "Untuk perusahaan 10–50 karyawan yang baru beralih dari spreadsheet.",
    features: ["Database karyawan", "Absensi GPS & foto", "Cuti self-service", "Slip gaji digital"],
    featured: false,
  },
  {
    name: "Growth",
    monthly: 49000,
    desc: "Untuk perusahaan 50–300 karyawan dengan banyak shift dan departemen.",
    features: [
      "Semua fitur Starter",
      "Payroll + BPJS + PPh 21 otomatis",
      "Manajemen shift & lembur",
      "Rekrutmen terstruktur",
      "Laporan & analitik HR",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: 79000,
    desc: "Untuk 300+ karyawan, multi-cabang, dan kebutuhan audit yang ketat.",
    features: [
      "Semua fitur Growth",
      "Multi-cabang & multi-entitas",
      "Penilaian kinerja KPI/OKR",
      "SSO & audit log lanjutan",
      "Dukungan prioritas 24/7",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="harga" className="scroll-mt-20 border-y border-ink/10 bg-ink/[0.03] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            Harga Transparan
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bayar per karyawan, tanpa biaya tersembunyi
          </h2>
          <p className="mt-4 text-lg font-medium text-ink-soft">
            Semua paket termasuk uji coba gratis 14 hari dan bantuan migrasi data.
          </p>
        </Reveal>

        <Reveal className="mt-9 flex items-center justify-center gap-4">
          <span className={`text-sm font-bold ${!yearly ? "text-ink" : "text-ink-soft"}`}>Bulanan</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Aktifkan harga tahunan"
            onClick={() => setYearly((v) => !v)}
            className="relative h-8 w-14 shrink-0 rounded-full bg-ink/15 transition-colors data-[on=true]:bg-primary"
            data-on={yearly}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-surface shadow transition-all ${yearly ? "left-7" : "left-1"}`}
            />
          </button>
          <span className={`text-sm font-bold ${yearly ? "text-ink" : "text-ink-soft"}`}>
            Tahunan
          </span>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-extrabold text-ink">
            Hemat 20%
          </span>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => {
            const price = yearly ? Math.round(p.monthly * 0.8) : p.monthly;
            return (
              <Reveal key={p.name} delay={i * 130}>
                <article
                  className={`flex h-full flex-col rounded-3xl p-8 ${
                    p.featured
                      ? "bg-ink text-surface shadow-[0_28px_56px_-24px_rgba(11,36,23,0.6)]"
                      : "border border-ink/10 bg-surface"
                  }`}
                >
                  {p.featured && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-primary px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-ink">
                      Paling Dipilih
                    </span>
                  )}
                  <h3 className="text-xl font-extrabold">{p.name}</h3>
                  <p className={`mt-2 text-sm font-medium leading-relaxed ${p.featured ? "text-surface/75" : "text-ink-soft"}`}>
                    {p.desc}
                  </p>
                  <p className="mt-6">
                    <span className="text-sm font-bold align-top">Rp</span>{" "}
                    <span key={price} className="crossfade inline-block text-[2.6rem] font-extrabold leading-none tracking-tight">
                      {price.toLocaleString("id-ID")}
                    </span>
                    <span className={`block mt-2 text-sm font-semibold ${p.featured ? "text-surface/70" : "text-ink-soft"}`}>
                      per karyawan / bulan{yearly ? " (dibayar tahunan)" : ""}
                    </span>
                  </p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm font-medium">
                        <svg className={`mt-0.5 h-5 w-5 shrink-0 ${p.featured ? "text-primary" : "text-primary-dark"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#cta"
                    className={`mt-8 rounded-full py-3.5 text-center font-bold transition-transform duration-200 hover:-translate-y-0.5 ${
                      p.featured
                        ? "bg-primary text-ink"
                        : "border-2 border-ink text-ink hover:bg-primary hover:border-primary"
                    }`}
                  >
                    Mulai Uji Coba Gratis
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
