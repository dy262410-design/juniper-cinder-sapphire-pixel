export const COLS = 12;
export const ROWS = 8;
export const CELL = 64;
export const VIEW_W = COLS * CELL;
export const VIEW_H = ROWS * CELL;

export const START_GOLD = 200;
export const START_LIVES = 20;

export type ModeId = "easy" | "normal";
export type TowerId = "soldier" | "sniper" | "demoman" | "commander" | "medic" | "factory" | "slugger";
export type EnemyId =
  | "zombie"
  | "fast"
  | "slow"
  | "giant"
  | "monster"
  | "digger"
  | "mycelium"
  | "fruit"
  | "researcher"
  | "spore"
  | "culture"
  | "vehicle"
  | "giantculture"
  | "primordial"
  | "sprout";
export type TargetMode = "first" | "closest" | "strongest";

export type LevelDef = {
  name: string;
  damage: number;
  interval: number;
  range: number;
  splash: number;
  cost: number;
  abilityCd?: number;
};

export type FactoryLevel = {
  name: string;
  every: number;
  hp: number;
  ram: number;
  gun: number;
  gunInterval: number;
  gunRange: number;
  speed: number;
  cost: number;
};

export type CommanderLevel = {
  name: string;
  fire: number;
  dmg: number;
  radius: number;
  ability: number;
  abilityCd: number;
  cost: number;
};

export type TowerDef = {
  id: TowerId;
  name: string;
  blurb: string;
  placeCost: number;
  elif: number;
  levels: LevelDef[];
  commander?: CommanderLevel[];
  factory?: FactoryLevel[];
};

export const TOWERS: Record<TowerId, TowerDef> = {
  soldier: {
    id: "soldier",
    name: "솔저",
    blurb: "안정적인 단발 화력",
    placeCost: 50,
    elif: 0,
    levels: [
      { name: "권총", damage: 8, interval: 1, range: 4, splash: 0, cost: 0 },
      { name: "쌍권총", damage: 10, interval: 0.7, range: 4, splash: 0, cost: 40 },
      { name: "M16", damage: 15, interval: 0.6, range: 5, splash: 0, cost: 70 },
      { name: "M249", damage: 18, interval: 0.4, range: 5, splash: 0, cost: 120 },
    ],
  },
  sniper: {
    id: "sniper",
    name: "스나이퍼",
    blurb: "비행 적 감지",
    placeCost: 80,
    elif: 40,
    levels: [
      { name: "사냥용 소총", damage: 25, interval: 2, range: 6, splash: 0, cost: 0 },
      { name: "핸들링 개선", damage: 25, interval: 1.6, range: 6, splash: 0, cost: 50 },
      { name: "저격소총", damage: 45, interval: 1.8, range: 8, splash: 0, cost: 90 },
      { name: "대구경 저격소총", damage: 80, interval: 2, range: 8, splash: 0, cost: 150 },
    ],
  },
  demoman: {
    id: "demoman",
    name: "데모맨",
    blurb: "범위 폭발",
    placeCost: 70,
    elif: 50,
    levels: [
      { name: "수류탄", damage: 12, interval: 1.5, range: 4, splash: 1.5, cost: 0 },
      { name: "강화 수류탄", damage: 16, interval: 1.4, range: 4, splash: 1.8, cost: 45 },
      { name: "수류탄 발사기", damage: 20, interval: 1.2, range: 5, splash: 2, cost: 80 },
      { name: "로켓 발사기", damage: 35, interval: 1.5, range: 5, splash: 2.5, cost: 130 },
    ],
  },
  commander: {
    id: "commander",
    name: "사령관",
    blurb: "주변 타워 강화",
    placeCost: 100,
    elif: 80,
    levels: [
      { name: "지역 버프", damage: 0, interval: 0, range: 3, splash: 0, cost: 0 },
      { name: "버프 강화", damage: 0, interval: 0, range: 3.5, splash: 0, cost: 60 },
      { name: "전술 가속", damage: 0, interval: 0, range: 4, splash: 0, cost: 100 },
      { name: "지속 전술", damage: 0, interval: 0, range: 4, splash: 0, cost: 140 },
    ],
    commander: [
      { name: "지역 버프", fire: 1.15, dmg: 1.1, radius: 3, ability: 0, abilityCd: 0, cost: 0 },
      { name: "버프 강화", fire: 1.25, dmg: 1.15, radius: 3.5, ability: 0, abilityCd: 0, cost: 60 },
      { name: "전술 가속", fire: 1.25, dmg: 1.15, radius: 4, ability: 8, abilityCd: 25, cost: 100 },
      { name: "지속 전술", fire: 1.25, dmg: 1.15, radius: 4, ability: 12, abilityCd: 25, cost: 140 },
    ],
  },
  medic: {
    id: "medic",
    name: "의무병",
    blurb: "낮은 화력, 상태이상 해제",
    placeCost: 65,
    elif: 70,
    levels: [
      { name: "구급 키트", damage: 3, interval: 1.2, range: 3.5, splash: 2.5, cost: 0, abilityCd: 18 },
      { name: "처치 개선", damage: 4, interval: 1, range: 3.5, splash: 3, cost: 50, abilityCd: 15 },
      { name: "위생 반경", damage: 5, interval: 0.9, range: 4, splash: 3.5, cost: 85, abilityCd: 12 },
      { name: "광역 제독", damage: 6, interval: 0.8, range: 4, splash: 4, cost: 130, abilityCd: 10 },
    ],
  },
  factory: {
    id: "factory",
    name: "공장",
    blurb: "장갑차를 전선으로 보냄",
    placeCost: 130,
    elif: 90,
    levels: [
      { name: "경장갑차", damage: 0, interval: 14, range: 0, splash: 0, cost: 0 },
      { name: "강화 장갑", damage: 0, interval: 12, range: 0, splash: 0, cost: 80 },
      { name: "지원 화력", damage: 8, interval: 11, range: 3, splash: 0, cost: 120 },
      { name: "전차", damage: 14, interval: 10, range: 3.5, splash: 0, cost: 170 },
    ],
    factory: [
      { name: "경장갑차", every: 14, hp: 90, ram: 90, gun: 0, gunInterval: 0, gunRange: 0, speed: 0.9, cost: 0 },
      { name: "강화 장갑", every: 12, hp: 160, ram: 160, gun: 0, gunInterval: 0, gunRange: 0, speed: 0.95, cost: 80 },
      { name: "지원 화력", every: 11, hp: 200, ram: 200, gun: 8, gunInterval: 0.9, gunRange: 3, speed: 0.95, cost: 120 },
      { name: "전차", every: 10, hp: 360, ram: 360, gun: 14, gunInterval: 0.7, gunRange: 3.5, speed: 0.8, cost: 170 },
    ],
  },
  slugger: {
    id: "slugger",
    name: "강타",
    blurb: "한정 · 전투당 1명",
    placeCost: 80,
    elif: 100,
    levels: [{ name: "배트", damage: 18, interval: 1.4, range: 2.3, splash: 1.25, cost: 0 }],
  },
};

export const TOWER_ORDER = ["soldier", "sniper", "demoman", "commander", "medic", "factory", "slugger"] as const;

export const SLUGGER_MAX = 21;

export function sluggerStats(plus: number): {
  plus: number;
  damage: number;
  interval: number;
  range: number;
  splash: number;
} {
  const n = Math.max(0, Math.min(SLUGGER_MAX, Math.floor(plus)));
  return { plus: n, damage: 18 + n * 8, interval: 1.4, range: 2.3, splash: 1.25 };
}

/** Success and reset chances are percents. Reset is rolled only after a failed enhance. */
export function sluggerOdds(plus: number): { success: number; reset: number; cost: number; capped: boolean } {
  const level = Math.max(0, Math.min(SLUGGER_MAX, Math.floor(plus)));
  if (level >= SLUGGER_MAX) return { success: 0, reset: 0, cost: 0, capped: true };
  return {
    success: Math.max(8, 92 - level * 4),
    reset: Math.min(75, 15 + level * 3),
    cost: 20 + level * 5,
    capped: false,
  };
}

export function rollSlugger(
  plus: number,
  successRoll: number,
  resetRoll: number,
): { plus: number; result: "success" | "fail" | "reset" | "max" } {
  const odds = sluggerOdds(plus);
  if (odds.capped) return { plus: oddsPlus(plus), result: "max" };
  if (successRoll * 100 < odds.success) return { plus: oddsPlus(plus) + 1, result: "success" };
  if (resetRoll * 100 < odds.reset) return { plus: 0, result: "reset" };
  return { plus: oddsPlus(plus), result: "fail" };
}

function oddsPlus(plus: number): number {
  return Math.max(0, Math.min(SLUGGER_MAX, Math.floor(plus)));
}

export function towerCombat(kind: TowerId, level: number): {
  damage: number;
  interval: number;
  range: number;
  splash: number;
  name: string;
} {
  if (kind === "slugger") {
    const stats = sluggerStats(level);
    return {
      damage: stats.damage,
      interval: stats.interval,
      range: stats.range,
      splash: stats.splash,
      name: `+${stats.plus} 배트`,
    };
  }
  const lv = TOWERS[kind].levels[Math.max(0, level - 1)];
  return { damage: lv.damage, interval: lv.interval, range: lv.range, splash: lv.splash, name: lv.name };
}

export type EnemyDef = {
  id: EnemyId;
  name: string;
  hp: number;
  speed: number;
  gold: number;
  scale: number;
  flying?: boolean;
  /** Flat damage removed from each hit. At least 1 damage still lands. */
  absorb?: number;
  regen?: number;
  deathSpawn?: { id: EnemyId; count: number };
  summonEvery?: number;
  summonId?: EnemyId;
  summonN?: number;
  stunEvery?: number;
  stunRadius?: number;
  stunDur?: number;
  spore?: { radius: number; duration: number; dmg: number; fire: number };
};

export const DEFAULT_SPORE = { radius: 2, duration: 4, dmg: 0.75, fire: 0.75 };
export const HEAVY_SPORE = { radius: 2.6, duration: 6, dmg: 0.65, fire: 0.65 };

export const ENEMIES: Record<EnemyId, EnemyDef> = {
  zombie: { id: "zombie", name: "좀비", hp: 40, speed: 1, gold: 5, scale: 1 },
  fast: { id: "fast", name: "빠른좀비", hp: 25, speed: 1.8, gold: 6, scale: 0.86 },
  slow: { id: "slow", name: "느린좀비", hp: 120, speed: 0.5, gold: 10, scale: 1.22 },
  giant: { id: "giant", name: "좀비 거인", hp: 300, speed: 0.8, gold: 25, scale: 1.65 },
  monster: { id: "monster", name: "좀비 괴수", hp: 500, speed: 0.4, gold: 35, scale: 2 },
  digger: {
    id: "digger",
    name: "무덤도굴꾼",
    hp: 800,
    speed: 0.7,
    gold: 100,
    scale: 1.5,
    summonEvery: 8,
    summonId: "zombie",
    summonN: 2,
    stunEvery: 12,
    stunRadius: 3,
    stunDur: 4,
  },
  mycelium: { id: "mycelium", name: "균사체", hp: 70, speed: 1, gold: 6, scale: 1.05 },
  fruit: { id: "fruit", name: "자실체", hp: 90, speed: 0.7, gold: 8, scale: 1.16, regen: 4 },
  researcher: { id: "researcher", name: "감염된 연구원", hp: 110, speed: 0.9, gold: 9, scale: 1.05, absorb: 6 },
  spore: { id: "spore", name: "포자군집", hp: 55, speed: 1.45, gold: 8, scale: 0.92, flying: true },
  culture: {
    id: "culture",
    name: "배양체",
    hp: 180,
    speed: 0.65,
    gold: 14,
    scale: 1.35,
    deathSpawn: { id: "sprout", count: 3 },
  },
  vehicle: {
    id: "vehicle",
    name: "오염된 장갑차",
    hp: 650,
    speed: 0.55,
    gold: 30,
    scale: 1.7,
    absorb: 14,
    spore: HEAVY_SPORE,
  },
  giantculture: {
    id: "giantculture",
    name: "거대 배양체",
    hp: 520,
    speed: 0.45,
    gold: 28,
    scale: 1.9,
    deathSpawn: { id: "sprout", count: 5 },
    spore: HEAVY_SPORE,
  },
  primordial: {
    id: "primordial",
    name: "태고의 생명",
    hp: 1400,
    speed: 0.48,
    gold: 120,
    scale: 1.85,
    regen: 22,
    summonEvery: 7,
    summonId: "culture",
    summonN: 1,
    stunEvery: 11,
    stunRadius: 3.2,
    stunDur: 4.5,
    spore: HEAVY_SPORE,
  },
  sprout: { id: "sprout", name: "잔류체", hp: 28, speed: 1.25, gold: 2, scale: 0.74 },
};

export type WaveGroup = { id: EnemyId; count: number; interval: number };
export type WaveDef = { bonus: number; elif: number; groups: WaveGroup[] };

const EASY_WAVES: WaveDef[] = [
  { bonus: 30, elif: 2, groups: [{ id: "zombie", count: 8, interval: 0.75 }] },
  { bonus: 30, elif: 2, groups: [{ id: "zombie", count: 10, interval: 0.7 }] },
  { bonus: 35, elif: 2, groups: [{ id: "fast", count: 6, interval: 0.5 }] },
  {
    bonus: 40,
    elif: 2,
    groups: [
      { id: "zombie", count: 8, interval: 0.65 },
      { id: "fast", count: 4, interval: 0.48 },
    ],
  },
  { bonus: 45, elif: 3, groups: [{ id: "slow", count: 3, interval: 1.1 }] },
  {
    bonus: 50,
    elif: 3,
    groups: [
      { id: "zombie", count: 10, interval: 0.6 },
      { id: "slow", count: 2, interval: 1 },
    ],
  },
  {
    bonus: 60,
    elif: 3,
    groups: [
      { id: "zombie", count: 6, interval: 0.6 },
      { id: "giant", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 60,
    elif: 3,
    groups: [
      { id: "fast", count: 8, interval: 0.42 },
      { id: "slow", count: 3, interval: 0.9 },
    ],
  },
  {
    bonus: 70,
    elif: 4,
    groups: [
      { id: "zombie", count: 8, interval: 0.55 },
      { id: "monster", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 70,
    elif: 4,
    groups: [
      { id: "slow", count: 2, interval: 0.9 },
      { id: "giant", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 80,
    elif: 4,
    groups: [
      { id: "fast", count: 10, interval: 0.38 },
      { id: "monster", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 100,
    elif: 12,
    groups: [
      { id: "zombie", count: 5, interval: 0.55 },
      { id: "digger", count: 1, interval: 0.5 },
    ],
  },
];

const NORMAL_WAVES: WaveDef[] = [
  { bonus: 35, elif: 3, groups: [{ id: "mycelium", count: 8, interval: 0.7 }] },
  { bonus: 40, elif: 3, groups: [{ id: "mycelium", count: 10, interval: 0.62 }] },
  { bonus: 40, elif: 3, groups: [{ id: "fruit", count: 5, interval: 0.9 }] },
  {
    bonus: 45,
    elif: 3,
    groups: [
      { id: "mycelium", count: 6, interval: 0.6 },
      { id: "fruit", count: 3, interval: 0.85 },
    ],
  },
  { bonus: 50, elif: 4, groups: [{ id: "researcher", count: 5, interval: 0.8 }] },
  { bonus: 50, elif: 4, groups: [{ id: "spore", count: 7, interval: 0.55 }] },
  {
    bonus: 55,
    elif: 4,
    groups: [
      { id: "mycelium", count: 8, interval: 0.55 },
      { id: "spore", count: 4, interval: 0.5 },
    ],
  },
  {
    bonus: 60,
    elif: 4,
    groups: [
      { id: "mycelium", count: 6, interval: 0.55 },
      { id: "culture", count: 2, interval: 1.1 },
    ],
  },
  {
    bonus: 60,
    elif: 4,
    groups: [
      { id: "researcher", count: 4, interval: 0.7 },
      { id: "fruit", count: 4, interval: 0.8 },
    ],
  },
  {
    bonus: 70,
    elif: 5,
    groups: [
      { id: "mycelium", count: 6, interval: 0.5 },
      { id: "vehicle", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 70,
    elif: 5,
    groups: [
      { id: "spore", count: 8, interval: 0.42 },
      { id: "researcher", count: 3, interval: 0.7 },
    ],
  },
  {
    bonus: 75,
    elif: 5,
    groups: [
      { id: "fruit", count: 4, interval: 0.75 },
      { id: "giantculture", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 80,
    elif: 5,
    groups: [
      { id: "culture", count: 2, interval: 1 },
      { id: "spore", count: 6, interval: 0.45 },
    ],
  },
  {
    bonus: 80,
    elif: 5,
    groups: [
      { id: "spore", count: 6, interval: 0.4 },
      { id: "vehicle", count: 1, interval: 0.4 },
    ],
  },
  {
    bonus: 120,
    elif: 16,
    groups: [
      { id: "mycelium", count: 6, interval: 0.5 },
      { id: "spore", count: 4, interval: 0.45 },
      { id: "primordial", count: 1, interval: 0.5 },
    ],
  },
];

const EASY_PATH: readonly [number, number][] = [
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 3],
  [4, 3],
  [5, 3],
  [5, 4],
  [5, 5],
  [5, 6],
  [6, 6],
  [7, 6],
  [8, 6],
  [9, 6],
  [9, 5],
  [9, 4],
  [9, 3],
  [9, 2],
  [10, 2],
  [11, 2],
];

const NORMAL_PATH: readonly [number, number][] = [
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 1],
  [8, 2],
  [8, 3],
  [8, 4],
  [7, 4],
  [6, 4],
  [5, 4],
  [4, 4],
  [3, 4],
  [2, 4],
  [2, 5],
  [2, 6],
  [3, 6],
  [4, 6],
  [5, 6],
  [6, 6],
  [7, 6],
  [8, 6],
  [9, 6],
  [10, 6],
  [11, 6],
];

export type Sector = {
  id: ModeId;
  name: string;
  victory: string;
  startGold: number;
  startLives: number;
  spore: boolean;
  ground: string;
  blotch: [string, string, string];
  pathDark: string;
  pathMid: string;
  waves: WaveDef[];
  path: PathGeom;
  cells: ReadonlySet<string>;
};

export function sectorOf(id: ModeId): Sector {
  return id === "normal" ? NORMAL : EASY;
}

export const EASY: Sector = makeSector({
  id: "easy",
  name: "초원",
  victory: "초원 사수",
  startGold: 200,
  startLives: 20,
  spore: false,
  ground: "#243024",
  blotch: ["#2c3a28", "#1e291c", "#314232"],
  pathDark: "#4e4032",
  pathMid: "#6d5a42",
  waves: EASY_WAVES,
  cells: EASY_PATH,
});

export const NORMAL: Sector = makeSector({
  id: "normal",
  name: "배양동",
  victory: "배양동 봉쇄",
  startGold: 260,
  startLives: 20,
  spore: true,
  ground: "#26291c",
  blotch: ["#343824", "#1e2418", "#46502c"],
  pathDark: "#4c5434",
  pathMid: "#737b4e",
  waves: NORMAL_WAVES,
  cells: NORMAL_PATH,
});

function makeSector(input: Omit<Sector, "path" | "cells"> & { cells: readonly [number, number][] }): Sector {
  const cells = new Set(input.cells.map(([c, r]) => `${c},${r}`));
  return { ...input, cells, path: buildPath(input.cells) };
}

export function isPath(sector: Sector, c: number, r: number): boolean {
  return sector.cells.has(`${c},${r}`);
}

export function inBounds(c: number, r: number): boolean {
  return c >= 0 && r >= 0 && c < COLS && r < ROWS;
}

export function isBuildable(sector: Sector, c: number, r: number): boolean {
  return inBounds(c, r) && !isPath(sector, c, r);
}

export type PathGeom = {
  pts: { x: number; y: number }[];
  seg: number[];
  total: number;
};

export function buildPath(cells: readonly [number, number][]): PathGeom {
  const pts = cells.map(([c, r]) => ({
    x: (c + 0.5) * CELL,
    y: (r + 0.5) * CELL,
  }));
  const seg: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    seg.push(d);
    total += d;
  }
  return { pts, seg, total };
}

export function pointAt(geom: PathGeom, dist: number): { x: number; y: number; angle: number } {
  const { pts, seg, total } = geom;
  let d = Math.max(0, Math.min(dist, total));
  if (dist >= total) {
    const a = pts[pts.length - 1];
    const b = pts[pts.length - 2];
    return { x: a.x, y: a.y, angle: Math.atan2(a.y - b.y, a.x - b.x) };
  }
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const len = seg[i] || 1;
      const t = Math.min(1, d / len);
      const x = pts[i].x + (pts[i + 1].x - pts[i].x) * t;
      const y = pts[i].y + (pts[i + 1].y - pts[i].y) * t;
      const angle = Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x);
      return { x, y, angle };
    }
    d -= seg[i];
  }
  const last = pts[pts.length - 1];
  return { x: last.x, y: last.y, angle: 0 };
}

export function waveLabel(waves: WaveDef[], index: number): string {
  const wave = waves[index];
  if (!wave) return "";
  return wave.groups.map((g) => `${ENEMIES[g.id].name} ${g.count}`).join(" · ");
}

export function cellOf(x: number, y: number): { c: number; r: number } | null {
  const c = Math.floor(x / CELL);
  const r = Math.floor(y / CELL);
  if (!inBounds(c, r)) return null;
  return { c, r };
}

export const TARGET_LABEL: Record<TargetMode, string> = {
  first: "선두",
  closest: "근접",
  strongest: "강적",
};
