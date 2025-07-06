"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Twitter, Facebook, Linkedin, Copy, Check, ArrowRight } from 'lucide-react'
import { useParams } from 'next/navigation'

// This would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    slug: 'whitefield-real-estate-boom-2024',
    title: 'Whitefield: Why It\'s Bangalore\'s Hottest Real Estate Market in 2024',
    excerpt: 'Explore why Whitefield continues to attract homebuyers and investors with its IT corridor proximity, infrastructure development, and premium lifestyle offerings.',
    content: `
      <p>Whitefield has emerged as one of Bangalore's most sought-after residential destinations, commanding premium prices and attracting discerning homebuyers from across the globe. In 2024, this IT corridor continues to redefine luxury living in the Garden City.</p>

      <h2>The IT Advantage</h2>
      <p>Home to tech giants like Intel, SAP, Cisco, and numerous multinational corporations, Whitefield offers unparalleled proximity to employment hubs. The International Tech Park Bangalore (ITPB) alone houses over 100 companies, creating a massive demand for quality residential options.</p>

      <blockquote>
        "Whitefield is not just about proximity to work; it's about a lifestyle that balances professional success with personal well-being."
      </blockquote>

      <h2>Infrastructure Revolution</h2>
      <h3>1. Connectivity</h3>
      <p>The upcoming Metro Phase 3 extension to Whitefield will revolutionize connectivity, reducing travel time to other parts of Bangalore. The existing BMTC Volvo services and proximity to Kempegowda International Airport make it a connectivity hub.</p>

      <h3>2. World-Class Amenities</h3>
      <p>From Phoenix MarketCity to VR Bengaluru, Whitefield boasts some of the finest shopping and entertainment destinations. The area also features top-rated hospitals like Columbia Asia and quality educational institutions.</p>

      <h3>3. Premium Residential Projects</h3>
      <p>Luxury villa projects and high-end apartment complexes from renowned developers are reshaping Whitefield's skyline. Gated communities with world-class amenities are becoming the norm rather than the exception.</p>

      <h2>Investment Perspective</h2>
      <p>Property appreciation in Whitefield has consistently outpaced other Bangalore localities. With land prices ranging from ₹8,000 to ₹15,000 per square foot, the area offers excellent potential for long-term wealth creation.</p>

      <h2>Why Choose Whitefield for Your Next Home?</h2>
      <ul>
        <li>Proven track record of property appreciation</li>
        <li>Proximity to major IT companies</li>
        <li>Excellent social infrastructure</li>
        <li>Upcoming metro connectivity</li>
        <li>International standard living environment</li>
      </ul>

      <p>At Sahara Developers, we've completed numerous projects in Whitefield, understanding the unique requirements of this discerning market. Our expertise in luxury construction makes us the preferred choice for homebuyers seeking premium homes in this prime location.</p>
    `,
    author: 'Market Research Team',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90',
    date: '2024-01-18',
    readTime: '8 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=2400&q=90',
    tags: ['Whitefield', 'Real Estate', 'Investment', 'IT Corridor']
  },
  {
    id: 2,
    slug: 'electronic-city-construction-guide',
    title: 'Building Your Dream Home in Electronic City: Complete Guide',
    excerpt: 'Everything you need to know about construction in Electronic City - from BBMP approvals to choosing the right contractors for this tech hub.',
    content: `
      <p>Electronic City stands as Bangalore's pioneering IT hub, housing tech giants like Infosys, Wipro, and TCS. Building your dream home in this prestigious location requires careful planning and expert guidance. Here's your comprehensive guide to construction in Electronic City.</p>

      <h2>Understanding Electronic City</h2>
      <p>Divided into Phase 1 and Phase 2, Electronic City offers distinct advantages. Phase 1 is more established with better connectivity, while Phase 2 offers newer infrastructure and more spacious plots.</p>

      <h2>BBMP Approval Process</h2>
      <h3>1. Plan Approval</h3>
      <p>Electronic City falls under BBMP's jurisdiction. The approval process typically takes 45-60 days for residential projects. Key documents required include:</p>
      <ul>
        <li>Survey Settlement Record</li>
        <li>Khata Certificate</li>
        <li>Approved layout plan</li>
        <li>Building plan with structural drawings</li>
      </ul>

      <h3>2. Setback Requirements</h3>
      <p>Electronic City follows specific setback norms:</p>
      <ul>
        <li>Front: 6 meters for plots above 2400 sq ft</li>
        <li>Sides: 3 meters each</li>
        <li>Rear: 3 meters</li>
      </ul>

      <h2>Construction Considerations</h2>
      <h3>Soil Conditions</h3>
      <p>Electronic City has mixed soil conditions. Red soil is predominant, requiring proper foundation design. Soil testing is mandatory before construction begins.</p>

      <h3>Water Table</h3>
      <p>Groundwater levels vary between 80-120 feet. Rainwater harvesting is mandatory for plots above 30x40 feet.</p>

      <h3>Power Infrastructure</h3>
      <p>BESCOM provides reliable power supply. However, installing backup generators is recommended for uninterrupted power supply.</p>

      <h2>Cost Considerations</h2>
      <p>Construction costs in Electronic City:</p>
      <ul>
        <li>Basic construction: ₹1,800-2,200 per sq ft</li>
        <li>Premium construction: ₹2,500-3,500 per sq ft</li>
        <li>Luxury construction: ₹4,000+ per sq ft</li>
      </ul>

      <h2>Choosing the Right Contractor</h2>
      <p>Select contractors with experience in Electronic City. Local knowledge of BBMP procedures and soil conditions is crucial. Sahara Developers has successfully completed 50+ projects in Electronic City, making us the trusted choice for discerning homeowners.</p>

      <blockquote>
        "Building in Electronic City is not just about construction; it's about creating a home that complements the tech-forward lifestyle of the area."
      </blockquote>

      <h2>Timeline Expectations</h2>
      <p>Typical construction timeline for a 3000 sq ft home:</p>
      <ul>
        <li>Approvals: 2-3 months</li>
        <li>Foundation to slab: 4-5 months</li>
        <li>Finishing work: 6-8 months</li>
        <li>Total: 12-16 months</li>
      </ul>

      <p>Ready to build your dream home in Electronic City? Contact Sahara Developers for expert guidance and transparent pricing.</p>
    `,
    author: 'Sahara Team',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=90',
    date: '2024-01-16',
    readTime: '10 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=90',
    tags: ['Electronic City', 'Construction Guide', 'BBMP', 'Tech Hub']
  },
  {
    id: 3,
    slug: 'bangalore-north-emerging-localities',
    title: 'North Bangalore\'s Rising Stars: Hebbal, Yelahanka & Devanahalli',
    excerpt: 'Discover why North Bangalore is becoming the preferred choice for new homeowners with upcoming metro connectivity and proximity to the airport.',
    content: `
      <p>North Bangalore is experiencing an unprecedented transformation, emerging as the new frontier for real estate investment and residential development. Areas like Hebbal, Yelahanka, and Devanahalli are witnessing remarkable growth, driven by infrastructure development and strategic location advantages.</p>

      <h2>The Infrastructure Catalyst</h2>
      <h3>Airport Connectivity</h3>
      <p>The proximity to Kempegowda International Airport makes North Bangalore highly attractive for frequent travelers and international professionals. The upcoming satellite town near the airport will further boost property values.</p>

      <h3>Metro Phase 3</h3>
      <p>The planned metro extension to Hebbal and eventually to the airport will revolutionize connectivity, making these areas as accessible as any other part of Bangalore.</p>

      <h2>Locality-Wise Analysis</h2>
      
      <h3>Hebbal</h3>
      <p>Once considered the outskirts, Hebbal now hosts premium residential projects and commercial developments. Key advantages:</p>
      <ul>
        <li>Excellent connectivity to major IT hubs</li>
        <li>Proximity to Manyata Tech Park</li>
        <li>Hebbal Lake and green surroundings</li>
        <li>Upcoming metro station</li>
      </ul>
      <p><strong>Land prices:</strong> ₹4,000-8,000 per sq ft</p>

      <h3>Yelahanka</h3>
      <p>Home to the Indian Air Force base and numerous aerospace companies, Yelahanka offers a unique blend of military precision and modern development:</p>
      <ul>
        <li>Well-planned residential layouts</li>
        <li>Excellent educational institutions</li>
        <li>Good hospital facilities</li>
        <li>Growing IT presence</li>
      </ul>
      <p><strong>Land prices:</strong> ₹3,500-6,500 per sq ft</p>

      <h3>Devanahalli</h3>
      <p>The airport town is undergoing massive development with several luxury projects and commercial establishments:</p>
      <ul>
        <li>Direct airport connectivity</li>
        <li>Planned satellite town development</li>
        <li>International schools and hospitals</li>
        <li>Investment by major developers</li>
      </ul>
      <p><strong>Land prices:</strong> ₹2,500-5,000 per sq ft</p>

      <blockquote>
        "North Bangalore represents the future of the city - strategic location, planned development, and immense growth potential."
      </blockquote>

      <h2>Investment Opportunities</h2>
      <p>Current market conditions make North Bangalore highly attractive for investors:</p>
      <ul>
        <li>Lower entry costs compared to South and East Bangalore</li>
        <li>High appreciation potential</li>
        <li>Government focus on infrastructure development</li>
        <li>Growing employment opportunities</li>
      </ul>

      <h2>Construction Considerations</h2>
      <p>Building in North Bangalore offers several advantages:</p>
      <ul>
        <li>Better availability of construction materials</li>
        <li>Lower labor costs</li>
        <li>Faster approvals due to lesser congestion</li>
        <li>More spacious plots available</li>
      </ul>

      <h2>Future Outlook</h2>
      <p>With the proposed North Bangalore Business District and continued infrastructure investment, these areas are poised for significant growth over the next decade.</p>

      <p>Considering a home in North Bangalore? Sahara Developers has extensive experience in these emerging localities, helping you make informed decisions for your dream home.</p>
    `,
    author: 'Location Experts',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=90',
    date: '2024-01-14',
    readTime: '9 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=2400&q=90',
    tags: ['North Bangalore', 'Hebbal', 'Yelahanka', 'Devanahalli', 'Investment']
  },
  {
    id: 4,
    slug: 'sarjapur-road-construction-trends',
    title: 'Sarjapur Road: Construction Trends & Investment Opportunities',
    excerpt: 'Analysis of why Sarjapur Road has become Bangalore\'s premium residential corridor with insights on construction costs and ROI.',
    content: `<p>Sarjapur Road has emerged as Bangalore's most prestigious residential corridor, attracting premium developers and discerning homebuyers.</p>`,
    author: 'Investment Team',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=90',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&q=90',
    tags: ['Sarjapur Road', 'Investment', 'Construction Trends', 'Premium Homes']
  }
]

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const post = blogPosts.find(p => p.slug === slug)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1])
  
  // Reading progress
  useEffect(() => {
    const updateProgress = () => {
      if (contentRef.current) {
        const { top, height } = contentRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const scrollProgress = Math.max(0, Math.min(1, -top / (height - windowHeight)))
        setProgress(scrollProgress * 100)
      }
    }
    
    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])
  
  const handleShare = async (platform: string) => {
    const url = window.location.href
    const text = post?.title || ''
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Post not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-600 to-amber-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero Section */}
      <motion.section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
        
        <div className="relative container mx-auto px-8 pb-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {post.category}
              </span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="text-white">
                  <p className="font-medium">{post.author}</p>
                  <p className="text-sm text-white/60">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr,300px] gap-12">
              {/* Main Content */}
              <motion.article
                ref={contentRef}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-amber-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Sidebar */}
              <aside className="lg:sticky lg:top-32 h-fit space-y-8">
                {/* Share */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>
                
                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
                
                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6"
                >
                  <h3 className="font-semibold mb-2">Ready to build?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get a personalized quote for your project today.
                  </p>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 text-amber-700 font-medium hover:text-amber-800 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-semibold mb-12">More to explore</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).filter(p => p.slug !== post.slug).map((relatedPost, index) => (
              <motion.article
                key={relatedPost.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${relatedPost.slug}`}>
                  <div className="group">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{relatedPost.readTime}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}