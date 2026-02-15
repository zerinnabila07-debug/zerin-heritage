# Icon Setup Guide - Zerin Heritage

## Current Status

### ✅ Configured (Temporary)
- **Favicon:** `/logo.png` (currently using existing logo)
- **Manifest Icons:** Commented out (empty array)
- **Apple Touch Icon:** Commented out
- **Other Icons:** Commented out

### ⏳ Pending (To Be Added)

The following icon files need to be created and added to the `public/` directory:

## Required Icon Files

### 1. Favicon Files
```
public/
├── favicon.ico          (16x16, 32x32, 48x48 multi-size ICO)
├── favicon-16x16.png    (16x16 PNG)
├── favicon-32x32.png    (32x32 PNG)
```

**Design Guidelines:**
- Use simplified Zerin Heritage logo or "ZH" monogram
- Background: White or Transparent
- Icon color: #C5A059 (Metallic Gold) or #D10056 (Zerin Pink)
- Clear, recognizable at small sizes

### 2. Apple Touch Icon
```
public/
└── apple-touch-icon.png (180x180 PNG)
```

**Design Guidelines:**
- Square format with rounded corners (system applies)
- No transparency (use white background)
- Centered logo with padding
- High resolution for Retina displays

### 3. Android Chrome Icons (PWA)
```
public/
├── android-chrome-192x192.png (192x192 PNG)
└── android-chrome-512x512.png (512x512 PNG)
```

**Design Guidelines:**
- Maskable safe zone (80% of canvas)
- Full bleed background
- Centered logo
- Purpose: "maskable any"

### 4. Safari Pinned Tab (Optional)
```
public/
└── safari-pinned-tab.svg (Monochrome SVG)
```

**Design Guidelines:**
- Single color (black)
- Simple, clean silhouette
- Vector format for all sizes

## Icon Design Specifications

### Color Palette
- **Primary:** #C5A059 (Metallic Gold)
- **Secondary:** #D10056 (Zerin Pink)
- **Background:** #FFFFFF (White)
- **Text/Logo:** #1A1A1A (Near Black)

### Logo Variations

#### Full Logo
- Use for larger icons (512x512, apple-touch-icon)
- Include "Zerin Heritage" text if legible
- Maintain aspect ratio

#### Icon/Monogram
- Use for smaller icons (favicon, 192x192)
- "ZH" monogram or simplified symbol
- Bold, clear letterforms

### Safe Zones

#### Maskable Icons (Android)
```
512x512 canvas
├── Safe zone: 410x410 (80% centered)
├── Minimum safe: 307x307 (60% centered)
└── Full bleed background required
```

#### Standard Icons
```
- 10% padding on all sides
- Centered logo/monogram
- Breathing room for clarity
```

## Generation Options

### Option 1: Online Tools (Recommended)

**Favicon Generator:**
- https://realfavicongenerator.net/
- Upload logo.png
- Customize for each platform
- Download complete package

**PWA Icon Generator:**
- https://www.pwabuilder.com/imageGenerator
- Upload 512x512 source
- Generate all sizes
- Includes maskable variants

### Option 2: Design Software

**Figma/Adobe Illustrator:**
1. Create artboards for each size
2. Export as PNG (except SVG)
3. Use export presets for consistency
4. Optimize with ImageOptim or TinyPNG

**Photoshop:**
1. Create smart object of logo
2. Resize to each dimension
3. Apply sharpening for small sizes
4. Save for Web (PNG-24)

### Option 3: Command Line (ImageMagick)

```bash
# Install ImageMagick
# Ubuntu/Debian: sudo apt install imagemagick
# macOS: brew install imagemagick

# Generate from logo.png
cd public

# Favicon sizes
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 48x48 favicon-48x48.png

# Combine into ICO
convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico

# Apple Touch Icon
convert logo.png -resize 180x180 -background white -gravity center -extent 180x180 apple-touch-icon.png

# Android Chrome Icons
convert logo.png -resize 192x192 -background white -gravity center -extent 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 -background white -gravity center -extent 512x512 android-chrome-512x512.png

# Safari Pinned Tab (requires SVG source)
# Use Inkscape or Illustrator to create monochrome SVG
```

## After Adding Icons

### 1. Update `app/layout.js`

Uncomment and update the icons configuration:

```javascript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: 'any' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  other: [
    {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#C5A059',
    },
  ],
},
```

### 2. Update `public/site.webmanifest`

Uncomment and update the icons array:

```json
"icons": [
  {
    "src": "/android-chrome-192x192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "maskable any"
  },
  {
    "src": "/android-chrome-512x512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable any"
  }
]
```

### 3. Verify Installation

```bash
# Check files exist
ls -lh public/*.ico public/*-icon.png public/android-chrome-*.png

# Test in browser
npm run dev
# Visit http://localhost:3000
# Check browser tab for favicon
# Check mobile "Add to Home Screen"
```

## Testing Checklist

### Desktop Browsers
- [ ] Chrome - Favicon in tab
- [ ] Firefox - Favicon in tab
- [ ] Safari - Favicon in tab + pinned tab
- [ ] Edge - Favicon in tab

### Mobile Browsers
- [ ] iOS Safari - Add to Home Screen icon
- [ ] Android Chrome - Add to Home Screen icon
- [ ] PWA install prompt shows correct icon

### Bookmarks
- [ ] Bookmark shows favicon
- [ ] Bookmark bar displays correctly
- [ ] Mobile bookmarks show icon

### PWA
- [ ] Installed app icon (Android)
- [ ] Installed app icon (iOS)
- [ ] Splash screen (if configured)
- [ ] App switcher icon

## File Size Guidelines

### Target Sizes
- `favicon.ico`: < 50KB
- `favicon-16x16.png`: < 5KB
- `favicon-32x32.png`: < 10KB
- `apple-touch-icon.png`: < 30KB
- `android-chrome-192x192.png`: < 30KB
- `android-chrome-512x512.png`: < 100KB
- `safari-pinned-tab.svg`: < 10KB

### Optimization
```bash
# PNG optimization
pngquant --quality=80-95 *.png
optipng -o7 *.png

# SVG optimization
svgo safari-pinned-tab.svg
```

## Common Issues & Solutions

### Issue: Favicon Not Updating
**Solution:**
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear browser cache
3. Check file path is correct
4. Verify file exists in public/ directory

### Issue: Blurry Icons on Retina
**Solution:**
- Use 2x resolution for source images
- Export at exact pixel dimensions
- Use PNG-24 with transparency
- Test on actual Retina device

### Issue: PWA Icon Cropped
**Solution:**
- Use maskable safe zone (80%)
- Add padding around logo
- Test with PWA Builder's maskable editor
- Use full bleed background color

### Issue: Wrong Icon Color
**Solution:**
- Check color profile (use sRGB)
- Verify hex codes match brand palette
- Test on multiple devices
- Use color picker to confirm

## Quick Start (Temporary Solution)

If you need icons immediately, use this quick script:

```bash
# Create basic colored squares as placeholders
cd public

# Red square favicon
convert -size 32x32 xc:"#D10056" -gravity center -pointsize 20 -fill white -annotate +0+0 "ZH" favicon.ico

# Gold square for Apple
convert -size 180x180 xc:"#C5A059" -gravity center -pointsize 80 -fill white -annotate +0+0 "ZH" apple-touch-icon.png

# Android icons
convert -size 192x192 xc:"#C5A059" -gravity center -pointsize 80 -fill white -annotate +0+0 "ZH" android-chrome-192x192.png
convert -size 512x512 xc:"#C5A059" -gravity center -pointsize 200 -fill white -annotate +0+0 "ZH" android-chrome-512x512.png
```

Then uncomment the icon references in `layout.js` and `site.webmanifest`.

## Professional Design Service

For best results, consider hiring a designer to create:
- Professional icon set
- Multiple variations (light/dark)
- Animated splash screens
- Brand-consistent across all platforms

**Deliverables:**
- All required sizes
- Source files (AI, Figma, Sketch)
- Usage guidelines
- Installation instructions

## Resources

### Tools
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Favicon.io](https://favicon.io/)
- [Maskable.app](https://maskable.app/editor)

### Documentation
- [Web.dev - Add a Web App Manifest](https://web.dev/add-manifest/)
- [MDN - Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Apple - Configuring Web Applications](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

### Testing
- [Favicon Checker](https://realfavicongenerator.net/favicon_checker)
- [Manifest Validator](https://manifest-validator.appspot.com/)
- Chrome DevTools - Application tab

---

## Summary

**Current Setup:** Temporary configuration using `/logo.png` as favicon. All other icons commented out to prevent 404 errors.

**Next Steps:**
1. Create icon files (use online generator or design software)
2. Add files to `public/` directory
3. Uncomment icon references in `layout.js` and `site.webmanifest`
4. Test across browsers and devices
5. Optimize file sizes
6. Deploy and verify

**Priority:** Medium (functional but not optimal)

**Estimated Time:** 1-2 hours with online tools, 3-4 hours with custom design

---

**Status:** ⏳ Pending Icon Creation  
**Last Updated:** February 16, 2026  
**Temporary Solution:** ✅ Active (using logo.png)
