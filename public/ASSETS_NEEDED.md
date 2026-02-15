# Required Assets for SEO & Social Media

This document lists all image assets needed for proper SEO, social media sharing, and favicon display.

## Favicon Files (Required)

Place these files in the `/public` directory:

### Standard Favicons
- **favicon.ico** (32x32 or 16x16, .ico format)
  - Legacy browser support
  
- **favicon-16x16.png** (16x16, PNG)
  - Small favicon for browser tabs
  
- **favicon-32x32.png** (32x32, PNG)
  - Standard favicon for browser tabs

### Apple Touch Icons
- **apple-touch-icon.png** (180x180, PNG)
  - iOS home screen icon
  - Should have rounded corners pre-applied

### Android Chrome Icons
- **android-chrome-192x192.png** (192x192, PNG)
  - Android home screen icon (small)
  
- **android-chrome-512x512.png** (512x512, PNG)
  - Android home screen icon (large)
  - Used for splash screens

### Safari Pinned Tab
- **safari-pinned-tab.svg** (SVG, monochrome)
  - Safari pinned tab icon
  - Should be a simple, bold design in black

## Social Media / OpenGraph Image (Required)

- **og-image.jpg** (1200x630, JPG or PNG)
  - Used for Facebook, LinkedIn, WhatsApp previews
  - Should feature:
    - Zerin Heritage logo
    - Elegant product imagery
    - Brand colors (Gold #C5A059, Deep Red #B22222)
    - Text: "Luxury South Asian Fashion"
  - Keep text and important elements in the center (safe zone)
  - File size: < 1MB for fast loading

## Design Guidelines

### Favicon Design
- Use the Zerin Heritage logo or "ZH" monogram
- Colors: Gold (#C5A059) on Deep Red (#B22222) background
- Or: White logo on Deep Red background
- Keep design simple and recognizable at small sizes

### OG Image Design
- Aspect ratio: 1.91:1 (1200x630)
- Safe zone: Keep important content within 1200x600 center area
- Include brand name prominently
- Show 1-2 hero products
- Use brand typography (Playfair Display for elegance)
- Maintain high-fashion aesthetic

## Quick Generation Tools

### Favicon Generator
- https://realfavicongenerator.net/
- Upload a 512x512 PNG logo
- Download all formats

### OG Image Creator
- https://www.canva.com/ (use 1200x630 template)
- Adobe Photoshop
- Figma

## Current Status

✅ Metadata configured in layout.js
✅ site.webmanifest created
✅ robots.txt created
⚠️  Favicon files needed
⚠️  og-image.jpg needed

## Installation

Once you have the assets:

1. Place all favicon files in `/public/`
2. Place `og-image.jpg` in `/public/`
3. Verify by visiting:
   - https://zerinheritage.com/favicon.ico
   - https://zerinheritage.com/og-image.jpg
4. Test social sharing:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

## Notes

- All favicon files should use the same design for consistency
- OG image will be cached by social platforms (may take 24-48 hours to update)
- Use PNG for favicons (better transparency support)
- Use JPG for OG image (smaller file size)
