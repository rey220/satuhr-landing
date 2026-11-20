# Dokumentasi Proyek SatuHR — Landing Page SaaS

Versi 1.0 · 20 November 2026 · Status: selesai dikembangkan — repository rey220/satuhr-landing (GitHub)

Dokumen ini ditulis untuk dua pembaca: **stakeholder** (bagian 1–3, bahasa non-teknis) dan **developer** (bagian 4–8).

---

## 1. Ringkasan untuk Stakeholder

SatuHR adalah landing page satu halaman yang menjual solusi sistem internal HR kepada HR Manager dan stafnya. Tujuan tunggal halaman ini: mengubah pengunjung menjadi pendaftar uji coba gratis.

Isi halaman, dari atas ke bawah:

1. **Header** — logo, menu (Fitur, Untuk Siapa, Cara Kerja, Harga, FAQ), tombol "Coba Gratis" yang selalu terlihat.
2. **Hero** (latar hijau `#18D955`) — janji utama "Semua urusan HR berantakan di spreadsheet? Satukan di SatuHR", mockup dashboard HR, CTA utama, dan jaminan tanpa kartu kredit.
3. **Statistik berdampak** — empat angka yang **berjalan menghitung (count-up)** saat pengunjung menggulir ke bagian ini: 12.500+ karyawan terkelola, 98% payroll tepat waktu, 65% waktu admin berkurang, rating 4,9/5.
4. **Fitur** — 8 fitur: database karyawan, absensi & shift, cuti self-service, payroll (BPJS + PPh 21), rekrutmen, penilaian kinerja, dokumen & kontrak, laporan & analitik.
5. **Untuk Siapa** — dua kartu terpisah: manfaat untuk HR Manager dan manfaat untuk staf/karyawan.
6. **Cara Kerja** — 3 langkah dengan garis cyan yang teranimasi: daftar & impor data → atur → undang tim.
7. **Harga** — 3 paket (Starter Rp29.000, Growth Rp49.000, Enterprise Rp79.000 per karyawan/bulan) dengan tombol geser Bulanan/Tahunan (hemat 20%); angka harga ikut berubah dengan animasi.
8. **Testimoni** — 3 kutipan HR Manager yang berganti otomatis (crossfade) dan bisa dipilih manual.
9. **FAQ** — 5 pertanyaan yang paling sering diajukan, sekaligus bahan SEO.
10. **CTA + Formulir** (latar hijau) — formulir uji coba 4 field dengan validasi dan pesan sukses.
11. **Footer** — navigasi, kontak, dan catatan demo.

## 2. Keputusan Desain yang Perlu Diketahui Stakeholder

- **Warna mengikuti brief persis**: putih `#FFFFFF` utama, hijau `#18D955` dasar, cyan `#3DC5E0` pendukung — dikunci sebagai *design token* sehingga konsisten di semua section dan mudah diganti terpusat.
- **Satu pengecualian yang disengaja**: teks di atas tombol hijau/cyan memakai tinta gelap, bukan putih. Teks putih di atas kedua warna tersebut gagal standar keterbacaan internasional (WCAG); tinta gelap membuat tombol tetap sesuai palet tetapi terbaca oleh semua orang.
- **Animasi dibuat halus, bukan berkedip**: permintaan "flash in/out" diterjemahkan menjadi fade-in/fade-out profesional. Kedipan cepat terlihat murahan dan mengganggu sebagian pengguna. Semua animasi berhenti otomatis bila perangkat pengguna mengaktifkan mode hemat gerak (*reduced motion*).
- **Nama "SatuHR" adalah nama kerja** dari tim teknis. Menggantinya cukup mengubah teks di beberapa tempat (lihat bagian 6) — tidak mengubah struktur.

## 3. SEO — Apa yang Sudah Dikerjakan

- Judul & deskripsi halaman ditulis untuk kata kunci: *aplikasi HRIS*, *software HR Indonesia*, *sistem internal perusahaan*, *aplikasi absensi online*, *software payroll*.
- Struktur heading semantik: satu H1, H2 per section — memudahkan Google memahami isi.
- Data terstruktur (JSON-LD) bertipe SoftwareApplication + FAQPage agar berpeluang tampil sebagai *rich result* di Google.
- `sitemap.xml` dan `robots.txt` terpasang; meta Open Graph & Twitter Card untuk tampilan rapi saat dibagikan ke WhatsApp/LinkedIn.
- Halaman dirender sebagai HTML statis (cepat dibuka, target LCP < 2,5 detik) — faktor peringkat Google.

Catatan jujur: SEO teknis sudah maksimal, tetapi peringkat Google tetap membutuhkan waktu indeksasi dan konten lanjutan (artikel blog) — itu pekerjaan fase berikutnya, bukan sesuatu yang bisa dijanjikan instan.

## 4. Arsitektur & Tech Stack (Developer)

| Lapisan | Teknologi | Catatan |
|---|---|---|
| Framework | Next.js 15, App Router, React 19 | `output: "export"` untuk fase landing statis; hapus opsi itu saat pindah ke SSR/Vercel |
| Bahasa | TypeScript strict | Path alias `@/*` ke `src/*` |
| Styling | Tailwind CSS v4 (`@theme` tokens) | Token warna di `src/app/globals.css` |
| Font | Plus Jakarta Sans via `next/font/google` | `display: swap`, subset latin |
| Animasi | Native: IntersectionObserver + rAF | Tanpa library animasi (prinsip minimal dependency) |
| Ikon | SVG inline (stroke style Lucide) | Tanpa paket ikon tambahan |
| Deploy | Vercel (Git integration) | Build dari source di repo ini, terbit otomatis tiap push ke `main` |

### Struktur Folder

```
src/
  app/
    layout.tsx     Metadata SEO, JSON-LD, font
    page.tsx       Komposisi semua section
    sitemap.ts     Sitemap otomatis
    globals.css    Design token + sistem animasi (.reveal, .crossfade, .draw-line)
  components/
    Header.tsx     Navigasi sticky
    Hero.tsx       Hero + mockup dashboard (murni JSX/CSS)
    Stats.tsx      Section statistik
    Counter.tsx    Animated Number Counter (count-up)
    Reveal.tsx     Wrapper animasi scroll (fade-in)
    Features.tsx   8 fitur
    Roles.tsx      HR Manager vs Staf
    Steps.tsx      Cara kerja 3 langkah
    Pricing.tsx    Harga + toggle bulanan/tahunan (client)
    Testimonials.tsx  Carousel crossfade (client)
    Faq.tsx        FAQ (details/summary, tanpa JS)
    CtaForm.tsx    Formulir CTA + validasi + honeypot anti-spam (client)
    Footer.tsx
public/            favicon.svg, robots.txt
```

## 5. Cara Kerja Animated Number Counter

Komponen `src/components/Counter.tsx`:

1. `IntersectionObserver` (threshold 0,35) mendeteksi angka masuk viewport.
2. Animasi berjalan **satu kali** selama ±1,6 detik memakai `requestAnimationFrame` dengan easing *easeOutExpo* (cepat di awal, melambat halus di akhir).
3. Format angka memakai `toLocaleString("id-ID")` — pemisah ribuan titik (12.500) dan koma desimal (4,9).
4. Bila `prefers-reduced-motion` aktif, angka akhir langsung ditampilkan tanpa animasi.

Mengubah angka: edit array `stats` di `src/components/Stats.tsx` (`end`, `suffix`, `decimals`).

## 6. Panduan Mengubah Konten

| Yang diubah | File |
|---|---|
| Nama produk / teks hero | `src/components/Hero.tsx`, `src/app/layout.tsx` (title & JSON-LD) |
| Warna | Token `--color-*` di `src/app/globals.css` |
| Daftar fitur | Array `features` di `src/components/Features.tsx` |
| Harga paket | Array `plans` di `src/components/Pricing.tsx` |
| Testimoni | Array `items` di `src/components/Testimonials.tsx` |
| FAQ | Array `faqs` di `src/components/Faq.tsx` + samakan dengan JSON-LD di `layout.tsx` |
| Statistik | Array `stats` di `src/components/Stats.tsx` |
| Domain resmi | Ganti `https://satuhr.id` di `layout.tsx`, `sitemap.ts`, `public/robots.txt` |

## 7. Deploy

- **Utama — Vercel (sesuai analisis stack yang disetujui stakeholder)**:
  1. Buka vercel.com dan masuk dengan akun GitHub.
  2. *Add New → Project* → pilih repository `rey220/satuhr-landing` → *Import*.
  3. Framework terdeteksi otomatis sebagai Next.js; tidak ada pengaturan yang perlu diubah. Klik *Deploy*.
  4. Situs terbit di alamat `satuhr-landing.vercel.app` (atau domain sendiri bila sudah dibeli) dan ter-update otomatis setiap ada push ke `main`.
  5. Catatan: untuk Vercel/domain sendiri, build TIDAK memakai variabel `NEXT_PUBLIC_BASE_PATH` (basePath kosong). Variabel itu hanya untuk skenario GitHub Pages di subpath.
- **Lokal**: `npm install` lalu `npm run build`; folder `out/` adalah hasil static export final yang bisa diunggah ke hosting statis mana pun.
- **Alternatif GitHub Pages (tidak dipakai saat ini)**: file workflow `.github/workflows/deploy.yml` sudah disiapkan di salinan lokal proyek dan di file ZIP proyek, tetapi belum ada di repo — token integrasi GitHub yang tersedia untuk Muse tidak diizinkan GitHub menulis file di folder `.github/workflows/` (batasan platform, berlaku untuk semua aplikasi). Pemilik repo dapat menambahkannya manual lewat web GitHub (*Add file → Create new file*) bila suatu saat ingin beralih ke Pages.

## 8. Keamanan, Aksesibilitas, dan Keterbatasan Fase 1

- Formulir CTA tervalidasi di sisi klien (format email, panjang minimum) dan dilengkapi *honeypot* anti-spam. **Fase 1 bersifat statis**: pengiriman formulir disimulasikan dan menampilkan status sukses di tempat; untuk menerima leads sungguhan, arahkan submit pada `CtaForm.tsx` ke endpoint CRM/API (mis. Formspree, HubSpot, atau API Next.js di fase 2) — satu-satunya perubahan yang dibutuhkan.
- Aksesibilitas: kontras teks lolos WCAG AA (termasuk keputusan tinta gelap di atas hijau), fokus keyboard terlihat jelas, target sentuh ≥ 44px, label formulir eksplisit, dan dukungan `prefers-reduced-motion`.
- Angka statistik, testimoni, dan harga pada halaman ini adalah **materi demo** untuk evaluasi produk dan harus diganti data asli sebelum peluncuran publik.
- Roadmap fase 2 (belum dibangun, sesuai kesepakatan agar biaya tidak membengkak di awal): autentikasi (Auth.js), database PostgreSQL, dashboard HR, dan API sesuai desain `api_designer`/`architecture_designer`.

## 9. Putaran Revisi 1 (20 November 2026) — branch `revisi-1`

Dikerjakan berdasarkan `docs/PRD.md` (Putaran Revisi 1), hasil peninjauan preview lokal oleh stakeholder. Ringkasan perubahan:

- **Aturan global animasi**: semua animasi kini *berulang* setiap section masuk viewport lagi (`Reveal` melepas class `is-visible` hanya saat elemen benar-benar keluar layar; `Counter` reset ke 0 dan menghitung ulang).
- **Revisi 1 (Hero)**: judul + deskripsi bergoyang halus ±6 detik tiap hero masuk layar (`.sway`); angka mockup dashboard (248/12/5) memakai Count-Up.
- **Revisi 2 (Statistik)**: Count-Up disetel ulang — durasi 2 detik, easing easeOutQuint (lebih smooth).
- **Revisi 3 (Untuk Siapa)**: kartu kiri masuk dari kiri, kartu kanan dari kanan (variant `Reveal`).
- **Revisi 4 (Testimoni)**: pergantian geser horizontal mengikuti arah urutan, progress bar 6 detik pada indikator, jeda saat hover/fokus, muncul bertahap (kutipan → inisial → nama), tanda kutip penutup digabung ke kata terakhir agar tidak menggantung.
- **Revisi 5 (Optimalisasi)**: hero bergradasi halus ke hijau lebih dalam + tinggi dikurangi; strip logo perusahaan (teks redup, demo) di bawah hero; strip keamanan (enkripsi, backup harian, hak akses per peran) sebelum CTA; latar section selang-seling tipis (Fitur & Testimoni hijau sangat pucat); jarak section testimoni dirapatkan; baris "dipercaya" di Statistik dipindah ke strip logo.
- **Isu teknis**: T1 label "Live" dipindah ke samping label dashboard (tidak lagi tertimpa badge "Payroll November"); T2 garis Cara Kerja berhenti di tengah kotak langkah 03; T3 indikator dev Next.js dimatikan (`devIndicators: false`).
- **Format desain**: minimalis (PRD Bagian 4.1) menjadi kompas seluruh perubahan di atas.
- Verifikasi: `npm run build` lolos (pemeriksaan tipe OK), halaman 8,63 kB, JS muatan pertama 111 kB. Perubahan berada di branch `revisi-1`; `main` belum diubah sampai stakeholder menyetujui hasil preview.
