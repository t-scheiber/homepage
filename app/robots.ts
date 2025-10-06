import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/files/pdf/'],
      },
    ],
    sitemap: 'https://thomasscheiber.com/sitemap.xml',
  };
}
