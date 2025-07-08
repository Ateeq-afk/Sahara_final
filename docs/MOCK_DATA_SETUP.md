# Mock Data Setup Documentation

## Overview
This document describes the comprehensive mock data setup for the construction tools website, including placeholder images and rich mock data across all components.

## Mock Data Structure

### 1. Material Selector Data (`materialMockData`)
Located in: `src/data/mockData.ts`

**Categories:**
- **Flooring**: 6 items (vitrified tiles, marble, engineered wood, granite, porcelain, vinyl)
- **Wall**: 6 items (paint, wallpaper, texture, stone veneer, wood panels, brick tiles)
- **Bathroom**: 6 items (smart toilet, sensor faucets, rain shower, mosaic tiles, vanity, bathtub)
- **Kitchen**: 6 items (modular kitchen, quartz countertop, chimney, sink, induction hob, cabinet)

**Each material includes:**
- Unique ID and name
- Brand information
- Price range (min/max)
- Unit of measurement
- Image path (SVG placeholder)
- Features array
- Description
- Rating (1-5)
- Number of reviews
- Popular/Premium flags

### 2. Room Visualizer Data (`roomVisualizerMockData`)
**Room Templates:**
- Modern Living Room (20x25x10 ft)
- Master Bedroom Suite (18x20x10 ft)
- Open Kitchen (15x18x10 ft)
- Home Office (12x14x9 ft)

**Furniture Items:**
- Living: Sofa, coffee table, TV unit
- Bedroom: King bed, wardrobe, dresser
- Kitchen: Island, cabinets, dining table

**Textures:**
- Flooring: Oak wood, marble, tiles, carpet
- Walls: Paint options, wallpaper, brick

### 3. Cost Calculator Data (`costCalculatorMockData`)
**Material Costs by Category:**
- Flooring (basic/standard/premium)
- Walls (paint types)
- Bathroom (fixtures and tiles)
- Kitchen (cabinets and countertops)

**Labor Rates:**
- Daily and hourly rates for:
  - Carpenter, Electrician, Plumber
  - Painter, Mason, Tiler

**Additional Services:**
- Architecture (5% of project cost)
- Interior Design (8% of project cost)
- Project Management (3% of project cost)

### 4. Timeline Estimator Data (`timelineEstimatorMockData`)
**Project Milestones:**
- Construction phases with tasks
- Interior design phases
- Weather factors (monsoon delays)
- Resource availability by month

### 5. Additional Mock Data

**Supplier Data (`supplierMockData`):**
- 4 verified suppliers with full details
- 8 material categories with counts

**Labor Data (`laborMockData`):**
- 3 contractor profiles
- 8 skill categories with average rates

## Placeholder Images

### Image Generation
All placeholder images are generated as SVG files with:
- Consistent 400x300 dimensions
- Pattern-based designs (tiles, marble, wood, etc.)
- Text labels
- Appropriate color schemes

### Image Locations
- **Directory**: `/public/images/materials/`
- **Format**: SVG
- **Total Images**: 40+

### Generation Script
Run the placeholder generation script:
```bash
node scripts/generatePlaceholderImages.js
```

## Using External Placeholder Services

As an alternative to local SVG files, you can use online placeholder services:

### Available Services:
1. **placeholder.com**
   ```
   https://via.placeholder.com/400x300/E5E7EB/1F2937?text=Material+Name
   ```

2. **Unsplash Source** (for realistic images)
   ```
   https://source.unsplash.com/400x300/?marble,floor
   ```

3. **dummyimage.com**
   ```
   https://dummyimage.com/400x300/E5E7EB/1F2937&text=Material+Name
   ```

See `scripts/usePlaceholderService.js` for examples.

## Implementation in Components

### Material Selector
```typescript
import { materialMockData } from '@/src/data/mockData'
const MATERIALS = materialMockData
```

### Room Visualizer
```typescript
import { roomVisualizerMockData } from '@/src/data/mockData'
```

### Cost Calculator
Enhanced with icons and rich categorization:
- Quality levels with icons
- Additional features with visual indicators

### Timeline Estimator
Enhanced with:
- Expandable task lists
- Weather impact indicators
- Resource availability visualization

## Key Features Added

1. **Rich Product Information**
   - Ratings and reviews
   - Multiple price points
   - Detailed descriptions
   - Feature lists

2. **Visual Enhancements**
   - SVG placeholder images with patterns
   - Icon integration in UI
   - Color-coded categories

3. **Realistic Data**
   - Bangalore-specific pricing
   - Local supplier information
   - Actual construction phases
   - Weather considerations

4. **Extended Mock Data**
   - Supplier profiles
   - Contractor information
   - Labor rates by skill
   - Project gallery examples

## Maintenance

To update mock data:
1. Edit `src/data/mockData.ts`
2. Regenerate images if needed
3. Update component imports

To add new materials:
1. Add to mockData.ts
2. Create placeholder image
3. Update relevant component

## Benefits

- **No External Dependencies**: All images are self-contained SVGs
- **Fast Loading**: SVG files are lightweight
- **Customizable**: Easy to modify colors and patterns
- **Consistent Style**: All placeholders follow same design
- **Rich Data**: Comprehensive information for testing