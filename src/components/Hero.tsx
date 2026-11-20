import Counter from "./Counter";
import Reveal from "./Reveal";
import Sway from "./Sway";

/** Mockup dashboard digambar dengan JSX/CSS — bukan gambar stok generik. */
function DashboardMockup() {
  const rows = [
    { name: "Andini Prameswari", role: "Finance Staff", status: "Hadir", on: true },
    { name: "Bagas Nugraha", role: "Sales Executive", status: "Cuti", on: false },
    { name: "Citra Lestari", role: "UI Designer", status: "Hadir", on: true },
    { name: "Dimas Aryo", role: "HR Staff", status: "WFH", on: true },
  ];
  return (
    <div className="relative rounded-3xl bg-surface p-5 shadow-[0_32px_64px_-24px_rgba(11,36,23,0.45)] sm:p-6">
      <div className="mb-5">
        {/* Isu T1: label "Live" dipindah ke sisi kiri, di samping label section,
            agar tidak lagi tertimpa badge melayang "Payroll November". */}
        <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-widest text-ink-soft">
          Dashboard HR — Hari Ini
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-extrabold tracking-normal text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-dark" aria-hidden />
            Live
          </span>
        </p>
        <p className="mt-1 text-lg font-extrabold">Ringkasan Kehadiran</p>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { k: "Hadir", v: 248 },
          { k: "Cuti", v: 12 },
          { k: "Izin", v: 5 },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl bg-ink/[0.04] p-3 text-center">
            {/* Revisi 1b: angka ringkasan ikut Count-Up, berulang per aturan global */}
            <p className="text-2xl font-extrabold">
              <Counter end={s.v} duration={1500} dashboard />
            </p>
            <p className="text-xs font-semibold text-ink-soft">{s.k}</p>
          </div>
        ))}
      </div>

      <ul className="divide-y divide-ink/[0.07]">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-support/25 text-xs font-extrabold">
                {r.name.split(" ").map((w) => w[0]).join("")}
              </span>
              <div>
                <p className="text-sm font-bold leading-tight">{r.name}</p>
                <p className="text-xs text-ink-soft">{r.role}</p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                r.on ? "bg-primary/20 text-ink" : "bg-support/25 text-ink"
              }`}
            >
              {r.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="absolute -right-4 -top-4 hidden rotate-3 rounded-2xl bg-ink px-4 py-3 text-surface shadow-xl sm:block">
        <p className="text-[11px] font-semibold text-surface/70">Payroll November</p>
        <p className="text-sm font-extrabold">Selesai 2 jam lebih cepat</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    /* Revisi 5a: gradasi halus hijau terang → lebih dalam di bawah,
       memberi kedalaman tanpa mengubah identitas warna */
    <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary to-primary-dark">
      {/* Dekorasi cyan: garis + lingkaran tipis, bukan gradient ungu generik */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full border-[22px] border-support/40" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-support/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-1.5 w-full bg-support" />

      {/* Revisi 5a: tinggi hero dikurangi agar CTA + awal section berikutnya
          terlihat tanpa scroll di layar laptop umum */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-16">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
              <span className="h-2 w-2 rounded-full bg-support-dark" />
              Sistem Internal HR untuk Perusahaan Indonesia
            </p>
          </Reveal>
          <Reveal delay={100}>
            {/* Revisi 1a: judul bergoyang halus ±6 detik tiap hero masuk layar
                (Sway berjalan setelah animasi masuk Reveal selesai) */}
            <Sway delay={0.85}>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Semua urusan HR berantakan di spreadsheet?
                <span className="mt-2 block underline decoration-support decoration-[6px] underline-offset-8">
                  Satukan di SatuHR.
                </span>
              </h1>
            </Sway>
          </Reveal>
          <Reveal delay={200}>
            {/* Revisi 1a: deskripsi ikut bergoyang, sedikit setelah judul */}
            <Sway delay={1.05}>
              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-ink/85">
                Database karyawan, absensi, cuti, payroll, sampai penilaian kinerja —
                dalam satu sistem yang dipakai HR Manager dan seluruh staf setiap hari.
                Tanpa rekap manual, tanpa data ganda.
              </p>
            </Sway>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="rounded-full bg-ink px-8 py-4 text-base font-bold text-surface shadow-[0_16px_32px_-12px_rgba(11,36,23,0.6)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Mulai Uji Coba Gratis 14 Hari
              </a>
              <a
                href="#cara-kerja"
                className="rounded-full border-2 border-ink/70 bg-surface/70 px-8 py-[14px] text-base font-bold text-ink transition-colors hover:bg-surface"
              >
                Lihat Cara Kerjanya
              </a>
            </div>
            <p className="mt-4 text-sm font-semibold text-ink/75">
              Tanpa kartu kredit · Setup dibantu tim kami · Batalkan kapan saja
            </p>
          </Reveal>
        </div>

        <Reveal delay={250} className="lg:pl-4">
          <DashboardMockup />
        </Reveal>
      </div>
    </section>
  );
}
