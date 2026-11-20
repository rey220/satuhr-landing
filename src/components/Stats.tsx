import Counter from "./Counter";
import Reveal from "./Reveal";

const stats = [
  { end: 12500, suffix: "+", label: "Karyawan terkelola setiap hari" },
  { end: 98, suffix: "%", label: "Payroll selesai tepat waktu" },
  { end: 65, suffix: "%", label: "Waktu administrasi HR berkurang" },
  { end: 4.9, decimals: 1, suffix: "/5", label: "Rating kepuasan HR Manager" },
];

export default function Stats() {
  return (
    <section aria-label="Dampak SatuHR dalam angka" className="border-b border-ink/10 bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 120} className="text-center lg:text-left">
            <p className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              <Counter end={s.end} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            <span className="mx-auto mt-3 block h-1 w-10 rounded bg-support lg:mx-0" aria-hidden />
            <p className="mt-3 text-sm font-semibold leading-snug text-ink-soft">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
      {/* Baris "dipercaya" dipindah ke LogoStrip (Revisi 5b) agar tidak ganda */}
    </section>
  );
}
