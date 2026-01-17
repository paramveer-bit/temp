/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
