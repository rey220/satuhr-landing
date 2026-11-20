import DrawLine from "@/components/motion/DrawLine";
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Daftar & impor data",
    desc: "Buat akun perusahaan, lalu impor data karyawan dari Excel. Tim kami mendampingi migrasi sampai bersih — gratis.",
  },
  {
    n: "02",
    title: "Atur sesuai perusahaan Anda",
    desc: "Struktur organisasi, jadwal shift, pola cuti, dan komponen gaji diatur sekali. Setelah itu semuanya berjalan otomatis.",
  },
  {
    n: "03",
    title: "Undang tim & mulai bekerja",
    desc: "Karyawan menerima undangan ke ponsel mereka. HR memantau semuanya dari dashboard — hari pertama sudah terasa bedanya.",
  },
];

export default function Steps() {
  return (
    <section id="cara-kerja" className="scroll-mt-20 bg-surface py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-support-dark">
            Cara Kerja
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Dari spreadsheet ke sistem dalam 3 langkah
          </h2>
        </Reveal>

        <Reveal className="relative mt-14">
          {/* Isu T2: garis berhenti tepat di tengah kotak langkah 03,
              tidak lagi memanjang sampai tepi kanan */}
          <div aria-hidden className="absolute left-7 right-[calc(33.333%-0.875rem)] top-7 hidden h-1 rounded bg-ink/10 lg:block">
            <DrawLine className="h-full w-full rounded bg-support" />
          </div>
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="relative">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-lg font-extrabold text-ink shadow-[0_12px_24px_-10px_rgba(24,217,85,0.8)]">
                  {s.n}
                </span>
                <h3 className="mt-5 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2.5 max-w-sm font-medium leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
