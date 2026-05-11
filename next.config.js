/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    // Short sponsorship URLs (printed on the sponsorship one-sheet) -> Stripe Checkout links.
    // Temporary (302) so the Stripe links can be repointed later without browser cache issues.
    return [
      { source: '/hole', destination: 'https://buy.stripe.com/9B6bJ25Cu4GRaU0bym0Jq0k', permanent: false },
      { source: '/cart', destination: 'https://buy.stripe.com/4gMcN69SK4GR8LS0TI0Jq0l', permanent: false },
      { source: '/team', destination: 'https://buy.stripe.com/5kQ7sM6Gyc9jd287i60Jq0m', permanent: false },
      { source: '/title', destination: 'https://buy.stripe.com/dRm14o6Gyflv8LS31Q0Jq0n', permanent: false },
    ]
  },
}

module.exports = nextConfig
