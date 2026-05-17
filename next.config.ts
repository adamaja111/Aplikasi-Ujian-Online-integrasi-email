/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@prisma/client'],
  // In Next.js 15+, allowedDevOrigins is usually in the experimental block but its name might have changed or it's not supported in your specific version.
  // I will remove it to stop the warning and focus on the Prisma error.
};

export default nextConfig;
