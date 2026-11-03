import {
  CELL,
  COLS,
  ROWS,
  TOWERS,
  sluggerStats,
  VIEW_H,
  VIEW_W,
  isPath,
  type Sector,
  type TowerId,
} from "./data";
import type { Ally, Engine, Enemy, Tower } from "./engine";

const TOWER_INK: Record<TowerId, string> = {
  soldier: "#6f7d52",
  sniper: "#546170",
  demoman: "#8a6844",
  commander: "#a08448",
  medic: "#6e8f86",
  factory: "#5c6454",
  slugger: "#3e4c62",
};

const maps = new Map<string, HTMLCanvasElement>();

export function mapLayer(sector: Sector): HTMLCanvasElement {
  const cached = maps.get(sector.id);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = VIEW_W;
  canvas.height = VIEW_H;
  const g = canvas.getContext("2d");
  if (!g) return canvas;

  g.fillStyle = sector.ground;
  g.fillRect(0, 0, VIEW_W, VIEW_H);

  for (let i = 0; i < 220; i++) {
    const x = rand(i * 3) * VIEW_W;
    const y = rand(i * 3 + 1) * VIEW_H;
    const rx = 18 + rand(i * 3 + 2) * 70;
    const ry = 10 + rand(i * 7) * 28;
    g.fillStyle = sector.blotch[i % 3];
    g.beginPath();
    g.ellipse(x, y, rx, ry, rand(i) * Math.PI, 0, Math.PI * 2);
    g.fill();
  }

  g.strokeStyle = "rgba(231, 226, 214, 0.045)";
  g.lineWidth = 1;
  for (let c = 0; c <= COLS; c++) {
    g.beginPath();
    g.moveTo(c * CELL + 0.5, 0);
    g.lineTo(c * CELL + 0.5, VIEW_H);
    g.stroke();
  }
  for (let r = 0; r <= ROWS; r++) {
    g.beginPath();
    g.moveTo(0, r * CELL + 0.5);
    g.lineTo(VIEW_W, r * CELL + 0.5);
    g.stroke();
  }

  g.lineCap = "round";
  g.lineJoin = "round";
  tracePath(g, sector);
  g.strokeStyle = sector.pathDark;
  g.lineWidth = CELL * 0.86;
  g.stroke();
  tracePath(g, sector);
  g.strokeStyle = sector.pathMid;
  g.lineWidth = CELL * 0.5;
  g.stroke();
  tracePath(g, sector);
  g.strokeStyle = "rgba(231, 226, 214, 0.14)";
  g.lineWidth = 2;
  g.stroke();

  const spawn = sector.path.pts[0];
  const base = sector.path.pts[sector.path.pts.length - 1];
  g.fillStyle = "#3a332c";
  g.fillRect(spawn.x - 30, spawn.y - 22, 44, 44);
  g.fillStyle = "#2a2824";
  g.fillRect(base.x - 18, base.y - 26, 52, 52);
  g.strokeStyle = "#c6a15a";
  g.lineWidth = 2;
  g.strokeRect(base.x - 18, base.y - 26, 52, 52);

  maps.set(sector.id, canvas);
  return canvas;
}

function tracePath(g: CanvasRenderingContext2D, sector: Sector) {
  g.beginPath();
  sector.path.pts.forEach((p, i) => (i === 0 ? g.moveTo(p.x, p.y) : g.lineTo(p.x, p.y)));
}

function rand(n: number): number {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function renderFrame(ctx: CanvasRenderingContext2D, engine: Engine) {
  const map = mapLayer(engine.sector);
  const sx = engine.reducedMotion ? 0 : Math.sin(engine.time * 42) * engine.shake;
  const sy = engine.reducedMotion ? 0 : Math.cos(engine.time * 37) * engine.shake;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, VIEW_W, VIEW_H);
  ctx.save();
  ctx.translate(sx, sy);
  ctx.drawImage(map, 0, 0);
  drawLabels(ctx, engine.sector);
  drawHover(ctx, engine);
  drawRanges(ctx, engine);
  for (const tower of engine.towers) drawTower(ctx, engine, tower);
  for (const enemy of engine.enemies) drawEnemy(ctx, enemy);
  for (const ally of engine.allies) drawAlly(ctx, ally);
  drawShots(ctx, engine);
  drawFx(ctx, engine);
  if (engine.bannerT > 0) drawBanner(ctx, engine.banner);
  ctx.restore();
}

function drawLabels(ctx: CanvasRenderingContext2D, sector: Sector) {
  const spawn = sector.path.pts[0];
  const base = sector.path.pts[sector.path.pts.length - 1];
  ctx.fillStyle = "#e7e2d6";
  ctx.font = '600 13px "IBM Plex Sans KR", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("진입", spawn.x - 8, spawn.y + 34);
  ctx.fillStyle = "#c6a15a";
  ctx.fillText("거점", base.x + 8, base.y + 42);
}

function drawHover(ctx: CanvasRenderingContext2D, engine: Engine) {
  if (engine.hoverC < 0) return;
  const x = engine.hoverC * CELL;
  const y = engine.hoverR * CELL;
  const blocked = isPath(engine.sector, engine.hoverC, engine.hoverR);
  ctx.fillStyle = blocked ? "rgba(196, 92, 72, 0.28)" : "rgba(198, 161, 90, 0.16)";
  ctx.fillRect(x + 2, y + 2, CELL - 4, CELL - 4);
}

function drawRanges(ctx: CanvasRenderingContext2D, engine: Engine) {
  const selected = engine.towers.find((t) => t.uid === engine.selectedId);
  if (selected) ring(ctx, selected, 0.9);
  if (!engine.placing || engine.hoverC < 0 || isPath(engine.sector, engine.hoverC, engine.hoverR)) return;
  const ghost = {
    kind: engine.placing,
    level: 1,
    x: (engine.hoverC + 0.5) * CELL,
    y: (engine.hoverR + 0.5) * CELL,
  };
  ring(ctx, ghost, 0.45);
  drawTowerShape(ctx, ghost.kind, ghost.x, ghost.y, -Math.PI / 2, 1, true);
}

function ring(
  ctx: CanvasRenderingContext2D,
  tower: { kind: TowerId; level: number; x: number; y: number },
  alpha: number,
) {
  const range = rangeOf(tower.kind, tower.level);
  if (range <= 0) return;
  ctx.beginPath();
  ctx.arc(tower.x, tower.y, range, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(198, 161, 90, ${0.08 * alpha})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(198, 161, 90, ${0.55 * alpha})`;
  ctx.lineWidth = 1.5;
  ctx.setLineDash(tower.kind === "commander" ? [6, 6] : []);
  ctx.stroke();
  ctx.setLineDash([]);
}

function rangeOf(kind: TowerId, level: number): number {
  if (kind === "slugger") return sluggerStats(level).range * CELL;
  if (kind === "commander") {
    return (TOWERS.commander.commander?.[level - 1]?.radius ?? 3) * CELL;
  }
  return TOWERS[kind].levels[level - 1].range * CELL;
}

function drawTower(ctx: CanvasRenderingContext2D, engine: Engine, tower: Tower) {
  if (tower.kind === "commander") {
    const radii = [3, 3.5, 4, 4];
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, radii[tower.level - 1] * CELL, 0, Math.PI * 2);
    ctx.strokeStyle = tower.abilityT > 0 ? "rgba(198,161,90,0.85)" : "rgba(198,161,90,0.25)";
    ctx.lineWidth = tower.abilityT > 0 ? 2 : 1;
    ctx.setLineDash([5, 7]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const selected = engine.selectedId === tower.uid;
  if (selected) {
    ctx.strokeStyle = "#e7e2d6";
    ctx.lineWidth = 2;
    ctx.strokeRect(tower.x - 24, tower.y - 24, 48, 48);
  }
  drawTowerShape(ctx, tower.kind, tower.x, tower.y, tower.aim, tower.level, false);
  if (tower.kind === "medic" && (selected || tower.abilityT > 0)) {
    const radius = TOWERS.medic.levels[tower.level - 1].splash * CELL;
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = tower.abilityT > 0 ? "rgba(158, 196, 176, 0.9)" : "rgba(158, 196, 176, 0.35)";
    ctx.lineWidth = tower.abilityT > 0 ? 2 : 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (tower.kind === "slugger" && tower.abilityT > 0) {
    ctx.strokeStyle = "rgba(215, 196, 162, 0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 40, tower.aim - 0.9, tower.aim + 0.9);
    ctx.stroke();
  }
  if (tower.sporeT > 0) {
    ctx.strokeStyle = "rgba(183, 196, 106, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 26, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (tower.stun > 0) {
    ctx.strokeStyle = "#d7c39a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 22, engine.time * 6, engine.time * 6 + 1.4);
    ctx.stroke();
  }
  ctx.fillStyle = "#c6a15a";
  for (let i = 0; i < tower.level; i++) {
    ctx.fillRect(tower.x - 14 + i * 8, tower.y + 20, 5, 4);
  }
}

function drawTowerShape(
  ctx: CanvasRenderingContext2D,
  kind: TowerId,
  x: number,
  y: number,
  aim: number,
  level: number,
  ghost: boolean,
) {
  ctx.save();
  ctx.globalAlpha = ghost ? 0.55 : 1;
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(0, 10, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2a261f";
  ctx.beginPath();
  ctx.arc(0, 0, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = TOWER_INK[kind];
  ctx.beginPath();
  ctx.arc(0, 0, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.rotate(aim);
  ctx.fillStyle = "#1b1a17";
  if (kind === "sniper") ctx.fillRect(0, -2, 26 + level * 2, 4);
  else if (kind === "demoman") {
    ctx.fillRect(2, -4, 16, 8);
    ctx.beginPath();
    ctx.arc(18, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "commander") {
    ctx.rotate(-aim);
    ctx.strokeStyle = "#e7e2d6";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, -18);
    ctx.stroke();
    ctx.fillStyle = "#c6a15a";
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(10, -14);
    ctx.lineTo(0, -10);
    ctx.fill();
  } else if (kind === "medic") {
    ctx.rotate(-aim);
    ctx.strokeStyle = "#d5e4dc";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-7, 0);
    ctx.lineTo(7, 0);
    ctx.moveTo(0, -7);
    ctx.lineTo(0, 7);
    ctx.stroke();
  } else if (kind === "factory") {
    ctx.rotate(-aim);
    ctx.fillStyle = "#3c4336";
    ctx.fillRect(-14, -10, 28, 18);
    ctx.fillStyle = "#2a261f";
    ctx.fillRect(6, -18, 5, 10);
    if (level >= 4) {
      ctx.fillStyle = "#c6a15a";
      ctx.fillRect(-16, -4, 8, 6);
    }
  } else if (kind === "slugger") {
    ctx.fillStyle = "#c2a37a";
    ctx.fillRect(2, -3, 22, 6);
    ctx.fillStyle = "#efe6d4";
    ctx.beginPath();
    ctx.arc(20, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const barrels = level >= 2 && level < 3 ? 2 : 1;
    const thick = level >= 4 ? 5 : 3;
    if (barrels === 2) {
      ctx.fillRect(4, -5, 16, thick);
      ctx.fillRect(4, 2, 16, thick);
    } else ctx.fillRect(4, -thick / 2, 14 + level, thick);
  }
  ctx.restore();
}

function drawAlly(ctx: CanvasRenderingContext2D, ally: Ally) {
  const tank = ally.level >= 4;
  const w = tank ? 36 : 28;
  const h = tank ? 18 : 14;
  ctx.save();
  ctx.translate(ally.x, ally.y);
  ctx.rotate(ally.angle);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(-w / 2, -h / 2 + 4, w, h);
  ctx.fillStyle = tank ? "#4e5844" : "#3e4638";
  ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = "#1b1a17";
  ctx.fillRect(w / 2 - 4, -3, tank ? 14 : 8, 6);
  ctx.restore();
  const bar = 22;
  const hp = Math.max(0, ally.hp / ally.maxHp);
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(ally.x - bar / 2, ally.y - 16, bar, 3);
  ctx.fillStyle = "#8ea37a";
  ctx.fillRect(ally.x - bar / 2, ally.y - 16, bar * hp, 3);
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
  const s = enemy.scale;
  const lift = enemy.flying ? 22 : 0;
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 8 * s, 10 * s, 4 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.translate(0, -lift);
  const body = enemyColor(enemy.kind);
  ctx.fillStyle = body;
  if (enemy.flying) {
    ctx.beginPath();
    ctx.ellipse(0, 0, 14 * s, 8 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(231,226,214,0.35)";
    ctx.beginPath();
    ctx.ellipse(-6 * s, -1, 7 * s, 3 * s, -0.4, 0, Math.PI * 2);
    ctx.ellipse(6 * s, -1, 7 * s, 3 * s, 0.4, 0, Math.PI * 2);
    ctx.fill();
  } else if (enemy.kind === "vehicle") {
    ctx.fillRect(-16 * s, -8 * s, 32 * s, 16 * s);
    ctx.fillStyle = "#2a261f";
    ctx.fillRect(-10 * s, -12 * s, 14 * s, 8 * s);
  } else {
    ctx.beginPath();
    ctx.ellipse(0, 2, 9 * s, 11 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = enemy.kind === "researcher" ? "#d7d2c4" : "#1c1e1a";
    ctx.beginPath();
    ctx.arc(0, -8 * s, 6 * s, 0, Math.PI * 2);
    ctx.fill();
  }
  if (enemy.kind === "fast") {
    ctx.strokeStyle = "rgba(231,226,214,0.45)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-12 * s, 0);
    ctx.lineTo(-18 * s, -2);
    ctx.moveTo(-12 * s, 4);
    ctx.lineTo(-17 * s, 6);
    ctx.stroke();
  }
  if (enemy.kind === "digger") {
    ctx.strokeStyle = "#c6a15a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8 * s, 6);
    ctx.lineTo(16 * s, -8);
    ctx.stroke();
  }
  if (enemy.absorb > 0 && !enemy.flying) {
    ctx.strokeStyle = "rgba(231,226,214,0.55)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-12 * s, -4 * s, 24 * s, 10 * s);
  }
  ctx.restore();

  const w = 28 * Math.min(s, 1.4);
  const hp = Math.max(0, enemy.hp / enemy.maxHp);
  const barY = enemy.y - lift - 20 * s - 8;
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(enemy.x - w / 2, barY, w, 4);
  ctx.fillStyle = hp < 0.35 ? "#c45c48" : "#c6a15a";
  ctx.fillRect(enemy.x - w / 2, barY, w * hp, 4);
}

function enemyColor(kind: Enemy["kind"]): string {
  switch (kind) {
    case "fast":
      return "#7d8b68";
    case "slow":
      return "#3f4a3e";
    case "giant":
      return "#3a4036";
    case "monster":
      return "#2c332c";
    case "digger":
      return "#6d5d48";
    case "mycelium":
      return "#6a7a48";
    case "fruit":
      return "#8a8a3a";
    case "researcher":
      return "#4d6a62";
    case "spore":
      return "#c6c36a";
    case "culture":
      return "#5a6a32";
    case "vehicle":
      return "#3e4638";
    case "giantculture":
      return "#3a4428";
    case "primordial":
      return "#2a3324";
    case "sprout":
      return "#9aaa6a";
    default:
      return "#5a6354";
  }
}

function drawShots(ctx: CanvasRenderingContext2D, engine: Engine) {
  for (const shot of engine.shots) {
    if (shot.kind === "tracer") {
      ctx.strokeStyle = "rgba(231,226,214,0.85)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(shot.x1, shot.y1);
      ctx.lineTo(shot.x2, shot.y2);
      ctx.stroke();
    } else if (shot.kind === "bullet") {
      ctx.fillStyle = "#e7e2d6";
      ctx.fillRect(shot.x - 3, shot.y - 1.5, 7, 3);
    } else {
      ctx.fillStyle = "#c6a15a";
      ctx.beginPath();
      ctx.arc(shot.x, shot.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawFx(ctx: CanvasRenderingContext2D, engine: Engine) {
  for (const cloud of engine.sporeClouds) {
    const t = 1 - cloud.life / cloud.max;
    const radius = cloud.radius * (0.2 + 0.8 * t);
    const alpha = Math.max(0, cloud.life / cloud.max);
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168, 176, 72, ${0.22 * alpha})`;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = `rgba(214, 224, 122, ${0.85 * alpha})`;
    ctx.stroke();
    ctx.strokeStyle = `rgba(90, 110, 48, ${0.45 * alpha})`;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, radius * 0.72, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (const p of engine.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    ctx.globalAlpha = 1;
  }
  ctx.font = '600 12px "IBM Plex Sans KR", sans-serif';
  ctx.textAlign = "center";
  for (const f of engine.floats) {
    ctx.globalAlpha = Math.max(0, f.life / 0.6);
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, f.x, f.y - (0.6 - f.life) * 24);
  }
  ctx.globalAlpha = 1;
}

function drawBanner(ctx: CanvasRenderingContext2D, text: string) {
  ctx.fillStyle = "rgba(16, 20, 15, 0.72)";
  ctx.fillRect(VIEW_W / 2 - 120, 16, 240, 36);
  ctx.strokeStyle = "#c6a15a";
  ctx.strokeRect(VIEW_W / 2 - 120, 16, 240, 36);
  ctx.fillStyle = "#e7e2d6";
  ctx.font = '600 18px "IBM Plex Sans KR", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(text, VIEW_W / 2, 40);
}
