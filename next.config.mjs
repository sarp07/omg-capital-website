/** @type {import('next').NextConfig} */

import path from 'path';
import { fileURLToPath } from 'url';
import createNextIntlPlugin from 'next-intl/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Tüm hostları kabul etmek için bu yapıyı kullanıyoruz
      },
    ],
  },
};

export default withNextIntl(nextConfig);
