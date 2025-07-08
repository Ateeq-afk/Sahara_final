const fs = require('fs');
const path = require('path');

// Material placeholder configurations
const materialConfigs = {
  // Flooring
  'vitrified-tiles-premium': { color: '#E5E7EB', pattern: 'tiles', label: 'Vitrified Tiles' },
  'marble-carrara': { color: '#F3F4F6', pattern: 'marble', label: 'Carrara Marble' },
  'wooden-oak': { color: '#92400E', pattern: 'wood', label: 'Oak Wood' },
  'granite-galaxy': { color: '#1F2937', pattern: 'granite', label: 'Black Galaxy' },
  'porcelain-large': { color: '#D1D5DB', pattern: 'tiles', label: 'Porcelain' },
  'vinyl-plank': { color: '#7C2D12', pattern: 'wood', label: 'Vinyl Plank' },
  
  // Wall
  'paint-weather': { color: '#DBEAFE', pattern: 'solid', label: 'Weather Shield' },
  'wallpaper-3d': { color: '#DDD6FE', pattern: 'geometric', label: '3D Wallpaper' },
  'texture-metallic': { color: '#F3F4F6', pattern: 'texture', label: 'Metallic Texture' },
  'stone-veneer': { color: '#A78BFA', pattern: 'stone', label: 'Stone Veneer' },
  'wood-panels': { color: '#92400E', pattern: 'panels', label: 'Wood Panels' },
  'brick-tiles': { color: '#DC2626', pattern: 'brick', label: 'Brick Tiles' },
  
  // Bathroom
  'smart-toilet': { color: '#F9FAFB', pattern: 'solid', label: 'Smart Toilet' },
  'sensor-faucets': { color: '#E5E7EB', pattern: 'solid', label: 'Sensor Faucets' },
  'rain-shower': { color: '#D1D5DB', pattern: 'solid', label: 'Rain Shower' },
  'mosaic-tiles': { color: '#60A5FA', pattern: 'mosaic', label: 'Glass Mosaic' },
  'floating-vanity': { color: '#F3F4F6', pattern: 'solid', label: 'Floating Vanity' },
  'freestanding-tub': { color: '#FFFFFF', pattern: 'solid', label: 'Bathtub' },
  
  // Kitchen
  'german-kitchen': { color: '#374151', pattern: 'solid', label: 'German Kitchen' },
  'quartz-calacatta': { color: '#F9FAFB', pattern: 'marble', label: 'Calacatta Quartz' },
  'island-chimney': { color: '#1F2937', pattern: 'solid', label: 'Island Chimney' },
  'workstation-sink': { color: '#9CA3AF', pattern: 'solid', label: 'Workstation Sink' },
  'induction-hob': { color: '#111827', pattern: 'solid', label: 'Induction Hob' },
  'tall-cabinet': { color: '#D97706', pattern: 'wood', label: 'Tall Cabinet' },
  
  // Original materials (to replace existing references)
  'vitrified-tiles': { color: '#F3F4F6', pattern: 'tiles', label: 'Vitrified Tiles' },
  'marble': { color: '#FAFAFA', pattern: 'marble', label: 'Italian Marble' },
  'wooden': { color: '#92400E', pattern: 'wood', label: 'Engineered Wood' },
  'granite': { color: '#6B7280', pattern: 'granite', label: 'Granite' },
  'paint': { color: '#FEF3C7', pattern: 'solid', label: 'Premium Paint' },
  'wallpaper': { color: '#E0E7FF', pattern: 'geometric', label: 'Designer Wallpaper' },
  'texture': { color: '#D1D5DB', pattern: 'texture', label: 'Texture Paint' },
  'stone-wall': { color: '#78716C', pattern: 'stone', label: 'Stone Cladding' },
  'sanitaryware': { color: '#F9FAFB', pattern: 'solid', label: 'Sanitaryware' },
  'fittings': { color: '#E5E7EB', pattern: 'solid', label: 'CP Fittings' },
  'shower': { color: '#BFDBFE', pattern: 'solid', label: 'Shower Enclosure' },
  'bathroom-tiles': { color: '#93C5FD', pattern: 'tiles', label: 'Anti-skid Tiles' },
  'modular-kitchen': { color: '#451A03', pattern: 'solid', label: 'Modular Kitchen' },
  'countertop': { color: '#F5F5F4', pattern: 'marble', label: 'Quartz Countertop' },
  'chimney': { color: '#374151', pattern: 'solid', label: 'Kitchen Chimney' },
  'sink': { color: '#9CA3AF', pattern: 'solid', label: 'Steel Sink' }
};

// Pattern generators
const patterns = {
  tiles: (color) => `
    <pattern id="tiles" patternUnits="userSpaceOnUse" width="40" height="40">
      <rect width="40" height="40" fill="${color}"/>
      <rect x="1" y="1" width="38" height="38" fill="${color}" opacity="0.8"/>
      <line x1="0" y1="20" x2="40" y2="20" stroke="white" stroke-width="1" opacity="0.3"/>
      <line x1="20" y1="0" x2="20" y2="40" stroke="white" stroke-width="1" opacity="0.3"/>
    </pattern>
  `,
  marble: (color) => `
    <pattern id="marble" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="${color}"/>
      <path d="M10,20 Q30,10 50,20 T90,20" stroke="${color}" stroke-width="1" opacity="0.2" fill="none"/>
      <path d="M0,50 Q20,40 40,50 T80,50" stroke="${color}" stroke-width="1" opacity="0.15" fill="none"/>
      <path d="M20,80 Q40,70 60,80 T100,80" stroke="${color}" stroke-width="1" opacity="0.2" fill="none"/>
    </pattern>
  `,
  wood: (color) => `
    <pattern id="wood" patternUnits="userSpaceOnUse" width="50" height="100">
      <rect width="50" height="100" fill="${color}"/>
      <rect x="0" y="0" width="50" height="20" fill="${color}" opacity="0.9"/>
      <rect x="0" y="40" width="50" height="20" fill="${color}" opacity="0.85"/>
      <rect x="0" y="80" width="50" height="20" fill="${color}" opacity="0.95"/>
      <line x1="25" y1="0" x2="25" y2="100" stroke="${color}" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  `,
  granite: (color) => `
    <pattern id="granite" patternUnits="userSpaceOnUse" width="30" height="30">
      <rect width="30" height="30" fill="${color}"/>
      <circle cx="5" cy="5" r="1" fill="gold" opacity="0.6"/>
      <circle cx="15" cy="10" r="1.5" fill="gold" opacity="0.5"/>
      <circle cx="25" cy="15" r="1" fill="gold" opacity="0.6"/>
      <circle cx="10" cy="20" r="1" fill="gold" opacity="0.4"/>
      <circle cx="20" cy="25" r="1.5" fill="gold" opacity="0.5"/>
    </pattern>
  `,
  solid: (color) => `
    <pattern id="solid" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="${color}"/>
    </pattern>
  `,
  geometric: (color) => `
    <pattern id="geometric" patternUnits="userSpaceOnUse" width="60" height="60">
      <rect width="60" height="60" fill="${color}"/>
      <polygon points="30,0 60,30 30,60 0,30" fill="${color}" opacity="0.8"/>
      <polygon points="30,10 50,30 30,50 10,30" fill="white" opacity="0.1"/>
    </pattern>
  `,
  texture: (color) => `
    <pattern id="texture" patternUnits="userSpaceOnUse" width="40" height="40">
      <rect width="40" height="40" fill="${color}"/>
      <circle cx="10" cy="10" r="2" fill="${color}" opacity="0.3"/>
      <circle cx="30" cy="10" r="2" fill="${color}" opacity="0.3"/>
      <circle cx="20" cy="20" r="2" fill="${color}" opacity="0.3"/>
      <circle cx="10" cy="30" r="2" fill="${color}" opacity="0.3"/>
      <circle cx="30" cy="30" r="2" fill="${color}" opacity="0.3"/>
    </pattern>
  `,
  stone: (color) => `
    <pattern id="stone" patternUnits="userSpaceOnUse" width="80" height="80">
      <rect width="80" height="80" fill="${color}"/>
      <path d="M0,20 L20,20 L30,0 L50,0 L60,20 L80,20 L80,40 L60,40 L50,60 L30,60 L20,40 L0,40 Z" 
            fill="${color}" opacity="0.8" stroke="white" stroke-width="1" opacity="0.2"/>
    </pattern>
  `,
  brick: (color) => `
    <pattern id="brick" patternUnits="userSpaceOnUse" width="60" height="30">
      <rect width="60" height="30" fill="${color}"/>
      <rect x="0" y="0" width="28" height="14" fill="${color}" stroke="white" stroke-width="1" opacity="0.9"/>
      <rect x="30" y="0" width="28" height="14" fill="${color}" stroke="white" stroke-width="1" opacity="0.9"/>
      <rect x="15" y="15" width="28" height="14" fill="${color}" stroke="white" stroke-width="1" opacity="0.9"/>
      <rect x="-15" y="15" width="28" height="14" fill="${color}" stroke="white" stroke-width="1" opacity="0.9"/>
      <rect x="45" y="15" width="28" height="14" fill="${color}" stroke="white" stroke-width="1" opacity="0.9"/>
    </pattern>
  `,
  mosaic: (color) => `
    <pattern id="mosaic" patternUnits="userSpaceOnUse" width="30" height="30">
      <rect width="30" height="30" fill="white"/>
      <rect x="0" y="0" width="14" height="14" fill="${color}" opacity="0.8"/>
      <rect x="16" y="0" width="14" height="14" fill="${color}" opacity="0.6"/>
      <rect x="0" y="16" width="14" height="14" fill="${color}" opacity="0.6"/>
      <rect x="16" y="16" width="14" height="14" fill="${color}" opacity="0.8"/>
    </pattern>
  `,
  panels: (color) => `
    <pattern id="panels" patternUnits="userSpaceOnUse" width="100" height="40">
      <rect width="100" height="40" fill="${color}"/>
      <rect x="0" y="0" width="100" height="2" fill="${color}" opacity="0.3"/>
      <rect x="0" y="38" width="100" height="2" fill="${color}" opacity="0.3"/>
      <rect x="0" y="10" width="100" height="20" fill="${color}" opacity="0.9"/>
    </pattern>
  `
};

// Generate SVG
function generateSVG(config) {
  const pattern = patterns[config.pattern] || patterns.solid;
  
  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${pattern(config.color)}
  </defs>
  
  <!-- Background -->
  <rect width="400" height="300" fill="url(#${config.pattern})"/>
  
  <!-- Label Background -->
  <rect x="0" y="230" width="400" height="70" fill="rgba(0,0,0,0.7)"/>
  
  <!-- Label Text -->
  <text x="200" y="265" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white" text-anchor="middle">
    ${config.label}
  </text>
  
  <!-- Border -->
  <rect width="400" height="300" fill="none" stroke="#E5E7EB" stroke-width="2"/>
</svg>`;
}

// Create directories if they don't exist
const imagesDir = path.join(__dirname, '..', 'public', 'images', 'materials');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate all placeholder images
Object.entries(materialConfigs).forEach(([filename, config]) => {
  const svg = generateSVG(config);
  const filepath = path.join(imagesDir, `${filename}.svg`);
  fs.writeFileSync(filepath, svg);
  console.log(`Generated: ${filename}.svg`);
});

console.log('\nAll placeholder images generated successfully!');
console.log(`Location: ${imagesDir}`);