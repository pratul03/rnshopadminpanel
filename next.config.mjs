/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dqtznfenonxvjwoowede.supabase.co",
      },
    ],
  },
};

export default nextConfig;
