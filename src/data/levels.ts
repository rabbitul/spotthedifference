import type { Level } from '../types/game';
import { Level1Original, Level1Modified } from '../scenes/Level1Scene';
import { Level2Original, Level2Modified } from '../scenes/Level2Scene';
import { Level3Original, Level3Modified } from '../scenes/Level3Scene';
import { Level4Original, Level4Modified } from '../scenes/Level4Scene';
import { Level5Original, Level5Modified } from '../scenes/Level5Scene';
import { Level6Original, Level6Modified } from '../scenes/Level6Scene';
import { Level7Original, Level7Modified } from '../scenes/Level7Scene';
import { Level8Original, Level8Modified } from '../scenes/Level8Scene';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: 'Beach Café',
    description: 'A sunny afternoon at a seaside café terrace...',
    category: 'nature',
    difficulty: 'Easy',
    emoji: '🏖️',
    popular: true,
    timeLimit: 180,
    maxHints: 3,
    OriginalScene: Level1Original,
    ModifiedScene: Level1Modified,
    differences: [
      { id: 'l1-d1', cx: 175 / 800, cy: 278 / 600, r: 0.085, label: 'Umbrella changed' },
      { id: 'l1-d2', cx: 378 / 800, cy: 164 / 600, r: 0.065, label: 'Seagull disappeared' },
      { id: 'l1-d3', cx: 666 / 800, cy: 383 / 600, r: 0.08,  label: 'Chalkboard text' },
      { id: 'l1-d4', cx: 590 / 800, cy: 82  / 600, r: 0.08,  label: 'Cloud shape' },
      { id: 'l1-d5', cx: 420 / 800, cy: 446 / 600, r: 0.085, label: 'Chair color' },
    ],
  },
  {
    id: 2,
    title: 'Space Station',
    description: 'Inside an orbital space station control room...',
    category: 'space',
    difficulty: 'Medium',
    emoji: '🚀',
    popular: true,
    timeLimit: 180,
    maxHints: 3,
    OriginalScene: Level2Original,
    ModifiedScene: Level2Modified,
    differences: [
      { id: 'l2-d1', cx: 95  / 800, cy: 355 / 600, r: 0.065, label: 'Warning light' },
      { id: 'l2-d2', cx: (675 + 57.5) / 800, cy: (120 + 41) / 600, r: 0.075, label: 'Monitor disappeared' },
      { id: 'l2-d3', cx: 183 / 800, cy: 118 / 600, r: 0.065, label: 'Moon in porthole' },
      { id: 'l2-d4', cx: 420 / 800, cy: 200 / 600, r: 0.07,  label: 'Coffee steam' },
      { id: 'l2-d5', cx: 354 / 800, cy: 355 / 600, r: 0.065, label: 'Sleeve patch' },
    ],
  },
  {
    id: 3,
    title: 'Enchanted Cottage',
    description: 'A mysterious cottage deep in the forest at dusk...',
    category: 'fantasy',
    difficulty: 'Hard',
    emoji: '🌲',
    popular: true,
    timeLimit: 180,
    maxHints: 3,
    OriginalScene: Level3Original,
    ModifiedScene: Level3Modified,
    differences: [
      { id: 'l3-d1', cx: 710 / 800, cy: 287 / 600, r: 0.07,  label: 'Owl disappeared' },
      { id: 'l3-d2', cx: 175 / 800, cy: 435 / 600, r: 0.07,  label: 'Mushroom color' },
      { id: 'l3-d3', cx: 500 / 800, cy: 355 / 600, r: 0.065, label: 'Well rope' },
      { id: 'l3-d4', cx: 360 / 800, cy: 140 / 600, r: 0.065, label: 'Second chimney' },
      { id: 'l3-d5', cx: 575 / 800, cy: 320 / 600, r: 0.085, label: 'Firefly count' },
    ],
  },
  {
    id: 4,
    title: 'Soccer Match',
    description: 'Find 5 differences in this intense soccer match scene!',
    category: 'sports',
    difficulty: 'Easy',
    emoji: '⚽',
    popular: true,
    timeLimit: 180,
    maxHints: 3,
    OriginalScene: Level4Original,
    ModifiedScene: Level4Modified,
    differences: [
      // Ball at translate(400,300) r=28
      { id: 'l4-d1', cx: 400 / 800, cy: 300 / 600, r: 0.075, label: 'Ball pattern' },
      // Player body center: translate(210,290) + body y=20..65 → abs center (210,332)
      { id: 'l4-d2', cx: 210 / 800, cy: 332 / 600, r: 0.09,  label: 'Player jersey number' },
      // Scoreboard rect x=560,y=28,w=220,h=86 — HOME score text at (615,90)
      { id: 'l4-d3', cx: 615 / 800, cy: 70  / 600, r: 0.10,  label: 'Scoreboard number' },
      // Left net rect x=52,y=332,w=78,h=118 → center (91,391)
      { id: 'l4-d4', cx:  91 / 800, cy: 391 / 600, r: 0.09,  label: 'Goal net color' },
      // Referee at translate(490,370) body y=16..56 → abs center (490,406)
      { id: 'l4-d5', cx: 490 / 800, cy: 406 / 600, r: 0.08,  label: 'Referee shirt' },
    ],
  },
  {
    id: 5,
    title: 'Basketball Court',
    description: 'Spot 5 differences during this exciting basketball game!',
    category: 'sports',
    difficulty: 'Medium',
    emoji: '🏀',
    popular: false,
    timeLimit: 180,
    maxHints: 3,
    OriginalScene: Level5Original,
    ModifiedScene: Level5Modified,
    differences: [
      // Left shot clock rect x=58,y=160,w=34,h=22 → center (75,171)
      { id: 'l5-d1', cx:  75 / 800, cy: 171 / 600, r: 0.075, label: 'Shot clock number' },
      // Player jersey translate(230,280) body y=18..66 → abs center (230,321)
      { id: 'l5-d2', cx: 230 / 800, cy: 321 / 600, r: 0.09,  label: 'Player jersey color' },
      // Right backboard inner rect x=696,y=183,w=54,h=34 → center (723,200)
      { id: 'l5-d3', cx: 723 / 800, cy: 200 / 600, r: 0.08,  label: 'Backboard stripe' },
      // Center court circle cx=400,cy=390,r=60
      { id: 'l5-d4', cx: 400 / 800, cy: 390 / 600, r: 0.09,  label: 'Court line color' },
      // Changing banner at translate(250,0) rect x=-20,y=0,w=40,h=70 → center (250,35)
      { id: 'l5-d5', cx: 250 / 800, cy:  35 / 600, r: 0.075, label: 'Banner color' },
    ],
  },
  {
    id: 6,
    title: 'Tennis Grand Slam',
    description: 'Can you find 5 differences at the tennis championship?',
    category: 'sports',
    difficulty: 'Hard',
    emoji: '🎾',
    popular: false,
    timeLimit: 180,
    maxHints: 3,
    OriginalScene: Level6Original,
    ModifiedScene: Level6Modified,
    differences: [
      // Net strap rect x=392,y=300,w=16,h=90 → center (400,345)
      { id: 'l6-d1', cx: 400 / 800, cy: 345 / 600, r: 0.075, label: 'Net strap color' },
      // Racket grip: player translate(220,430) + racket group translate(38,-18) rotate(-35)
      // grip rect center after transform ≈ (260,415)
      { id: 'l6-d2', cx: 260 / 800, cy: 415 / 600, r: 0.10,  label: 'Racket grip color' },
      // Scoreboard rect x=560,y=8,w=220,h=110 — score text at (730,80)
      { id: 'l6-d3', cx: 730 / 800, cy:  65 / 600, r: 0.10,  label: 'Scoreboard score' },
      // Court surface rect x=0,y=180 full width — open area center (400,450)
      { id: 'l6-d4', cx: 400 / 800, cy: 450 / 600, r: 0.11,  label: 'Court surface color' },
      // Towel rect x=728,y=326,w=44,h=16 → center (750,334)
      { id: 'l6-d5', cx: 750 / 800, cy: 334 / 600, r: 0.075, label: 'Towel color' },
    ],
  },
  {
    id: 7,
    title: 'Stadium Night',
    description: 'Real photo! Find 5 differences in this packed football stadium.',
    category: 'sports',
    difficulty: 'Hard',
    emoji: '🏟️',
    popular: true,
    timeLimit: 210,
    maxHints: 3,
    OriginalScene: Level7Original,
    ModifiedScene: Level7Modified,
    differences: [
      // D1: Roof LED ring blue→orange  — image(1921,135) → svg(400,37)
      { id: 'l7-d1', cx: 0.500, cy: 0.062, r: 0.12,  label: 'LED ring color' },
      // D2: Scoreboard warm/pink tint  — image(2375,272) → svg(525,75)
      { id: 'l7-d2', cx: 0.656, cy: 0.125, r: 0.11,  label: 'Scoreboard color' },
      // D3: Left stands cyan tint      — image(860,600)  → svg(108,165)
      { id: 'l7-d3', cx: 0.135, cy: 0.275, r: 0.10,  label: 'Stands section' },
      // D4: Ad board yellow            — image(1285,837) → svg(225,231)
      { id: 'l7-d4', cx: 0.281, cy: 0.384, r: 0.09,  label: 'Advertising board' },
      // D5: Pitch center logo pink     — image(1930,1070)→ svg(402,295)
      { id: 'l7-d5', cx: 0.503, cy: 0.491, r: 0.10,  label: 'Pitch logo' },
    ],
  },
  {
    id: 8,
    title: 'Football Match',
    description: 'Real photo! Spot 2 differences in this live football match.',
    category: 'sports',
    difficulty: 'Hard',
    emoji: '⚽',
    popular: true,
    timeLimit: 180,
    maxHints: 2,
    OriginalScene: Level8Original,
    ModifiedScene: Level8Modified,
    differences: [
      // D1: Person sitting on sideline disappeared
      // img center (657, 624) → svg_x=657*0.3-50=147, svg_y=624*0.3=187
      { id: 'l8-d1', cx: 147 / 800, cy: 187 / 600, r: 0.09, label: 'Person on sideline' },
      // D2: White curved line on pitch removed
      // img center (588, 1541) → svg_x=588*0.3-50=126, svg_y=1541*0.3=462
      { id: 'l8-d2', cx: 126 / 800, cy: 462 / 600, r: 0.08, label: 'Pitch line' },
    ],
  },
];

export const CATEGORIES = [
  { id: 'sports',      label: 'Sports',      emoji: '⚽' },
  { id: 'nature',      label: 'Nature',      emoji: '🌿' },
  { id: 'space',       label: 'Space',       emoji: '🚀' },
  { id: 'fantasy',     label: 'Fantasy',     emoji: '🌲' },
  { id: 'celebrities', label: 'Celebrities', emoji: '⭐' },
  { id: 'anime',       label: 'Anime',       emoji: '🎌' },
] as const;
