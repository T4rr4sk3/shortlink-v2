/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/shortlink",
  images: {
    remotePatterns: [
      { hostname: "localhost" }
    ]
  }
};

export default nextConfig;
