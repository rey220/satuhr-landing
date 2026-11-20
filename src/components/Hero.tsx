import Reveal from "./Reveal";

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
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-ink-soft">
            Dashboard HR — Hari Ini
          </p>
          <p className="mt-1 text-lg font-extrabold">Ringkasan Kehadiran</p>
        </div>
        <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-ink">
          Live
        </span>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { k: "Hadir", v: "248" },
          { k: "Cuti", v: "12" },
          { k: "Izin", v: "5" },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl bg-ink/[0.04] p-3 text-center">
            <p className="text-2xl font-extrabold">{s.v}</p>
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
    <section className="relative overflow-hidden bg-primary">
      {/* Dekorasi cyan: garis + lingkaran tipis, bukan gradient ungu generik */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full border-[22px] border-support/40" />
      <div aria-hidden className="pointer-events-none absolute -right-16 bottom-10 h-52 w-52 rounded-full bg-support/30 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-1.5 w-full bg-support" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-surface/85 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ink">
              <span className="h-2 w-2 rounded-full bg-support-dark" />
              Sistem Internal HR untuk Perusahaan Indonesia
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Semua urusan HR berantakan di spreadsheet?
              <span className="mt-2 block underline decoration-support decoration-[6px] underline-offset-8">
                Satukan di SatuHR.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-ink/85">
              Database karyawan, absensi, cuti, payroll, sampai penilaian kinerja —
              dalam satu sistem yang dipakai HR Manager dan seluruh staf setiap hari.
              Tanpa rekap manual, tanpa data ganda.
            </p>
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
