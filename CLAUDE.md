# Spot the Difference – Project Memory

## Stack
React + TypeScript + Vite. SVG-based scenes. Deploy: GitHub (`rabbitul/spotthedifference`) + Vercel.

## Tokens (stored locally, never commit)
- GitHub token: see owner's password manager
- Vercel token: see owner's password manager
- Vercel repo ID: `1224386498`
<!-- Tokens intentionally omitted — ask the user to provide them each session -->

---

## Adding a new REAL PHOTO level

### 1. User drops photos in `poze-reale/`
- `fotbalX.jpg` = original
- `fotbalX-mod.jpg` = modified (same pixel dimensions!)
- **Images MUST be the same size** — otherwise pixel diff is unreliable.

### 2. Auto-detect differences with Python
```python
from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

img1 = Image.open("poze-reale/original.jpg").convert("RGB")
img2 = Image.open("poze-reale/modified.jpg").convert("RGB")
# Must be same size!

a1 = np.array(img1.filter(ImageFilter.GaussianBlur(2))).astype(int)
a2 = np.array(img2.filter(ImageFilter.GaussianBlur(2))).astype(int)
diff = np.abs(a1 - a2).max(axis=2)

mask = diff > 30
labeled, n = ndimage.label(ndimage.binary_dilation(mask, iterations=6))
# Filter regions with < 200 actual diff pixels → those are noise
# Remaining regions = real differences
# Each region: get bbox → compute center → convert to SVG coords
```

### 3. Convert image coords → SVG normalized coords
SVG viewBox is always `0 0 800 600`. Image is displayed with `preserveAspectRatio="xMidYMid slice"`.

```
img_w, img_h = actual image pixel dimensions

scale    = max(800 / img_w,  600 / img_h)   # "slice" = use the LARGER scale
svg_full_w = img_w * scale
svg_full_h = img_h * scale
h_offset = (svg_full_w - 800) / 2           # pixels cropped from left/right
v_offset = (svg_full_h - 600) / 2           # pixels cropped from top/bottom

svg_x = img_px_x * scale - h_offset
svg_y = img_px_y * scale - v_offset

cx = svg_x / 800     # normalized 0-1
cy = svg_y / 600     # normalized 0-1
```

Example for 3000×2000 image:
- scale = max(800/3000, 600/2000) = max(0.267, 0.300) = 0.300
- h_offset = (3000×0.300 − 800) / 2 = 50
- v_offset = (2000×0.300 − 600) / 2 = 0
- `svg_x = img_x * 0.300 − 50`
- `svg_y = img_y * 0.300`

### 4. Create the scene file
`src/scenes/LevelNScene.tsx`:
```tsx
export function LevelNOriginal() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image href="/photo-original.jpg" x="0" y="0" width="800" height="600"
             preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
export function LevelNModified() { /* same with /photo-modified.jpg */ }
```

### 5. Add to `src/data/levels.ts`
```ts
{
  id: N,
  title: '...',
  description: 'Real photo! Find X differences...',
  category: 'sports',   // or nature / space / etc.
  difficulty: 'Hard',
  emoji: '...',
  popular: true,
  timeLimit: 180,
  maxHints: 3,
  OriginalScene: LevelNOriginal,
  ModifiedScene: LevelNModified,
  differences: [
    { id: 'lN-d1', cx: 0.XXX, cy: 0.XXX, r: 0.08, label: 'Description' },
    ...
  ],
}
```

### 6. Copy photos to `public/`
```bash
cp poze-reale/original.jpg public/photo-original.jpg
cp poze-reale/modified.jpg public/photo-modified.jpg
```

### 7. Deploy
```bash
git add src/scenes/LevelNScene.tsx src/data/levels.ts public/photo-*.jpg
git commit -m "feat: add Level N ..."
git push origin main
# then trigger Vercel API deployment
```

---

## Hit detection formula (for reference)
```ts
// hitTest.ts
dx = nx - cx
dy = (ny - cy) / 0.75   // 0.75 = height/width ratio (600/800)
dist = sqrt(dx² + dy²)
hit = dist <= r
```
Use `r ≈ 0.08` for medium targets, `r ≈ 0.10` for large areas, `r ≈ 0.06` for tiny elements.

---

## SVG parametric levels (non-photo)
- Each scene gets a `uid` prop (`"orig"` / `"mod"`) — all `<defs>` IDs must use it: `id={\`patternName-${uid}\`}` to avoid browser reusing the wrong definition between the two panels.
- Hit zone coords: read the SVG element positions directly from the scene file, compute center in SVG space (0-800, 0-600), divide by 800/600.

---

## Vercel deploy via API
```bash
# VERCEL_TOKEN and GITHUB_TOKEN come from the user — never hardcode them
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "spotthedifference",
    "gitSource": {
      "type": "github",
      "repo": "rabbitul/spotthedifference",
      "ref": "main",
      "repoId": "1224386498"
    },
    "projectSettings": { "framework": "vite" }
  }'
```
