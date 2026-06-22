/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://dk-grupp.ru',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: [
    '/server-sitemap.xml',
  ],
  sitemap: [
    {
      loc: '/',
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: '/types-works',
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: '/types-works/glass-partitions',
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: '/types-works/glass-staircases',
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: '/types-works/elevator-shafts',
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: '/types-works/radius-elements',
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: '/types-works/fire-windows',
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: '/contacts',
      changefreq: 'monthly',
      priority: 0.7,
    },
  ],
};