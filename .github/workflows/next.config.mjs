/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // statische Seite, nötig für GitHub Pages
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
