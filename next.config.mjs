/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig = {
  // Static export agar bisa di-deploy ke GitHub Pages / CDN statis mana pun.
  // Saat pindah ke Vercel (fase dashboard), hapus baris output ini untuk SSR penuh.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Diisi "/satuhr-landing" saat build untuk GitHub Pages (situs proyek di subpath).
  // Kosong untuk domain sendiri (satuhr.id) / Vercel.
  basePath,
  assetPrefix: basePath || undefined,
  // Isu T3: matikan indikator dev Next.js (lingkaran "N" pojok kiri bawah)
  // agar tidak menimpa konten saat preview lokal. Build produksi tidak terpengaruh.
  devIndicators: false,
};
export default nextConfig;
