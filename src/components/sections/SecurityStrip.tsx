import Reveal from "@/components/motion/Reveal";

/**
 * Revisi 5b — strip keamanan menjelang CTA akhir.
 * Satu baris tenang dengan ikon kecil: menjawab kekhawatiran utama
 * pembeli B2B yang memegang data gaji karyawan.
 */
const items = [
  {
    text: "Data terenkripsi (TLS & AES-256)",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    text: "Backup otomatis setiap hari",
    icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99",
  },
  {
    text: "Hak akses per peran & jejak audit",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  },
];

export default function SecurityStrip() {
  return (
    <section aria-label="Keamanan data SatuHR" className="border-y border-ink/10 bg-primary/[0.05]">
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 lg:px-8">
          {items.map((it) => (
            <p key={it.text} className="flex items-center gap-2 text-sm font-bold text-ink/80">
              <svg
                className="h-5 w-5 shrink-0 text-primary-dark"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={it.icon} />
              </svg>
              {it.text}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
