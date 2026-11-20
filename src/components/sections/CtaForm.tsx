"use client";

import { useState, type FormEvent } from "react";
import Reveal from "@/components/motion/Reveal";

type Errors = Partial<Record<"name" | "email" | "company" | "size", string>>;

/**
 * Formulir CTA utama: "Mulai Uji Coba Gratis".
 * Validasi client-side yang ketat (nama, email kerja, perusahaan, jumlah karyawan).
 * Fase 1 (landing statis): pengiriman disimulasikan dan menampilkan status sukses.
 * Fase produksi: arahkan submit ke endpoint CRM/API — lihat docs/DOKUMENTASI.md.
 */
export default function CtaForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const size = String(fd.get("size") ?? "");
    // Honeypot anti-spam: field tersembunyi ini harus kosong pada user asli
    const honeypot = String(fd.get("website") ?? "");

    const next: Errors = {};
    if (name.length < 3) next.name = "Isi nama lengkap Anda (min. 3 karakter).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      next.email = "Format email belum benar, contoh: nama@perusahaan.co.id";
    if (company.length < 3) next.company = "Isi nama perusahaan Anda.";
    if (!size) next.size = "Pilih jumlah karyawan perusahaan Anda.";
    setErrors(next);
    if (Object.keys(next).length > 0 || honeypot) return;

    setSent(true);
  }

  const field =
    "w-full rounded-2xl border-2 border-ink/15 bg-surface px-4 py-3.5 font-medium text-ink placeholder:text-ink-soft/70 focus:border-support-dark focus:outline-none";
  const errText = "mt-1.5 text-sm font-semibold text-red-700";

  return (
    <section id="cta" className="scroll-mt-20 bg-primary py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Berhenti menghabiskan minggu Anda untuk rekap manual.
          </h2>
          <p className="mt-5 max-w-lg text-lg font-medium leading-relaxed text-ink/85">
            Coba SatuHR gratis 14 hari dengan data perusahaan Anda sendiri.
            Tim kami membantu setup dan migrasi — Anda cukup menilai hasilnya.
          </p>
          <ul className="mt-7 space-y-3 font-semibold">
            {[
              "Gratis 14 hari, semua fitur Growth terbuka",
              "Tanpa kartu kredit dan tanpa komitmen",
              "Pendampingan setup oleh tim Indonesia",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-3xl bg-surface p-7 shadow-[0_32px_64px_-24px_rgba(11,36,23,0.5)] sm:p-9">
            {sent ? (
              <div role="status" className="py-8 text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary">
                  <svg className="h-8 w-8 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.6} aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="mt-5 text-2xl font-extrabold">Permintaan diterima!</h3>
                <p className="mx-auto mt-2.5 max-w-sm font-medium text-ink-soft">
                  Tim SatuHR akan menghubungi Anda maksimal 1x24 jam kerja untuk
                  mengaktifkan uji coba gratis perusahaan Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h3 className="text-2xl font-extrabold">Mulai uji coba gratis</h3>
                <p className="mt-1.5 text-sm font-semibold text-ink-soft">
                  Isi 4 field ini — kurang dari 1 menit.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="f-name" className="mb-1.5 block text-sm font-bold">Nama lengkap</label>
                    <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Contoh: Sari Wulandari" className={field} aria-invalid={!!errors.name} />
                    {errors.name && <p className={errText}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-email" className="mb-1.5 block text-sm font-bold">Email kerja</label>
                    <input id="f-email" name="email" type="email" autoComplete="email" placeholder="nama@perusahaan.co.id" className={field} aria-invalid={!!errors.email} />
                    {errors.email && <p className={errText}>{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-company" className="mb-1.5 block text-sm font-bold">Nama perusahaan</label>
                    <input id="f-company" name="company" type="text" autoComplete="organization" placeholder="PT / CV perusahaan Anda" className={field} aria-invalid={!!errors.company} />
                    {errors.company && <p className={errText}>{errors.company}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-size" className="mb-1.5 block text-sm font-bold">Jumlah karyawan</label>
                    <select id="f-size" name="size" defaultValue="" className={field} aria-invalid={!!errors.size}>
                      <option value="" disabled>Pilih rentang jumlah karyawan</option>
                      <option value="10-50">10 – 50 karyawan</option>
                      <option value="51-300">51 – 300 karyawan</option>
                      <option value="301-1000">301 – 1.000 karyawan</option>
                      <option value="1000+">Lebih dari 1.000 karyawan</option>
                    </select>
                    {errors.size && <p className={errText}>{errors.size}</p>}
                  </div>

                  {/* Honeypot anti-spam, tidak terlihat user asli */}
                  <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
                    <label>
                      Website
                      <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-ink py-4 text-base font-bold text-surface transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Aktifkan Uji Coba Gratis Saya
                  </button>
                  <p className="text-center text-xs font-medium leading-relaxed text-ink-soft">
                    Dengan menekan tombol ini Anda menyetujui kebijakan privasi SatuHR.
                    Data Anda terenkripsi dan tidak dibagikan ke pihak ketiga.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
