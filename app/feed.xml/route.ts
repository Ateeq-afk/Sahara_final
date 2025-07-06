import { NextResponse } from 'next/server'

export async function GET() {
  const siteUrl = 'https://saharadevelopers.com'
  const currentDate = new Date().toUTCString()
  
  // Generate RSS XML manually
  const rssXML = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sahara Developers - Construction &amp; Interior Design Updates</title>
    <link>${siteUrl}</link>
    <description>Latest updates, projects, and insights from Sahara Developers - Bangalore's premier construction and interior design company</description>
    <language>en</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    
    <item>
      <title>New Luxury Villa Project in Whitefield</title>
      <link>${siteUrl}/gallery</link>
      <description>We are excited to announce our latest luxury villa project in Whitefield, featuring modern architecture and premium amenities.</description>
      <pubDate>${new Date(2024, 0, 15).toUTCString()}</pubDate>
      <guid>${siteUrl}/gallery#whitefield-project</guid>
      <category>Construction</category>
      <category>Residential</category>
    </item>
    
    <item>
      <title>Interior Design Trends 2024</title>
      <link>${siteUrl}/services/interior-decor</link>
      <description>Discover the latest interior design trends we're implementing in our projects - from sustainable materials to smart home integration.</description>
      <pubDate>${new Date(2024, 0, 10).toUTCString()}</pubDate>
      <guid>${siteUrl}/services/interior-decor#trends-2024</guid>
      <category>Interior Design</category>
      <category>Trends</category>
    </item>
    
    <item>
      <title>Essential Construction Package Now Available</title>
      <link>${siteUrl}/packages</link>
      <description>Our Essential package starting at ₹1,599/sq.ft offers quality construction with transparent pricing and no hidden costs.</description>
      <pubDate>${new Date(2024, 0, 5).toUTCString()}</pubDate>
      <guid>${siteUrl}/packages#essential</guid>
      <category>Packages</category>
      <category>Construction</category>
    </item>
  </channel>
</rss>`

  return new NextResponse(rssXML, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}