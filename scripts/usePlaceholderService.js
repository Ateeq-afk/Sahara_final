// Alternative approach using placeholder services
// This script demonstrates how to use online placeholder services instead of local SVG files

const placeholderServices = {
  // Using placeholder.com service
  placeholder: (width, height, text, bgColor = 'E5E7EB', textColor = '1F2937') => {
    return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`
  },
  
  // Using picsum.photos for random images
  picsum: (width, height, seed) => {
    return `https://picsum.photos/seed/${seed}/${width}/${height}`
  },
  
  // Using dummyimage.com
  dummyimage: (width, height, text, bgColor = 'E5E7EB', textColor = '1F2937') => {
    return `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}&text=${encodeURIComponent(text)}`
  }
}

// Example material image URLs using placeholder services
const materialPlaceholders = {
  flooring: {
    'vitrified-tiles-premium': placeholderServices.placeholder(400, 300, 'Vitrified Tiles', 'F3F4F6', '374151'),
    'marble-carrara': placeholderServices.placeholder(400, 300, 'Carrara Marble', 'FAFAFA', '6B7280'),
    'wooden-oak': placeholderServices.placeholder(400, 300, 'Oak Wood', '92400E', 'FFFFFF'),
    'granite-galaxy': placeholderServices.placeholder(400, 300, 'Black Galaxy', '1F2937', 'F9FAFB'),
    'porcelain-large': placeholderServices.placeholder(400, 300, 'Porcelain', 'E5E7EB', '374151'),
    'vinyl-plank': placeholderServices.placeholder(400, 300, 'Vinyl Plank', '7C2D12', 'FFFFFF')
  },
  wall: {
    'paint-weather': placeholderServices.placeholder(400, 300, 'Weather Shield', 'DBEAFE', '1E40AF'),
    'wallpaper-3d': placeholderServices.placeholder(400, 300, '3D Wallpaper', 'DDD6FE', '5B21B6'),
    'texture-metallic': placeholderServices.placeholder(400, 300, 'Metallic Texture', 'F3F4F6', '4B5563'),
    'stone-veneer': placeholderServices.placeholder(400, 300, 'Stone Veneer', 'C4B5FD', '4C1D95'),
    'wood-panels': placeholderServices.placeholder(400, 300, 'Wood Panels', '92400E', 'FFFFFF'),
    'brick-tiles': placeholderServices.placeholder(400, 300, 'Brick Tiles', 'DC2626', 'FFFFFF')
  },
  bathroom: {
    'smart-toilet': placeholderServices.placeholder(400, 300, 'Smart Toilet', 'F9FAFB', '111827'),
    'sensor-faucets': placeholderServices.placeholder(400, 300, 'Sensor Faucets', 'E5E7EB', '374151'),
    'rain-shower': placeholderServices.placeholder(400, 300, 'Rain Shower', 'D1D5DB', '374151'),
    'mosaic-tiles': placeholderServices.placeholder(400, 300, 'Glass Mosaic', '60A5FA', 'FFFFFF'),
    'floating-vanity': placeholderServices.placeholder(400, 300, 'Floating Vanity', 'F3F4F6', '1F2937'),
    'freestanding-tub': placeholderServices.placeholder(400, 300, 'Bathtub', 'FFFFFF', '6B7280')
  },
  kitchen: {
    'german-kitchen': placeholderServices.placeholder(400, 300, 'German Kitchen', '374151', 'FFFFFF'),
    'quartz-calacatta': placeholderServices.placeholder(400, 300, 'Calacatta Quartz', 'F9FAFB', '374151'),
    'island-chimney': placeholderServices.placeholder(400, 300, 'Island Chimney', '1F2937', 'F9FAFB'),
    'workstation-sink': placeholderServices.placeholder(400, 300, 'Workstation Sink', '9CA3AF', '1F2937'),
    'induction-hob': placeholderServices.placeholder(400, 300, 'Induction Hob', '111827', 'F9FAFB'),
    'tall-cabinet': placeholderServices.placeholder(400, 300, 'Tall Cabinet', 'D97706', 'FFFFFF')
  }
}

// Alternative using Unsplash Source (for more realistic images)
const unsplashPlaceholders = {
  flooring: {
    'vitrified-tiles-premium': 'https://source.unsplash.com/400x300/?tiles,floor',
    'marble-carrara': 'https://source.unsplash.com/400x300/?marble,white',
    'wooden-oak': 'https://source.unsplash.com/400x300/?wood,floor,oak',
    'granite-galaxy': 'https://source.unsplash.com/400x300/?granite,black',
    'porcelain-large': 'https://source.unsplash.com/400x300/?porcelain,tiles',
    'vinyl-plank': 'https://source.unsplash.com/400x300/?vinyl,flooring'
  },
  wall: {
    'paint-weather': 'https://source.unsplash.com/400x300/?paint,wall,blue',
    'wallpaper-3d': 'https://source.unsplash.com/400x300/?wallpaper,geometric',
    'texture-metallic': 'https://source.unsplash.com/400x300/?texture,metallic,wall',
    'stone-veneer': 'https://source.unsplash.com/400x300/?stone,wall,veneer',
    'wood-panels': 'https://source.unsplash.com/400x300/?wood,panels,interior',
    'brick-tiles': 'https://source.unsplash.com/400x300/?brick,wall,interior'
  },
  bathroom: {
    'smart-toilet': 'https://source.unsplash.com/400x300/?toilet,modern,bathroom',
    'sensor-faucets': 'https://source.unsplash.com/400x300/?faucet,bathroom,modern',
    'rain-shower': 'https://source.unsplash.com/400x300/?shower,bathroom,rain',
    'mosaic-tiles': 'https://source.unsplash.com/400x300/?mosaic,tiles,bathroom',
    'floating-vanity': 'https://source.unsplash.com/400x300/?vanity,bathroom,modern',
    'freestanding-tub': 'https://source.unsplash.com/400x300/?bathtub,bathroom,luxury'
  },
  kitchen: {
    'german-kitchen': 'https://source.unsplash.com/400x300/?kitchen,modern,german',
    'quartz-calacatta': 'https://source.unsplash.com/400x300/?quartz,countertop,kitchen',
    'island-chimney': 'https://source.unsplash.com/400x300/?chimney,kitchen,island',
    'workstation-sink': 'https://source.unsplash.com/400x300/?sink,kitchen,stainless',
    'induction-hob': 'https://source.unsplash.com/400x300/?induction,cooktop,kitchen',
    'tall-cabinet': 'https://source.unsplash.com/400x300/?cabinet,kitchen,storage'
  }
}

console.log('Example placeholder service URLs:')
console.log('\n1. Using placeholder.com:')
console.log(materialPlaceholders.flooring['vitrified-tiles-premium'])

console.log('\n2. Using Unsplash:')
console.log(unsplashPlaceholders.flooring['vitrified-tiles-premium'])

console.log('\n3. Using dummyimage.com:')
console.log(placeholderServices.dummyimage(400, 300, 'Sample Material', 'E5E7EB', '1F2937'))

console.log('\n4. Using picsum.photos:')
console.log(placeholderServices.picsum(400, 300, 'material-seed'))

console.log('\nTo use these in your components, simply replace the image URLs in your mock data with these placeholder service URLs.')
console.log('\nNote: These services require internet connection and may have rate limits.')