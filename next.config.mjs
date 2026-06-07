/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-s3.autocarindia.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
