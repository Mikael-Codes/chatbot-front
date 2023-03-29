/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  
  env: {
    
    NEXT_PUBLIC_LLC_ENDPOINT_URL: process.env.NEXT_PUBLIC_LLC_ENDPOINT_URL,
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
  
  async headers() {
    return [
      {
        source: '/uploads/(.*)',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/pdf',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
