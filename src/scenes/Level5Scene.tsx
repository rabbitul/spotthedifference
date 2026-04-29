/* Basketball Court – Level 5
   Differences (Modified vs Original):
   1. Shot clock: 14 → 7
   2. Player jersey: red #23 → yellow #23
   3. Backboard: white stripe → red stripe
   4. Court 3-point line: white → orange
   5. Banner: blue → green
*/

interface SceneProps {
  shotClock?: number;
  jerseyColor?: string;
  backboardStripe?: string;
  threePointColor?: string;
  bannerColor?: string;
}

function BasketballScene({
  shotClock = 14,
  jerseyColor = '#e74c3c',
  backboardStripe = '#ffffff',
  threePointColor = '#ffffff',
  bannerColor = '#2980b9',
}: SceneProps) {
  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="arenaGrad5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="70%" stopColor="#16213e" />
          <stop offset="100%" stopColor="#0f3460" />
        </linearGradient>
        <linearGradient id="courtGrad5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8860a" />
          <stop offset="100%" stopColor="#a0680a" />
        </linearGradient>
      </defs>

      {/* Arena background */}
      <rect width="800" height="600" fill="url(#arenaGrad5)" />

      {/* Upper stands */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="0" y={i * 40} width="800" height="38"
          fill={i % 2 === 0 ? '#1f2b4d' : '#172040'} />
      ))}
      {/* Crowd */}
      {Array.from({ length: 100 }, (_, i) => (
        <circle key={i}
          cx={15 + (i % 50) * 15 + (Math.floor(i / 50)) * 7}
          cy={16 + Math.floor(i / 50) * 40}
          r="5"
          fill={['#e74c3c','#3498db','#f1c40f','#ecf0f1','#e67e22','#1abc9c'][i % 6]}
          opacity="0.8"
        />
      ))}

      {/* Banners hanging */}
      {[100, 250, 550, 700].map((x, i) => (
        <g key={i} transform={`translate(${x}, 0)`}>
          <rect x="-20" y="0" width="40" height="70" fill={i === 1 ? bannerColor : '#c0392b'} />
          <polygon points="-20,70 0,85 20,70" fill={i === 1 ? bannerColor : '#c0392b'} />
          <text x="0" y="40" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
            {['2019','2021','2023','2024'][i]}
          </text>
          <text x="0" y="55" textAnchor="middle" fill="white" fontSize="7">CHAMPS</text>
        </g>
      ))}

      {/* Court floor */}
      <rect x="0" y="160" width="800" height="440" fill="url(#courtGrad5)" />
      {/* Wood grain lines */}
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1="0" y1={165 + i * 24} x2="800" y2={165 + i * 24}
          stroke="#8b5e0a" strokeWidth="0.8" opacity="0.4" />
      ))}

      {/* Court markings */}
      {/* Center circle */}
      <circle cx="400" cy="390" r="60" fill="none" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      <line x1="400" y1="160" x2="400" y2="600" stroke={threePointColor} strokeWidth="2.5" opacity="0.5" />
      {/* Left 3-pt arc */}
      <path d="M80,190 Q80,430 280,490" fill="none" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      <line x1="80" y1="190" x2="80" y2="310" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      <line x1="280" y1="490" x2="280" y2="580" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      {/* Right 3-pt arc */}
      <path d="M720,190 Q720,430 520,490" fill="none" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      <line x1="720" y1="190" x2="720" y2="310" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      <line x1="520" y1="490" x2="520" y2="580" stroke={threePointColor} strokeWidth="2.5" opacity="0.8" />
      {/* Key areas */}
      <rect x="80" y="160" width="160" height="250" fill="rgba(231,76,60,0.15)" stroke={threePointColor} strokeWidth="2" opacity="0.7" />
      <rect x="560" y="160" width="160" height="250" fill="rgba(52,152,219,0.15)" stroke={threePointColor} strokeWidth="2" opacity="0.7" />
      {/* Free throw circles */}
      <circle cx="160" cy="410" r="60" fill="none" stroke={threePointColor} strokeWidth="2" opacity="0.6" />
      <circle cx="640" cy="410" r="60" fill="none" stroke={threePointColor} strokeWidth="2" opacity="0.6" />
      {/* Baselines */}
      <rect x="0" y="160" width="800" height="440" fill="none" stroke={threePointColor} strokeWidth="3" opacity="0.7" />

      {/* LEFT HOOP ASSEMBLY */}
      {/* Backboard */}
      <rect x="42" y="175" width="70" height="50" rx="3" fill="#e8e8e8" stroke="#ccc" strokeWidth="2" />
      <rect x="50" y="183" width="54" height="34" rx="2" fill="none" stroke={backboardStripe} strokeWidth="3" />
      {/* Hoop support */}
      <rect x="77" y="225" width="6" height="20" fill="#888" />
      {/* Hoop */}
      <ellipse cx="95" cy="248" rx="22" ry="6" fill="none" stroke="#e67e22" strokeWidth="4" />
      {/* Net */}
      {[-3,-1,1,3].map(i => (
        <line key={i} x1={95 + i * 4} y1="253" x2={95 + i * 3} y2="278" stroke="white" strokeWidth="1.2" opacity="0.7" />
      ))}
      <path d="M73,278 Q95,290 117,278" fill="none" stroke="white" strokeWidth="1.2" opacity="0.7" />
      {/* Shot clock on backboard */}
      <rect x="58" y="160" width="34" height="22" rx="4" fill="#111" />
      <text x="75" y="176" textAnchor="middle" fill="#ff4" fontSize="16" fontFamily="monospace" fontWeight="bold">{shotClock}</text>

      {/* RIGHT HOOP ASSEMBLY */}
      <rect x="688" y="175" width="70" height="50" rx="3" fill="#e8e8e8" stroke="#ccc" strokeWidth="2" />
      <rect x="696" y="183" width="54" height="34" rx="2" fill="none" stroke={backboardStripe} strokeWidth="3" />
      <rect x="717" y="225" width="6" height="20" fill="#888" />
      <ellipse cx="705" cy="248" rx="22" ry="6" fill="none" stroke="#e67e22" strokeWidth="4" />
      {[-3,-1,1,3].map(i => (
        <line key={i} x1={705 + i * 4} y1="253" x2={705 + i * 3} y2="278" stroke="white" strokeWidth="1.2" opacity="0.7" />
      ))}
      <path d="M683,278 Q705,290 727,278" fill="none" stroke="white" strokeWidth="1.2" opacity="0.7" />
      <rect x="708" y="160" width="34" height="22" rx="4" fill="#111" />
      <text x="725" y="176" textAnchor="middle" fill="#ff4" fontSize="16" fontFamily="monospace" fontWeight="bold">24</text>

      {/* PLAYER 1 – jumping with ball */}
      <g transform="translate(230, 280)">
        {/* Jersey */}
        <rect x="-20" y="18" width="40" height="48" rx="6" fill={jerseyColor} />
        <text x="0" y="46" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">23</text>
        {/* Head */}
        <circle cx="0" cy="8" r="19" fill="#8d5524" />
        <rect x="-10" y="-6" width="20" height="8" rx="3" fill={jerseyColor} />
        {/* Arms outstretched */}
        <rect x="-42" y="20" width="24" height="9" rx="4" fill={jerseyColor} transform="rotate(-25,-42,20)" />
        <rect x="18" y="10" width="28" height="9" rx="4" fill={jerseyColor} transform="rotate(-50,18,10)" />
        {/* Legs */}
        <rect x="-18" y="64" width="16" height="42" rx="5" fill="#1a1a2e" transform="rotate(-8,-18,64)" />
        <rect x="2" y="64" width="16" height="42" rx="5" fill="#1a1a2e" transform="rotate(12,2,64)" />
        {/* Shoes */}
        <rect x="-28" y="102" width="22" height="10" rx="4" fill="#c0392b" />
        <rect x="10" y="104" width="22" height="10" rx="4" fill="#c0392b" />
      </g>

      {/* PLAYER 2 – defending */}
      <g transform="translate(590, 295)">
        <rect x="-20" y="18" width="40" height="48" rx="6" fill="#2980b9" />
        <text x="0" y="46" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">7</text>
        <circle cx="0" cy="8" r="19" fill="#f5cba7" />
        <rect x="-10" y="-6" width="20" height="8" rx="3" fill="#2980b9" />
        <rect x="-44" y="16" width="26" height="9" rx="4" fill="#2980b9" transform="rotate(30,-44,16)" />
        <rect x="18" y="16" width="26" height="9" rx="4" fill="#2980b9" transform="rotate(-20,18,16)" />
        <rect x="-18" y="64" width="16" height="42" rx="5" fill="#1a1a2e" transform="rotate(8,-18,64)" />
        <rect x="2" y="64" width="16" height="42" rx="5" fill="#1a1a2e" transform="rotate(-10,2,64)" />
        <rect x="-26" y="104" width="22" height="10" rx="4" fill="#1a252f" />
        <rect x="6" y="104" width="22" height="10" rx="4" fill="#1a252f" />
      </g>

      {/* BASKETBALL */}
      <circle cx="310" cy="220" r="24" fill="#e67e22" stroke="#c0551a" strokeWidth="1.5" />
      <path d="M287,220 Q310,200 333,220" fill="none" stroke="#1a1a1a" strokeWidth="1.8" />
      <path d="M287,220 Q310,240 333,220" fill="none" stroke="#1a1a1a" strokeWidth="1.8" />
      <path d="M310,196 Q295,220 310,244" fill="none" stroke="#1a1a1a" strokeWidth="1.8" />
      <path d="M310,196 Q325,220 310,244" fill="none" stroke="#1a1a1a" strokeWidth="1.8" />

      {/* SCOREBOARD top center */}
      <rect x="300" y="10" width="200" height="90" rx="8" fill="#111" stroke="#f39c12" strokeWidth="2" />
      <text x="400" y="34" textAnchor="middle" fill="#f39c12" fontSize="12" fontWeight="bold">NBA FINALS</text>
      <text x="340" y="70" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">87</text>
      <text x="400" y="70" textAnchor="middle" fill="#888" fontSize="24">:</text>
      <text x="460" y="70" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">84</text>
      <text x="340" y="88" textAnchor="middle" fill="#e74c3c" fontSize="10">HOME</text>
      <text x="460" y="88" textAnchor="middle" fill="#3498db" fontSize="10">AWAY</text>
      <text x="400" y="88" textAnchor="middle" fill="#888" fontSize="10">Q4 02:14</text>
    </svg>
  );
}

export function Level5Original() {
  return <BasketballScene shotClock={14} jerseyColor="#e74c3c" backboardStripe="#ffffff" threePointColor="#ffffff" bannerColor="#2980b9" />;
}

export function Level5Modified() {
  return <BasketballScene shotClock={7} jerseyColor="#f1c40f" backboardStripe="#e74c3c" threePointColor="#e67e22" bannerColor="#27ae60" />;
}
