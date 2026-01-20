/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://malola.app',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/settings/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/settings', '/api'],
      },
    ],
  },
}
