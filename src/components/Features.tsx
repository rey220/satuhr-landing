import Reveal from "./Reveal";

const features = [
  {
    title: "Database Karyawan Terpusat",
    desc: "Satu profil lengkap per karyawan: data pribadi, jabatan, kontrak, dokumen, dan riwayat perubahan. Tidak ada lagi file Excel versi 7 yang berbeda-beda.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    title: "Absensi & Jadwal Shift",
    desc: "Check-in dari ponsel dengan GPS dan foto, jadwal shift bergilir, dan rekap kehadiran otomatis yang langsung terhubung ke payroll.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Cuti & Izin Self-Service",
    desc: "Karyawan mengajukan cuti dari ponsel, atasan menyetujui dalam satu klik, sisa cuti terpotong otomatis. HR tidak lagi jadi perantara chat.",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    title: "Payroll Akurat & Tepat Waktu",
    desc: "Gaji pokok, tunjangan, lembur, BPJS, dan PPh 21 dihitung otomatis dari data kehadiran. Slip gaji terkirim ke setiap karyawan secara privat.",
    icon: "M12 8c-2.21 0-4 1.343-4 3s1.79 3 4 3 4 1.343 4 3-1.79 3-4 3m0-12c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Rekrutmen Terstruktur",
    desc: "Pasang lowongan, pantau kandidat per tahap, jadwalkan wawancara, dan nilai bersama tim — riwayat kandidat tidak hilang di email pribadi.",
    icon: "M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z",
  },
  {
    title: "Penilaian Kinerja (KPI/OKR)",
    desc: "Target per tim dan individu, review berkala, dan hasil yang terdokumentasi rapi untuk keputusan promosi dan bonus yang adil.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Manajemen Dokumen & Kontrak",
    desc: "Kontrak, SK, dan surat peringatan tersimpan aman dengan pengingat otomatis sebelum masa kontrak berakhir. Audit-ready kapan saja.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Laporan & Analitik HR",
    desc: "Turnover, kehadiran, dan biaya per departemen dalam grafik yang bisa dibaca direksi dalam 5 menit — bukan pivot table semalaman.",
    icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
];

export default function Features() {
  return (
    <section id="fitur" className="scroll-mt-20 bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            Fitur Utama
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Delapan pekerjaan HR yang paling menyita waktu, selesai dalam satu sistem
          </h2>
          <p className="mt-4 text-lg font-medium text-ink-soft">
            Setiap fitur dirancang untuk pekerjaan nyata HR Indonesia — termasuk
            BPJS dan PPh 21 — bukan sekadar daftar centang.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 4) * 100}>
              <article className="group h-full rounded-3xl border border-ink/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_20px_40px_-20px_rgba(24,217,85,0.55)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 transition-colors group-hover:bg-primary">
                  <svg
                    className="h-6 w-6 text-ink"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-extrabold leading-snug">{f.title}</h3>
                <p className="mt-2.5 text-sm font-medium leading-relaxed text-ink-soft">
                  {f.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
