export default function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-extrabold text-ink">S</span>
            <span className="text-xl font-extrabold tracking-tight">
              Satu<span className="text-primary">HR</span>
            </span>
          </p>
          <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-surface/70">
            Sistem internal HR terpadu untuk perusahaan Indonesia: database
            karyawan, absensi, cuti, payroll, rekrutmen, dan kinerja dalam satu tempat.
          </p>
        </div>
        <nav aria-label="Produk">
          <p className="font-extrabold">Produk</p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-surface/70">
            <li><a className="hover:text-primary" href="#fitur">Fitur</a></li>
            <li><a className="hover:text-primary" href="#harga">Harga</a></li>
            <li><a className="hover:text-primary" href="#cara-kerja">Cara Kerja</a></li>
            <li><a className="hover:text-primary" href="#cta">Uji Coba Gratis</a></li>
          </ul>
        </nav>
        <nav aria-label="Perusahaan">
          <p className="font-extrabold">Perusahaan</p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-surface/70">
            <li><a className="hover:text-primary" href="#peran">Untuk HR Manager</a></li>
            <li><a className="hover:text-primary" href="#faq">FAQ</a></li>
            <li><a className="hover:text-primary" href="#cta">Hubungi Kami</a></li>
          </ul>
        </nav>
        <div>
          <p className="font-extrabold">Kontak</p>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-surface/70">
            <li>halo@satuhr.id</li>
            <li>Senin–Jumat, 08.00–17.00 WIB</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-surface/15">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs font-medium text-surface/55 lg:px-8">
          © 2026 SatuHR. Seluruh data pada halaman ini adalah materi demo untuk
          keperluan evaluasi produk.
        </p>
      </div>
    </footer>
  );
}
