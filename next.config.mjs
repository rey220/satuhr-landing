/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export agar bisa di-deploy ke GitHub Pages / CDN statis mana pun.
  // Saat pindah ke Vercel (fase dashboard), hapus baris output ini untuk SSR penuh.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
