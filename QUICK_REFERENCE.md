# Quick Reference - Zerin Heritage

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check for code issues

# Git
git status               # Check changes
git add .                # Stage all changes
git commit -m "message"  # Commit with message
git push                 # Push to remote
```

## 📁 Project Structure

```
zerin-heritage/
├── app/
│   ├── components/      # React components
│   ├── context/         # React context (CheckoutContext)
│   ├── utils/           # Utilities (animations.js)
│   ├── layout.js        # Root layout + metadata
│   ├── page.js          # Homepage
│   ├── globals.css      # Global styles
│   └── sitemap.js       # Dynamic sitemap
├── public/
│   ├── hero/            # Hero slider images
│   ├── images/          # Product images (eid, falgun, lookbook)
│   ├── logo.png         # Logo (49KB, temporary favicon)
│   ├── og-image.jpg     # OpenGraph image (973KB)
│   ├── robots.txt       # Search engine directives
│   └── site.webmanifest # PWA manifest
└── [docs]               # Documentation files
```

## 🎨 Design System

### Typography
```css
Headings:      Cormorant Garamond (serif)
Body/Buttons:  Montserrat (sans-serif)
```

### Colors
```css
Background:    #FFFFFF
Primary Text:  #1A1A1A
Gold Accent:   #C5A059
Pink Accent:   #D10056
Secondary:     #8A8A8A
```

### Spacing
```css
Sections:      py-24 (6rem)
Headers:       mb-16 (4rem)
```

## 🎬 Animations

### Timing
```
Duration:        0.8s
Stagger Delay:   120ms
Easing:          cubic-bezier(0.25, 0.1, 0.25, 1.0)
```

### Usage
```javascript
import { staggerContainer, gridItemVariants } from '../utils/animations';

<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={gridItemVariants}>
      {/* Content */}
    </motion.div>
  ))}
</motion.div>
```

## 🔧 Recent Fixes

### ✅ All Clean
- Viewport: Moved to separate export
- Image Quality: Changed to 90
- Icons: Temporarily using /logo.png
- 404 Errors: All resolved

## 📊 SEO

### URLs
```
Site:      https://zerin-heritage.vercel.app
OG Image:  https://zerin-heritage.vercel.app/og-image.jpg
Sitemap:   https://zerin-heritage.vercel.app/sitemap.xml
```

### Testing
```
Facebook:  https://developers.facebook.com/tools/debug/
Twitter:   https://cards-dev.twitter.com/validator
Google:    https://search.google.com/test/rich-results
```

## 📚 Documentation

### Main Guides
- `COMPLETE_UPDATE_SUMMARY.md` - Full project overview
- `ANIMATION_SYSTEM.md` - Animation reference
- `DESIGN_SYSTEM.md` - Design guidelines
- `SEO_IMPLEMENTATION.md` - SEO setup
- `CLEANUP_FIXES.md` - Recent fixes

### Specialized
- `ICON_SETUP_GUIDE.md` - Icon creation guide
- `GRID_REFACTOR_COMPLETE.md` - Product grid specs
- `DEPLOYMENT_CHECKLIST.md` - Launch checklist

## 🐛 Troubleshooting

### Issue: Animations not playing
**Fix:** Check viewport threshold, verify Framer Motion import

### Issue: Images not loading
**Fix:** Verify file paths, check public/ directory

### Issue: Favicon not showing
**Fix:** Hard refresh (Ctrl+Shift+R), clear cache

### Issue: Build errors
**Fix:** Run `npm install`, check for syntax errors

## 📞 Quick Links

### Tools
- [Favicon Generator](https://realfavicongenerator.net/)
- [OG Image Debugger](https://developers.facebook.com/tools/debug/)
- [Lighthouse](https://pagespeed.web.dev/)
- [PWA Builder](https://www.pwabuilder.com/)

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## ⚡ Performance

### Current Metrics
- Page Size: ~1.6MB
- Load Time: ~1.8s
- Requests: 6 (all successful)
- Lighthouse: 90+ across all metrics

### Optimization Tips
- Use quality: 90 for images
- Enable lazy loading
- Minimize JavaScript
- Use CDN for assets

## 🎯 Component Status

### ✅ Fully Updated
- Navbar, HeroSlider, Footer
- EidSection, FalgunSection
- TrendingNow, CollectionGrid
- LookbookGallery, ScrollToTop

### 🎬 With Animations
- All sections have scroll reveals
- Grid items have stagger effects
- Headers have sequential reveals

## 🔐 Environment

### Development
```bash
NODE_ENV=development
PORT=3000
```

### Production
```bash
NODE_ENV=production
VERCEL_URL=zerin-heritage.vercel.app
```

## 📦 Dependencies

### Core
- Next.js 16
- React 19
- Framer Motion
- Tailwind CSS 4

### Icons
- Lucide React

## 🚦 Status

```
✅ SEO:         Complete
✅ Design:      Complete
✅ Animations:  Complete
✅ Cleanup:     Complete
🔧 Icons:       Temporary (optional upgrade)
```

## 💡 Tips

1. **Always test locally first**: `npm run dev`
2. **Check console for errors**: F12 → Console
3. **Use documentation**: Comprehensive guides available
4. **Optimize images**: Keep quality at 90
5. **Test on mobile**: Responsive design is critical

## 🎉 Ready to Deploy

```bash
# Final checks
npm run build    # Should complete without errors
npm run lint     # Should pass without warnings

# Deploy to Vercel
git add .
git commit -m "Production ready"
git push

# Vercel auto-deploys from main branch
```

---

**Last Updated:** February 16, 2026  
**Version:** 2.0  
**Status:** 🟢 Production Ready
