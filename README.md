# SatuHR — Landing Page SaaS HRIS

Landing page SaaS untuk **SatuHR**, solusi sistem internal perusahaan bagi HR Manager dan seluruh staf: database karyawan, absensi, cuti, payroll, rekrutmen, dan penilaian kinerja dalam satu sistem.

Dibangun mengikuti brief stakeholder:

- Palet warna resmi: `#FFFFFF` (utama), `#18D955` (dasar: hero, CTA, kartu), `#3DC5E0` (pendukung: tombol sekunder, garis, dekorasi)
- **Animated Number Counter (Count-Up)** pada section statistik — angka berjalan saat section masuk layar
- Animasi per section yang halus (fade-in saat scroll, crossfade testimoni, garis animasi pada Cara Kerja) dan menghormati `prefers-reduced-motion`
- CTA kuat berulang: *Mulai Uji Coba Gratis 14 Hari — Tanpa Kartu Kredit*
- SEO lengkap: metadata, Open Graph, JSON-LD (SoftwareApplication + FAQ), sitemap, robots.txt

## Tech Stack

| Lapisan | Pilihan | Alasan singkat |
|---|---|---|
| Framework | Next.js 15 (App Router) + React 19 | SSR/SSG untuk SEO; satu codebase siap lanjut ke dashboard SaaS |
| Bahasa | TypeScript (strict) | Kesalahan tertangkap sebelum rilis |
| Styling | Tailwind CSS v4 + design token | Palet stakeholder dikunci sebagai token resmi |
| Font | Plus Jakarta Sans | Modern, khas Indonesia, bukan font generik |
| Animasi | IntersectionObserver + requestAnimationFrame (native) | Ringan, tanpa library animasi tambahan |
| Deploy | GitHub Pages via GitHub Actions | Otomatis setiap push ke `main` |

Dokumentasi lengkap untuk stakeholder dan developer ada di [docs/DOKUMENTASI.md](docs/DOKUMENTASI.md).

## Menjalankan Secara Lokal

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # hasil static export di folder out/
```

## Lisensi

Proyek internal — © 2026 SatuHR.
