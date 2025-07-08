"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin, Copy, Check, ArrowRight, Bookmark, User, Eye, Heart, MessageCircle } from 'lucide-react'
import { useParams } from 'next/navigation'

// This would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    slug: 'whitefield-real-estate-boom-2024',
    title: 'Whitefield: Why It\'s Bangalore\'s Hottest Real Estate Market in 2024',
    excerpt: 'Explore why Whitefield continues to attract homebuyers and investors with its IT corridor proximity, infrastructure development, and premium lifestyle offerings.',
    content: `
      <p class="lead">Whitefield has emerged as one of Bangalore's most sought-after residential destinations, commanding premium prices and attracting discerning homebuyers from across the globe. In 2024, this IT corridor continues to redefine luxury living in the Garden City.</p>

      <h2>The IT Advantage</h2>
      <p>Home to tech giants like <strong>Intel</strong>, <strong>SAP</strong>, <strong>Cisco</strong>, and numerous multinational corporations, Whitefield offers unparalleled proximity to employment hubs. The International Tech Park Bangalore (ITPB) alone houses over 100 companies, creating a massive demand for quality residential options.</p>

      <blockquote>
        "Whitefield is not just about proximity to work; it's about a lifestyle that balances professional success with personal well-being."
      </blockquote>

      <h2>Infrastructure Revolution</h2>
      
      <h3>1. Connectivity</h3>
      <p>The upcoming <strong>Metro Phase 3</strong> extension to Whitefield will revolutionize connectivity, reducing travel time to other parts of Bangalore. The existing BMTC Volvo services and proximity to Kempegowda International Airport make it a connectivity hub.</p>

      <h3>2. World-Class Amenities</h3>
      <p>From <strong>Phoenix MarketCity</strong> to <strong>VR Bengaluru</strong>, Whitefield boasts some of the finest shopping and entertainment destinations. The area also features top-rated hospitals like Columbia Asia and quality educational institutions.</p>

      <h3>3. Premium Residential Projects</h3>
      <p>Luxury villa projects and high-end apartment complexes from renowned developers are reshaping Whitefield's skyline. Gated communities with world-class amenities are becoming the norm rather than the exception.</p>

      <h2>Investment Perspective</h2>
      <p>Property appreciation in Whitefield has consistently outpaced other Bangalore localities. With land prices ranging from <strong>₹8,000 to ₹15,000</strong> per square foot, the area offers excellent potential for long-term wealth creation.</p>

      <h2>Why Choose Whitefield for Your Next Home?</h2>
      <ul class="space-y-4">
        <li><strong>Proven track record</strong> of property appreciation</li>
        <li><strong>Proximity</strong> to major IT companies</li>
        <li><strong>Excellent</strong> social infrastructure</li>
        <li><strong>Upcoming</strong> metro connectivity</li>
        <li><strong>International standard</strong> living environment</li>
      </ul>

      <p>At Sahara Developers, we've completed numerous projects in Whitefield, understanding the unique requirements of this discerning market. Our expertise in luxury construction makes us the preferred choice for homebuyers seeking premium homes in this prime location.</p>
    `,
    author: 'Priya Nair',
    authorImage: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    authorBio: 'Interior Design Director at Sahara Developers',
    date: '2024-01-18',
    readTime: '8 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=2400&q=90',
    tags: ['Whitefield', 'Real Estate', 'Investment', 'IT Corridor'],
    views: '2.1k',
    likes: 47
  },
  {
    id: 2,
    slug: 'electronic-city-construction-guide',
    title: 'Building Your Dream Home in Electronic City: Complete Guide',
    excerpt: 'Everything you need to know about construction in Electronic City - from BBMP approvals to choosing the right contractors for this tech hub.',
    content: `
      <p class="lead">Electronic City stands as Bangalore's pioneering IT hub, housing tech giants like Infosys, Wipro, and TCS. Building your dream home in this prestigious location requires careful planning and expert guidance. Here's your comprehensive guide to construction in Electronic City.</p>

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
    author: 'Rajesh Kumar',
    authorImage: 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg',
    authorBio: 'Chief Project Manager at Sahara Developers',
    date: '2024-01-16',
    readTime: '10 min read',
    category: 'Construction',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=90',
    tags: ['Electronic City', 'Construction Guide', 'BBMP', 'Tech Hub'],
    views: '1.8k',
    likes: 35
  },
  {
    id: 3,
    slug: 'bangalore-north-emerging-localities',
    title: 'North Bangalore\'s Rising Stars: Hebbal, Yelahanka & Devanahalli',
    excerpt: 'Discover why North Bangalore is becoming the preferred choice for new homeowners with upcoming metro connectivity and proximity to the airport.',
    content: `
      <p class="lead">North Bangalore is experiencing an unprecedented transformation, emerging as the new frontier for real estate investment and residential development. Areas like Hebbal, Yelahanka, and Devanahalli are witnessing remarkable growth, driven by infrastructure development and strategic location advantages.</p>

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
    author: 'Mohammed Ali',
    authorImage: 'https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg',
    authorBio: 'Head of Engineering at Sahara Developers',
    date: '2024-01-14',
    readTime: '9 min read',
    category: 'Bangalore Areas',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=2400&q=90',
    tags: ['North Bangalore', 'Hebbal', 'Yelahanka', 'Devanahalli', 'Investment'],
    views: '3.2k',
    likes: 62
  }
]

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  
  const post = blogPosts.find(p => p.slug === slug)
  
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const heroY = useTransform(scrollY, [0, 500], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const contentY = useTransform(scrollY, [300, 600], [50, 0])
  
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
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Article not found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0A5C36] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#0A5C36] z-50 origin-left"
        style={{ scaleX: progress / 100 }}
      />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center text-white max-w-5xl mx-auto px-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors font-light"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-6 text-white/90 text-base mb-10"
          >
            <span className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {post.views} views
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-8 max-w-4xl mx-auto"
          >
            {post.title}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium text-white">{post.author}</p>
                <p className="text-sm text-white/70">{post.authorBio}</p>
              </div>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-left">
              <p className="text-sm text-white/70">Published</p>
              <p className="font-medium text-white">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Article Content */}
      <motion.section 
        className="py-24 bg-gradient-to-b from-white to-gray-50/30"
        style={{ y: contentY }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,320px] gap-20">
            {/* Main Content */}
            <motion.article
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-xl max-w-none
                prose-headings:font-light prose-headings:tracking-tight prose-headings:text-gray-900
                prose-h1:text-5xl prose-h1:mb-12 prose-h1:leading-tight
                prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-10 prose-h2:text-gray-900 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-4
                prose-h3:text-2xl prose-h3:mt-16 prose-h3:mb-8 prose-h3:text-gray-800 prose-h3:font-medium
                prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-lg
                prose-lead:text-2xl prose-lead:text-gray-800 prose-lead:leading-[1.6] prose-lead:mb-12 prose-lead:font-light
                prose-blockquote:border-l-[6px] prose-blockquote:border-[#0A5C36] prose-blockquote:pl-10 prose-blockquote:py-6 prose-blockquote:pr-8
                prose-blockquote:bg-gradient-to-r prose-blockquote:from-gray-50 prose-blockquote:to-transparent prose-blockquote:my-12 prose-blockquote:rounded-r-2xl
                prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:text-2xl prose-blockquote:font-light prose-blockquote:leading-relaxed
                prose-a:text-[#0A5C36] prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                prose-ul:my-8 prose-ul:space-y-3 prose-li:text-gray-700 prose-li:text-lg prose-li:leading-relaxed
                prose-li:pl-2 prose-li:marker:text-[#0A5C36]
                prose-strong:text-gray-900 prose-strong:font-semibold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Sticky Sidebar */}
            <aside className="lg:sticky lg:top-32 h-fit space-y-6">
              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author}</h3>
                    <p className="text-sm text-gray-600">{post.authorBio}</p>
                  </div>
                </div>
              </motion.div>

              {/* Engagement Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      liked 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">{post.likes + (liked ? 1 : 0)}</span>
                  </button>
                  
                  <button
                    onClick={() => setBookmarked(!bookmarked)}
                    className={`p-2 rounded-full transition-all ${
                      bookmarked 
                        ? 'bg-[#0A5C36]/10 text-[#0A5C36]' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <h4 className="font-medium mb-3">Share this article</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="flex-1 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="flex-1 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('linkedin')}
                    className="flex-1 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="flex-1 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
              
              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <h4 className="font-medium mb-3">Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100 transition-colors cursor-pointer"
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
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-[#0A5C36] to-[#084a2e] text-white rounded-3xl p-8 shadow-xl"
              >
                <h4 className="font-medium mb-2">Ready to Start Building?</h4>
                <p className="text-sm text-white/80 mb-4">
                  Get a personalized consultation for your construction project.
                </p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-white text-[#0A5C36] px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </aside>
          </div>
        </div>
      </motion.section>

      {/* Related Articles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4">Continue Reading</h2>
            <p className="text-gray-600 text-lg">More insights on construction and real estate</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.slug !== post.slug)
              .slice(0, 3)
              .map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                            {relatedPost.category}
                          </span>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                        <h3 className="text-xl font-light mb-2 group-hover:text-[#0A5C36] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={relatedPost.authorImage}
                              alt={relatedPost.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{relatedPost.author}</p>
                            <p className="text-gray-500">
                              {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-[#0A5C36] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-light mb-4">
              Stay Updated with Construction Insights
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get the latest articles on construction trends, market insights, and project tips delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="bg-white text-[#0A5C36] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  )
}