import React from 'react';

function umbrellaPoints(cx: number, cy: number, r: number) {
  return [0, 30, 60, 90, 120, 150, 180].map(deg => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)] as [number, number];
  });
}

function UmbrellaStripes({ cx, cy, r, colors }: { cx: number; cy: number; r: number; colors: string[] }) {
  const pts = umbrellaPoints(cx, cy, r);
  return (
    <>
      {colors.map((color, i) => (
        <path
          key={i}
          d={`M ${cx},${cy} L ${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)} A ${r},${r} 0 0,0 ${pts[i+1][0].toFixed(1)},${pts[i+1][1].toFixed(1)} Z`}
          fill={color}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="0.5"
        />
      ))}
      <line x1={cx} y1={cy} x2={cx} y2={cy + 170} stroke="#C8A96E" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill="#FFD700" />
    </>
  );
}

function SolidUmbrella({ cx, cy, r, color }: { cx: number; cy: number; r: number; color: string }) {
  const lx = cx - r, rx = cx + r;
  return (
    <>
      <path d={`M ${lx},${cy} A ${r},${r} 0 0,1 ${cx},${cy - r} A ${r},${r} 0 0,1 ${rx},${cy} Z`} fill={color} />
      <line x1={cx} y1={cy} x2={cx} y2={cy + 170} stroke="#C8A96E" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill="#FFD700" />
    </>
  );
}

function RoundCloud({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={48} ry={30} fill="white" />
      <ellipse cx={x - 28} cy={y + 6} rx={32} ry={22} fill="white" />
      <ellipse cx={x + 28} cy={y + 6} rx={32} ry={22} fill="white" />
      <ellipse cx={x} cy={y + 10} rx={52} ry={20} fill="white" />
    </g>
  );
}

function ElongatedCloud({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={75} ry={17} fill="white" />
      <ellipse cx={x - 35} cy={y + 4} rx={38} ry={14} fill="white" />
      <ellipse cx={x + 35} cy={y + 4} rx={38} ry={14} fill="white" />
    </g>
  );
}

function Seagull({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const s = scale;
  return (
    <path
      d={`M ${x - 16 * s},${y} Q ${x - 5 * s},${y - 9 * s} ${x},${y - 6 * s} Q ${x + 5 * s},${y - 9 * s} ${x + 16 * s},${y}`}
      fill="none"
      stroke="#444"
      strokeWidth={2 * s}
      strokeLinecap="round"
    />
  );
}

function Chair({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <rect x={x - 15} y={y - 8} width={30} height={20} rx={3} fill={color} />
      <rect x={x - 15} y={y - 28} width={30} height={20} rx={3} fill={color} />
      <line x1={x - 10} y1={y + 12} x2={x - 13} y2={y + 30} stroke="#7A5C20" strokeWidth={3} strokeLinecap="round" />
      <line x1={x + 10} y1={y + 12} x2={x + 13} y2={y + 30} stroke="#7A5C20" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

interface SceneProps {
  showSeagullOnRoof: boolean;
  umbrellaVariant: 'striped' | 'blue';
  menuText: string;
  cloudVariant: 'round' | 'elongated';
  chairColor: string;
}

function BeachCafeScene({ showSeagullOnRoof, umbrellaVariant, menuText, cloudVariant, chairColor }: SceneProps) {
  const redWhite = ['#D32F2F', 'white', '#D32F2F', 'white', '#D32F2F', 'white'];
  const blueWhite = ['#1565C0', 'white', '#1565C0', 'white', '#1565C0', 'white'];

  return (
    <>
      {/* Sky */}
      <rect width="800" height="600" fill="#87CEEB" />

      {/* Sun glow + sun */}
      <circle cx={710} cy={85} r={60} fill="#FFE066" opacity={0.3} />
      <circle cx={710} cy={85} r={42} fill="#FFD700" />

      {/* Clouds */}
      <RoundCloud x={160} y={68} />
      {cloudVariant === 'round' ? <RoundCloud x={590} y={82} /> : <ElongatedCloud x={590} y={82} />}

      {/* Ocean */}
      <rect x={0} y={335} width={800} height={265} fill="#1565C0" />
      <rect x={0} y={335} width={800} height={30} fill="#2196F3" opacity={0.75} />
      <path d="M0,358 Q100,348 200,358 Q300,368 400,358 Q500,348 600,358 Q700,368 800,358 L800,372 L0,372 Z" fill="#64B5F6" opacity={0.4} />

      {/* Sand */}
      <path d="M0,418 Q200,405 400,415 Q600,425 800,408 L800,600 L0,600 Z" fill="#F5DEB3" />
      <path d="M0,418 Q200,405 400,415 Q600,425 800,408 Q600,432 400,422 Q200,412 0,425 Z" fill="#E8C98A" />

      {/* Café building */}
      <rect x={0} y={178} width={315} height={422} fill="#FFF8DC" stroke="#D4A76A" strokeWidth={2} />

      {/* Awning stripes */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={i * 63} y={252} width={63} height={44} fill={i % 2 === 0 ? '#D32F2F' : '#FAFAFA'} />
      ))}
      <rect x={0} y={250} width={315} height={5} fill="#B71C1C" />
      <rect x={0} y={294} width={315} height={5} fill="#B71C1C" />

      {/* Café roof bar */}
      <rect x={0} y={170} width={320} height={15} fill="#B71C1C" />

      {/* Windows */}
      <rect x={22} y={192} width={82} height={64} rx={4} fill="#AED6F1" stroke="#5D8AA8" strokeWidth={2} />
      <line x1={63} y1={192} x2={63} y2={256} stroke="#5D8AA8" strokeWidth={1.5} />
      <line x1={22} y1={224} x2={104} y2={224} stroke="#5D8AA8" strokeWidth={1.5} />

      <rect x={210} y={192} width={82} height={64} rx={4} fill="#AED6F1" stroke="#5D8AA8" strokeWidth={2} />
      <line x1={251} y1={192} x2={251} y2={256} stroke="#5D8AA8" strokeWidth={1.5} />
      <line x1={210} y1={224} x2={292} y2={224} stroke="#5D8AA8" strokeWidth={1.5} />

      {/* Door */}
      <rect x={118} y={302} width={80} height={148} rx={5} fill="#8B6914" stroke="#5C3E0A" strokeWidth={2} />
      <rect x={125} y={310} width={28} height={34} rx={3} fill="#AED6F1" opacity={0.7} />
      <rect x={160} y={310} width={28} height={34} rx={3} fill="#AED6F1" opacity={0.7} />
      <circle cx={157} cy={378} r={4} fill="#FFD700" />

      {/* Café name sign */}
      <rect x={105} y={272} width={106} height={25} rx={3} fill="#7B3F00" />
      <text x={158} y={289} textAnchor="middle" fill="#FFD700" fontSize={13} fontFamily="Georgia, serif" fontWeight="bold">RISTORANTE</text>

      {/* Seagull on roof */}
      {showSeagullOnRoof && <Seagull x={378} y={164} scale={1.5} />}

      {/* Flying seagulls in sky */}
      <Seagull x={530} y={145} scale={0.9} />
      <Seagull x={475} y={105} scale={0.7} />

      {/* Left umbrella (CHANGES) */}
      {umbrellaVariant === 'striped'
        ? <UmbrellaStripes cx={175} cy={278} r={68} colors={redWhite} />
        : <SolidUmbrella cx={175} cy={278} r={68} color="#1565C0" />
      }

      {/* Right umbrella (always blue/white) */}
      <UmbrellaStripes cx={482} cy={258} r={63} colors={blueWhite} />

      {/* Umbrella pole bases */}
      <ellipse cx={175} cy={448} rx={14} ry={6} fill="#E0BF82" />
      <ellipse cx={482} cy={421} rx={12} ry={5} fill="#E0BF82" />

      {/* Table 1 */}
      <ellipse cx={420} cy={448} rx={43} ry={17} fill="#8B6914" />
      <ellipse cx={420} cy={445} rx={43} ry={17} fill="#A0783A" />
      <rect x={415} y={447} width={10} height={28} fill="#7A5C20" />

      {/* Chairs near table 1 (CHANGE COLOR) */}
      <Chair x={377} y={446} color={chairColor} />
      <Chair x={463} y={446} color={chairColor} />

      {/* Table 2 */}
      <ellipse cx={638} cy={465} rx={40} ry={15} fill="#8B6914" />
      <ellipse cx={638} cy={462} rx={40} ry={15} fill="#A0783A" />
      <rect x={633} y={464} width={10} height={26} fill="#7A5C20" />

      {/* Chairs near table 2 (always yellow) */}
      <Chair x={597} y={462} color="#F6C90E" />
      <Chair x={679} y={462} color="#F6C90E" />

      {/* Chalkboard menu */}
      <rect x={598} y={330} width={136} height={102} rx={6} fill="#2d4a0a" stroke="#8B6914" strokeWidth={3} />
      <rect x={606} y={338} width={120} height={86} rx={4} fill="#3a5c12" />
      <text x={666} y={364} textAnchor="middle" fill="#CCC" fontSize={12} fontFamily="Georgia, serif">OGGI</text>
      <text x={666} y={392} textAnchor="middle" fill="white" fontSize={24} fontFamily="Georgia, serif" fontWeight="bold">{menuText}</text>
      <line x1={616} y1={400} x2={716} y2={400} stroke="#CCC" strokeWidth={1} opacity={0.5} />
      <text x={666} y={412} textAnchor="middle" fill="#AAA" fontSize={11} fontFamily="Georgia, serif">OPEN</text>

      {/* Distant sailboat */}
      <path d="M625,344 L660,344 L642,328 Z" fill="white" opacity={0.9} />
      <rect x={639} y={320} width={2.5} height={24} fill="#555" />

      {/* Beach ball */}
      <ellipse cx={560} cy={510} rx={22} ry={9} fill="rgba(0,0,0,0.1)" />
      <circle cx={560} cy={498} r={18} fill="#FF6B6B" />
      <path d="M560,480 Q574,489 574,498 Q574,507 560,516 Q546,507 546,498 Q546,489 560,480 Z" fill="white" opacity={0.6} />
    </>
  );
}

export const Level1Original: React.FC = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <BeachCafeScene showSeagullOnRoof umbrellaVariant="striped" menuText="CAFÉ" cloudVariant="round" chairColor="#F6C90E" />
  </svg>
);

export const Level1Modified: React.FC = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <BeachCafeScene showSeagullOnRoof={false} umbrellaVariant="blue" menuText="BAR" cloudVariant="elongated" chairColor="#22C55E" />
  </svg>
);
