/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["coingecko.com", "coin-images.coingecko.com", "raw.githubusercontent.com"],
  },
};

export default nextConfig;
