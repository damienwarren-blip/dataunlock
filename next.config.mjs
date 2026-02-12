/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack fix: We remove the 'canvas: false' which was causing the boolean error.
  // Most modern builds handle this automatically now.
  turbopack: {}, 
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;