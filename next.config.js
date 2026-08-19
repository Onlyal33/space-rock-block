const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? '192.168.100.32')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins,
  ...(process.env.E2E_NEXT_DIST_DIR
    ? { distDir: process.env.E2E_NEXT_DIST_DIR }
    : {}),
};

module.exports = nextConfig;
