import Reveal from "./Reveal";

const faqs = [
  {
    q: "Apakah SatuHR cocok untuk perusahaan di bawah 50 karyawan?",
    a: "Ya. SatuHR dirancang untuk perusahaan 10 sampai 1.000+ karyawan. Paket Starter mulai dari 10 karyawan, tanpa biaya setup, dan fitur bisa bertumbuh mengikuti perusahaan Anda.",
  },
  {
    q: "Berapa lama proses migrasi data karyawan ke SatuHR?",
    a: "Rata-rata 3 sampai 5 hari kerja. Tim kami membantu impor data dari Excel atau sistem lama secara gratis, termasuk validasi data ganda sebelum sistem dipakai.",
  },
  {
    q: "Apakah perhitungan payroll sudah termasuk BPJS dan PPh 21?",
    a: "Sudah. Komponen gaji, tunjangan, lembur, iuran BPJS Kesehatan dan Ketenagakerjaan, serta PPh 21 dihitung otomatis mengikuti aturan Indonesia dan diperbarui saat regulasi berubah.",
  },
  {
    q: "Apakah data karyawan aman di SatuHR?",
    a: "Data terenkripsi saat dikirim dan saat tersimpan, akses dibatasi berbasis peran (HR Manager, staf HR, karyawan), dan backup otomatis dilakukan harian. Data gaji tidak bisa dilihat oleh peran yang tidak berhak.",
  },
  {
    q: "Bisakah berhenti berlangganan kapan saja?",
    a: "Bisa. Tidak ada kontrak jangka panjang untuk paket bulanan. Anda dapat mengekspor seluruh data karyawan Anda sebelum berhenti — data Anda tetap milik Anda.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-surface pb-20 pt-4 lg:pb-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Pertanyaan yang paling sering diajukan HR Manager
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <details className="group rounded-3xl border border-ink/10 bg-surface p-6 open:border-primary">
                <summary className="cursor-pointer list-none text-lg font-extrabold marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {f.q}
                    <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/20 text-xl font-extrabold transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3.5 font-medium leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
