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
          <linearGradient id="desertGradientMono" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#8B7355", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#6B5B47", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="steelGradientMono" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#4A5568", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#2D3748", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        <g transform="translate(10, 15) scale(0.8)">
          {/* Desert dune curves */}
          <path d="M 5 50 Q 20 30, 35 35 T 65 25" 
                fill="none" 
                stroke="url(#desertGradientMono)" 
                strokeWidth="5" 
                strokeLinecap="round"/>
          
          {/* Second dune layer */}
          <path d="M 0 60 Q 25 40, 50 45 T 80 35" 
                fill="none" 
                stroke="url(#desertGradientMono)" 
                strokeWidth="4" 
                strokeLinecap="round"
                opacity="0.6"/>
          
          {/* Modern architectural element */}
          <g transform="translate(35, 15)">
            <rect x="0" y="0" width="6" height="40" fill="url(#steelGradientMono)" rx="1"/>
            <rect x="10" y="10" width="6" height="30" fill="url(#steelGradientMono)" rx="1"/>
            <rect x="-10" y="20" width="6" height="20" fill="url(#steelGradientMono)" rx="1"/>
            <rect x="-10" y="25" width="26" height="4" fill="#4A5568" rx="1"/>
          </g>
        </g>
      </svg>
    )
  }

  if (variant === 'stacked') {
    return (
      <svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="desertGradientStacked" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#8B7355", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#6B5B47", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="steelGradientStacked" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#4A5568", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#2D3748", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        <g transform="translate(10, 5) scale(0.6)">
          {/* Desert dune curves */}
          <path d="M 5 50 Q 20 30, 35 35 T 65 25" 
                fill="none" 
                stroke="url(#desertGradientStacked)" 
                strokeWidth="4" 
                strokeLinecap="round"/>
          
          {/* Second dune layer */}
          <path d="M 0 60 Q 25 40, 50 45 T 80 35" 
                fill="none" 
                stroke="url(#desertGradientStacked)" 
                strokeWidth="3" 
                strokeLinecap="round"
                opacity="0.6"/>
          
          {/* Modern architectural element */}
          <g transform="translate(35, 15)">
            <rect x="0" y="0" width="6" height="40" fill="url(#steelGradientStacked)" rx="1"/>
            <rect x="10" y="10" width="6" height="30" fill="url(#steelGradientStacked)" rx="1"/>
            <rect x="-10" y="20" width="6" height="20" fill="url(#steelGradientStacked)" rx="1"/>
            <rect x="-10" y="25" width="26" height="4" fill="#4A5568" rx="1"/>
          </g>
          
          {/* Foundation base */}
          <rect x="0" y="62" width="80" height="2" fill="#2D3748"/>
        </g>
        
        {/* Stacked text */}
        <text x="10" y="55" fontFamily="Montserrat, sans-serif" fontSize="16" fontWeight="700" fill="#2D3748">SAHARA</text>
        <text x="10" y="68" fontFamily="Open Sans, sans-serif" fontSize="8" fontWeight="400" fill="#718096" letterSpacing="4">DEVELOPERS</text>
      </svg>
    )
  }

  if (variant === 'dark') {
    return (
      <svg viewBox="0 0 240 70" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="desertGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#FFFFFF", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#F0F0F0", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="steelGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor:"#E2E8F0", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#CBD5E0", stopOpacity:1}} />
          </linearGradient>
        </defs>
        
        <g transform="translate(10, 10)">
          {/* Desert dune curves */}
          <path d="M 5 35 Q 15 20, 25 25 T 45 18" 
                fill="none" 
                stroke="url(#desertGradientDark)" 
                strokeWidth="3" 
                strokeLinecap="round"/>
          
          {/* Second dune layer */}
          <path d="M 0 42 Q 18 28, 35 32 T 55 25" 
                fill="none" 
                stroke="url(#desertGradientDark)" 
                strokeWidth="2" 
                strokeLinecap="round"
                opacity="0.6"/>
          
          {/* Modern architectural element */}
          <g transform="translate(25, 8)">
            <rect x="0" y="0" width="4" height="28" fill="url(#steelGradientDark)" rx="1"/>
            <rect x="7" y="7" width="4" height="21" fill="url(#steelGradientDark)" rx="1"/>
            <rect x="-7" y="14" width="4" height="14" fill="url(#steelGradientDark)" rx="1"/>
            <rect x="-7" y="18" width="18" height="3" fill="#E2E8F0" rx="1"/>
          </g>
          
          {/* Foundation base */}
          <rect x="0" y="44" width="55" height="1.5" fill="#CBD5E0"/>
        </g>
        
        {/* Text */}
        <g transform="translate(75, 10)">
          <text x="0" y="25" fontFamily="Montserrat, Helvetica Neue, sans-serif" fontSize="28" fontWeight="700" fill="#FFFFFF" letterSpacing="1">SAHARA</text>
          <text x="0" y="40" fontFamily="Open Sans, Arial, sans-serif" fontSize="10" fontWeight="400" fill="#E2E8F0" letterSpacing="8.5">DEVELOPERS</text>
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#8B7355", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#6B5B47", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="steelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{stopColor:"#4A5568", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#2D3748", stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      <g transform="translate(20, 15)">
        {/* Desert dune curves */}
        <path d="M 5 35 Q 15 20, 25 25 T 45 18" 
              fill="none" 
              stroke="url(#desertGradient)" 
              strokeWidth="3" 
              strokeLinecap="round"/>
        
        {/* Second dune layer */}
        <path d="M 0 42 Q 18 28, 35 32 T 55 25" 
              fill="none" 
              stroke="url(#desertGradient)" 
              strokeWidth="2" 
              strokeLinecap="round"
              opacity="0.6"/>
        
        {/* Modern architectural element - abstract beam/pillar */}
        <g transform="translate(25, 8)">
          <rect x="0" y="0" width="4" height="28" fill="url(#steelGradient)" rx="1"/>
          <rect x="7" y="7" width="4" height="21" fill="url(#steelGradient)" rx="1"/>
          <rect x="-7" y="14" width="4" height="14" fill="url(#steelGradient)" rx="1"/>
          
          {/* Connecting beam */}
          <rect x="-7" y="18" width="18" height="3" fill="#4A5568" rx="1"/>
        </g>
        
        {/* Foundation base */}
        <rect x="0" y="44" width="55" height="1.5" fill="#2D3748"/>
      </g>
      
      {/* Typography */}
      <g transform="translate(85, 15)">
        {/* SAHARA */}
        <text x="0" y="25" 
              fontFamily="Montserrat, Helvetica Neue, sans-serif" 
              fontSize="32" 
              fontWeight="700" 
              fill="#2D3748"
              letterSpacing="1">SAHARA</text>
        
        {/* DEVELOPERS - now spans the full width of SAHARA */}
        <text x="0" y="40" 
              fontFamily="Open Sans, Arial, sans-serif" 
              fontSize="10" 
              fontWeight="400" 
              fill="#718096"
              letterSpacing="8.5">DEVELOPERS</text>
      </g>
    </svg>
  )
}