/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/shortlink",
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "192.168.0.146" },
      { hostname: "bty.coppetec.org.br", protocol: "https" },
    ]
  }
};

export default nextConfig;
