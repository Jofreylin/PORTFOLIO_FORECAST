const fs = require('fs');
const path = require('path');

const baseUrls = {
  en: 'https://forecaster.byjofrey.com/en',
  es: 'https://forecaster.byjofrey.com/es',
};

const urls = [
  '/',
  '/calculator',
  '/disclaimer',
  '/home',
  '/how-to',
  '/how-to/compound-interest',
  '/how-to/dividend-cagr',
  '/how-to/forecaster-exp',
  '/how-to/share-cagr',
];

const priorities = {
  '/': 1.0,
  '/calculator': 0.8,
  '/disclaimer': 0.5,
  '/home': 0.9,
  '/how-to': 0.7,
  '/how-to/compound-interest': 0.7,
  '/how-to/dividend-cagr': 0.7,
  '/how-to/forecaster-exp': 0.7,
  '/how-to/share-cagr': 0.7,
};

const generateSitemapContent = (locale) => {
  const baseUrl = baseUrls[locale];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <priority>${priorities[url]}</priority>
  </url>`).join('')}
</urlset>`;
};

Object.keys(baseUrls).forEach(locale => {
  const sitemapContent = generateSitemapContent(locale);
  const outputPath = path.join(__dirname, `dist/portfolio-forecast/browser/${locale}/sitemap.xml`);
  fs.writeFileSync(outputPath, sitemapContent);
});
