/* Stadium Night – Level 7  (real photo)
   Original photo: stadium-original.jpg
   Modified photo: stadium-modified.jpg  (5 differences created with Python/PIL)

   Differences:
   1. Roof LED ring: blue  → orange  (top center strip)
   2. Scoreboard:    blue  → pink/red (upper right area)
   3. Left stands:   dark  → cyan tint (upper-left crowd section)
   4. Ad board:      dark  → yellow   (pitch-side advertising strip)
   5. Pitch logo:    green → pink     (center circle marking)
*/

export function Level7Original() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image
        href="/stadium-original.jpg"
        x="0" y="0" width="800" height="600"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}

export function Level7Modified() {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg"
         style={{ display: 'block', width: '100%', height: 'auto' }}>
      <image
        href="/stadium-modified.jpg"
        x="0" y="0" width="800" height="600"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
