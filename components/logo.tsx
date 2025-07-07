"use client"

interface LogoProps {
  variant?: 'default' | 'monogram' | 'dark' | 'stacked'
  className?: string
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  if (variant === 'monogram') {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#d4a574", stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:"#8b6914", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#654321", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="monoShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#000000", stopOpacity:0.2}} />
            <stop offset="100%" style={{stopColor:"#000000", stopOpacity:0.4}} />
          </linearGradient>
        </defs>
        
        {/* Unique S monogram combining desert dune and architectural beam */}
        <g transform="translate(40, 40)">
          {/* Desert dune flowing into S shape */}
          <path d="M -20 -25
                   Q -25 -20, -25 -10
                   C -25 0, -20 5, -10 5
                   C 0 5, 5 0, 5 -10
                   C 5 -20, 10 -25, 20 -25
                   Q 25 -25, 25 -15
                   C 25 -5, 20 0, 10 0
                   C 0 0, -5 5, -5 15
                   C -5 25, -10 30, -20 30
                   Q -25 30, -25 25"
                fill="none" 
                stroke="url(#monoGradient)" 
                strokeWidth="6" 
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(-15)"
                opacity="0.9"/>
          
          {/* Architectural accent - vertical beam through S */}
          <rect x="-2" y="-30" width="4" height="60" fill="url(#monoGradient)" opacity="0.3" rx="2"/>
          
          {/* Desert sand particles */}
          {[...Array(5)].map((_, i) => (
            <circle 
              key={i}
              cx={-15 + i * 8}
              cy={20 + (i % 2) * 5}
              r="1.5"
              fill="url(#monoGradient)"
              opacity={0.4 + (i * 0.1)}
            />
          ))}
        </g>
      </svg>
    )
  }

  if (variant === 'stacked') {
    return (
      <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="stackedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#8b6914", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#654321", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="stackedAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:"#d4a574", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#daa520", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        {/* Unique architectural desert fusion icon */}
        <g transform="translate(60, 35)">
          {/* Desert dunes */}
          <path d="M -30 10 Q -15 -5, 0 0 T 30 -5"
                fill="none"
                stroke="url(#stackedGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"/>
          <path d="M -25 15 Q -10 5, 5 8 T 25 5"
                fill="none"
                stroke="url(#stackedGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"/>
          
          {/* Modern architectural elements rising from dunes */}
          <g transform="translate(0, -10)">
            {/* Central tower */}
            <rect x="-2" y="-15" width="4" height="30" fill="url(#stackedAccent)" rx="2"/>
            {/* Supporting structures */}
            <rect x="-12" y="-10" width="3" height="20" fill="url(#stackedGradient)" rx="1.5" opacity="0.8"/>
            <rect x="9" y="-12" width="3" height="24" fill="url(#stackedGradient)" rx="1.5" opacity="0.8"/>
            {/* Connecting beam */}
            <rect x="-12" y="0" width="24" height="2" fill="url(#stackedAccent)" rx="1" opacity="0.6"/>
          </g>
        </g>
        
        {/* Typography */}
        <text x="60" y="70" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontSize="16" fontWeight="600" fill="#1a1a1a" textAnchor="middle" className="text-[14px] sm:text-[16px]">SAHARA</text>
        <text x="60" y="85" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" fontSize="9" fontWeight="400" fill="#6a6a6a" textAnchor="middle" letterSpacing="2.5" className="text-[8px] sm:text-[9px]">DEVELOPERS</text>
      </svg>
    )
  }

  if (variant === 'dark') {
    return (
      <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#f5f5f7", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#d1d1d6", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="darkAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor:"#ffd700", stopOpacity:0.9}} />
            <stop offset="100%" style={{stopColor:"#ffed4b", stopOpacity:0.9}} />
          </linearGradient>
        </defs>
        
        <g transform="translate(20, 40)">
          {/* Unique icon combining desert sunset and modern architecture */}
          <g transform="scale(1.2)">
            {/* Desert sun/moon */}
            <circle cx="0" cy="-5" r="8" fill="url(#darkAccent)" opacity="0.3"/>
            
            {/* Desert dune silhouette */}
            <path d="M -20 10 Q -5 -2, 10 2 T 30 -3"
                  fill="none"
                  stroke="url(#darkGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"/>
            
            {/* Architectural elements emerging from desert */}
            <g transform="translate(5, -5)">
              <rect x="-2" y="-10" width="3" height="20" fill="url(#darkGradient)" rx="1.5"/>
              <rect x="4" y="-8" width="3" height="18" fill="url(#darkGradient)" rx="1.5" opacity="0.85"/>
              <rect x="-8" y="-6" width="3" height="16" fill="url(#darkGradient)" rx="1.5" opacity="0.85"/>
              <rect x="10" y="-10" width="3" height="20" fill="url(#darkGradient)" rx="1.5"/>
            </g>
          </g>
        </g>
        
        {/* Sophisticated typography */}
        <g transform="translate(90, 40)">
          <text x="0" y="5" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
                fontSize="32" 
                fontWeight="500" 
                fill="#f5f5f7"
                letterSpacing="-1"
                className="text-[26px] sm:text-[32px]">Sahara</text>
          
          <text x="105" y="5" 
                fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
                fontSize="32" 
                fontWeight="200" 
                fill="#d1d1d6"
                letterSpacing="-1"
                className="text-[26px] sm:text-[32px]">Developers</text>
        </g>
      </svg>
    )
  }

  // Default variant - Unique design-inspired logo
  return (
    <svg viewBox="0 0 320 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#8b6914", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#654321", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#4a3c28", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="defaultAccent" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:"#d4a574", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#daa520", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="defaultSun" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#ffd700", stopOpacity:0.6}} />
          <stop offset="100%" style={{stopColor:"#ffa500", stopOpacity:0.3}} />
        </linearGradient>
      </defs>
      
      <g transform="translate(25, 40)">
        {/* Unique design: Desert landscape with modern architecture */}
        <g transform="scale(1.3)">
          {/* Desert sun in background */}
          <circle cx="5" cy="-8" r="10" fill="url(#defaultSun)"/>
          
          {/* Flowing desert dunes */}
          <path d="M -25 12 Q -10 0, 5 5 T 30 0"
                fill="none"
                stroke="url(#defaultGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.8"/>
          <path d="M -20 16 Q -5 8, 10 10 T 25 6"
                fill="none"
                stroke="url(#defaultGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"/>
          
          {/* Modern architectural skyline rising from desert */}
          <g transform="translate(5, -3)">
            {/* Main tower with golden accent */}
            <rect x="-2" y="-15" width="4" height="25" fill="url(#defaultAccent)" rx="2"/>
            {/* Supporting structures creating rhythm */}
            <rect x="-10" y="-10" width="3" height="20" fill="url(#defaultGradient)" rx="1.5" opacity="0.9"/>
            <rect x="7" y="-12" width="3" height="22" fill="url(#defaultGradient)" rx="1.5" opacity="0.9"/>
            <rect x="-16" y="-8" width="3" height="18" fill="url(#defaultGradient)" rx="1.5" opacity="0.7"/>
            <rect x="13" y="-9" width="3" height="19" fill="url(#defaultGradient)" rx="1.5" opacity="0.7"/>
            
            {/* Horizontal elements connecting structures */}
            <rect x="-16" y="2" width="32" height="1.5" fill="url(#defaultAccent)" rx="0.75" opacity="0.5"/>
            <rect x="-10" y="-4" width="20" height="1" fill="url(#defaultGradient)" rx="0.5" opacity="0.4"/>
          </g>
          
          {/* Desert details */}
          <circle cx="-15" cy="14" r="1" fill="url(#defaultGradient)" opacity="0.4"/>
          <circle cx="20" cy="12" r="0.8" fill="url(#defaultGradient)" opacity="0.3"/>
          <circle cx="-5" cy="16" r="1.2" fill="url(#defaultGradient)" opacity="0.35"/>
        </g>
      </g>
      
      {/* Elegant typography with weight contrast */}
      <g transform="translate(100, 40)">
        <text x="0" y="5" 
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
              fontSize="34" 
              fontWeight="600" 
              fill="#1a1a1a"
              letterSpacing="-1.5"
              className="text-[28px] sm:text-[34px]">Sahara</text>
        
        <text x="105" y="5" 
              fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" 
              fontSize="34" 
              fontWeight="300" 
              fill="#4a4a4a"
              letterSpacing="-1.5"
              className="text-[28px] sm:text-[34px]">Developers</text>
      </g>
    </svg>
  )
}