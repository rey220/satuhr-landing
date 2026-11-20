import Reveal from "@/components/motion/Reveal";

const roles = [
  {
    tag: "Untuk HR Manager",
    title: "Kendalikan seluruh fungsi HR dari satu dashboard",
    points: [
      "Lihat kehadiran, cuti, dan turnover semua departemen dalam satu layar",
      "Setujui pengajuan dan payroll dengan jejak audit yang jelas",
      "Tarik laporan untuk direksi tanpa meminta rekap manual ke staf",
      "Atur hak akses per peran — data gaji hanya terlihat oleh yang berhak",
    ],
    accent: "bg-primary",
  },
  {
    tag: "Untuk Staf & Karyawan",
    title: "Urus keperluan sendiri, tanpa antre ke meja HR",
    points: [
      "Check-in, ajukan cuti, dan tukar shift langsung dari ponsel",
      "Unduh slip gaji dan dokumen pribadi kapan saja, secara privat",
      "Lihat sisa cuti dan status pengajuan secara real-time",
      "Terima pengingat kontrak, jadwal, dan pengumuman perusahaan",
    ],
    accent: "bg-support",
  },
];

export default function Roles() {
  return (
    <section id="peran" className="scroll-mt-20 border-y border-ink/10 bg-ink/[0.03] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            Untuk Siapa
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Dibuat untuk yang mengelola, memudahkan yang dikelola
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {roles.map((r, i) => (
            /* Revisi 3: kartu kiri masuk dari kiri, kartu kanan dari kanan */
            <Reveal key={r.tag} variant={i === 0 ? "left" : "right"} delay={i * 120}>
              <article className="h-full rounded-3xl bg-surface p-8 shadow-[0_16px_40px_-24px_rgba(11,36,23,0.35)]">
                <span className={`inline-block rounded-full ${r.accent} px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-ink`}>
                  {r.tag}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold leading-snug">{r.title}</h3>
                <ul className="mt-6 space-y-3.5">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] font-medium leading-relaxed">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
