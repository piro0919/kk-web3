/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://kk-web.link/",
  generateRobotsTxt: true,
};

module.exports = config;
