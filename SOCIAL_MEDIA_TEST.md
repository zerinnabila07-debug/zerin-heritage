# Social Media Sharing Test Guide

## ✅ Configuration Complete

Your Zerin Heritage website is now configured with:
- **Site URL:** https://zerin-heritage.vercel.app
- **OG Image:** /public/og-image.jpg (973KB)
- **Image Dimensions:** 1200x630 (verified in metadata)

## 🧪 Testing Steps

### 1. Facebook / WhatsApp Testing

**Facebook Debugger:**
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter: `https://zerin-heritage.vercel.app`
3. Click "Debug" or "Scrape Again"
4. Verify the following appears:
   - ✓ Title: "Zerin Heritage | Luxury South Asian Fashion & Heritage Wear"
   - ✓ Description: "Explore Zerin Heritage for exclusive, high-fashion..."
   - ✓ Image: Your beautiful OG image with yellow and red lehengas
   - ✓ URL: https://zerin-heritage.vercel.app

**What You Should See:**
- Large preview card with your OG image
- Brand title and description
- No errors or warnings

**If Image Doesn't Show:**
- Click "Scrape Again" button (Facebook caches aggressively)
- Wait 2-3 minutes and try again
- Check that image URL is: https://zerin-heritage.vercel.app/og-image.jpg

### 2. Twitter Card Testing

**Twitter Card Validator:**
1. Go to: https://cards-dev.twitter.com/validator
2. Enter: `https://zerin-heritage.vercel.app`
3. Click "Preview card"
4. Verify:
   - ✓ Card type: Summary Card with Large Image
   - ✓ Title: "Zerin Heritage | Luxury South Asian Fashion & Heritage Wear"
   - ✓ Description: Your brand description
   - ✓ Image: Your OG image

### 3. LinkedIn Testing

**LinkedIn Post Inspector:**
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter: `https://zerin-heritage.vercel.app`
3. Click "Inspect"
4. Verify preview shows correctly

### 4. WhatsApp Testing

**Direct Test:**
1. Open WhatsApp (mobile or web)
2. Send the link to yourself or a test contact: `https://zerin-heritage.vercel.app`
3. Wait for preview to load
4. Verify:
   - ✓ Image appears
   - ✓ Title shows
   - ✓ Description visible

### 5. Direct Image Access Test

**Verify Image is Accessible:**
1. Open browser
2. Go to: `https://zerin-heritage.vercel.app/og-image.jpg`
3. Image should load directly
4. Check dimensions: Should be 1200x630

## 📊 Expected Results

### Perfect Preview Should Show:

**Image:**
- Left side: Three models in yellow/golden lehengas (Falgun collection)
- Center: "ZERIN HERITAGE" logo on brown/gold background
- Right side: Two models in red bridal lehengas
- Traditional Mughal architecture background
- Rose petals on floor

**Text:**
- Title: "Zerin Heritage | Luxury South Asian Fashion & Heritage Wear"
- Description: "Explore Zerin Heritage for exclusive, high-fashion sarees..."

**Branding:**
- Professional, luxury aesthetic
- Brand colors visible (Gold, Red, White)
- High-quality photography

## 🔧 Troubleshooting

### Issue: Image Not Showing

**Solution 1: Clear Cache**
```
Facebook: Use "Scrape Again" button
Twitter: Wait 5-10 minutes, cache updates faster
WhatsApp: Delete message and resend link
```

**Solution 2: Verify Image URL**
```bash
# Test direct access
curl -I https://zerin-heritage.vercel.app/og-image.jpg

# Should return: HTTP/2 200
# Content-Type: image/jpeg
# Content-Length: ~996352 (973KB)
```

**Solution 3: Check Metadata**
```bash
# View page source
curl https://zerin-heritage.vercel.app | grep "og:image"

# Should show:
# <meta property="og:image" content="https://zerin-heritage.vercel.app/og-image.jpg">
```

### Issue: Wrong Image Showing

**Cause:** Old cached version
**Solution:** 
- Use Facebook Debugger "Scrape Again"
- Wait 24-48 hours for full cache clear
- Or rename image (og-image-v2.jpg) and update metadata

### Issue: Image Too Small on Mobile

**Cause:** Image dimensions incorrect
**Solution:**
- Verify image is exactly 1200x630
- Check file in image editor
- Re-export if needed

## ✅ Verification Checklist

Before sharing publicly:

- [ ] Facebook Debugger shows correct preview
- [ ] Twitter Card Validator shows correct preview
- [ ] WhatsApp preview loads correctly
- [ ] Direct image URL is accessible
- [ ] Image quality is high (not pixelated)
- [ ] Text is readable in preview
- [ ] Brand logo is visible
- [ ] No errors in debugger tools
- [ ] Mobile preview looks good
- [ ] Desktop preview looks good

## 📱 Real-World Testing

### Test on Multiple Platforms:

1. **Facebook:**
   - Create test post (don't publish)
   - Paste link
   - Verify preview
   - Delete draft

2. **Instagram Stories:**
   - Add link sticker
   - Preview should show

3. **WhatsApp:**
   - Send to yourself
   - Check preview

4. **Messenger:**
   - Send link
   - Verify card

5. **Email:**
   - Send link in email
   - Some clients show preview

## 🎯 Success Metrics

### Good Preview Indicators:

✅ Image loads in < 2 seconds
✅ Text is fully visible
✅ Brand is recognizable
✅ Professional appearance
✅ No broken images
✅ Consistent across platforms

### Red Flags:

❌ Broken image icon
❌ Generic placeholder
❌ Wrong image showing
❌ Text cut off
❌ Low quality/pixelated
❌ Slow loading (> 5 seconds)

## 🚀 Going Live

### Before Public Launch:

1. **Test All Platforms** (15 minutes)
   - Run through all tests above
   - Document any issues
   - Fix before launch

2. **Share Test Post** (5 minutes)
   - Create private/test post on Facebook
   - Verify preview is perfect
   - Delete test post

3. **Monitor First Shares** (ongoing)
   - Watch first real shares
   - Check if previews work
   - Be ready to fix issues quickly

## 📞 Support

### If Issues Persist:

1. Check Vercel deployment logs
2. Verify image uploaded correctly
3. Check file permissions
4. Test in incognito/private mode
5. Try different browser

### Testing URLs:

- **Site:** https://zerin-heritage.vercel.app
- **Image:** https://zerin-heritage.vercel.app/og-image.jpg
- **Sitemap:** https://zerin-heritage.vercel.app/sitemap.xml

## 🎉 You're Ready!

Once all tests pass, your Zerin Heritage website will show beautiful, professional previews when shared on any social media platform!

---

**Last Updated:** February 16, 2026  
**Status:** Ready for Testing  
**Priority:** Test before public launch
