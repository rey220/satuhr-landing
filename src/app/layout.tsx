import type { Metadata } from "next";
import "./globals.css";

/* Font dimuat dari Google Fonts CDN (bukan self-host) agar hasil static export
   tidak mengandung file biner — seluruh folder deploy murni teks dan bisa
   diterbitkan lewat GitHub Pages dari folder docs/. */

export const metadata: Metadata = {
  metadataBase: new URL("https://satuhr.id"),
  title: "SatuHR — Aplikasi HRIS & Sistem HR Terpadu untuk Perusahaan Indonesia",
  description:
    "SatuHR menyatukan database karyawan, absensi, cuti, payroll, rekrutmen, dan penilaian kinerja dalam satu sistem internal. Hemat 65% waktu administrasi HR. Uji coba gratis 14 hari, tanpa kartu kredit.",
  keywords: [
    "aplikasi HRIS",
    "software HR Indonesia",
    "sistem internal perusahaan",
    "aplikasi absensi online",
    "software payroll",
    "manajemen karyawan",
    "aplikasi cuti karyawan",
    "HR management system",
  ],
  authors: [{ name: "SatuHR" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://satuhr.id/",
    siteName: "SatuHR",
    title: "SatuHR — Semua Urusan HR, Satu Sistem",
    description:
      "Database karyawan, absensi, cuti, payroll, dan kinerja dalam satu dashboard. Uji coba gratis 14 hari.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SatuHR — Semua Urusan HR, Satu Sistem",
    description:
      "Sistem internal HR terpadu untuk HR Manager dan seluruh karyawan. Uji coba gratis 14 hari, tanpa kartu kredit.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

/* Data terstruktur untuk Google: SoftwareApplication + FAQ (rich results) */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "SatuHR",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "id-ID",
      description:
        "Sistem internal HR terpadu: database karyawan, absensi, cuti, payroll, rekrutmen, dan penilaian kinerja.",
      offers: {
        "@type": "Offer",
        price: "29000",
        priceCurrency: "IDR",
        description: "Per karyawan per bulan, uji coba gratis 14 hari",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1284",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apakah SatuHR cocok untuk perusahaan di bawah 50 karyawan?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya. SatuHR dirancang untuk perusahaan 10 sampai 1.000+ karyawan. Paket Starter mulai dari 10 karyawan tanpa biaya setup.",
          },
        },
        {
          "@type": "Question",
          name: "Berapa lama proses migrasi data karyawan ke SatuHR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rata-rata 3 sampai 5 hari kerja. Tim kami membantu impor data dari Excel atau sistem lama secara gratis.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah data karyawan aman di SatuHR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Data terenkripsi saat transit dan tersimpan, akses berbasis peran (HR Manager, staf, karyawan), dan backup otomatis harian.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
