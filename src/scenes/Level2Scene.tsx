import React from 'react';

function Star({ x, y, r = 1.5 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="white" opacity={0.8} />;
}

function stars(): [number, number][] {
  return [
    [50,20],[120,45],[80,10],[200,30],[300,18],[420,8],[550,25],[650,12],[750,35],
    [30,70],[170,65],[350,55],[500,48],[700,60],[770,22],[90,90],[250,80],[600,75],
  ];
}

function Monitor({ x, y, w, h, screenColor, label }: { x: number; y: number; w: number; h: number; screenColor: string; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill="#1a202c" stroke="#4a5568" strokeWidth={2} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx={2} fill={screenColor} />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill="#00FF88" fontSize={9} fontFamily="monospace">{label}</text>
    </g>
  );
}

function IndicatorLight({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <>
      <circle cx={x} cy={y} r={10} fill={color} opacity={0.3} />
      <circle cx={x} cy={y} r={6} fill={color} />
      <circle cx={x - 2} cy={y - 2} r={2} fill="white" opacity={0.5} />
    </>
  );
}

function SteamLines({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" fill="none" opacity={0.7}>
      <path d={`M ${x - 8},${y} Q ${x - 12},${y - 12} ${x - 8},${y - 22}`} />
      <path d={`M ${x},${y} Q ${x + 6},${y - 12} ${x},${y - 22}`} />
      <path d={`M ${x + 8},${y} Q ${x + 12},${y - 12} ${x + 8},${y - 22}`} />
    </g>
  );
}

interface SpaceSceneProps {
  warningColor: string;
  showMonitor4: boolean;
  showMoon: boolean;
  showSteam: boolean;
  patchColor: string;
}

function SpaceStationScene({ warningColor, showMonitor4, showMoon, showSteam, patchColor }: SpaceSceneProps) {
  return (
    <>
      {/* Space background */}
      <rect width="800" height="600" fill="#0d0d1a" />

      {/* Stars */}
      {stars().map(([x, y], i) => <Star key={i} x={x} y={y} r={i % 3 === 0 ? 2 : 1.2} />)}

      {/* Floor */}
      <rect x={0} y={540} width={800} height={60} fill="#2d3748" />
      {/* Floor grid lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1={i * 100} y1={540} x2={i * 100 + 50} y2={600} stroke="#4a5568" strokeWidth={1} opacity={0.4} />
      ))}
      <line x1={0} y1={540} x2={800} y2={540} stroke="#4a5568" strokeWidth={2} />

      {/* Ceiling strip */}
      <rect x={0} y={0} width={800} height={18} fill="#2d3748" />
      <line x1={0} y1={18} x2={800} y2={18} stroke="#4a5568" strokeWidth={1.5} />

      {/* ── LEFT PANEL ─────────────────────────────────── */}
      <rect x={0} y={18} width={260} height={522} fill="#1e2535" />
      <rect x={0} y={18} width={260} height={522} fill="none" stroke="#4a5568" strokeWidth={2} />

      {/* Porthole */}
      <circle cx={130} cy={165} r={90} fill="#0a0a14" stroke="#718096" strokeWidth={6} />
      <circle cx={130} cy={165} r={82} fill="#0d1a30" />
      {/* Earth */}
      <circle cx={115} cy={185} r={55} fill="#1E90FF" />
      <path d="M85,155 Q100,145 115,155 Q125,160 110,170 Q95,175 85,165 Z" fill="#22C55E" opacity={0.9} />
      <path d="M120,200 Q135,190 148,200 Q155,210 140,215 Q125,218 120,208 Z" fill="#22C55E" opacity={0.85} />
      <path d="M145,158 Q158,150 168,160 Q170,170 158,172 Q147,170 145,162 Z" fill="#22C55E" opacity={0.8} />
      {/* Earth clouds */}
      <ellipse cx={100} cy={148} rx={20} ry={8} fill="white" opacity={0.3} />
      <ellipse cx={145} cy={190} rx={16} ry={6} fill="white" opacity={0.25} />
      {/* Moon (CHANGES – disappears in Modified) */}
      {showMoon && (
        <circle cx={183} cy={118} r={18} fill="#d4d4d4" />
      )}
      {showMoon && (
        <>
          <circle cx={178} cy={112} r={4} fill="#aaa" opacity={0.5} />
          <circle cx={188} cy={122} r={3} fill="#aaa" opacity={0.4} />
        </>
      )}
      {/* Porthole frame bolts */}
      {[0, 90, 180, 270].map(deg => {
        const rad = deg * Math.PI / 180;
        return <circle key={deg} cx={130 + 90 * Math.cos(rad)} cy={165 + 90 * Math.sin(rad)} r={5} fill="#718096" />;
      })}

      {/* Control panel buttons (left side) */}
      <rect x={15} y={280} width={230} height={130} rx={6} fill="#161e2e" stroke="#4a5568" strokeWidth={1.5} />
      {/* Row of buttons */}
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={25 + i * 42} y={295} width={30} height={18} rx={3} fill={['#FF5722', '#FF9800', '#4CAF50', '#2196F3', '#9C27B0'][i]} />
      ))}
      {/* Indicator lights row */}
      <text x={20} y={340} fill="#718096" fontSize={9} fontFamily="monospace">STATUS</text>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <IndicatorLight key={i} x={25 + i * 35} y={355} color={i === 2 ? warningColor : '#4CAF50'} />
      ))}
      <text x={80} y={395} fill={warningColor} fontSize={8} fontFamily="monospace">{'⚠ ALERT'}</text>

      {/* Keyboard-like panel */}
      <rect x={15} y={430} width={230} height={100} rx={4} fill="#161e2e" stroke="#4a5568" strokeWidth={1} />
      {[0, 1, 2, 3].map(row => (
        [0, 1, 2, 3, 4, 5, 6].map(col => (
          <rect key={`${row}-${col}`} x={22 + col * 30} y={438 + row * 22} width={24} height={16} rx={2} fill="#2d3748" stroke="#4a5568" strokeWidth={0.5} />
        ))
      ))}

      {/* ── RIGHT PANEL ─────────────────────────────────── */}
      <rect x={540} y={18} width={260} height={522} fill="#1e2535" />
      <rect x={540} y={18} width={260} height={522} fill="none" stroke="#4a5568" strokeWidth={2} />

      {/* 4 monitors (one DISAPPEARS) */}
      <Monitor x={553} y={30} w={115} h={82} screenColor="#001122" label="NAV-SYS" />
      <Monitor x={675} y={30} w={115} h={82} screenColor="#001122" label="LIFE-SUP" />
      <Monitor x={553} y={120} w={115} h={82} screenColor="#001122" label="PROPUL" />
      {showMonitor4 && <Monitor x={675} y={120} w={115} h={82} screenColor="#001122" label="COMMS" />}

      {/* Joystick */}
      <rect x={570} y={220} width={80} height={50} rx={8} fill="#1a202c" stroke="#4a5568" strokeWidth={2} />
      <circle cx={610} cy={210} r={12} fill="#2d3748" stroke="#4a5568" strokeWidth={2} />
      <line x1={610} y1={218} x2={610} y2={227} stroke="#4a5568" strokeWidth={3} />

      {/* Data readouts */}
      {['SYS: 98%', 'O2: 21.0', 'TEMP: 22C', 'VEL: 7.8km/s'].map((txt, i) => (
        <text key={i} x={553} y={295 + i * 18} fill="#00FF88" fontSize={10} fontFamily="monospace">{txt}</text>
      ))}

      {/* Control knobs */}
      {[0, 1, 2].map(i => (
        <circle key={i} cx={570 + i * 60} cy={380} r={18} fill="#2d3748" stroke="#4a5568" strokeWidth={2} />
      ))}
      {[0, 1, 2].map(i => (
        <line key={i} x1={570 + i * 60} y1={380} x2={570 + i * 60 + 12} y2={372} stroke="#FF9800" strokeWidth={2} />
      ))}

      {/* ── CENTER ─────────────────────────────────── */}

      {/* Floating coffee cup (steam CHANGES) */}
      <g transform="rotate(-8, 420, 215)">
        <rect x={392} y={208} width={56} height={40} rx={6} fill="#3d2b1f" stroke="#5c3d25" strokeWidth={2} />
        <ellipse cx={420} cy={208} rx={28} ry={8} fill="#2a1a0e" />
        <ellipse cx={420} cy={248} rx={28} ry={8} fill="#2a1a0e" />
        <path d="M448,218 Q462,218 462,228 Q462,238 448,238" fill="none" stroke="#5c3d25" strokeWidth={3} strokeLinecap="round" />
        <ellipse cx={420} cy={210} rx={22} ry={5} fill="#6B3A2A" opacity={0.8} />
      </g>
      {showSteam && <SteamLines x={420} y={200} />}

      {/* Astronaut */}
      {/* Body / suit */}
      <rect x={370} y={320} width={110} height={140} rx={18} fill="#e8e8e8" stroke="#ccc" strokeWidth={2} />
      {/* Helmet */}
      <circle cx={425} cy={305} r={52} fill="#e0e0e0" stroke="#ccc" strokeWidth={2} />
      <circle cx={425} cy={305} r={40} fill="#AED6F1" opacity={0.7} />
      {/* Visor reflection */}
      <ellipse cx={415} cy={292} rx={12} ry={8} fill="white" opacity={0.35} transform="rotate(-20, 415, 292)" />
      {/* Face inside visor */}
      <circle cx={425} cy={308} r={3} fill="#333" />
      <circle cx={435} cy={308} r={3} fill="#333" />
      <path d="M420,318 Q425,323 430,318" fill="none" stroke="#333" strokeWidth={1.5} strokeLinecap="round" />
      {/* Arms */}
      <rect x={340} y={330} width={40} height={90} rx={14} fill="#e0e0e0" stroke="#ccc" strokeWidth={2} />
      <rect x={470} y={330} width={40} height={90} rx={14} fill="#e0e0e0" stroke="#ccc" strokeWidth={2} />
      {/* Gloves */}
      <ellipse cx={360} cy={422} rx={20} ry={14} fill="#d0d0d0" stroke="#bbb" strokeWidth={1.5} />
      <ellipse cx={490} cy={422} rx={20} ry={14} fill="#d0d0d0" stroke="#bbb" strokeWidth={1.5} />
      {/* Suit controls on chest */}
      <rect x={390} y={345} width={70} height={45} rx={5} fill="#CBD5E0" stroke="#A0AEC0" strokeWidth={1} />
      {[0, 1, 2].map(i => (
        <circle key={i} cx={403 + i * 20} cy={356} r={5} fill={['#F56565', '#ED8936', '#48BB78'][i]} />
      ))}
      <rect x={395} y={368} width={60} height={12} rx={2} fill="#2d3748" />
      {/* Sleeve patch (CHANGES COLOR) */}
      <circle cx={354} cy={355} r={14} fill={patchColor} stroke="#A0AEC0" strokeWidth={1.5} />
      <text x={354} y={360} textAnchor="middle" fill="white" fontSize={9} fontWeight="bold" fontFamily="sans-serif">★</text>
      {/* Legs */}
      <rect x={380} y={455} width={40} height={85} rx={10} fill="#e0e0e0" stroke="#ccc" strokeWidth={2} />
      <rect x={430} y={455} width={40} height={85} rx={10} fill="#e0e0e0" stroke="#ccc" strokeWidth={2} />
      {/* Boots */}
      <rect x={374} y={528} width={50} height={22} rx={8} fill="#555" />
      <rect x={425} y={528} width={50} height={22} rx={8} fill="#555" />

      {/* Center connecting pipes */}
      <rect x={260} y={280} width={110} height={8} rx={4} fill="#4a5568" />
      <rect x={430} y={280} width={110} height={8} rx={4} fill="#4a5568" />
    </>
  );
}

export const Level2Original: React.FC = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <SpaceStationScene warningColor="#4CAF50" showMonitor4 showMoon showSteam patchColor="#2196F3" />
  </svg>
);

export const Level2Modified: React.FC = () => (
  <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: 'auto' }}>
    <SpaceStationScene warningColor="#F44336" showMonitor4={false} showMoon={false} showSteam={false} patchColor="#FF9800" />
  </svg>
);
