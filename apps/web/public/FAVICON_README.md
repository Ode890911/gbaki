# Favicon Files

The following favicon files are referenced but not included in the repository:

- `favicon.ico` - Main favicon (16x16, 32x32, 48x48)
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - 180x180 Apple touch icon
- `android-chrome-192x192.png` - 192x192 Android icon
- `android-chrome-512x512.png` - 512x512 Android icon

## Generate Favicons

You can generate these files using:
1. **Favicon Generator**: https://realfavicongenerator.net/
2. **Favicon.io**: https://favicon.io/
3. **Any image editor** - Create a 512x512 logo and resize

## Quick Fix

To temporarily suppress 404 errors, you can:
1. Create a simple `favicon.ico` file (even a blank one)
2. Or remove the icon references from `app/layout.tsx`

The 404 errors are cosmetic and don't affect functionality.


