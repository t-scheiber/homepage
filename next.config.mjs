/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'], // Use modern formats when possible
  },

  // Production optimization
  poweredByHeader: false,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@tsparticles/react', '@tsparticles/slim'],
  },
};

export default nextConfig;
