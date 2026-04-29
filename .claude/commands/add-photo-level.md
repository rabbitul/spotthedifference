Add a new real-photo spot-the-difference level to the game.

Arguments (optional): $ARGUMENTS
- e.g. `/add-photo-level` — will look for photos in `poze-reale/`
- e.g. `/add-photo-level natura1.jpg natura2.jpg` — explicit filenames

## Instructions

### Step 1 – Find the photos
Look in `poze-reale/` for two images (original + modified).
If filenames were given in arguments use those, otherwise pick the newest pair.
**Both images must be the same pixel dimensions** — if not, tell the user and stop.

### Step 2 – Auto-detect differences via Python
Run this script to find all changed regions:

```python
from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage

img1 = Image.open("poze-reale/ORIGINAL.jpg").convert("RGB")
img2 = Image.open("poze-reale/MODIFIED.jpg").convert("RGB")
# Verify same size
assert img1.size == img2.size, f"Size mismatch: {img1.size} vs {img2.size}"

a1 = np.array(img1.filter(ImageFilter.GaussianBlur(2))).astype(int)
a2 = np.array(img2.filter(ImageFilter.GaussianBlur(2))).astype(int)
diff = np.abs(a1 - a2).max(axis=2)

mask = diff > 30
labeled, n = ndimage.label(ndimage.binary_dilation(mask, iterations=6))

regions = []
for lbl in range(1, n + 1):
    rows, cols = np.where(labeled == lbl)
    actual = mask[rows, cols].sum()
    if actual < 200:
        continue
    y0, y1 = rows.min(), rows.max()
    x0, x1 = cols.min(), cols.max()
    cx = (x0 + x1) / 2
    cy = (y0 + y1) / 2
    regions.append((actual, x0, y0, x1, y1, cx, cy))

regions.sort(reverse=True)
for area, x0, y0, x1, y1, cx, cy in regions:
    print(f"area={area} bbox=[{x0},{y0}→{x1},{y1}] img_cx={cx:.0f} img_cy={cy:.0f}")
```

Also save zoomed crops of each region for visual verification:
```python
from PIL import ImageDraw
W, H = img1.size
for i, (area, x0, y0, x1, y1, cx, cy) in enumerate(regions):
    pad = 80
    c1 = img1.crop((max(0,x0-pad), max(0,y0-pad), min(W,x1+pad), min(H,y1+pad)))
    c2 = img2.crop((max(0,x0-pad), max(0,y0-pad), min(W,x1+pad), min(H,y1+pad)))
    ann = c2.copy(); d = ImageDraw.Draw(ann)
    d.rectangle([pad-4, pad-4, c2.width-pad+4, c2.height-pad+4], outline="red", width=4)
    out = Image.new("RGB", (c1.width*2+8, c1.height), (30,30,30))
    out.paste(c1, (0,0)); out.paste(ann, (c1.width+8, 0))
    out.save(f"/tmp/diff_region_{i+1}.jpg", quality=95)
```
Read each `/tmp/diff_region_N.jpg` to visually confirm what changed, then write a short label.

### Step 3 – Convert image coords → SVG normalized coords
SVG viewBox is always `0 0 800 600`, image uses `preserveAspectRatio="xMidYMid slice"`.

```
img_w, img_h  = image pixel dimensions
scale         = max(800 / img_w,  600 / img_h)
h_offset      = max(0, (img_w * scale - 800) / 2)
v_offset      = max(0, (img_h * scale - 600) / 2)

svg_x = img_cx * scale - h_offset
svg_y = img_cy * scale - v_offset

cx = svg_x / 800      # normalized 0–1
cy = svg_y / 600      # normalized 0–1
```

Use `r = 0.05` as default for real photos (≈40px radius in SVG — precise but still clickable).
Use `r = 0.06` for larger modified areas (color fills, big objects).
Avoid going above `r = 0.07` for photo levels — it feels too generous.

### Step 4 – Determine next level ID
Read `src/data/levels.ts` and find the highest existing `id`. New level = that + 1 (call it `N`).

### Step 5 – Copy photos to public/
```bash
cp poze-reale/ORIGINAL.jpg public/SLUG-original.jpg
cp poze-reale/MODIFIED.jpg public/SLUG-modified.jpg
```
Choose a short lowercase SLUG from the photo content (e.g. `football-match`, `beach-sunset`).

### Step 6 – Create `src/scenes/LevelNScene.tsx`
```tsx
/* TITLE – Level N (real photo)
   Differences:
   1. LABEL — img center (IMG_CX, IMG_CY) → cx=CX cy=CY
   ...
*/
export function LevelNOriginal() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image href="/SLUG-original.jpg" x="0" y="0" width="800" height="600"
             preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
export function LevelNModified() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image href="/SLUG-modified.jpg" x="0" y="0" width="800" height="600"
             preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
```

### Step 7 – Add to `src/data/levels.ts`
Add import at the top:
```ts
import { LevelNOriginal, LevelNModified } from '../scenes/LevelNScene';
```

Add entry at the end of the `LEVELS` array:
```ts
{
  id: N,
  title: 'TITLE',
  description: 'Real photo! Find X differences...',
  category: 'sports',   // sports | nature | space | fantasy | celebrities | anime
  difficulty: 'Hard',   // Easy | Medium | Hard
  emoji: '⚽',
  popular: true,
  timeLimit: 180,
  maxHints: 3,
  OriginalScene: LevelNOriginal,
  ModifiedScene: LevelNModified,
  differences: [
    { id: 'lN-d1', cx: 0.XXX, cy: 0.XXX, r: 0.08, label: 'LABEL' },
    // one entry per detected region
  ],
},
```

### Step 8 – TypeScript check
```bash
npx tsc --noEmit
```
Fix any errors before continuing.

### Step 9 – Commit and push to GitHub
```bash
git add src/scenes/LevelNScene.tsx src/data/levels.ts public/SLUG-*.jpg
git commit -m "feat: add Level N TITLE real-photo level"
git push origin main
```

### Step 10 – Deploy to Vercel
Ask the user for the Vercel token if not provided, then:
```bash
curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer VERCEL_TOKEN" \
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
Wait for `readyState: READY` by polling `GET /v13/deployments/DEP_ID`.
Report the live URL when done.
