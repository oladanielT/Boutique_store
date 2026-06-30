// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: false,
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
