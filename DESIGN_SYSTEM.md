# Zerin Heritage Design System

## Typography

### Fonts

**Serif (Headings):** Cormorant Garamond
- Elegant, refined, high-fashion aesthetic
- Used for: All headings (h1-h6), titles, featured text
- Weights: 300, 400, 500, 600, 700

**Sans-serif (Body & Buttons):** Montserrat
- Clean, modern, highly readable
- Used for: Body text, buttons, navigation, labels
- Weights: 300, 400, 500, 600, 700

### Type Scale

```css
h1: 3.5rem (56px) - font-weight: 600
h2: 2.75rem (44px) - font-weight: 600
h3: 2rem (32px) - font-weight: 500
h4: 1.5rem (24px) - font-weight: 500
Body: 1rem (16px) - font-weight: 400
Small: 0.875rem (14px) - font-weight: 400
```

### Usage

```jsx
// Headings - Always use font-serif
<h1 className="font-serif text-5xl md:text-6xl">Main Heading</h1>
<h2 className="font-serif text-4xl md:text-5xl">Section Title</h2>
<h3 className="font-serif text-3xl">Subsection</h3>

// Body text - Default (Montserrat)
<p className="text-base">Body content here</p>

// Buttons - Uppercase, Montserrat
<button className="font-sans font-medium uppercase tracking-wider">
  Shop Now
</button>
```

## Color Palette

### Primary Colors

**Background:** `#FFFFFF` (Pure White)
```css
bg-white
```

**Primary Text:** `#1A1A1A` (Near Black)
```css
text-[#1A1A1A]
color: var(--color-primary)
```

**Metallic Gold:** `#C5A059` (Accent)
```css
text-[#C5A059] or text-gold
bg-[#C5A059] or bg-gold
border-[#C5A059] or border-gold
color: var(--color-gold)
```

**Zerin Pink:** `#D10056` (Accent)
```css
text-[#D10056] or text-pink
bg-[#D10056] or bg-pink
border-[#D10056] or border-pink
color: var(--color-pink)
```

### Supporting Colors

**Light Background:** `#FFF9F5` (Warm off-white)
```css
bg-[#FFF9F5]
```

**Gray Light:** `#F5F5F5` (Subtle backgrounds)
```css
bg-gray-50 or bg-[#F5F5F5]
```

**Gray Medium:** `#8A8A8A` (Secondary text)
```css
text-[#8A8A8A]
```

### Color Usage Guidelines

**Gold (#C5A059):**
- Primary CTA buttons
- Hover states
- Premium badges
- Decorative accents
- Luxury indicators

**Pink (#D10056):**
- Secondary CTAs
- Sale/discount tags
- Special offers
- Festive collections
- Love/Valentine themes

**Primary Text (#1A1A1A):**
- All body text
- Headings
- Navigation
- Product descriptions

**White (#FFFFFF):**
- Page background
- Card backgrounds
- Button text on colored backgrounds

## Spacing System

### Section Spacing

**Vertical Padding:** `py-24` (6rem / 96px)
```jsx
<section className="py-24 px-6">
  // High-fashion airy feel with ample whitespace
</section>
```

### Spacing Scale

```css
py-24: 6rem (96px) - Section spacing
py-16: 4rem (64px) - Large spacing
py-12: 3rem (48px) - Medium spacing
py-8: 2rem (32px) - Small spacing
py-6: 1.5rem (24px) - Tight spacing
py-4: 1rem (16px) - Minimal spacing
```

### Container Widths

```css
max-w-7xl: 1280px - Main content container
max-w-6xl: 1152px - Narrow content
max-w-4xl: 896px - Text content
```

### Horizontal Padding

```css
px-6: Mobile (24px)
md:px-12: Tablet (48px)
lg:px-24: Desktop (96px)
```

## Component Patterns

### Buttons

**Primary Button (Gold):**
```jsx
<button className="px-10 py-4 bg-[#C5A059] text-white font-sans font-medium uppercase tracking-wider hover:bg-[#B8935A] transition-all duration-300">
  Shop Now
</button>
```

**Secondary Button (Pink):**
```jsx
<button className="px-10 py-4 bg-[#D10056] text-white font-sans font-medium uppercase tracking-wider hover:bg-[#B8004A] transition-all duration-300">
  View Collection
</button>
```

**Outline Button:**
```jsx
<button className="px-10 py-4 border-2 border-[#C5A059] text-[#C5A059] font-sans font-medium uppercase tracking-wider hover:bg-[#C5A059] hover:text-white transition-all duration-300">
  Learn More
</button>
```

### Section Headers

```jsx
<div className="text-center mb-16">
  <p className="text-sm font-sans tracking-widest text-[#C5A059] mb-3 uppercase">
    Collection
  </p>
  <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
    Heritage Sarees
  </h2>
  <p className="text-base text-[#8A8A8A] font-sans max-w-2xl mx-auto">
    Timeless elegance meets modern sophistication
  </p>
</div>
```

### Cards

```jsx
<div className="bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300">
  <div className="relative aspect-[4/5] overflow-hidden">
    <Image src="..." alt="..." fill className="object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">
      Product Name
    </h3>
    <p className="text-base font-sans font-medium text-[#C5A059]">
      ৳12,999
    </p>
  </div>
</div>
```

## Layout Guidelines

### High-Fashion Aesthetic

**1. Ample Whitespace**
- Use `py-24` between all major sections
- Generous padding around content
- Don't crowd elements

**2. Breathing Room**
- Space between elements: `mb-16` for section headers
- Space between cards: `gap-8` or `gap-12`
- Line height: 1.7 for body text

**3. Clean Hierarchy**
- Clear visual hierarchy with typography
- Use size and weight to establish importance
- Consistent spacing creates rhythm

**4. Minimal Borders**
- Use subtle borders: `border-gray-100`
- Prefer shadows over heavy borders
- Let whitespace define boundaries

### Grid Layouts

**Product Grids:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
  {/* Products */}
</div>
```

**Feature Sections:**
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
  {/* Content */}
</div>
```

## Animation & Transitions

### Standard Transitions

```css
transition-all duration-300 ease-out
```

### Hover Effects

**Images:**
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.6 }}
>
  <Image ... />
</motion.div>
```

**Buttons:**
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Scroll Animations

```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

## Responsive Breakpoints

```css
sm: 640px   - Small devices
md: 768px   - Tablets
lg: 1024px  - Laptops
xl: 1280px  - Desktops
2xl: 1536px - Large screens
```

### Responsive Typography

```jsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif">
  Responsive Heading
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Responsive body text
</p>
```

### Responsive Spacing

```jsx
<section className="py-16 md:py-20 lg:py-24 px-6 md:px-12 lg:px-24">
  {/* Scales with screen size */}
</section>
```

## Accessibility

### Color Contrast

- Text on white: #1A1A1A (AAA compliant)
- White on gold: #FFFFFF on #C5A059 (AA compliant)
- White on pink: #FFFFFF on #D10056 (AA compliant)

### Focus States

```css
focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2
```

### Alt Text

Always provide descriptive alt text for images:
```jsx
<Image 
  src="/product.jpg" 
  alt="Red embroidered bridal lehenga with gold detailing"
/>
```

## Best Practices

### Do's ✓

- Use Cormorant Garamond for all headings
- Use Montserrat for body text and buttons
- Maintain py-24 spacing between sections
- Use gold (#C5A059) for primary actions
- Use pink (#D10056) for special offers
- Keep designs clean with ample whitespace
- Use uppercase for button text
- Maintain consistent letter-spacing

### Don'ts ✗

- Don't mix serif fonts in body text
- Don't use sans-serif for headings
- Don't reduce section spacing below py-16
- Don't use multiple accent colors in one component
- Don't crowd elements together
- Don't use heavy borders
- Don't use all caps for long text
- Don't ignore responsive breakpoints

## Quick Reference

### CSS Variables

```css
--color-background: #FFFFFF
--color-primary: #1A1A1A
--color-gold: #C5A059
--color-pink: #D10056
--font-serif: 'Cormorant Garamond', serif
--font-sans: 'Montserrat', sans-serif
--spacing-section: 6rem
```

### Common Classes

```css
/* Typography */
.font-serif - Cormorant Garamond
.font-sans - Montserrat

/* Colors */
.text-gold - #C5A059
.text-pink - #D10056
.bg-gold - #C5A059
.bg-pink - #D10056

/* Spacing */
.py-24 - Section spacing (6rem)
.px-6 md:px-12 lg:px-24 - Responsive horizontal padding
```

---

**Version:** 2.0  
**Last Updated:** February 16, 2026  
**Status:** Active Design System
