# PRD — SatuHR Landing Page: Revisi & Optimalisasi

| | |
|---|---|
| **Produk** | SatuHR — Landing page SaaS sistem internal HR untuk HR Manager & staf |
| **Dokumen** | Product Requirements Document (PRD) — Putaran Revisi 1 |
| **Tanggal** | 20 November 2026 |
| **Status** | Final untuk dieksekusi — menunggu perintah eksekusi dari stakeholder |
| **Disusun oleh** | Muse (Tech Lead) |
| **Stakeholder** | Jihan |
| **Repositori** | github.com/rey220/satuhr-landing |
| **Stack** | Next.js 15 + TypeScript + Tailwind CSS v4 (tidak berubah) |

---

## 1. Ringkasan

Dokumen ini merangkum **seluruh perubahan dan revisi** yang disepakati untuk landing page SatuHR, yang berasal dari dua sumber:

1. **Revisi dari stakeholder (Jihan)** — hasil peninjauan preview lokal pada 20 November 2026 (9 screenshot) dan arahan tambahan setelahnya.
2. **Revisi dari Tech Lead (Muse)** — temuan audit visual dari screenshot yang sama, plus 3 saran optimalisasi utama yang telah disetujui stakeholder untuk masuk daftar revisi.

Tidak ada perubahan di luar dokumen ini yang akan dikerjakan pada putaran ini.

## 2. Latar Belakang

- Landing page SatuHR selesai dibangun dan terverifikasi build lokal (halaman 8,13 kB, JS muatan pertama 111 kB), lalu didorong ke GitHub.
- Stakeholder memutuskan menjalankan dan meninjau situs secara **lokal terlebih dahulu**; deploy online (Vercel) ditunda.
- Dari peninjauan lokal tersebut muncul: 4 isu visual teramati, 4 revisi perilaku animasi dari stakeholder, 1 aturan global animasi, 1 keputusan format desain (minimalisme), dan 3 saran optimalisasi dari Tech Lead yang disetujui.
- Seluruh perubahan dikumpulkan dahulu dan **dieksekusi dalam satu putaran** setelah stakeholder memberi perintah.

## 3. Tujuan Putaran Revisi

1. Membuat seluruh animasi halaman terasa hidup, halus, dan konsisten.
2. Memperbaiki isu visual yang teramati pada preview lokal.
3. Meningkatkan kesan profesional dan kepercayaan (standar B2B) tanpa mengubah identitas warna dan isi konten yang sudah disepakati.
4. Menetapkan format **minimalis** sebagai kompas desain seluruh pengerjaan.

## 4. Prinsip Desain (mengikat seluruh revisi)

### 4.1 Format minimalis *(arahan stakeholder)*
- Dekorasi dikurangi; setiap elemen harus punya alasan untuk ada.
- Ruang putih lega, tipografi bersih, warna dipakai hemat sebagai aksen.
- Animasi halus dan tidak berlebihan; tidak ada elemen yang "berusaha terlihat".
- Seluruh tambahan baru (strip logo, strip keamanan, gradasi hero) dieksekusi secara minimalis.

### 4.2 Identitas warna (tidak berubah)
- Putih `#FFFFFF` (utama), hijau `#18D955` (dasar), cyan `#3DC5E0` (pendukung/aksen).
- Teks di atas hijau/cyan tetap memakai tinta hijau gelap `#0B2417` demi kontras aksesibilitas (WCAG).
- Cyan hanya untuk aksen/garis/label — tidak untuk teks isi.

### 4.3 Aksesibilitas & gerak
- Animasi TIDAK mengacu pada pengaturan `prefers-reduced-motion` / setting animasi Windows — animasi selalu berjalan untuk semua pengunjung (keputusan stakeholder 20 Nov 2026, dicatat di DOKUMENTASI.md Addendum 2; menyimpang secara sadar dari standar WCAG soal gerakan).
- Animasi hanya memakai properti ringan (transform & opacity) agar performa tetap terjaga.

## 5. Aturan Global Animasi *(arahan stakeholder)*

- **Semua animasi bersifat berulang (replay), bukan satu kali.** Setiap kali pengguna melakukan scroll dan kembali mengunjungi suatu bagian, animasi pada bagian itu bermain lagi dari awal — angka menghitung ulang, kartu meluncur masuk lagi, dan seterusnya untuk semua bagian.
- Penjagaan teknis dari Tech Lead: animasi hanya di-reset setelah bagian **benar-benar keluar** dari layar, dan diputar ulang saat bagian masuk cukup terlihat — agar gerakan scroll kecil di perbatasan section tidak membuat animasi tersendat mulai ulang berkali-kali.
- Aturan ini berlaku untuk Revisi 1–4 dan seluruh animasi masuk (entrance) lainnya di halaman.

## 6. Daftar Revisi

### REVISI 1 — Hero: gerakan teks & angka dashboard *(dari stakeholder)*

**Lokasi:** Section hero (paling atas).

**1a. Teks hero bergerak halus**
- Perilaku saat ini: teks diam; hanya ada animasi muncul (fade) saat halaman dimuat.
- Perubahan: judul "Semua urusan HR berantakan di spreadsheet? Satukan di SatuHR." beserta paragraf deskripsinya **bergerak bergeser ke kiri–kanan secara perlahan dan halus** (bergoyang di tempat, bukan berjalan keluar layar).
- **Keputusan stakeholder (20 Nov 2026):** gerakan berjalan **±6 detik** setiap kali hero masuk layar, **lalu berhenti diam** — sesuai aturan global, gerakan berulang lagi saat pengguna kembali ke hero. (Pilihan "bergerak terus-menerus" tidak diambil demi keterbacaan.)
- Kriteria penerimaan: gerakan terasa pelan dan tenang; teks tetap nyaman dibaca; tidak menimbulkan scroll menyamping di layar kecil.

**1b. Angka mockup dashboard ikut Count-Up**
- Perilaku saat ini: angka pada kartu "Ringkasan Kehadiran" tampil statis.
- Perubahan: angka **248** (Hadir), **12** (Cuti), dan **5** (Izin) menggunakan **Animated Number Counter / Count-Up** — berjalan naik dari 0 ke nilai akhir, dengan metode yang sama seperti section statistik, dan berulang sesuai aturan global.
- Kriteria penerimaan: ketiga angka menghitung naik secara halus setiap kali hero masuk layar.

### REVISI 2 — Statistik: Count-Up lebih smooth *(dari stakeholder)*

**Lokasi:** Section statistik (12.500+, 98%, 65%, 4,9/5).

- Perilaku saat ini: sudah memakai Count-Up (±1,6 detik, easeOutExpo) saat section masuk layar.
- Perubahan: **penyetelan ulang** kurva & durasi animasi agar gerakan terasa **lebih halus dan lebih terlihat jelas**, termasuk angka desimal 4,9/5 (format koma Indonesia dipertahankan). Berlaku berulang sesuai aturan global.
- Tugas verifikasi Tech Lead: memeriksa dari kode apakah animasi berjalan benar di mesin stakeholder (bergerak naik vs langsung tampil diam). Jika ditemukan bug, perbaikannya termasuk dalam revisi ini.
- Kriteria penerimaan: keempat angka menghitung naik dengan gerakan halus yang jelas teramati setiap kali section dikunjungi.

### REVISI 3 — Section "Untuk Siapa": kartu masuk dari dua arah *(dari stakeholder)*

**Lokasi:** Section peran — kartu "Untuk HR Manager" (kiri) dan "Untuk Staf & Karyawan" (kanan).

- Perilaku saat ini: kedua kartu muncul dengan fade-up generik yang sama seperti section lain.
- Perubahan: **kartu kiri meluncur masuk dari kiri, kartu kanan meluncur masuk dari kanan**, secara halus (smooth), saat section masuk layar; berulang sesuai aturan global.
- Kriteria penerimaan: arah masuk kedua kartu berlawanan dan terasa sinkron; di layar ponsel (kartu bertumpuk vertikal) animasi tetap wajar dan tidak menyebabkan scroll menyamping.

### REVISI 4 — Testimoni: geser horizontal halus *(dari stakeholder, metode dipilih dari saran Tech Lead)*

**Lokasi:** Section testimoni (carousel 3 testimoni, rotasi otomatis).

- Perilaku saat ini: pergantian testimoni hanya crossfade polos (memudar).
- Perubahan (**keputusan stakeholder, 20 Nov 2026 — opsi 1 dari 3 saran Tech Lead**):
  - Pergantian memakai **geser horizontal halus**: testimoni lama bergeser keluar ke kiri sambil memudar, testimoni baru masuk dari kanan. Jika pengguna mengklik indikator testimoni sebelumnya, arah geser berbalik ke kanan (mengikuti urutan).
  - Indikator titik diganti/dilengkapi **progress bar kecil** yang menunjukkan waktu menuju testimoni berikutnya; rotasi ±6 detik.
  - Rotasi **jeda saat kursor diarahkan** ke atas section (pause on hover).
  - Urutan muncul bertahap: kutipan → lingkaran inisial → nama & jabatan.
  - **Perbaikan ikut serta:** posisi tanda kutip penutup yang menggantung terpisah dari kalimat dirapikan.
- Alternatif yang tidak dipilih: fade + blur per baris (gaya editorial); crossfade + progress bar saja.
- Kriteria penerimaan: pergantian terasa halus dan terarah; pengguna dapat membaca indikator waktu; tidak ada efek berlebih (tidak ada putar 3D / memantul / zoom besar).

### REVISI 5 — Optimalisasi profesional *(dari Tech Lead, disetujui stakeholder)*

**5a. Hero: kedalaman warna & tinggi section**
- Perilaku saat ini: latar hijau `#18D955` rata memenuhi layar; tombol CTA hero nyaris terpotong di tepi bawah layar.
- Perubahan: beri **gradasi halus** dari hijau terang ke hijau yang lebih dalam di bagian bawah hero (nyaris tak terasa, hanya memberi kedalaman — sesuai prinsip minimalis), dan **kurangi tinggi hero** secukupnya.
- Kriteria penerimaan: tombol CTA hero **dan** potongan awal section berikutnya terlihat tanpa scroll pada layar laptop umum.

**5b. Elemen kepercayaan B2B**
- Perilaku saat ini: belum ada bukti kepercayaan visual; rasa aman hanya disinggung di teks formulir.
- Perubahan (dieksekusi minimalis):
  - **Strip logo perusahaan pengguna** di bawah hero — berupa nama perusahaan dalam teks polos berwarna redup, satu baris tenang (materi demo, mengikuti catatan footer yang ada).
  - **Strip keamanan** menjelang CTA akhir — satu baris dengan ikon kecil: enkripsi data, backup harian, hak akses per peran.
- Kriteria penerimaan: kedua strip terasa menyatu dengan desain (tidak ramai, tidak berwarna mencolok) dan terbaca dalam sekali lirik.

**5c. Ritme antar-section**
- Perilaku saat ini: section fitur dan "Untuk Siapa" sama-sama putih polos sehingga menyatu; section testimoni menyisakan ruang putih kosong berlebih di bawahnya.
- Perubahan: latar section dibuat **selang-seling sangat tipis** (putih vs hijau sangat pucat) untuk memisahkan bagian secara halus, dan **jarak vertikal section testimoni dirapatkan**.
- Kriteria penerimaan: perpindahan antar-section terasa jelas namun tetap minimalis; tidak ada lagi ruang kosong berlebih di testimoni.

### ISU TEKNIS — Perbaikan dari audit preview *(temuan Tech Lead, dicatat atas instruksi stakeholder)*

| # | Isu | Perbaikan yang disepakati |
|---|---|---|
| T1 | Badge melayang "Payroll November" menutupi label "Live" pada mockup dashboard hero hingga hampir tidak terbaca | Badge digeser dan label "Live" dipindah ke posisi yang tidak tertimpa (penentuan posisi oleh Tech Lead) |
| T2 | Garis cyan pada section "Cara Kerja" memanjang melewati langkah 03 sampai tepi kanan | Garis dihentikan tepat di langkah terakhir (03); animasi gambar-garis tetap berjalan dan berulang sesuai aturan global |
| T3 | Indikator mode pengembangan Next.js (lingkaran merah "N", pojok kiri bawah) menimpa konten pada preview lokal | Dimatikan pada mode dev agar preview lokal bersih; pada build produksi indikator ini memang sudah tidak ada |

## 7. Di Luar Cakupan Putaran Ini

Dicatat agar tidak terjadi salah paham — hal berikut **tidak** dikerjakan pada putaran ini:

- **Saran pendukung Tech Lead yang belum disetujui masuk daftar** (bahan pertimbangan): baris penenang di bawah tombol hero ("Gratis 14 hari • Tanpa kartu kredit • …"), deretan bintang pada testimoni, tautan WhatsApp di kontak, latar hijau gelap untuk CTA penutup.
- **Backend formulir CTA** — formulir saat ini masih simulasi (fase 1); penyambungan ke email/CRM adalah pekerjaan fase 2.
- **Deploy online (Vercel)** — ditunda atas keputusan stakeholder; situs tetap dijalankan lokal.
- **Penggantian data demo** — angka statistik, testimoni, dan logo perusahaan adalah materi demo (sudah dinyatakan di footer); wajib diganti data asli sebelum rilis publik sungguhan.
- Perubahan nama produk, harga, palet warna, dan isi konten — tidak ada.

## 8. Rencana Eksekusi & Verifikasi

1. Tech Lead mengubah kode di salinan proyek (workspace) sesuai dokumen ini.
2. Build produksi dijalankan ulang hingga **lolos tanpa error** (termasuk pemeriksaan tipe TypeScript).
3. Hasil didorong ke GitHub (`rey220/satuhr-landing`) per file melalui Contents API — jalur yang terbukti bekerja (batch push dan pembuatan repo via aplikasi tidak didukung platform).
4. Stakeholder menjalankan `git pull` di salinan lokal, lalu `npm run dev`, dan memeriksa hasilnya.
5. Verifikasi bersama berdasarkan kriteria penerimaan di Bagian 6; temuan baru dicatat sebagai putaran revisi berikutnya, bukan diubah diam-diam.

## 9. Risiko & Catatan

- **Animasi berulang** dapat terasa mengganggu bila dipicu terlalu sensitif — dimitigasi oleh penjagaan teknis di Bagian 5.
- **Gerakan teks hero** dibatasi ±6 detik demi keterbacaan (keputusan stakeholder).
- Klaim angka/testimoni bersifat demo; risiko reputasi hanya muncul bila situs dirilis publik tanpa penggantian data — di luar cakupan putaran ini, namun wajib sebelum rilis.

## 10. Log Keputusan

| Tanggal | Keputusan | Oleh |
|---|---|---|
| 20 Nov 2026 | Situs dijalankan lokal dulu; deploy online ditunda; audit menunggu preview lokal | Stakeholder |
| 20 Nov 2026 | Isu dari preview dicatat dulu, tidak langsung diperbaiki | Stakeholder |
| 20 Nov 2026 | Revisi 1–4 ditetapkan (hero, statistik, kartu peran, testimoni) | Stakeholder |
| 20 Nov 2026 | Testimoni memakai metode geser horizontal halus (opsi 1 dari saran Tech Lead) | Stakeholder |
| 20 Nov 2026 | Semua animasi wajib berulang setiap section dikunjungi lagi (aturan global) | Stakeholder |
| 20 Nov 2026 | Gerakan teks hero ±6 detik lalu berhenti (mengikuti saran Tech Lead) | Stakeholder |
| 20 Nov 2026 | 3 saran utama Tech Lead masuk daftar revisi (menjadi Revisi 5) | Stakeholder |
| 20 Nov 2026 | Format desain proyek: **minimalis** | Stakeholder |

---

*Dokumen ini adalah satu-satunya acuan pengerjaan Putaran Revisi 1. Perubahan di luar dokumen ini memerlukan persetujuan stakeholder terlebih dahulu.*
