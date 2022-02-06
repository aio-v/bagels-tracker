module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["msavatar1.nexon.net", "i.imgur.com"]
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}
