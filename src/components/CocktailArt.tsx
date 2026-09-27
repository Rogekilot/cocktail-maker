import { useId, type ReactElement } from 'react';
import type { GarnishArt, GlassKey, IllustrationSpec } from '../data/types';

/**
 * Hand-built SVG illustrations. Each drink is described by an IllustrationSpec
 * (glass, liquid color, ice, garnish…) and drawn from shared glass geometry,
 * so every image is original artwork created for this project.
 */

interface GlassGeo {
  /** Closed path of the glass interior (liquid is clipped to it). */
  interior: string;
  /** Top and bottom y of the interior, used for fill level. */
  top: number;
  bottom: number;
  /** Rim endpoints, used to place garnishes. */
  rimL: number;
  rimR: number;
  rimY: number;
  /** Glass body outline (drawn over the liquid). */
  outline: string;
  /** Extra solid glass parts: stems, feet, thick bases. */
  parts?: string[];
  /** Width of the interior at a given y (for ice / foam placement). */
  widthAt: (y: number) => [number, number];
  opaque?: 'copper' | 'steel';
  /** Optional handle path, drawn as a thick glass stroke. */
  handle?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Symmetric interior width from a table of [y, halfWidth] points (sorted by y). */
function fromTable(table: [number, number][]): (y: number) => [number, number] {
  return (y) => {
    let half = table[0][1];
    if (y >= table[table.length - 1][0]) half = table[table.length - 1][1];
    for (let i = 0; i < table.length - 1; i++) {
      const [y0, h0] = table[i];
      const [y1, h1] = table[i + 1];
      if (y >= y0 && y <= y1) half = lerp(h0, h1, (y - y0) / (y1 - y0));
    }
    return [200 - half, 200 + half];
  };
}

const GLASSES: Record<GlassKey, GlassGeo> = {
  rocks: {
    interior: 'M121 252 L279 252 L271 388 Q270 394 264 394 L136 394 Q130 394 129 388 Z',
    top: 252,
    bottom: 394,
    rimL: 116,
    rimR: 284,
    rimY: 248,
    outline:
      'M116 248 L284 248 L274 404 Q273 418 259 418 L141 418 Q127 418 126 404 Z',
    parts: ['M129 394 L271 394 L270 408 Q269 414 262 414 L138 414 Q131 414 130 408 Z'],
    widthAt: (y) => {
      const t = (y - 252) / (394 - 252);
      return [lerp(121, 129, t), lerp(279, 271, t)];
    },
  },
  coupe: {
    interior: 'M108 212 Q112 286 200 290 Q288 286 292 212 Z',
    top: 212,
    bottom: 290,
    rimL: 102,
    rimR: 298,
    rimY: 208,
    outline: 'M102 208 L298 208 Q296 294 206 300 L206 300 L194 300 Q104 294 102 208 Z',
    parts: [
      'M194 298 L206 298 L204 396 L196 396 Z',
      'M150 404 Q200 390 250 404 Q252 414 200 414 Q148 414 150 404 Z',
    ],
    widthAt: (y) => {
      const t = Math.min(1, Math.max(0, (y - 212) / 78));
      const half = 92 * Math.sqrt(1 - t * t * 0.96);
      return [200 - half, 200 + half];
    },
  },
  martini: {
    interior: 'M100 196 L300 196 L204 292 L196 292 Z',
    top: 196,
    bottom: 292,
    rimL: 92,
    rimR: 308,
    rimY: 190,
    outline: 'M92 190 L308 190 L206 302 L194 302 Z',
    parts: [
      'M195 298 L205 298 L204 398 L196 398 Z',
      'M148 406 Q200 392 252 406 Q254 416 200 416 Q146 416 148 406 Z',
    ],
    widthAt: (y) => {
      const t = (y - 196) / 96;
      return [lerp(100, 196, t), lerp(300, 204, t)];
    },
  },
  highball: {
    interior: 'M141 156 L259 156 L256 392 Q256 396 252 396 L148 396 Q144 396 144 392 Z',
    top: 156,
    bottom: 396,
    rimL: 136,
    rimR: 264,
    rimY: 152,
    outline: 'M136 152 L264 152 L260 406 Q259 418 247 418 L153 418 Q141 418 140 406 Z',
    parts: ['M144 396 L256 396 L255 410 Q254 414 249 414 L151 414 Q146 414 145 410 Z'],
    widthAt: (y) => {
      const t = (y - 156) / 240;
      return [lerp(141, 144, t), lerp(259, 256, t)];
    },
  },
  collins: {
    interior: 'M151 132 L249 132 L247 394 Q247 398 243 398 L157 398 Q153 398 153 394 Z',
    top: 132,
    bottom: 398,
    rimL: 146,
    rimR: 254,
    rimY: 128,
    outline: 'M146 128 L254 128 L252 408 Q251 418 241 418 L159 418 Q149 418 148 408 Z',
    parts: ['M153 398 L247 398 L246 411 Q245 414 241 414 L159 414 Q155 414 154 411 Z'],
    widthAt: (y) => {
      const t = (y - 132) / 266;
      return [lerp(151, 153, t), lerp(249, 247, t)];
    },
  },
  flute: {
    interior: 'M168 142 L232 142 L229 286 Q226 318 200 320 Q174 318 171 286 Z',
    top: 142,
    bottom: 320,
    rimL: 163,
    rimR: 237,
    rimY: 138,
    outline: 'M163 138 L237 138 L234 288 Q230 326 204 330 L196 330 Q170 326 166 288 Z',
    parts: [
      'M196 326 L204 326 L203 400 L197 400 Z',
      'M158 408 Q200 396 242 408 Q244 416 200 416 Q156 416 158 408 Z',
    ],
    widthAt: (y) => {
      if (y < 286) {
        const t = (y - 142) / 144;
        return [lerp(168, 171, t), lerp(232, 229, t)];
      }
      const t = (y - 286) / 34;
      const half = 29 * Math.sqrt(Math.max(0, 1 - t * t));
      return [200 - half, 200 + half];
    },
  },
  mule: {
    interior: 'M128 244 L262 244 L262 250 L128 250 Z',
    top: 240,
    bottom: 250,
    rimL: 124,
    rimR: 266,
    rimY: 240,
    outline: 'M124 240 L266 240 L260 408 Q259 418 248 418 L142 418 Q131 418 130 408 Z',
    widthAt: () => [128, 262],
    opaque: 'copper',
  },
  irish: {
    interior: 'M147 206 L253 206 L250 328 Q247 354 200 356 Q153 354 150 328 Z',
    top: 206,
    bottom: 356,
    rimL: 141,
    rimR: 259,
    rimY: 200,
    outline: 'M141 200 L259 200 L256 332 Q252 366 206 368 L194 368 Q148 366 144 332 Z',
    parts: [
      'M194 366 L206 366 L204 398 L196 398 Z',
      'M150 406 Q200 392 250 406 Q252 416 200 416 Q148 416 150 406 Z',
    ],
    handle: 'M256 226 Q304 230 300 272 Q296 316 253 318',
    widthAt: fromTable([
      [206, 53],
      [328, 50],
      [345, 38],
      [356, 4],
    ]),
  },
  hurricane: {
    interior:
      'M157 126 C153 190 176 220 173 250 C170 282 150 300 152 330 C154 356 176 364 200 364 C224 364 246 356 248 330 C250 300 230 282 227 250 C224 220 247 190 243 126 Z',
    top: 126,
    bottom: 364,
    rimL: 151,
    rimR: 249,
    rimY: 120,
    outline:
      'M151 120 C147 190 170 220 167 250 C164 282 144 300 146 332 C148 364 176 372 200 372 C224 372 252 364 254 332 C256 300 236 282 233 250 C230 220 253 190 249 120 Z',
    parts: [
      'M195 370 L205 370 L204 398 L196 398 Z',
      'M156 406 Q200 392 244 406 Q246 416 200 416 Q154 416 156 406 Z',
    ],
    widthAt: fromTable([
      [126, 43],
      [190, 36],
      [250, 27],
      [300, 44],
      [330, 48],
      [352, 36],
      [364, 4],
    ]),
  },
  wine: {
    interior: 'M153 176 C150 250 160 294 200 296 C240 294 250 250 247 176 Z',
    top: 176,
    bottom: 296,
    rimL: 148,
    rimR: 252,
    rimY: 170,
    outline: 'M148 170 C144 252 156 302 204 304 L196 304 C244 302 256 252 252 170 Z',
    parts: [
      'M195 300 L205 300 L203 400 L197 400 Z',
      'M150 406 Q200 392 250 406 Q252 416 200 416 Q148 416 150 406 Z',
    ],
    widthAt: fromTable([
      [176, 47],
      [240, 48],
      [276, 36],
      [296, 4],
    ]),
  },
  julep: {
    interior: 'M140 236 L260 236 L260 240 L140 240 Z',
    top: 232,
    bottom: 240,
    rimL: 134,
    rimR: 266,
    rimY: 232,
    outline: 'M134 232 L266 232 L252 392 L148 392 Z',
    parts: ['M148 390 L252 390 L258 408 Q259 416 250 416 L150 416 Q141 416 142 408 Z'],
    widthAt: () => [140, 260],
    opaque: 'steel',
  },
};

/** Per-glass framing (all keep the 400:460 aspect ratio) so each glass fills the image. */
const FRAME: Record<GlassKey, [number, number, number]> = {
  // [x, y, width]
  rocks: [50, 100, 300],
  coupe: [45, 90, 310],
  martini: [40, 80, 320],
  highball: [10, 0, 380],
  collins: [10, 0, 380],
  flute: [40, 72, 320],
  mule: [35, 70, 330],
  julep: [35, 70, 330],
  irish: [55, 110, 290],
  hurricane: [5, 8, 390],
  wine: [40, 72, 320],
};

// Deterministic pseudo-random for ice layout, seeded from the spec.
function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
function seedOf(str: string) {
  let h = 7;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function IceCubes({ g, level, seed, big }: { g: GlassGeo; level: number; seed: number; big?: boolean }) {
  const r = rng(seed);
  const cubes: ReactElement[] = [];
  if (big) {
    const size = Math.min(96, (g.widthAt(g.bottom - 10)[1] - g.widthAt(g.bottom - 10)[0]) * 0.62);
    const cy = Math.max(level - 18, g.bottom - size - 8);
    cubes.push(
      <g key="big" transform={`rotate(-4 200 ${cy + size / 2})`}>
        <rect x={200 - size / 2} y={cy} width={size} height={size} rx={12} fill="#ffffff" fillOpacity={0.28} stroke="#ffffff" strokeOpacity={0.7} strokeWidth={2.5} />
        <path d={`M${200 - size / 2 + 12} ${cy + 14} L${200 + size / 2 - 22} ${cy + 10}`} stroke="#fff" strokeOpacity={0.75} strokeWidth={4} strokeLinecap="round" />
      </g>,
    );
    return <>{cubes}</>;
  }
  const size = Math.min(52, (g.widthAt(g.top)[1] - g.widthAt(g.top)[0]) / 3.1);
  let y = g.bottom - size - 4;
  let row = 0;
  while (y > g.top - size * 0.35) {
    const [l, rr] = g.widthAt(y + size / 2);
    const count = Math.max(1, Math.floor((rr - l - 6) / (size + 4)));
    const span = count * size + (count - 1) * 4;
    let x = (l + rr) / 2 - span / 2 + (row % 2 ? 6 : -6);
    for (let i = 0; i < count; i++) {
      const rot = (r() - 0.5) * 22;
      const s = size * (0.88 + r() * 0.16);
      const cx = x + size / 2;
      const cy = y + size / 2;
      cubes.push(
        <g key={`${row}-${i}`} transform={`rotate(${rot.toFixed(1)} ${cx} ${cy})`}>
          <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={8} fill="#ffffff" fillOpacity={cy < level ? 0.5 : 0.13} stroke="#ffffff" strokeOpacity={0.65} strokeWidth={2} />
          <path d={`M${cx - s / 2 + 8} ${cy - s / 2 + 9} L${cx + s / 2 - 16} ${cy - s / 2 + 7}`} stroke="#fff" strokeOpacity={0.7} strokeWidth={3} strokeLinecap="round" />
        </g>,
      );
      x += size + 4;
    }
    y -= size * 0.9;
    row++;
  }
  return <>{cubes}</>;
}

function CrushedIce({ g, seed, mound }: { g: GlassGeo; seed: number; mound?: boolean }) {
  const r = rng(seed);
  const bits: ReactElement[] = [];
  const top = mound ? g.rimY - 34 : g.top + 6;
  for (let i = 0; i < 140; i++) {
    const y = lerp(top, g.bottom - 6, r());
    let [l, rr] = mound && y < g.rimY ? [g.rimL + 10, g.rimR - 10] : g.widthAt(y);
    if (mound && y < g.rimY) {
      // Dome shape above the rim.
      const t = (g.rimY - y) / 34;
      const half = ((g.rimR - g.rimL) / 2 - 8) * Math.sqrt(Math.max(0, 1 - t * t));
      l = 200 - half;
      rr = 200 + half;
    }
    const x = lerp(l + 5, rr - 5, r());
    const s = 7 + r() * 11;
    bits.push(
      <rect key={i} x={x - s / 2} y={y - s / 2} width={s} height={s * (0.7 + r() * 0.5)} rx={3} transform={`rotate(${(r() * 90).toFixed(0)} ${x} ${y})`} fill="#ffffff" fillOpacity={0.35 + r() * 0.35} />,
    );
  }
  return <>{bits}</>;
}

/* ---------- Garnishes ---------- */

function Citrus({ x, y, r, color, rind, rot = 0, half }: { x: number; y: number; r: number; color: string; rind: string; rot?: number; half?: boolean }) {
  const segs = 8;
  const lines = Array.from({ length: segs }, (_, i) => {
    const a = (i / segs) * Math.PI * (half ? 1 : 2) + (half ? Math.PI : 0);
    return (
      <line key={i} x1={x} y1={y} x2={x + Math.cos(a) * r * 0.78} y2={y + Math.sin(a) * r * 0.78} stroke="#fffbe8" strokeOpacity={0.9} strokeWidth={2} />
    );
  });
  const shape = half
    ? `M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y} Z`
    : undefined;
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      {half ? (
        <>
          <path d={shape} fill={rind} />
          <path d={`M${x - r * 0.84} ${y} A${r * 0.84} ${r * 0.84} 0 0 1 ${x + r * 0.84} ${y} Z`} fill={color} />
        </>
      ) : (
        <>
          <circle cx={x} cy={y} r={r} fill={rind} />
          <circle cx={x} cy={y} r={r * 0.84} fill={color} />
        </>
      )}
      {lines}
      <circle cx={x} cy={y} r={r * 0.1} fill="#fffbe8" />
    </g>
  );
}

function Twist({ x, y, color, dark }: { x: number; y: number; color: string; dark: string }) {
  return (
    <g>
      <path
        d={`M${x - 6} ${y - 4} C${x + 26} ${y - 40}, ${x + 50} ${y - 6}, ${x + 30} ${y + 16} C${x + 14} ${y + 34}, ${x + 46} ${y + 50}, ${x + 62} ${y + 36}`}
        fill="none"
        stroke={dark}
        strokeWidth={13}
        strokeLinecap="round"
      />
      <path
        d={`M${x - 6} ${y - 4} C${x + 26} ${y - 40}, ${x + 50} ${y - 6}, ${x + 30} ${y + 16} C${x + 14} ${y + 34}, ${x + 46} ${y + 50}, ${x + 62} ${y + 36}`}
        fill="none"
        stroke={color}
        strokeWidth={9}
        strokeLinecap="round"
      />
    </g>
  );
}

function Leaf({ x, y, len, rot, color, vein = '#e8f5d0' }: { x: number; y: number; len: number; rot: number; color: string; vein?: string }) {
  const w = len * 0.6;
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <path d={`M${x} ${y} Q${x + w} ${y - len * 0.5} ${x} ${y - len} Q${x - w} ${y - len * 0.5} ${x} ${y} Z`} fill={color} />
      <path d={`M${x} ${y - 2} L${x} ${y - len + 6}`} stroke={vein} strokeOpacity={0.55} strokeWidth={1.6} />
    </g>
  );
}

function Sprig({ x, y, color, dark, scale = 1, basil }: { x: number; y: number; color: string; dark: string; scale?: number; basil?: boolean }) {
  const L = (basil ? 40 : 30) * scale;
  const leaves = basil
    ? [
        [-34, 0, L * 1.05, color],
        [30, -4, L, dark],
        [-8, -20, L * 1.1, color],
        [16, -36, L * 0.85, dark],
        [-22, -44, L * 0.8, color],
      ]
    : [
        [-40, 0, L, dark],
        [36, -2, L, color],
        [-20, -18, L * 0.95, color],
        [22, -26, L * 0.9, dark],
        [-6, -40, L * 0.85, color],
        [14, -52, L * 0.7, dark],
        [-10, -58, L * 0.62, color],
      ];
  return (
    <g>
      <path d={`M${x} ${y + 30} Q${x + 2} ${y} ${x} ${y - 50 * scale}`} stroke="#5b7f3a" strokeWidth={3} fill="none" />
      {leaves.map(([rot, dy, len, c], i) => (
        <Leaf key={i} x={x} y={y + (dy as number) * scale} len={len as number} rot={rot as number} color={c as string} />
      ))}
    </g>
  );
}

function Pick({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b88a4a" strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={x1} cy={y1} r={4} fill="#8b5a2b" />
    </g>
  );
}

function Garnishes({ g, list, level }: { g: GlassGeo; list: GarnishArt[]; level: number }) {
  const out: ReactElement[] = [];
  const rimMidR = g.rimR - 6;
  list.forEach((kind, i) => {
    const key = `${kind}-${i}`;
    switch (kind) {
      case 'lemon-twist':
        out.push(<Twist key={key} x={g.rimR - 26} y={g.rimY - 4} color="#f7d64a" dark="#e0b123" />);
        break;
      case 'orange-twist':
        out.push(<Twist key={key} x={g.rimR - 26} y={g.rimY - 4} color="#f59a3c" dark="#d9731f" />);
        break;
      case 'orange-slice':
        out.push(<Citrus key={key} x={rimMidR - 4} y={g.rimY + 2} r={36} color="#f8a948" rind="#e9761c" rot={20} half />);
        break;
      case 'lemon-slice':
        out.push(<Citrus key={key} x={rimMidR - 2} y={g.rimY + 2} r={32} color="#fae27a" rind="#efc52c" rot={18} half />);
        break;
      case 'lime-wheel':
        out.push(
          <g key={key}>
            <Citrus x={rimMidR} y={g.rimY - 4} r={30} color="#c4e27a" rind="#5f9e2f" />
          </g>,
        );
        break;
      case 'lime-wedge':
        out.push(
          <g key={key} transform={`rotate(-28 ${rimMidR} ${g.rimY})`}>
            <path d={`M${rimMidR - 34} ${g.rimY} A34 34 0 0 0 ${rimMidR + 34} ${g.rimY} Z`} fill="#4f8d27" />
            <path d={`M${rimMidR - 28} ${g.rimY} A28 28 0 0 0 ${rimMidR + 28} ${g.rimY} Z`} fill="#c4e27a" />
            <path d={`M${rimMidR - 28} ${g.rimY} L${rimMidR + 28} ${g.rimY}`} stroke="#eef7d2" strokeWidth={3} />
          </g>,
        );
        break;
      case 'cherry': {
        const cx = 200 + (g.rimR - g.rimL) * 0.12;
        const cy = Math.min(level + 30, g.bottom - 16);
        out.push(
          <g key={key}>
            <Pick x1={g.rimR + 18} y1={g.rimY - 40} x2={cx - 6} y2={cy + 6} />
            <path d={`M${cx} ${cy - 12} Q${cx + 10} ${cy - 36} ${cx + 26} ${cy - 44}`} stroke="#5a3b1d" strokeWidth={2.5} fill="none" />
            <circle cx={cx} cy={cy} r={14} fill="#8e0f1d" />
            <circle cx={cx - 5} cy={cy - 5} r={4} fill="#fff" fillOpacity={0.55} />
          </g>,
        );
        break;
      }
      case 'olive': {
        const cx = 206;
        const cy = Math.min(level + 34, g.bottom - 30);
        out.push(
          <g key={key}>
            <Pick x1={g.rimR + 10} y1={g.rimY - 52} x2={cx - 30} y2={cy + 22} />
            {[0, 1].map((k) => (
              <g key={k}>
                <ellipse cx={cx - k * 22 + 8} cy={cy - k * 16 + 4} rx={13} ry={10} transform={`rotate(-38 ${cx - k * 22 + 8} ${cy - k * 16 + 4})`} fill="#7c8c2b" />
                <circle cx={cx - k * 22 + 13} cy={cy - k * 16} r={3.5} fill="#c6402f" />
              </g>
            ))}
          </g>,
        );
        break;
      }
      case 'mint':
        out.push(<Sprig key={key} x={g.rimL + (g.rimR - g.rimL) * 0.28} y={g.rimY - 8} color="#5ca544" dark="#3f8a33" />);
        break;
      case 'basil':
        out.push(<Sprig key={key} x={g.rimL + (g.rimR - g.rimL) * 0.3} y={g.rimY - 6} color="#3fa04a" dark="#2c7f38" basil />);
        break;
      case 'blackberry': {
        const cx = 200 - 10;
        const cy = g.rimY - 34;
        out.push(
          <g key={key}>
            {Array.from({ length: 13 }, (_, k) => {
              const a = (k / 13) * Math.PI * 2;
              const rr = k % 2 ? 7 : 11;
              return <circle key={k} cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr * 1.1} r={7} fill={k % 3 ? '#2a1033' : '#3d1747'} />;
            })}
            <circle cx={cx} cy={cy} r={7} fill="#34123d" />
            <circle cx={cx - 5} cy={cy - 8} r={2.5} fill="#fff" fillOpacity={0.5} />
          </g>,
        );
        break;
      }
      case 'coffee-beans': {
        const yy = Math.max(level + 2, g.top + 4);
        out.push(
          <g key={key}>
            {[-26, 0, 26].map((dx, k) => (
              <g key={k} transform={`rotate(${dx} ${200 + dx} ${yy})`}>
                <ellipse cx={200 + dx} cy={yy} rx={9} ry={6.5} fill="#3b2012" />
                <path d={`M${200 + dx - 7} ${yy} Q${200 + dx} ${yy - 3} ${200 + dx + 7} ${yy}`} stroke="#150904" strokeWidth={1.8} fill="none" />
              </g>
            ))}
          </g>,
        );
        break;
      }
      case 'salt-rim': {
        const w = (g.rimR - g.rimL) / 2;
        out.push(
          <g key={key}>
            {Array.from({ length: 48 }, (_, k) => {
              const x = g.rimL + (k / 47) * w + 2;
              return <circle key={k} cx={x} cy={g.rimY + 1 + ((k * 7) % 5) - 2} r={2 + (k % 3) * 0.7} fill="#ffffff" />;
            })}
          </g>,
        );
        break;
      }
      case 'ginger': {
        const cx = g.rimR - 20;
        const cy = g.rimY - 26;
        out.push(
          <g key={key}>
            <Pick x1={cx - 44} y1={cy - 22} x2={cx + 30} y2={cy + 32} />
            <rect x={cx - 12} y={cy - 12} width={24} height={20} rx={5} transform={`rotate(20 ${cx} ${cy})`} fill="#e3b04f" stroke="#c28a2c" strokeWidth={2} />
            <rect x={cx - 26} y={cy - 22} width={10} height={4} rx={2} fill="#fff" fillOpacity={0.5} transform={`rotate(20 ${cx} ${cy})`} />
          </g>,
        );
        break;
      }
      case 'straw':
        out.push(<rect key={key} x={g.rimL + (g.rimR - g.rimL) * 0.62} y={g.rimY - 86} width={9} height={170} rx={4} transform={`rotate(12 ${g.rimL + (g.rimR - g.rimL) * 0.62} ${g.rimY})`} fill="#1f1b17" fillOpacity={0.85} />);
        break;
      case 'grapefruit-twist':
        out.push(<Twist key={key} x={g.rimR - 26} y={g.rimY - 4} color="#f59a8a" dark="#e0685a" />);
        break;
      case 'orange-wheel':
        out.push(<Citrus key={key} x={rimMidR} y={g.rimY - 4} r={32} color="#f8a948" rind="#e9761c" />);
        break;
      case 'lemon-wedge':
        out.push(
          <g key={key} transform={`rotate(-28 ${rimMidR} ${g.rimY})`}>
            <path d={`M${rimMidR - 34} ${g.rimY} A34 34 0 0 0 ${rimMidR + 34} ${g.rimY} Z`} fill="#e6b820" />
            <path d={`M${rimMidR - 28} ${g.rimY} A28 28 0 0 0 ${rimMidR + 28} ${g.rimY} Z`} fill="#fae27a" />
            <path d={`M${rimMidR - 28} ${g.rimY} L${rimMidR + 28} ${g.rimY}`} stroke="#fffbe8" strokeWidth={3} />
          </g>,
        );
        break;
      case 'raspberry': {
        const cx = g.rimR - 8;
        const cy = g.rimY - 30;
        out.push(
          <g key={key}>
            <Pick x1={cx + 30} y1={cy - 34} x2={cx - 60} y2={cy + 44} />
            {[0, 1].map((k) => {
              const bx = cx - k * 30;
              const by = cy + k * 26;
              return (
                <g key={k}>
                  {Array.from({ length: 10 }, (_, j) => {
                    const a = (j / 10) * Math.PI * 2;
                    return <circle key={j} cx={bx + Math.cos(a) * 8} cy={by + Math.sin(a) * 9} r={6} fill={j % 2 ? '#b3203a' : '#d23a52'} />;
                  })}
                  <circle cx={bx} cy={by} r={6} fill="#c72a45" />
                  <circle cx={bx - 4} cy={by - 5} r={2} fill="#fff" fillOpacity={0.55} />
                </g>
              );
            })}
          </g>,
        );
        break;
      }
      case 'nutmeg': {
        const [l, r] = g.widthAt(level + 2);
        out.push(
          <g key={key}>
            {Array.from({ length: 34 }, (_, k) => {
              const x = lerp(l + 14, r - 14, ((k * 37) % 100) / 100);
              const y = level + 1 + ((k * 13) % 7);
              return <circle key={k} cx={x} cy={y} r={1.3 + (k % 3) * 0.5} fill="#7a4a24" fillOpacity={0.85} />;
            })}
          </g>,
        );
        break;
      }
      case 'bitters-drops': {
        out.push(
          <g key={key}>
            {[-30, -10, 10, 30].map((dx, k) => (
              <ellipse key={k} cx={200 + dx} cy={level + 4 + (k % 2) * 2} rx={5} ry={3} fill="#7a2c14" fillOpacity={0.9} />
            ))}
          </g>,
        );
        break;
      }
      case 'lime-chunks': {
        out.push(
          <g key={key}>
            {[
              [175, g.bottom - 30, -20],
              [222, g.bottom - 38, 25],
              [196, g.bottom - 62, 5],
            ].map(([x, y, rot], k) => (
              <g key={k} transform={`rotate(${rot} ${x} ${y})`}>
                <path d={`M${x - 20} ${y} A20 20 0 0 0 ${x + 20} ${y} Z`} fill="#4f8d27" fillOpacity={0.9} />
                <path d={`M${x - 15} ${y} A15 15 0 0 0 ${x + 15} ${y} Z`} fill="#b9da6c" fillOpacity={0.9} />
              </g>
            ))}
          </g>,
        );
        break;
      }
      case 'sugar-cube': {
        const y = g.bottom - 18;
        out.push(
          <g key={key}>
            <rect x={190} y={y - 4} width={20} height={18} rx={3} fill="#c98a55" transform={`rotate(-8 200 ${y})`} />
            <rect x={193} y={y - 1} width={8} height={5} rx={2} fill="#fff" fillOpacity={0.45} transform={`rotate(-8 200 ${y})`} />
          </g>,
        );
        break;
      }
      case 'cherry-rim': {
        const cx = g.rimL + 34;
        const cy = g.rimY - 12;
        out.push(
          <g key={key}>
            <path d={`M${cx} ${cy - 12} Q${cx + 6} ${cy - 40} ${cx + 22} ${cy - 48}`} stroke="#5a3b1d" strokeWidth={2.5} fill="none" />
            <circle cx={cx} cy={cy} r={14} fill="#a8121f" />
            <circle cx={cx - 5} cy={cy - 5} r={4} fill="#fff" fillOpacity={0.55} />
          </g>,
        );
        break;
      }
      case 'pineapple': {
        const x = g.rimR - 14;
        const y = g.rimY - 6;
        out.push(
          <g key={key} transform={`rotate(18 ${x} ${y})`}>
            {[-22, -6, 10].map((a, k) => (
              <path
                key={k}
                d={`M${x + 18} ${y - 26} q${a} -40 ${a * 1.6} -70 q${-a * 0.2 + 6} 30 ${-a * 1.4 - 2} 70 Z`}
                fill={k % 2 ? '#3f8a3a' : '#2f7433'}
              />
            ))}
            <path d={`M${x - 30} ${y + 20} L${x + 34} ${y + 20} L${x + 22} ${y - 30} Q${x} ${y - 40} ${x - 20} ${y - 26} Z`} fill="#f5c542" />
            <path d={`M${x - 30} ${y + 20} L${x + 34} ${y + 20} L${x + 32} ${y + 30} L${x - 28} ${y + 30} Z`} fill="#b8862a" />
            <path d={`M${x - 16} ${y - 18} L${x + 22} ${y + 12} M${x + 16} ${y - 22} L${x - 18} ${y + 12}`} stroke="#e0a92a" strokeWidth={2} />
          </g>,
        );
        break;
      }
      case 'celery': {
        const x = g.rimL + 40;
        out.push(
          <g key={key} transform={`rotate(-14 ${x} ${g.rimY})`}>
            <rect x={x - 9} y={g.rimY - 90} width={18} height={200} rx={8} fill="#a9cf6a" />
            <path d={`M${x - 2} ${g.rimY - 86} L${x - 2} ${g.rimY + 100}`} stroke="#8bb450" strokeWidth={3} />
            {[-26, -4, 18].map((dx, k) => (
              <ellipse key={k} cx={x + dx} cy={g.rimY - 100 - (k % 2) * 12} rx={16} ry={11} fill={k % 2 ? '#5f9e3a' : '#76b347'} />
            ))}
          </g>,
        );
        break;
      }
      case 'passion-fruit': {
        const cy = level + 2;
        out.push(
          <g key={key}>
            <ellipse cx={200} cy={cy} rx={38} ry={11} fill="#5a2144" />
            <ellipse cx={200} cy={cy - 1} rx={32} ry={8} fill="#f3c23a" />
            {Array.from({ length: 12 }, (_, k) => (
              <ellipse key={k} cx={180 + ((k * 7) % 40)} cy={cy - 4 + ((k * 5) % 7)} rx={2.2} ry={1.6} fill="#2b1b12" />
            ))}
          </g>,
        );
        break;
      }
    }
  });
  return <>{out}</>;
}

/* ---------- Main component ---------- */

export function CocktailArt({
  spec,
  title,
  className,
}: {
  spec: IllustrationSpec;
  title: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const g = GLASSES[spec.glass];
  const level = g.bottom - (g.bottom - g.top) * spec.fill;
  const seed = seedOf(title);
  const liquidOpacity = spec.opacity ?? 0.9;
  const BACK: GarnishArt[] = ['straw', 'mint', 'basil'];
  const INSIDE: GarnishArt[] = ['cherry', 'olive', 'lime-chunks', 'sugar-cube'];
  const backGarnish = spec.garnish.filter((x) => BACK.includes(x));
  const insideGarnish = spec.garnish.filter((x) => INSIDE.includes(x));
  const rimGarnish = spec.garnish.filter((x) => !BACK.includes(x) && !INSIDE.includes(x));

  const bubbleRng = rng(seed * 7 + 3);
  const bubbles = spec.bubbles
    ? Array.from({ length: 22 }, (_, i) => {
        const r = bubbleRng;
        void i;
        const y = lerp(level + 8, g.bottom - 8, r());
        const [l, rr] = g.widthAt(y);
        return <circle key={i} cx={lerp(l + 8, rr - 8, r())} cy={y} r={1.5 + r() * 2.2} fill="#fff" fillOpacity={0.7} />;
      })
    : null;

  const [fx, fy, fw] = FRAME[spec.glass];
  const foamH = spec.foam ? Math.max(8, (g.bottom - g.top) * (spec.foamDepth ?? 0.09)) : 0;

  return (
    <svg viewBox={`${fx} ${fy} ${fw} ${(fw * 1.15).toFixed(1)}`} role="img" aria-label={`Illustration of a ${title}`} className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.42} />
          <stop offset="60%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>
        <linearGradient id={`liq-${uid}`} gradientUnits="userSpaceOnUse" x1="0" y1={level} x2="0" y2={g.bottom}>
          <stop offset="0%" stopColor={spec.liquidTop ?? spec.liquid} />
          <stop offset="100%" stopColor={spec.liquid} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.26} />
          <stop offset="14%" stopColor="#ffffff" stopOpacity={0.05} />
          <stop offset="84%" stopColor="#ffffff" stopOpacity={0.02} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id={`copper-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a4a22" />
          <stop offset="22%" stopColor="#d88a52" />
          <stop offset="45%" stopColor="#f2b27d" />
          <stop offset="70%" stopColor="#c06f3b" />
          <stop offset="100%" stopColor="#7a3d19" />
        </linearGradient>
        <linearGradient id={`steel-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d9399" />
          <stop offset="25%" stopColor="#e6eaee" />
          <stop offset="48%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#b8bec4" />
          <stop offset="100%" stopColor="#80868c" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <path d={g.interior} />
        </clipPath>
        <clipPath id={`outline-${uid}`}>
          <path d={g.outline} />
        </clipPath>
      </defs>

      <rect x="-100" y="-100" width="600" height="700" fill={spec.backdrop} />
      <rect x="-100" y="-100" width="600" height="700" fill={`url(#bg-${uid})`} />
      {/* Table surface & shadow */}
      <rect x="-100" y="410" width="600" height="200" fill="#000" fillOpacity={0.07} />
      <ellipse cx="200" cy="416" rx={g.opaque ? 86 : 78} ry="9" fill="#000" fillOpacity={0.18} />

      <g>{backGarnish.map((k, i) => <Garnishes key={i} g={g} list={[k]} level={level} />)}</g>

      {g.opaque ? (
        <>
          {spec.ice === 'crushed' && <CrushedIce g={g} seed={seed} mound />}
          {spec.ice === 'cubes' && (
            <g>
              {[150, 196, 236].map((x, i) => (
                <rect key={i} x={x - 20} y={g.rimY - 26 + (i % 2) * 8} width={40} height={40} rx={8} transform={`rotate(${i * 14 - 12} ${x} ${g.rimY - 6})`} fill="#ffffff" fillOpacity={0.55} stroke="#fff" strokeWidth={2} />
              ))}
            </g>
          )}
          <path d={g.outline} fill={`url(#${g.opaque}-${uid})`} />
          {(g.parts ?? []).map((d, i) => (
            <path key={i} d={d} fill={`url(#${g.opaque}-${uid})`} />
          ))}
          <path d={`M${g.rimL} ${g.rimY} L${g.rimR} ${g.rimY}`} stroke="#fff" strokeOpacity={0.6} strokeWidth={4} strokeLinecap="round" />
          {g.opaque === 'copper' && (
            <>
              <path d="M262 272 Q316 278 312 330 Q308 378 258 376" fill="none" stroke={`url(#copper-${uid})`} strokeWidth={16} strokeLinecap="round" />
              {Array.from({ length: 26 }, (_, i) => {
                const r = rng(seed + i);
                return <ellipse key={i} cx={lerp(140, 250, r())} cy={lerp(258, 400, r())} rx={6} ry={4} fill="#fff" fillOpacity={0.12} />;
              })}
            </>
          )}
          {g.opaque === 'steel' && (
            <>
              {Array.from({ length: 60 }, (_, i) => {
                const r = rng(seed + i * 3);
                return <circle key={i} cx={lerp(152, 250, r())} cy={lerp(246, 384, r())} r={1.2 + r() * 1.6} fill="#fff" fillOpacity={0.7} />;
              })}
            </>
          )}
        </>
      ) : (
        <>
          {/* Liquid */}
          <g clipPath={`url(#clip-${uid})`}>
            <rect x="0" y={level} width="400" height={460 - level} fill={`url(#liq-${uid})`} fillOpacity={liquidOpacity} />
            {bubbles}
            {spec.foam && <rect x="0" y={level} width="400" height={foamH} fill={spec.foam} />}
            {spec.foam && <rect x="0" y={level + foamH - 2} width="400" height={3} fill="#000" fillOpacity={0.05} />}
            {spec.ice === 'cubes' && <IceCubes g={g} level={level} seed={seed} />}
            {spec.ice === 'large-cube' && <IceCubes g={g} level={level} seed={seed} big />}
            {spec.ice === 'crushed' && <CrushedIce g={g} seed={seed} />}
            {spec.float && (
              <g fill="none" stroke={spec.float} strokeLinecap="round">
                <path d={`M112 ${level + 6} Q150 ${level + 26} 200 ${level + 14} T288 ${level + 8}`} strokeWidth={18} strokeOpacity={0.8} />
                {[
                  [158, 70, 9],
                  [196, 104, 6],
                  [226, 52, 10],
                  [250, 86, 5],
                ].map(([x, len, w], i) => (
                  <path
                    key={x}
                    d={`M${x} ${level + 12} c${i % 2 ? 10 : -10} ${len * 0.3} ${i % 2 ? -8 : 8} ${len * 0.6} ${i % 2 ? 2 : -3} ${len}`}
                    strokeWidth={w}
                    strokeOpacity={0.55}
                  />
                ))}
              </g>
            )}
            <ellipse cx="200" cy={level} rx={(g.widthAt(level)[1] - g.widthAt(level)[0]) / 2} ry="4" fill="#fff" fillOpacity={0.35} />
          </g>
          <g>{insideGarnish.map((k, i) => <Garnishes key={i} g={g} list={[k]} level={level} />)}</g>
          {/* Glass */}
          <path d={g.outline} fill={`url(#glass-${uid})`} stroke="#ffffff" strokeOpacity={0.85} strokeWidth={3} strokeLinejoin="round" />
          {(g.parts ?? []).map((d, i) => (
            <path key={i} d={d} fill="#ffffff" fillOpacity={0.4} stroke="#ffffff" strokeOpacity={0.85} strokeWidth={2.5} />
          ))}
          {g.handle && (
            <path d={g.handle} fill="none" stroke="#ffffff" strokeOpacity={0.85} strokeWidth={9} strokeLinecap="round" />
          )}
          <g clipPath={`url(#outline-${uid})`}>
            <path d={`M${g.widthAt(g.top + 6)[0] + 10} ${g.rimY + 14} L${g.widthAt(Math.min(g.bottom, g.rimY + 110))[0] + 10} ${Math.min(g.bottom - 6, g.rimY + 110)}`} stroke="#fff" strokeOpacity={0.5} strokeWidth={6} strokeLinecap="round" />
          </g>
        </>
      )}

      <Garnishes g={g} list={rimGarnish} level={level} />
    </svg>
  );
}
