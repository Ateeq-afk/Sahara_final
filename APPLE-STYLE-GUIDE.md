# Apple Design System Style Guide - Sahara Developers

## Overview
This guide documents the Apple-inspired design system implemented throughout the Sahara Developers project. All UI components follow Apple's design principles of clarity, deference, and depth.

## 🎨 Design Principles

### 1. **Clarity**
- Text is legible at every size
- Icons are precise and lucid
- Adornments are subtle and appropriate

### 2. **Deference**
- Fluid motion and crisp interface
- Content is paramount
- Visual design supports functionality

### 3. **Depth**
- Distinct layers and realistic motion
- Touches of translucency hint at hierarchy
- Smooth transitions maintain context

## 🎯 Typography System

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
```

### Type Scale
- **Headlines**: SF Pro Display, 700-800 weight, -0.04em to -0.05em tracking
- **Titles**: SF Pro Display, 600 weight, -0.025em tracking
- **Body**: SF Pro Text, 400 weight, -0.015em tracking
- **Captions**: SF Pro Text, 400 weight, -0.01em tracking

### Font Sizes
```css
/* Desktop */
--font-size-xs: 11px;
--font-size-sm: 13px;
--font-size-base: 16px;
--font-size-lg: 17px;
--font-size-xl: 19px;
--font-size-2xl: 22px;
--font-size-3xl: 28px;
--font-size-4xl: 34px;
--font-size-5xl: 40px;
--font-size-6xl: 48px;
--font-size-7xl: 56px;
--font-size-8xl: 64px;
--font-size-9xl: 80px;
--font-size-10xl: 96px;
```

## 🎨 Color Palette

### Primary Colors
- **Primary Blue**: `rgb(0, 122, 255)` - Main CTAs and links
- **Primary Hover**: `rgb(0, 113, 227)` - Hover states

### Gray Scale
```css
gray-50: rgb(251, 251, 253)
gray-100: rgb(242, 242, 247)
gray-200: rgb(229, 229, 234)
gray-300: rgb(209, 209, 214)
gray-400: rgb(174, 174, 178)
gray-500: rgb(142, 142, 147)
gray-600: rgb(99, 99, 102)
gray-700: rgb(72, 72, 74)
gray-800: rgb(48, 48, 51)
gray-900: rgb(28, 28, 30)
```

## 📐 Spacing System (8pt Grid)

All spacing follows Apple's 8-point grid system:
- `8px` (xs)
- `16px` (sm)
- `24px` (md)
- `32px` (lg)
- `40px` (xl)
- `48px` (2xl)
- `64px` (3xl)
- `80px` (4xl)
- `96px` (5xl)

## 🔘 Buttons

### Primary Button
```html
<button class="apple-button apple-button-primary">
  Button Text
</button>
```

### Secondary Button
```html
<button class="apple-button apple-button-secondary">
  Button Text
</button>
```

### Specifications
- **Border Radius**: 980px (pill shape)
- **Height**: 44px (11 * 4px grid)
- **Padding**: 20px horizontal
- **Font Size**: 17px
- **Transition**: 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)

## 🪟 Glass Morphism

### Light Glass
```css
.apple-glass {
  background: rgba(251, 251, 253, 0.78);
  backdrop-filter: saturate(180%) blur(40px);
  -webkit-backdrop-filter: saturate(180%) blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Dark Glass
```css
.apple-glass-dark {
  background: rgba(28, 28, 30, 0.78);
  backdrop-filter: saturate(180%) blur(40px);
  -webkit-backdrop-filter: saturate(180%) blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## 📱 Navigation

### Desktop Navigation
- Fixed position with glass morphism
- 48px height (12 * 4px grid)
- Max-width: 980px
- Font size: 14px with 0.8 opacity

### Mobile Navigation
- Slide-down animation
- Full-width with 17px font size
- Glass morphism background

## 📋 Forms

### Input Fields
```html
<input class="apple-input" placeholder="Placeholder text">
```

### Specifications
- **Border Radius**: 10px
- **Height**: 44px
- **Font Size**: 17px
- **Background**: gray-50, white on focus
- **Border**: 1px solid gray-300

## 🎴 Cards

### Default Card
```html
<div class="apple-card">
  <!-- Content -->
</div>
```

### Specifications
- **Border Radius**: 18px
- **Shadow**: 0 2px 8px rgba(0, 0, 0, 0.04)
- **Hover**: Lifts with increased shadow

## 🎭 Animations

### Timing Functions
- **Fast**: 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Medium**: 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Slow**: 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Spring**: 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)

### Common Animations
- **Fade In Up**: 800ms with 30px Y translation
- **Scale In**: 400ms from 0.9 to 1
- **Slide In**: 600ms from left/right

## 📏 Layout

### Container Widths
- **Narrow**: 800px
- **Default**: 980px
- **Wide**: 1200px

### Section Padding
- **Small**: py-12 md:py-16 lg:py-20
- **Default**: py-20 md:py-24 lg:py-32
- **Large**: py-32 md:py-40 lg:py-48

## 🔧 Implementation Tips

1. **Always use the design system utilities** from `/lib/apple-design-system.ts`
2. **Maintain consistency** - use predefined classes instead of custom values
3. **Follow the 8pt grid** for all spacing decisions
4. **Use proper timing functions** for animations
5. **Test on multiple devices** to ensure glass effects work properly

## 📚 Resources

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Fonts](https://developer.apple.com/fonts/)
- Design system utilities: `/lib/apple-design-system.ts`
- Apple CSS classes: `/app/apple-design.css`

## 🚀 Quick Start

```tsx
import { appleButton, appleCard, appleInput } from '@/lib/apple-design-system';

// Use design system utilities
<button className={appleButton('primary', 'md')}>
  Get Started
</button>

<div className={appleCard('default')}>
  <h3 className="apple-title">Card Title</h3>
  <p className="apple-body">Card content goes here.</p>
</div>

<input className={appleInput()} placeholder="Enter your email" />
```

---

This style guide ensures consistency across the entire Sahara Developers application, maintaining Apple's high standards for user interface design.