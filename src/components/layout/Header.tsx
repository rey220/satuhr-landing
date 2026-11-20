import Link from "next/link";

const nav = [
  { label: "Fitur", href: "#fitur" },
  { label: "Untuk Siapa", href: "#peran" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Harga", href: "#harga" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="SatuHR — beranda">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-extrabold text-ink">
            S
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Satu<span className="text-primary-dark">HR</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="hidden text-sm font-semibold text-ink-soft hover:text-ink sm:block"
          >
            Masuk
          </a>
          <a
            href="#cta"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-ink shadow-[0_8px_20px_-8px_rgba(24,217,85,0.9)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Coba Gratis
          </a>
        </div>
      </div>
    </header>
  );
}
