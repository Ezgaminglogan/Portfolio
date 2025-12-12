export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://porfolio-665c.vercel.app/sitemap.xml`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  )
}
