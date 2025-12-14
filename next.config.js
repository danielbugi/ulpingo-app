/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ignore pg-native module (optional dependency of pg)
      config.externals.push('pg-native');
    }
    return config;
  },
};

module.exports = nextConfig;
