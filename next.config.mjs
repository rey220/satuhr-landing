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
};
export default nextConfig;
