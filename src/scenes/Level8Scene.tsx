/* Football Match – Level 8  (real photo)
   Original photo: fotbal-match-original.jpg  (3000×2000)
   Modified photo: fotbal-match-modified.jpg

   Image → SVG coordinate mapping (preserveAspectRatio="xMidYMid slice"):
     scale   = 600 / 2000 = 0.300
     h_offset = (3000*0.300 - 800) / 2 = 50 SVG units cropped per side
     svg_x = img_px * 0.300 - 50
     svg_y = img_py * 0.300
     cx = svg_x / 800,  cy = svg_y / 600

   Differences:
   1. Person sitting on the sideline bench disappeared
      img center (657, 624) → svg (147, 187) → cx=0.184  cy=0.312
   2. White curved line on pitch removed
      img center (588, 1541) → svg (126, 462) → cx=0.158  cy=0.771
*/

export function Level8Original() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image
        href="/fotbal-match-original.jpg"
        x="0" y="0" width="800" height="600"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}

export function Level8Modified() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image
        href="/fotbal-match-modified.jpg"
        x="0" y="0" width="800" height="600"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
