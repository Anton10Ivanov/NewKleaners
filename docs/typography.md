# Typography Guide

## Inter as the Primary Typeface

- Source: Google Fonts (variable or static weights)
- Rationale: High legibility, broad language support, excellent screen rendering

## Loading Strategy (Next.js)

```ts
import { Inter } from 'next/font/google';
export const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

- Apply `inter.className` on `<body>` in `app/layout.tsx`
- Prefer `display: 'swap'` to avoid FOIT

## Tailwind Mapping

```js
// tailwind.config.ts
extend: {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'];
  }
}
```

- Use `font-sans` for all body text by default

## Weight Guidance

- 300: large hero subtitles
- 400: body text default
- 500: emphasized body, labels
- 600–700: headings and CTAs

## OpenType Features (Optional)

```css
.font-features {
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'ss01';
}
```

## Accessibility & Readability

- Body line-height ≥ 1.6
- Min font-size 14px for dense UI; default 16px
- Ensure contrast per WCAG 2.1 AA

## Testing Checklist

- Verify Inter loads (network tab) and `inter.className` is present on `<body>`
- Confirm `font-sans` resolves to Inter in computed styles
- Check fallback fonts render acceptably if Inter fails
- Validate heading and body weights across pages
- Lighthouse: avoid text-based layout shift

## Fallback Stack

- `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

## Do/Don’t

- Do use Tailwind utilities for consistent sizing
- Don’t hardcode font-family per component; use `font-sans`
- Don’t mix multiple brand typefaces without approval
