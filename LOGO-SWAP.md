# Trash Cowboys — Logo Swap Guide

The site is built logo-agnostic. The current SVG placeholders match the brand board (Pine Ridge green circle + cowboy hat + Dust Devil red band + Sagebrush sprig) so the site looks complete, but they're designed to be replaced with your real logo in **one file change per spot**.

## Where the logo lives

There are **5 logo instances** in `index.html`:

| # | Location | Size | Recommended file |
|---|----------|------|------------------|
| 1 | Nav (top left)          | 44×44px  | `logo-mark.svg` or `logo-mark.png` (square/circle) |
| 2 | Hero (right side)       | 280×280px | `logo-primary.svg` (full badge) |
| 3 | About section           | 240×240px | `logo-primary.svg` (same as hero) |
| 4 | Footer                  | 48×48px  | `logo-mark.svg` (same as nav) |
| 5 | Favicon                 | 32×32px  | `images/favicon.png` |

## How to swap

### Option 1 — Drop-in replacement (fastest)

1. Save your real logo files into `/images/`:
   - `images/logo-primary.svg` (full badge, square aspect ratio)
   - `images/logo-mark.svg` (simplified mark for small sizes)
   - `images/favicon.png` (32×32 or 64×64)

2. In `index.html`, find each `<svg>` placeholder and replace with:
   ```html
   <img src="images/logo-primary.svg" alt="Trash Cowboys" width="280">
   ```

3. The placeholder comment `<!-- LOGO SWAP: ... -->` marks each spot.

### Option 2 — Keep the SVG placeholder, tweak the code

If your real logo is an SVG and you want to keep it inline for crisp rendering, open it in a text editor, copy the `<svg>...</svg>` contents, and paste over the placeholder SVG in `index.html`.

## Color reference (for designer handoff)

- Pine Ridge (primary): `#1A3A2E`
- Bone White: `#F5F1E8`
- Dust Devil (red band): `#C44B1B`
- Spur Gold (rope/accents): `#D4A74A`
- Sagebrush (eco green): `#7A8F5C`
- Saddle Black (text): `#2B1D14`
