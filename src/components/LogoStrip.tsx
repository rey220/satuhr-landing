import Reveal from "./Reveal";

/**
 * Revisi 5b — strip kepercayaan B2B di bawah hero.
 * Dieksekusi minimalis: nama perusahaan sebagai teks polos berwarna
 * redup, satu baris tenang. Nama-nama ini materi demo (lihat footer).
 */
const companies = [
  "ARUNIKA",
  "SAJI NUSANTARA",
  "CAKRA MANUFAKTUR",
  "NUSA LOGISTIK",
  "TERRA RITEL",
  "KALA HOSPITALITY",
];

export default function LogoStrip() {
  return (
    <section aria-label="Perusahaan yang mempercayai SatuHR" className="border-b border-ink/10 bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <Reveal>
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-ink-soft/80">
            Dipercaya tim HR di berbagai perusahaan Indonesia
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {companies.map((c) => (
              <li key={c} className="text-base font-extrabold tracking-widest text-ink/35">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
