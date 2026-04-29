/* Tennis Grand Slam – Level 6
   Differences (Modified vs Original):
   1. Net center strap: white → red
   2. Player racket grip: black → green
   3. Scoreboard: 40 → AD (Advantage)
   4. Court surface: clay red → blue hard court
   5. Towel on chair: white → orange
*/

interface SceneProps {
  netStrapColor?: string;
  racketGripColor?: string;
  playerScore?: string;
  courtColor?: string;
  towelColor?: string;
}

function TennisScene({
  netStrapColor = '#ffffff',
  racketGripColor = '#111111',
  playerScore = '40',
  courtColor = '#c0392b',
  towelColor = '#ffffff',
}: SceneProps) {
  const courtLight = courtColor === '#c0392b' ? '#c8401a' : '#2573a7';
  const courtLine = '#ffffff';

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="100%" stopColor="#b8dff7" />
        </linearGradient>
        <linearGradient id="standGrad6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="100%" stopColor="#1a252f" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="600" fill="url(#skyGrad6)" />

      {/* Clouds */}
      <ellipse cx="150" cy="60" rx="70" ry="28" fill="white" opacity="0.9" />
      <ellipse cx="190" cy="52" rx="50" ry="22" fill="white" opacity="0.9" />
      <ellipse cx="600" cy="80" rx="80" ry="30" fill="white" opacity="0.85" />
      <ellipse cx="650" cy="70" rx="55" ry="24" fill="white" opacity="0.85" />

      {/* Stadium stands */}
      <rect x="0" y="0" width="800" height="180" fill="url(#standGrad6)" />
      {[0,1,2,3].map(i => (
        <rect key={i} x="0" y={10 + i * 42} width="800" height="40"
          fill={i % 2 === 0 ? '#2c3e50' : '#1a252f'} opacity="0.9" />
      ))}
      {/* Crowd */}
      {Array.from({ length: 90 }, (_, i) => (
        <circle key={i}
          cx={16 + (i % 45) * 17 + (Math.floor(i / 45) % 2) * 8}
          cy={22 + Math.floor(i / 45) * 42}
          r="6"
          fill={['#ecf0f1','#bdc3c7','#e74c3c','#3498db','#f1c40f','#2ecc71'][i % 6]}
          opacity="0.75"
        />
      ))}

      {/* Court surface */}
      <rect x="0" y="180" width="800" height="420" fill={courtColor} />
      {/* Court texture lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="0" y1={185 + i * 34} x2="800" y2={185 + i * 34}
          stroke={courtLight} strokeWidth="0.8" opacity="0.3" />
      ))}

      {/* Court lines */}
      {/* Outer boundary */}
      <rect x="60" y="200" width="680" height="380" fill="none" stroke={courtLine} strokeWidth="3" opacity="0.9" />
      {/* Singles lines */}
      <rect x="110" y="200" width="580" height="380" fill="none" stroke={courtLine} strokeWidth="2.5" opacity="0.9" />
      {/* Service boxes */}
      <line x1="110" y1="390" x2="690" y2="390" stroke={courtLine} strokeWidth="2.5" opacity="0.9" />
      <line x1="400" y1="200" x2="400" y2="390" stroke={courtLine} strokeWidth="2.5" opacity="0.9" />
      {/* Center mark */}
      <line x1="400" y1="390" x2="400" y2="420" stroke={courtLine} strokeWidth="2.5" opacity="0.9" />
      <line x1="400" y1="580" x2="400" y2="560" stroke={courtLine} strokeWidth="2.5" opacity="0.9" />

      {/* NET */}
      {/* Net posts */}
      <rect x="56" y="295" width="8" height="100" rx="3" fill="#888" />
      <rect x="736" y="295" width="8" height="100" rx="3" fill="#888" />
      {/* Net top cable */}
      <line x1="60" y1="300" x2="740" y2="300" stroke="#aaa" strokeWidth="3" />
      {/* Net mesh */}
      {Array.from({ length: 34 }, (_, i) => (
        <line key={i} x1={60 + i * 20} y1="300" x2={60 + i * 20} y2="390"
          stroke="#ddd" strokeWidth="1" opacity="0.6" />
      ))}
      {[0,1,2,3].map(i => (
        <line key={i} x1="60" y1={315 + i * 25} x2="740" y2={315 + i * 25}
          stroke="#ddd" strokeWidth="1" opacity="0.5" />
      ))}
      {/* Net center strap */}
      <rect x="392" y="300" width="16" height="90" rx="2" fill={netStrapColor} opacity="0.9" />
      {/* Net bottom tape */}
      <rect x="60" y="383" width="680" height="8" fill="#ddd" opacity="0.8" />

      {/* PLAYER (near side – bottom) */}
      <g transform="translate(220, 430)">
        {/* Body */}
        <rect x="-18" y="14" width="36" height="44" rx="6" fill="white" />
        <rect x="-18" y="14" width="36" height="20" rx="6" fill="#e8e8e8" />
        {/* Head */}
        <circle cx="0" cy="6" r="18" fill="#f5cba7" />
        <rect x="-12" y="-8" width="24" height="9" rx="4" fill="white" />
        {/* Racket arm */}
        <rect x="16" y="10" width="30" height="9" rx="4" fill="white" transform="rotate(-35,16,10)" />
        {/* Racket */}
        <g transform="translate(38, -18) rotate(-35)">
          <ellipse cx="0" cy="-16" rx="14" ry="20" fill="none" stroke="#f39c12" strokeWidth="3" />
          {/* String pattern */}
          {[-8,-4,0,4,8].map(x => (
            <line key={x} x1={x} y1="-35" x2={x} y2="3" stroke="#f39c12" strokeWidth="0.8" opacity="0.6" />
          ))}
          {[-12,-6,0,6,12].map((y, i) => (
            <line key={i} x1="-14" y1={y - 16} x2="14" y2={y - 16} stroke="#f39c12" strokeWidth="0.8" opacity="0.6" />
          ))}
          <rect x="-4" y="3" width="8" height="22" rx="3" fill={racketGripColor} />
        </g>
        {/* Other arm */}
        <rect x="-36" y="14" width="20" height="9" rx="4" fill="white" transform="rotate(20,-36,14)" />
        {/* Legs */}
        <rect x="-16" y="56" width="14" height="40" rx="5" fill="white" transform="rotate(-12,-16,56)" />
        <rect x="2" y="56" width="14" height="40" rx="5" fill="white" transform="rotate(15,2,56)" />
        <rect x="-26" y="92" width="20" height="10" rx="4" fill="#c0392b" />
        <rect x="4" y="94" width="20" height="10" rx="4" fill="#c0392b" />
        {/* Headband */}
        <rect x="-12" y="-4" width="24" height="6" rx="2" fill="#e74c3c" opacity="0.8" />
      </g>

      {/* OPPONENT (far side – top, smaller perspective) */}
      <g transform="translate(580, 240)">
        <rect x="-14" y="10" width="28" height="36" rx="5" fill="#2c3e50" />
        <circle cx="0" cy="4" r="14" fill="#f5cba7" />
        <rect x="-8" y="-6" width="16" height="6" rx="3" fill="#2c3e50" />
        <rect x="12" y="8" width="22" height="7" rx="3" fill="#2c3e50" transform="rotate(30,12,8)" />
        {/* Small racket */}
        <g transform="translate(26, -8) rotate(30)">
          <ellipse cx="0" cy="-11" rx="10" ry="14" fill="none" stroke="#27ae60" strokeWidth="2.5" />
          <rect x="-3" y="3" width="6" height="16" rx="2" fill="#333" />
        </g>
        <rect x="-12" y="44" width="11" height="32" rx="4" fill="#1a252f" transform="rotate(-8,-12,44)" />
        <rect x="1" y="44" width="11" height="32" rx="4" fill="#1a252f" transform="rotate(10,1,44)" />
        <rect x="-18" y="74" width="16" height="8" rx="3" fill="#2c3e50" />
        <rect x="2" y="74" width="16" height="8" rx="3" fill="#2c3e50" />
      </g>

      {/* TENNIS BALL in play */}
      <circle cx="400" cy="270" r="12" fill="#ccff00" stroke="#a8d400" strokeWidth="1.5" />
      <path d="M390,264 Q400,272 410,264" fill="none" stroke="white" strokeWidth="1.2" />

      {/* PLAYER'S CHAIR / TOWEL */}
      <rect x="730" y="340" width="48" height="40" rx="4" fill="#2c3e50" />
      <rect x="730" y="318" width="48" height="8" rx="2" fill="#555" />
      <rect x="726" y="378" width="8" height="30" rx="3" fill="#555" />
      <rect x="766" y="378" width="8" height="30" rx="3" fill="#555" />
      <rect x="728" y="326" width="44" height="16" rx="3" fill={towelColor} />

      {/* SCOREBOARD */}
      <rect x="560" y="8" width="220" height="110" rx="8" fill="#0a0a1a" stroke="#f1c40f" strokeWidth="2" />
      <text x="670" y="32" textAnchor="middle" fill="#f1c40f" fontSize="12" fontWeight="bold">GRAND SLAM FINAL</text>
      <line x1="570" y1="38" x2="770" y2="38" stroke="#333" strokeWidth="1" />
      <text x="595" y="58" textAnchor="middle" fill="#aaa" fontSize="11">PLAYER</text>
      <text x="670" y="58" textAnchor="middle" fill="#aaa" fontSize="11">SET 1</text>
      <text x="730" y="58" textAnchor="middle" fill="#aaa" fontSize="11">GAME</text>
      <text x="595" y="80" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">R. Federer</text>
      <text x="670" y="80" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">6</text>
      <text x="730" y="80" textAnchor="middle" fill="#0f0" fontSize="20" fontWeight="bold">{playerScore}</text>
      <text x="595" y="102" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">N. Djokovic</text>
      <text x="670" y="102" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">5</text>
      <text x="730" y="102" textAnchor="middle" fill="#f1c40f" fontSize="20" fontWeight="bold">30</text>

      {/* UMPIRE CHAIR */}
      <rect x="368" y="180" width="64" height="90" rx="4" fill="#1a252f" />
      <rect x="372" y="185" width="56" height="40" rx="3" fill="#2c3e50" />
      {/* Umpire */}
      <circle cx="400" cy="196" r="12" fill="#f5cba7" />
      <rect x="388" y="204" width="24" height="28" rx="4" fill="#27ae60" />

      {/* Sponsor board */}
      <rect x="0" y="175" width="800" height="26" fill="#f1c40f" opacity="0.9" />
      <text x="400" y="193" textAnchor="middle" fill="#1a1a1a" fontSize="11" fontWeight="bold" letterSpacing="5">
        GRAND SLAM · CENTRE COURT · SPOT THE DIFFERENCE CHAMPIONSHIP
      </text>
    </svg>
  );
}

export function Level6Original() {
  return <TennisScene netStrapColor="#ffffff" racketGripColor="#111111" playerScore="40" courtColor="#c0392b" towelColor="#ffffff" />;
}

export function Level6Modified() {
  return <TennisScene netStrapColor="#e74c3c" racketGripColor="#27ae60" playerScore="AD" courtColor="#2980b9" towelColor="#e67e22" />;
}
