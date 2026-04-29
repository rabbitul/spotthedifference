/* Stadium Night Match – Level 9  (real photo)
   Original photo: stadion-night-original.jpg  (3843×2179)
   Modified photo: stadion-night-modified.jpg

   SVG mapping (preserveAspectRatio="xMidYMid slice"):
     scale=0.2754  h_offset=129.1  v_offset=0
     svg_x = img_px * 0.2754 - 129.1
     svg_y = img_py * 0.2754

   Differences (pixel diff threshold=10, blur=2):
   1. Player with green boots removed from pitch
      img center (727, 1677) → cx=0.0889  cy=0.7696
   2. Person removed from center-right pitch area
      img center (2246, 1577) → cx=0.6117  cy=0.7237
   3. Small pitch marking/object removed
      img center (1184, 1826) → cx=0.2463  cy=0.8382
*/

export function Level9Original() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image
        href="/stadion-night-original.jpg"
        x="0" y="0" width="800" height="600"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}

export function Level9Modified() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image
        href="/stadion-night-modified.jpg"
        x="0" y="0" width="800" height="600"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
