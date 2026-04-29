/* Soccer Match – Level 4
   Differences (Modified vs Original):
   1. Ball: pentagon pattern → no pentagons (plain white)
   2. Player #9 jersey number → #7
   3. Scoreboard: HOME 1 – AWAY 0 → HOME 2 – AWAY 0
   4. Goal net: white → bright yellow
   5. Referee shirt: black → red
*/

interface SceneProps {
  uid: string;           // unique suffix to avoid SVG id conflicts between panels
  ballShowPattern?: boolean;
  playerNumber?: string;
  homeScore?: number;
  netColor?: string;
  refColor?: string;
}

function SoccerScene({
  uid,
  ballShowPattern = true,
  playerNumber = '9',
  homeScore = 1,
  netColor = '#f0f0f0',
  refColor = '#111111',
}: SceneProps) {
  const netPatId   = `netPat4-${uid}`;
  const skyGradId  = `skyGrad4-${uid}`;
  const grassGradId= `grassGrad4-${uid}`;

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={skyGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a6bc4" />
          <stop offset="100%" stopColor="#5ba3f5" />
        </linearGradient>
        <linearGradient id={grassGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d8c3e" />
          <stop offset="100%" stopColor="#1e6b2d" />
        </linearGradient>
        <pattern id={netPatId} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={netColor} />
          <path d="M0 0 L8 8 M8 0 L0 8" stroke="#bbb" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect width="800" height="600" fill={`url(#${skyGradId})`} />

      {/* Stadium stands */}
      <rect x="0" y="0" width="800" height="220" fill="#1a5276" opacity="0.85" />
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="0" y={30 + i * 36} width="800" height="34"
          fill={i % 2 === 0 ? '#1f618d' : '#154360'} opacity="0.9" />
      ))}
      {/* Crowd */}
      {Array.from({ length: 120 }, (_, i) => (
        <circle key={i}
          cx={20 + (i % 40) * 19 + (Math.floor(i / 40) % 2) * 9}
          cy={42 + Math.floor(i / 40) * 36}
          r="6"
          fill={['#e74c3c','#3498db','#f1c40f','#ecf0f1','#e67e22','#9b59b6'][i % 6]}
          opacity="0.85"
        />
      ))}

      {/* Grass */}
      <rect x="0" y="220" width="800" height="380" fill={`url(#${grassGradId})`} />
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={i * 115} y="220" width="57" height="380" fill="#2ecc71" opacity="0.12" />
      ))}

      {/* Field lines */}
      <rect x="80" y="220" width="640" height="360" fill="none" stroke="white" strokeWidth="3" opacity="0.7" />
      <line x1="400" y1="220" x2="400" y2="580" stroke="white" strokeWidth="2.5" opacity="0.7" />
      <circle cx="400" cy="400" r="60" fill="none" stroke="white" strokeWidth="2.5" opacity="0.7" />
      <circle cx="400" cy="400" r="4" fill="white" opacity="0.7" />
      <rect x="80"  y="310" width="140" height="170" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
      <rect x="580" y="310" width="140" height="170" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />

      {/* LEFT GOAL */}
      <rect x="50" y="330" width="80" height="120" fill="none" stroke="white" strokeWidth="3" />
      <rect x="52" y="332" width="78" height="118" fill={`url(#${netPatId})`} opacity="0.95" />
      <rect x="48" y="328" width="6" height="124" fill="#ddd" rx="2" />
      <rect x="126" y="328" width="6" height="124" fill="#ddd" rx="2" />
      <rect x="48" y="328" width="84" height="6"   fill="#ddd" rx="2" />

      {/* RIGHT GOAL */}
      <rect x="670" y="330" width="80" height="120" fill="none" stroke="white" strokeWidth="3" />
      <rect x="672" y="332" width="78" height="118" fill={`url(#${netPatId})`} opacity="0.95" />
      <rect x="668" y="328" width="6"  height="124" fill="#ddd" rx="2" />
      <rect x="746" y="328" width="6"  height="124" fill="#ddd" rx="2" />
      <rect x="668" y="328" width="84" height="6"   fill="#ddd" rx="2" />

      {/* PLAYER 1 – home team (red), jersey number changes */}
      <g transform="translate(210, 290)">
        <rect x="-18" y="20" width="36" height="45" rx="6" fill="#e74c3c" />
        <text x="0" y="48" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{playerNumber}</text>
        <circle cx="0" cy="10" r="18" fill="#f5cba7" />
        <rect x="-8" y="-4" width="16" height="8" rx="3" fill="#c0392b" />
        <rect x="-34" y="22" width="18" height="8" rx="4" fill="#e74c3c" transform="rotate(-20,-34,22)" />
        <rect x="16"  y="22" width="18" height="8" rx="4" fill="#e74c3c" transform="rotate(30,16,22)" />
        <rect x="-16" y="64" width="14" height="38" rx="4" fill="#2c3e50" transform="rotate(-10,-16,64)" />
        <rect x="2"   y="64" width="14" height="38" rx="4" fill="#2c3e50" transform="rotate(15,2,64)" />
        <ellipse cx="-18" cy="102" rx="12" ry="6" fill="#111" transform="rotate(-10,-18,102)" />
        <ellipse cx="14"  cy="104" rx="12" ry="6" fill="#111" transform="rotate(15,14,104)" />
      </g>

      {/* PLAYER 2 – away team (blue) */}
      <g transform="translate(560, 300)">
        <rect x="-18" y="20" width="36" height="45" rx="6" fill="#3498db" />
        <text x="0" y="48" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">11</text>
        <circle cx="0" cy="10" r="18" fill="#f5cba7" />
        <rect x="-8" y="-4" width="16" height="8" rx="3" fill="#2980b9" />
        <rect x="-34" y="22" width="18" height="8" rx="4" fill="#3498db" transform="rotate(15,-34,22)" />
        <rect x="16"  y="22" width="18" height="8" rx="4" fill="#3498db" transform="rotate(-20,16,22)" />
        <rect x="-16" y="64" width="14" height="38" rx="4" fill="#2c3e50" transform="rotate(10,-16,64)" />
        <rect x="2"   y="64" width="14" height="38" rx="4" fill="#2c3e50" transform="rotate(-8,2,64)" />
        <ellipse cx="-14" cy="102" rx="12" ry="6" fill="#111" />
        <ellipse cx="14"  cy="100" rx="12" ry="6" fill="#111" />
      </g>

      {/* REFEREE – shirt color changes */}
      <g transform="translate(490, 370)">
        <rect x="-14" y="16" width="28" height="40" rx="5" fill={refColor} />
        <circle cx="0" cy="8" r="14" fill="#f5cba7" />
        <rect x="-12" y="56" width="11" height="32" rx="4" fill="#1a1a1a" />
        <rect x="1"   y="56" width="11" height="32" rx="4" fill="#1a1a1a" />
        <ellipse cx="-8" cy="88" rx="9" ry="5" fill="#111" />
        <ellipse cx="9"  cy="88" rx="9" ry="5" fill="#111" />
      </g>

      {/* SOCCER BALL */}
      <g transform="translate(400, 300)">
        <circle cx="0" cy="0" r="28" fill="white" stroke="#ddd" strokeWidth="1.5" />
        {ballShowPattern && <>
          <polygon points="0,-16 12,-8 8,8 -8,8 -12,-8" fill="#111" opacity="0.85" />
          <polygon points="0,-24 14,-18 18,-4 6,8 -6,8 -18,-4 -14,-18"
            fill="none" stroke="#111" strokeWidth="1.5" opacity="0.6" />
          <circle cx="14"  cy="14"  r="7" fill="#111" opacity="0.8" />
          <circle cx="-14" cy="14"  r="7" fill="#111" opacity="0.8" />
          <circle cx="0"   cy="-20" r="6" fill="#111" opacity="0.7" />
          <circle cx="18"  cy="-6"  r="5" fill="#111" opacity="0.6" />
          <circle cx="-18" cy="-6"  r="5" fill="#111" opacity="0.6" />
        </>}
        <circle cx="0" cy="0" r="28" fill="none" stroke="#ccc" strokeWidth="1" />
      </g>

      {/* SCOREBOARD */}
      <rect x="560" y="28" width="220" height="86" rx="8" fill="#1a1a2e" stroke="#f39c12" strokeWidth="2" />
      <text x="670" y="52" textAnchor="middle" fill="#f39c12" fontSize="13" fontWeight="bold">SCOREBOARD</text>
      <text x="615" y="90" textAnchor="middle" fill="white"   fontSize="26" fontWeight="bold">{homeScore}</text>
      <text x="670" y="90" textAnchor="middle" fill="#aaa"    fontSize="24" fontWeight="bold">–</text>
      <text x="725" y="90" textAnchor="middle" fill="white"   fontSize="26" fontWeight="bold">0</text>
      <text x="615" y="106" textAnchor="middle" fill="#e74c3c" fontSize="11">HOME</text>
      <text x="725" y="106" textAnchor="middle" fill="#3498db" fontSize="11">AWAY</text>

      {/* TIMER */}
      <rect x="350" y="30" width="100" height="36" rx="6" fill="#1a1a2e" stroke="#555" strokeWidth="1" />
      <text x="400" y="54" textAnchor="middle" fill="#0f0" fontSize="20" fontFamily="monospace">67:23</text>

      {/* SPONSOR BOARD */}
      <rect x="0" y="195" width="800" height="28" fill="#f39c12" />
      <text x="400" y="214" textAnchor="middle" fill="#1a1a2e" fontSize="12"
        fontWeight="bold" letterSpacing="6">
        CHAMPIONS LEAGUE · FINAL · STADIUM NAME · SPOT THE DIFFERENCE
      </text>
    </svg>
  );
}

export function Level4Original() {
  return <SoccerScene uid="orig" ballShowPattern={true}  playerNumber="9" homeScore={1} netColor="#f0f0f0"  refColor="#111111"  />;
}
export function Level4Modified() {
  return <SoccerScene uid="mod"  ballShowPattern={false} playerNumber="7" homeScore={2} netColor="#f5c518"  refColor="#e74c3c"  />;
}
