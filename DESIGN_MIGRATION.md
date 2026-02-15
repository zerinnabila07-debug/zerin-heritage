# Design System Migration Guide

## Overview

Migrating from Playfair Display + Inter to Cormorant Garamond + Montserrat with updated color palette.

## Changes Summary

### Typography
- **Old Serif:** Playfair Display → **New:** Cormorant Garamond
- **Old Sans:** Inter → **New:** Montserrat

### Colors
| Element | Old | New |
|---------|-----|-----|
| Background | #FFFFFF | #FFFFFF (unchanged) |
| Primary Text | #2C2C2C | #1A1A1A |
| Accent 1 | #E0115F / #B22222 | #C5A059 (Gold) |
| Accent 2 | #FFB6C1 | #D10056 (Pink) |

### Spacing
- All sections now use `py-24` (6rem) for high-fashion airy feel
- Increased whitespace throughout

## Component Migration Checklist

### ✅ Completed
- [x] globals.css - Updated fonts and colors
- [x] DESIGN_SYSTEM.md - Created design system documentation

### 🔄 To Update

#### High Priority (User-Facing)
- [ ] Navbar.js - Update colors and fonts
- [ ] HeroSlider.js - Update typography and spacing
- [ ] Footer.js - Update colors and fonts
- [ ] EidSection.js - Update section spacing and colors
- [ ] FalgunSection.js - Update section spacing and colors
- [ ] TrendingNow.js - Update section spacing and colors
- [ ] CollectionGrid.js - Update section spacing and colors
- [ ] LookbookGallery.js - Update section spacing and colors

#### Medium Priority (Interactive)
- [ ] CheckoutModal.js - Update colors and buttons
- [ ] ImageLightbox.js - Update colors
- [ ] ScrollToTop.js - Update button color

#### Low Priority (Utility)
- [ ] ScrollReveal.js - No changes needed
- [ ] Cart page - Update colors
- [ ] Wishlist page - Update colors
- [ ] Login page - Update colors

## Color Migration Map

### Find and Replace

**Red Accent → Gold:**
```
#B22222 → #C5A059
#E0115F → #C5A059
bg-[#B22222] → bg-[#C5A059]
text-[#E0115F] → text-[#C5A059]
border-[#B22222] → border-[#C5A059]
hover:bg-[#A01F1F] → hover:bg-[#B8935A]
```

**Pink Accent → Zerin Pink:**
```
#FFB6C1 → #D10056
bg-[#FFB6C1] → bg-[#D10056]
```

**Primary Text:**
```
#2C2C2C → #1A1A1A
text-[#2C2C2C] → text-[#1A1A1A]
```

**Orange Accent → Gold:**
```
#FF7F24 → #C5A059
#FF6A00 → #B8935A (hover state)
```

### Typography Updates

**Headings:**
```jsx
// Old
<h2 className="text-4xl font-serif">

// New (same, but verify font-serif is used)
<h2 className="text-4xl font-serif">
```

**Body Text:**
```jsx
// Old
<p className="text-base font-sans">

// New (same, but verify font-sans is used)
<p className="text-base font-sans">
```

**Buttons:**
```jsx
// Old
<button className="px-8 py-3 bg-[#E0115F] text-white font-sans">

// New
<button className="px-10 py-4 bg-[#C5A059] text-white font-sans font-medium uppercase tracking-wider">
```

### Spacing Updates

**Sections:**
```jsx
// Old
<section className="py-12 md:py-20">

// New
<section className="py-24">
```

**Section Headers:**
```jsx
// Old
<div className="text-center mb-12">

// New
<div className="text-center mb-16">
```

## Testing Checklist

After each component update:

- [ ] Visual inspection in browser
- [ ] Check responsive breakpoints (mobile, tablet, desktop)
- [ ] Verify font rendering (Cormorant Garamond for headings)
- [ ] Verify color contrast (accessibility)
- [ ] Check spacing (py-24 between sections)
- [ ] Test hover states
- [ ] Test animations
- [ ] Check console for errors

## Component-Specific Notes

### Navbar
- Top bar: Keep red (#D10056) for urgency
- Logo: Invert colors on scroll
- Links: Use #1A1A1A, hover to #C5A059
- Icons: Match link colors

### HeroSlider
- Button: Gold (#C5A059) with hover state
- Text: White on dark overlay
- Indicators: Gold active state

### Buttons
- Primary: Gold background (#C5A059)
- Secondary: Pink background (#D10056)
- Outline: Gold border with hover fill
- All buttons: Uppercase, Montserrat, tracking-wider

### Product Cards
- Title: Cormorant Garamond
- Price: Gold (#C5A059), Montserrat medium
- Hover: Subtle shadow, no heavy borders

### Footer
- Background: Light gray (#F5F5F5)
- Text: Primary (#1A1A1A)
- Links: Hover to gold (#C5A059)
- Social icons: Gold on hover

## Verification Steps

1. **Typography Check:**
   ```
   - Open DevTools
   - Inspect h1, h2, h3 elements
   - Verify: font-family: 'Cormorant Garamond'
   - Inspect p, button elements
   - Verify: font-family: 'Montserrat'
   ```

2. **Color Check:**
   ```
   - Inspect primary buttons
   - Verify: background-color: #C5A059
   - Inspect text elements
   - Verify: color: #1A1A1A
   ```

3. **Spacing Check:**
   ```
   - Inspect section elements
   - Verify: padding-top: 6rem (96px)
   - Verify: padding-bottom: 6rem (96px)
   ```

## Rollback Plan

If issues arise:

1. **Fonts:**
   ```css
   /* In globals.css, revert to: */
   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
   
   --font-serif: 'Playfair Display', serif;
   --font-sans: 'Inter', sans-serif;
   ```

2. **Colors:**
   ```css
   /* Revert CSS variables */
   --color-primary: #2C2C2C;
   --color-accent: #E0115F;
   ```

3. **Git Revert:**
   ```bash
   git log --oneline
   git revert <commit-hash>
   ```

## Timeline

- **Phase 1:** Core components (Navbar, Hero, Footer) - 1 hour
- **Phase 2:** Section components - 1 hour  
- **Phase 3:** Modal and utility components - 30 minutes
- **Phase 4:** Testing and refinement - 30 minutes

**Total Estimated Time:** 3 hours

## Success Criteria

- [ ] All headings use Cormorant Garamond
- [ ] All body text uses Montserrat
- [ ] Primary color is #1A1A1A
- [ ] Gold accent (#C5A059) used consistently
- [ ] Pink accent (#D10056) for special elements
- [ ] All sections have py-24 spacing
- [ ] No console errors
- [ ] Responsive on all breakpoints
- [ ] Passes accessibility contrast checks
- [ ] Fonts load correctly (no FOUT)

---

**Status:** In Progress  
**Started:** February 16, 2026  
**Next:** Update Navbar component
