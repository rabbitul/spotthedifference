import React from 'react';

function Firefly({ x, y, glow = true }: { x: number; y: number; glow?: boolean }) {
  if (!glow) return null;
  return (
    <>
      <circle cx={x} cy={y} r={6} fill="#FFFF00" opacity={0.15} />
      <circle cx={x} cy={y} r={3} fill="#FFE500" opacity={0.8} />
    </>
  );
}

function Mushroom({ x, y, capColor, spotColor }: { x: number; y: number; capColor: string; spotColor: string }) {
  return (
    <g>
      {/* Stem */}
      <rect x={x - 8} y={y - 2} width={16} height={22} rx={4} fill="#F5E6D3" stroke="#DDD" strokeWidth={1} />
      {/* Cap */}
      <ellipse cx={x} cy={y - 2} rx={22} ry={8} fill={capColor} />
      <path d={`M ${x - 22},${y - 2} Q ${x - 18},${y - 32} ${x},${y - 34} Q ${x + 18},${y - 32} ${x + 22},${y - 2} Z`} fill={capColor} />
      {/* Spots */}
      <circle cx={x - 8} cy={y - 20} r={4} fill={spotColor} opacity={0.9} />
      <circle cx={x + 8} cy={y - 22} r={3} fill={spotColor} opacity={0.9} />
      <circle cx={x} cy={y - 30} r={2.5} fill={spotColor} opacity={0.9} />
    </g>
  );
}

function Owl({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {/* Body */}
      <ellipse cx={x} cy={y + 15} rx={18} ry={22} fill="#8B6914" />
      {/* Head */}
      <circle cx={x} cy={y - 5} r={18} fill="#A0783A" />
      {/* Eye sockets */}
      <circle cx={x - 6} cy={y - 5} r={8} fill="#FFD700" />
      <circle cx={x + 6} cy={y - 5} r={8} fill="#FFD700" />
      <circle cx={x - 6} cy={y - 5} r={5} fill="#2d1a00" />
      <circle cx={x + 6} cy={y - 5} r={5} fill="#2d1a00" />
      <circle cx={x - 4} cy={y - 7} r={1.5} fill="white" opacity={0.7} />
      <circle cx={x + 8} cy={y - 7} r={1.5} fill="white" opacity={0.7} />
      {/* Beak */}
      <path d={`M ${x - 3},${y + 1} L ${x},${y + 7} L ${x + 3},${y + 1} Z`} fill="#FF8C00" />
      {/* Ear tufts */}
      <path d={`M ${x - 14},${y - 18} L ${x - 10},${y - 5} L ${x - 6},${y - 18} Z`} fill="#8B6914" />
      <path d={`M ${x + 14},${y - 18} L ${x + 10},${y - 5} L ${x + 6},${y - 18} Z`} fill="#8B6914" />
      {/* Wing detail */}
      <path d={`M ${x - 18},${y + 5} Q ${x - 22},${y + 20} ${x - 12},${y + 35}`} fill="none" stroke="#7A5C20" strokeWidth={1.5} />
      <path d={`M ${x + 18},${y + 5} Q ${x + 22},${y + 20} ${x + 12},${y + 35}`} fill="none" stroke="#7A5C20" strokeWidth={1.5} />
      {/* Talons on branch */}
      <path d={`M ${x - 8},${y + 37} L ${x - 12},${y + 48} M ${x - 4},${y + 37} L ${x - 5},${y + 48} M ${x + 4},${y + 37} L ${x + 5},${y + 48} M ${x + 8},${y + 37} L ${x + 12},${y + 48}`} stroke="#7A5C20" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

interface ForestSceneProps {
  showOwl: boolean;
  mushroomCapColor: string;
  mushroomSpotColor: string;
  showWellRope: boolean;
  showSecondChimney: boolean;
  fireflyPositions: [number, number][];
}

function EnchantedForestScene({ showOwl, mushroomCapColor, mushroomSpotColor, showWellRope, showSecondChimney, fireflyPositions }: ForestSceneProps) {
  return (
    <>
      {/* Sky gradient (twilight) */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0533" />
          <stop offset="50%" stopColor="#2d1b69" />
          <stop offset="100%" stopColor="#4a2080" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3a1a" />
          <stop offset="100%" stopColor="#0d1f0d" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill="url(#skyGrad)" />

      {/* Moon */}
      <circle cx={680} cy={80} r={50} fill="#fffde7" opacity={0.15} />
      <circle cx={680} cy={80} r={38} fill="#fff9c4" />
      {/* Moon craters */}
      <circle cx={668} cy={72} r={5} fill="#ffe082" opacity={0.5} />
      <circle cx={690} cy={85} r={4} fill="#ffe082" opacity={0.4} />

      {/* Stars */}
      {[[40,30],[100,55],[180,20],[250,45],[350,15],[450,38],[560,22],[720,45],[760,18],
        [30,90],[130,75],[300,68],[550,78],[700,100]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2 : 1.2} fill="white" opacity={0.7} />
      ))}

      {/* Background trees (dark silhouette) */}
      {[[50,380],[120,360],[200,390],[630,370],[700,355],[760,380]].map(([x,y], i) => (
        <g key={i}>
          <rect x={x - 5} y={y} width={10} height={80} fill="#1a2e0a" />
          <polygon points={`${x},${y - 60} ${x - 28},${y} ${x + 28},${y}`} fill="#1a2e0a" />
          <polygon points={`${x},${y - 90} ${x - 22},${y - 40} ${x + 22},${y - 40}`} fill="#1a2e0a" />
          <polygon points={`${x},${y - 115} ${x - 16},${y - 70} ${x + 16},${y - 70}`} fill="#1a2e0a" />
        </g>
      ))}

      {/* Ground */}
      <path d="M0,420 Q200,405 400,415 Q600,425 800,412 L800,600 L0,600 Z" fill="url(#groundGrad)" />

      {/* Grass / moss patches */}
      {[[80,418],[160,412],[300,420],[450,416],[600,410],[720,414]].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={25} ry={8} fill="#2d5a1b" opacity={0.7} />
      ))}

      {/* Winding path */}
      <path d="M350,600 Q360,520 310,480 Q270,445 320,420" fill="none" stroke="#3d2b1f" strokeWidth={22} opacity={0.5} />
      <path d="M350,600 Q360,520 310,480 Q270,445 320,420" fill="none" stroke="#5a3e2b" strokeWidth={14} opacity={0.4} />

      {/* ── COTTAGE ────────────────────────────────────── */}
      {/* Main house body */}
      <rect x={240} y={235} width={200} height={195} fill="#5D4037" stroke="#4E342E" strokeWidth={2} />

      {/* Stones/brickwork on cottage */}
      {[0,1,2,3,4].flatMap(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`}
          x={244 + col * 48 + (row % 2) * 10} y={244 + row * 35}
          width={40} height={28} rx={2}
          fill="transparent" stroke="#4E342E" strokeWidth={1} opacity={0.4} />
      )))}

      {/* Roof */}
      <polygon points="230,240 400,240 370,160 260,160" fill="#4a2e00" stroke="#3a2000" strokeWidth={2} />
      {/* Roof tiles suggestion */}
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1={265 + i * 20} y1={160} x2={250 + i * 22} y2={240} stroke="#3a2000" strokeWidth={1} opacity={0.4} />
      ))}

      {/* First chimney (always present) */}
      <rect x={280} y={130} width={24} height={40} fill="#3a2a1a" stroke="#2a1a0a" strokeWidth={1.5} />
      <rect x={276} y={124} width={32} height={10} rx={2} fill="#2a1a0a" />
      {/* Chimney smoke */}
      <path d="M292,124 Q285,108 292,95 Q300,82 292,70" fill="none" stroke="#888" strokeWidth={3} opacity={0.5} strokeLinecap="round" />

      {/* Second chimney (CHANGES – appears in Modified) */}
      {showSecondChimney && (
        <>
          <rect x={348} y={128} width={24} height={42} fill="#3a2a1a" stroke="#2a1a0a" strokeWidth={1.5} />
          <rect x={344} y={122} width={32} height={10} rx={2} fill="#2a1a0a" />
          <path d="M360,122 Q353,106 360,93 Q368,80 360,68" fill="none" stroke="#888" strokeWidth={3} opacity={0.5} strokeLinecap="round" />
        </>
      )}

      {/* Glowing window (left) */}
      <rect x={258} y={262} width={58} height={55} rx={4} fill="#FFB347" />
      <rect x={258} y={262} width={58} height={55} rx={4} fill="#FF8C00" opacity={0.3} />
      {/* Window cross */}
      <line x1={287} y1={262} x2={287} y2={317} stroke="#4E342E" strokeWidth={2} />
      <line x1={258} y1={289} x2={316} y2={289} stroke="#4E342E" strokeWidth={2} />
      {/* Window glow halo */}
      <ellipse cx={287} cy={289} rx={42} ry={36} fill="#FFB347" opacity={0.12} />

      {/* Right window */}
      <rect x={345} y={265} width={52} height={50} rx={4} fill="#FFB347" opacity={0.7} />
      <line x1={371} y1={265} x2={371} y2={315} stroke="#4E342E" strokeWidth={2} />
      <line x1={345} y1={290} x2={397} y2={290} stroke="#4E342E" strokeWidth={2} />

      {/* Door */}
      <rect x={300} y={350} width={60} height={80} rx={6} fill="#3E2723" stroke="#2a1a0a" strokeWidth={2} />
      <circle cx={354} cy={390} r={4} fill="#FFD700" />
      {/* Door arch */}
      <path d="M300,358 Q330,338 360,358" fill="#2a1a0a" />

      {/* ── WELL ──────────────────────────────────────── */}
      <ellipse cx={500} cy={398} rx={45} ry={16} fill="#5D4037" stroke="#4E342E" strokeWidth={2} />
      <rect x={458} y={370} width={85} height={30} rx={3} fill="#6D4C41" stroke="#4E342E" strokeWidth={2} />
      <ellipse cx={500} cy={370} rx={43} ry={14} fill="#4E342E" />
      <ellipse cx={500} cy={370} rx={35} ry={10} fill="#0d0d0d" />

      {/* Well posts */}
      <rect x={460} y={320} width={12} height={55} rx={3} fill="#5D4037" stroke="#4E342E" strokeWidth={1.5} />
      <rect x={528} y={320} width={12} height={55} rx={3} fill="#5D4037" stroke="#4E342E" strokeWidth={1.5} />
      {/* Well crossbeam */}
      <rect x={455} y={315} width={90} height={12} rx={5} fill="#4E342E" stroke="#3E2723" strokeWidth={1.5} />
      {/* Well roof */}
      <polygon points="448,318 552,318 540,285 460,285" fill="#3E2723" stroke="#2d1a0a" strokeWidth={1.5} />

      {/* Well rope (CHANGES – disappears in Modified) */}
      {showWellRope && (
        <>
          <line x1={500} y1={327} x2={500} y2={372} stroke="#8B6914" strokeWidth={3} strokeDasharray="4,3" />
          <rect x={488} y={358} width={24} height={16} rx={3} fill="#6D4C41" stroke="#4E342E" strokeWidth={1.5} />
        </>
      )}

      {/* ── BIG TREE (right side) ─────────────────────── */}
      <rect x={636} y={300} width={18} height={160} fill="#3d2b1f" />
      {/* Branch with owl */}
      <path d="M645,320 Q700,300 730,315" fill="none" stroke="#3d2b1f" strokeWidth={12} strokeLinecap="round" />
      <path d="M645,350 Q590,335 560,348" fill="none" stroke="#3d2b1f" strokeWidth={10} strokeLinecap="round" />
      {/* Leaves */}
      {[[645,260],[620,230],[675,225],[650,200],[640,280]].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={35 + i * 5} ry={28 + i * 3} fill="#1a3d0a" opacity={0.85} />
      ))}
      {/* Owl on branch (CHANGES – disappears in Modified) */}
      {showOwl && <Owl x={710} y={272} />}

      {/* ── LEFT TREE ─────────────────────────────────── */}
      <rect x={95} y={290} width={14} height={170} fill="#3d2b1f" />
      {[[95,255],[75,225],[118,220],[95,195]].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={30 + i * 4} ry={24 + i * 3} fill="#1a3d0a" opacity={0.8} />
      ))}

      {/* ── MUSHROOMS ─────────────────────────────────── */}
      <Mushroom x={175} y={455} capColor={mushroomCapColor} spotColor={mushroomSpotColor} />
      <Mushroom x={210} y={468} capColor="#8B4513" spotColor="white" />
      {/* Always brown mushrooms */}
      <Mushroom x={570} y={458} capColor="#8B4513" spotColor="white" />
      <Mushroom x={600} y={470} capColor="#6B3A2A" spotColor="#F5DEB3" />

      {/* ── FIREFLIES ─────────────────────────────────── */}
      {fireflyPositions.map(([x, y], i) => (
        <Firefly key={i} x={x} y={y} />
      ))}

      {/* ── FLOWERS ───────────────────────────────────── */}
      {[[130,440],[155,450],[380,432],[420,440],[460,435]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={5} fill={['#FF6B9D','#A78BFA','#60A5FA','#FF6B9D','#A78BFA'][i]} opacity={0.85} />
          <circle cx={x} cy={y} r={2} fill="#FFD700" />
        </g>
      ))}

      {/* ── FENCE ─────────────────────────────────────── */}
      {[200,220,240,260].map(x => (
        <g key={x}>
          <rect x={x} y={415} width={8} height={35} rx={1} fill="#5D4037" opacity={0.7} />
          <polygon points={`${x},415 ${x+4},408 ${x+8},415`} fill="#5D4037" opacity={0.7} />
        </g>
      ))}
      <rect x={200} y={425} width={70} height={5} rx={2} fill="#5D4037" opacity={0.5} />
    </>
  );
}

const FIREFLIES_ORIGINAL: [number, number][] = [
  [540, 305], [568, 295], [590, 318], [555, 330], [580, 345],
];
const FIREFLIES_MODIFIED: [number, number][] = [
  [540, 305], [568, 295], [590, 318],
];

export const Level3Original: React.FC = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <EnchantedForestScene
      showOwl
      mushroomCapColor="#D32F2F"
      mushroomSpotColor="white"
      showWellRope
      showSecondChimney={false}
      fireflyPositions={FIREFLIES_ORIGINAL}
    />
  </svg>
);

export const Level3Modified: React.FC = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <EnchantedForestScene
      showOwl={false}
      mushroomCapColor="#7B1FA2"
      mushroomSpotColor="#E1BEE7"
      showWellRope={false}
      showSecondChimney
      fireflyPositions={FIREFLIES_MODIFIED}
    />
  </svg>
);
