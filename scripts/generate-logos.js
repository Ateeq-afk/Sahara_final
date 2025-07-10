const fs = require('fs');
const path = require('path');

// Logo Requirements for Sahara Developers
const logoRequirements = {
  // Favicon sizes
  favicons: [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon-192x192.png', size: 192 }
  ],
  
  // Apple Touch Icons
  apple: [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'apple-touch-icon-57x57.png', size: 57 },
    { name: 'apple-touch-icon-60x60.png', size: 60 },
    { name: 'apple-touch-icon-72x72.png', size: 72 },
    { name: 'apple-touch-icon-76x76.png', size: 76 },
    { name: 'apple-touch-icon-114x114.png', size: 114 },
    { name: 'apple-touch-icon-120x120.png', size: 120 },
    { name: 'apple-touch-icon-144x144.png', size: 144 },
    { name: 'apple-touch-icon-152x152.png', size: 152 },
    { name: 'apple-touch-icon-180x180.png', size: 180 }
  ],
  
  // Android Chrome Icons
  android: [
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-256x256.png', size: 256 },
    { name: 'android-chrome-384x384.png', size: 384 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ],
  
  // Microsoft Tile Icons
  microsoft: [
    { name: 'mstile-70x70.png', size: 70 },
    { name: 'mstile-150x150.png', size: 150 },
    { name: 'mstile-310x310.png', size: 310 },
    { name: 'mstile-310x150.png', width: 310, height: 150 }
  ],
  
  // Social Media / OpenGraph
  social: [
    { name: 'og-image.jpg', width: 1200, height: 630 },
    { name: 'twitter-card.jpg', width: 1200, height: 600 },
    { name: 'linkedin-banner.jpg', width: 1584, height: 396 },
    { name: 'facebook-cover.jpg', width: 820, height: 312 }
  ],
  
  // Logo Variations
  logos: [
    { name: 'logo-primary.svg', type: 'svg' },
    { name: 'logo-white.svg', type: 'svg' },
    { name: 'logo-black.svg', type: 'svg' },
    { name: 'logo-horizontal.svg', type: 'svg' },
    { name: 'logo-stacked.svg', type: 'svg' },
    { name: 'logo-monogram.svg', type: 'svg' },
    { name: 'logo-primary.png', size: 512 },
    { name: 'logo-white.png', size: 512 },
    { name: 'logo-black.png', size: 512 }
  ]
};

// Create base SVG logo
const createSaharaLogoSVG = (variant = 'primary') => {
  const colors = {
    primary: {
      gradient1: '#d4a574',
      gradient2: '#8b6914',
      gradient3: '#654321',
      text: '#2C1810'
    },
    white: {
      gradient1: '#ffffff',
      gradient2: '#f0f0f0',
      gradient3: '#e0e0e0',
      text: '#ffffff'
    },
    black: {
      gradient1: '#333333',
      gradient2: '#222222',
      gradient3: '#000000',
      text: '#000000'
    }
  };
  
  const color = colors[variant] || colors.primary;
  
  return `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color.gradient1};stop-opacity:1" />
      <stop offset="50%" style="stop-color:${color.gradient2};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color.gradient3};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="shadow" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.3" />
    </linearGradient>
  </defs>
  
  <!-- Background circle for app icons -->
  ${variant === 'primary' ? `<circle cx="256" cy="256" r="240" fill="#FFF8F0" opacity="0.5"/>` : ''}
  
  <!-- Main Logo Group -->
  <g transform="translate(256, 256)">
    <!-- Supporting hand -->
    <path d="M -80 40 
             C -80 20, -70 10, -50 10
             L -30 10
             C -20 10, -15 15, -15 25
             L -15 50
             L -5 50
             C 5 50, 10 45, 10 35
             L 10 20
             L 20 20
             C 30 20, 35 25, 35 35
             L 35 45
             L 45 45
             C 55 45, 60 50, 60 60
             L 60 70
             C 60 90, 50 100, 30 100
             L -50 100
             C -70 100, -80 90, -80 70
             Z"
          fill="url(#gradient1)"
          opacity="0.9"/>
    
    <!-- Building structure -->
    <g transform="translate(0, -80)">
      <!-- Main tower -->
      <rect x="-15" y="-40" width="30" height="80" fill="url(#gradient1)" rx="4"/>
      <!-- Windows -->
      ${[...Array(4)].map((_, i) => 
        `<rect x="-10" y="${-35 + i * 18}" width="20" height="12" fill="${variant === 'white' ? '#000' : '#FFF'}" opacity="0.3" rx="2"/>`
      ).join('')}
      <!-- Side buildings -->
      <rect x="-40" y="-20" width="20" height="60" fill="url(#gradient1)" opacity="0.8" rx="3"/>
      <rect x="20" y="-30" width="20" height="70" fill="url(#gradient1)" opacity="0.8" rx="3"/>
      <!-- Foundation -->
      <rect x="-50" y="40" width="100" height="10" fill="url(#gradient1)" opacity="0.6" rx="5"/>
    </g>
    
    <!-- Desert elements -->
    <g transform="translate(0, 80)">
      <!-- Dunes -->
      <path d="M -100 0 Q -50 -20, 0 -10 T 100 -20"
            fill="none"
            stroke="url(#gradient1)"
            stroke-width="4"
            stroke-linecap="round"
            opacity="0.5"/>
      <path d="M -80 10 Q -30 -10, 20 0 T 80 -10"
            fill="none"
            stroke="url(#gradient1)"
            stroke-width="3"
            stroke-linecap="round"
            opacity="0.3"/>
    </g>
  </g>
  
  <!-- Company name for full logo -->
  ${variant !== 'monogram' ? `
  <text x="256" y="420" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', Arial, sans-serif" 
        font-size="48" font-weight="700" text-anchor="middle" fill="${color.text}">
    SAHARA
  </text>
  <text x="256" y="460" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', Arial, sans-serif" 
        font-size="24" font-weight="400" text-anchor="middle" fill="${color.text}" opacity="0.8">
    DEVELOPERS
  </text>
  ` : ''}
</svg>`;
};

// Create monogram version
const createMonogramSVG = () => {
  return `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="monoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#d4a574;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#8b6914;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <circle cx="256" cy="256" r="240" fill="#FFF8F0"/>
  
  <g transform="translate(256, 256)">
    <!-- Stylized S -->
    <path d="M -80 -120
             Q -120 -120, -120 -80
             C -120 -40, -80 -20, -40 -20
             C 0 -20, 40 -40, 40 -80
             C 40 -120, 80 -140, 120 -140
             Q 160 -140, 160 -100
             C 160 -60, 120 -40, 80 -40
             C 40 -40, 0 -20, 0 20
             C 0 60, -40 80, -80 80
             C -120 80, -160 60, -160 20
             Q -160 0, -140 0"
          fill="none" 
          stroke="url(#monoGradient)" 
          stroke-width="32" 
          stroke-linecap="round"
          stroke-linejoin="round"/>
    
    <!-- Desert accent -->
    <circle cx="-60" cy="120" r="8" fill="#d4a574" opacity="0.6"/>
    <circle cx="-20" cy="130" r="6" fill="#8b6914" opacity="0.5"/>
    <circle cx="20" cy="125" r="7" fill="#654321" opacity="0.5"/>
    <circle cx="60" cy="115" r="5" fill="#d4a574" opacity="0.4"/>
  </g>
</svg>`;
};

// Create Safari pinned tab SVG (monochrome)
const createSafariPinnedTabSVG = () => {
  return `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
  <g transform="translate(0,700) scale(0.1,-0.1)" fill="#000000" stroke="none">
    <path d="M3280 6009 c-25 -4 -70 -10 -100 -14 -282 -33 -609 -165 -865 -349 -338 -243 -590 -593 -704 -976 -23 -75 -47 -186 -56 -255 -22 -165 -14 -420 19 -580 84 -417 317 -792 656 -1057 103 -80 293 -191 415 -241 223 -92 423 -137 660 -148 520 -25 1017 173 1395 554 89 90 122 130 190 232 184 277 285 571 310 900 31 404 -85 818 -320 1145 -81 112 -257 293 -370 379 -243 186 -522 311 -810 365 -136 25 -329 36 -420 24z"/>
  </g>
</svg>`;
};

// Create browserconfig.xml for Microsoft tiles
const createBrowserConfig = () => {
  return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <wide310x150logo src="/mstile-310x150.png"/>
      <TileColor>#8B7355</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
};

// Update site.webmanifest
const updateWebManifest = () => {
  return `{
  "name": "Sahara Developers",
  "short_name": "Sahara",
  "description": "Premier Construction & Interior Design Company in Bangalore",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#8B7355",
  "background_color": "#FFF8F0",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "scope": "/"
}`;
};

// Main execution
console.log('🎨 Sahara Developers - Logo Generation Requirements\n');
console.log('This script outlines all the logo files needed for the project.\n');

console.log('📁 Required Logo Files:\n');

console.log('1. Favicons:');
logoRequirements.favicons.forEach(icon => {
  console.log(`   - ${icon.name} (${icon.size}x${icon.size}px)`);
});

console.log('\n2. Apple Touch Icons:');
logoRequirements.apple.forEach(icon => {
  console.log(`   - ${icon.name} (${icon.size}x${icon.size}px)`);
});

console.log('\n3. Android Chrome Icons:');
logoRequirements.android.forEach(icon => {
  console.log(`   - ${icon.name} (${icon.size}x${icon.size}px)`);
});

console.log('\n4. Microsoft Tile Icons:');
logoRequirements.microsoft.forEach(icon => {
  const size = icon.width ? `${icon.width}x${icon.height}` : `${icon.size}x${icon.size}`;
  console.log(`   - ${icon.name} (${size}px)`);
});

console.log('\n5. Social Media Images:');
logoRequirements.social.forEach(img => {
  console.log(`   - ${img.name} (${img.width}x${img.height}px)`);
});

console.log('\n6. Logo Variations:');
logoRequirements.logos.forEach(logo => {
  const size = logo.size ? `(${logo.size}x${logo.size}px)` : '(SVG)';
  console.log(`   - ${logo.name} ${size}`);
});

// Save sample SVG files
const publicDir = path.join(__dirname, '..', 'public');

// Create sample logo SVG
fs.writeFileSync(
  path.join(publicDir, 'logo-primary.svg'),
  createSaharaLogoSVG('primary')
);

// Create monogram SVG
fs.writeFileSync(
  path.join(publicDir, 'logo-monogram.svg'),
  createMonogramSVG()
);

// Create Safari pinned tab
fs.writeFileSync(
  path.join(publicDir, 'safari-pinned-tab.svg'),
  createSafariPinnedTabSVG()
);

// Create browserconfig.xml
fs.writeFileSync(
  path.join(publicDir, 'browserconfig.xml'),
  createBrowserConfig()
);

// Update site.webmanifest
fs.writeFileSync(
  path.join(publicDir, 'site.webmanifest'),
  updateWebManifest()
);

console.log('\n✅ Created sample files:');
console.log('   - logo-primary.svg');
console.log('   - logo-monogram.svg');
console.log('   - safari-pinned-tab.svg');
console.log('   - browserconfig.xml');
console.log('   - site.webmanifest (updated)');

console.log('\n📝 Next Steps:');
console.log('1. Use a tool like https://realfavicongenerator.net to generate all icon sizes');
console.log('2. Create OpenGraph images using the provided HTML template');
console.log('3. Export logo variations from the React component');
console.log('4. Ensure all files are optimized for web use');

console.log('\n🎯 Logo Design Guidelines:');
console.log('- Primary Colors: #d4a574 (sand), #8b6914 (golden brown), #654321 (dark brown)');
console.log('- Typography: SF Pro Display for headings, SF Pro Text for body');
console.log('- Maintain the hand + building symbolism representing "support"');
console.log('- Keep designs clean and scalable for all sizes');