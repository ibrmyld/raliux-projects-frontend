// Sitemap generator utility
export const generateSitemap = async (posts = []) => {
  const baseUrl = window.location.origin;
  const currentDate = new Date().toISOString();
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }
  ];

  // Dynamic blog posts
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: new Date(post.publishedAt || post.updatedAt).toISOString(),
    changefreq: 'weekly',
    priority: '0.8'
  }));

  const allPages = [...staticPages, ...blogPages];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

// Generate and download sitemap
export const downloadSitemap = async (posts) => {
  try {
    const xml = await generateSitemap(posts);
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    console.log('✅ Sitemap generated and downloaded');
  } catch (error) {
    console.error('❌ Sitemap generation failed:', error);
  }
}; 