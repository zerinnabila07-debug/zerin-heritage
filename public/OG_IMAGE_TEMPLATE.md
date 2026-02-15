# OpenGraph Image Template Guide

## Specifications

### Dimensions
- **Width:** 1200px
- **Height:** 630px
- **Aspect Ratio:** 1.91:1
- **Format:** JPG or PNG
- **File Size:** < 1MB (recommended < 500KB)

## Design Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [100px padding top]                                    │
│                                                         │
│              ZERIN HERITAGE                             │
│              [Logo - Playfair Display]                  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │                                                   │ │
│  │         [Hero Product Image]                     │ │
│  │         Elegant Saree or Kurti                   │ │
│  │         High-quality fashion photography         │ │
│  │                                                   │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│         Luxury South Asian Fashion                      │
│         Handcrafted Collections for Every Occasion      │
│                                                         │
│  [100px padding bottom]                                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Safe Zone

Keep important content (logo, text, faces) within:
- **Width:** 1200px (full)
- **Height:** 600px (center 600px)
- **Margins:** 50px on all sides

## Color Palette

### Primary Colors
- **Deep Red:** #B22222 (background or accent)
- **Luxe Gold:** #C5A059 (text or borders)
- **White:** #FFFFFF (text on dark background)
- **Dark Charcoal:** #2C2C2C (text on light background)

### Gradient Options
```css
/* Option 1: Elegant Gold to Red */
background: linear-gradient(135deg, #C5A059 0%, #B22222 100%);

/* Option 2: Soft Blush */
background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%);

/* Option 3: Sophisticated Dark */
background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
```

## Typography

### Logo/Brand Name
- **Font:** Playfair Display Bold
- **Size:** 72-96px
- **Color:** Gold (#C5A059) or White
- **Letter Spacing:** 0.05em

### Tagline
- **Font:** Inter Medium
- **Size:** 32-40px
- **Color:** White or Dark Charcoal
- **Letter Spacing:** 0.02em

### Body Text
- **Font:** Inter Regular
- **Size:** 24-28px
- **Color:** White (80% opacity) or Gray

## Design Elements

### Recommended Components

1. **Logo Placement**
   - Top center or center
   - Size: 300-400px wide
   - Add subtle drop shadow

2. **Product Image**
   - Center or offset
   - Use high-quality lifestyle photography
   - Apply subtle overlay for text readability

3. **Decorative Elements**
   - Gold border (2-4px)
   - Geometric patterns (subtle)
   - Traditional motifs (optional)

4. **Text Hierarchy**
   - Brand name (largest)
   - Tagline (medium)
   - Supporting text (smallest)

## Design Variations

### Variation 1: Product-Focused
- Large hero product image (70% of space)
- Logo overlay at top
- Minimal text

### Variation 2: Brand-Focused
- Large logo center
- Decorative border
- Tagline below
- Small product images as accents

### Variation 3: Collection Launch
- Split layout (product left, text right)
- Collection name prominent
- "EID 2026" or "Falgun Collection"
- Call-to-action text

## Tools & Resources

### Design Software
- **Canva:** https://www.canva.com/
  - Use 1200x630 custom size
  - Free templates available

- **Adobe Photoshop**
  - Professional control
  - Layer-based editing

- **Figma**
  - Collaborative design
  - Easy export

### Stock Photos (if needed)
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Use own product photography (recommended)

### Font Resources
- Google Fonts: https://fonts.google.com/
  - Playfair Display
  - Inter

## Example Layouts

### Layout 1: Minimalist Luxury
```
Background: White (#FFFFFF)
Logo: Center, Gold (#C5A059)
Product: Center, large image
Tagline: Below logo, Dark Charcoal (#2C2C2C)
Border: Gold, 4px
```

### Layout 2: Festive Celebration
```
Background: Deep Red (#B22222) gradient
Logo: Top, White with gold outline
Product: Center, saree with model
Text: "EID COLLECTION 2026" in gold
Decorative: Traditional patterns in corners
```

### Layout 3: Modern Chic
```
Background: Dark gradient (#2C2C2C to black)
Logo: Left side, White
Product: Right side, modern fashion
Tagline: "Timeless Elegance" in gold
Accent: Thin gold lines
```

## Testing Checklist

Before finalizing:

- [ ] Image is exactly 1200x630px
- [ ] File size is under 1MB
- [ ] Logo is clearly visible
- [ ] Text is readable at small sizes
- [ ] Colors match brand palette
- [ ] No important content in outer 50px margins
- [ ] Image looks good on mobile preview
- [ ] Tested on Facebook Debugger
- [ ] Tested on Twitter Card Validator
- [ ] Saved as `/public/og-image.jpg`

## Platform-Specific Notes

### Facebook/LinkedIn
- Displays full 1200x630
- Supports JPG and PNG
- Caches aggressively (may take 24-48 hours to update)

### Twitter/X
- Displays 1200x628 (crops 2px)
- Prefers JPG for smaller file size
- Updates faster than Facebook

### WhatsApp
- Shows smaller preview
- Keep text large and bold
- Avoid fine details

## Final Export Settings

### For JPG
- Quality: 85-90%
- Color Profile: sRGB
- Progressive: Yes

### For PNG
- Compression: Medium
- Transparency: No (use solid background)
- Color Profile: sRGB

---

**File Location:** `/public/og-image.jpg`  
**Current Status:** ⚠️ Needs to be created  
**Priority:** High  

Once created, test at:
- https://developers.facebook.com/tools/debug/
- https://cards-dev.twitter.com/validator
