import { NextApiRequest, NextApiResponse } from 'next'

type post = {
  id: string
  publishedAt: string
}

const generateSitemap = (posts: post[], location: string): string => {
  let xml: string = ''

  posts.map((post) => {
    // YYYY-MM-DD
    const postDate: string = new Date(post.publishedAt)
      .toISOString()
      .split('T')[0]
    const postUrl = location + post.id

    xml += `<url>
          <loc>${postUrl}</loc>
          <lastmod>${postDate}</lastmod>
          <priority>0.50</priority>
        </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${xml}
      </urlset>`
}

export const sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_MICROCMS_ACCESS_KEY}/api/v1/posts`,
    {
      headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '' },
    }
  )
    .then((res) => res.json())
    .catch((error) => null)

  if (!content) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  const location = `${process.env.NEXT_PUBLIC_HOST}/posts/`
  const sitemap: string = generateSitemap(content.contents, location)

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.end(sitemap)
}

export default sitemap
