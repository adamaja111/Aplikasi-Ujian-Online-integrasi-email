/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client'],
  // Memastikan file di folder prisma ikut terbawa saat deployment
  outputFileTracingIncludes: {
    '/*': ['./prisma/**/*'],
  },
};

export default nextConfig;
