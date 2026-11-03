import {
  CELL,
  DEFAULT_SPORE,
  ENEMIES,
  TOWERS,
  cellOf,
  isBuildable,
  pointAt,
  sectorOf,
  towerCombat,
  rollSlugger,
  sluggerOdds,
  waveLabel,
  type EnemyId,
  type ModeId,
  type Sector,
  type TargetMode,
  type TowerId,
  type WaveDef,
} from "./data";

export type Phase = "prep" | "combat" | "victory" | "defeat";

export type Tower = {
  uid: number;
  kind: TowerId;
  c: number;
  r: number;
  x: number;
  y: number;
  level: number;
  spent: number;
  cd: number;
  stun: number;
  sporeT: number;
  sporeDmg: number;
  sporeFire: number;
  aim: number;
  targetId: number | null;
  targetMode: TargetMode;
  abilityT: number;
  abilityCd: number;
};

export type Enemy = {
  uid: number;
  kind: EnemyId;
  hp: number;
  maxHp: number;
  speed: number;
  gold: number;
  progress: number;
  x: number;
  y: number;
  angle: number;
  alive: boolean;
  scale: number;
  flying: boolean;
  absorb: number;
  regen: number;
  deathSpawn: { id: EnemyId; count: number } | null;
  summonEvery: number;
  summonId: EnemyId | null;
  summonN: number;
  summonCd: number;
  stunEvery: number;
  stunRadius: number;
  stunDur: number;
  stunCd: number;
  spore: { radius: number; duration: number; dmg: number; fire: number } | null;
};

export type Bullet = {
  kind: "bullet";
  x: number;
  y: number;
  tx: number;
  ty: number;
  speed: number;
  damage: number;
  life: number;
  target: number | null;
};

export type Shell = {
  kind: "shell";
  x: number;
  y: number;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  t: number;
  dur: number;
  damage: number;
  radius: number;
};

export type Tracer = {
  kind: "tracer";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  life: number;
};

export type Shot = Bullet | Shell | Tracer;

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
};

export type FloatText = {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
};

export type SporeCloud = {
  x: number;
  y: number;
  radius: number;
  life: number;
  max: number;
};

export type Ally = {
  uid: number;
  factoryId: number;
  level: number;
  hp: number;
  maxHp: number;
  progress: number;
  x: number;
  y: number;
  angle: number;
  alive: boolean;
  gun: number;
  gunInterval: number;
  gunRange: number;
  gunCd: number;
  speed: number;
  hit: number[];
};

export type SpawnEvent = { t: number; id: EnemyId };

export type HudSelected = {
  uid: number;
  kind: TowerId;
  level: number;
  levelName: string;
  damage: number;
  interval: number;
  range: number;
  splash: number;
  upgradeCost: number | null;
  sell: number;
  target: TargetMode;
  stun: number;
  ability: number;
  abilityCd: number;
  canAbility: boolean;
  buffText: string;
  spore: number;
};

export type Hud = {
  gold: number;
  lives: number;
  wave: number;
  waves: number;
  phase: Phase;
  speed: 1 | 2 | 3;
  paused: boolean;
  notice: string;
  placing: TowerId | null;
  selected: HudSelected | null;
  banner: string;
  killed: number;
  sectorName: string;
  victory: string;
  preview: string;
};

type Opts = {
  mode: ModeId;
  unlocked: TowerId[];
  onElif?: (amount: number) => void;
};

const TARGETS: TargetMode[] = ["first", "closest", "strongest"];

export class Engine {
  readonly sector: Sector;
  gold: number;
  lives: number;
  phase: Phase = "prep";
  waveIndex = 0;
  speed: 1 | 2 | 3 = 1;
  paused = false;
  time = 0;
  shake = 0;
  reducedMotion = false;
  notice = "";
  noticeT = 0;
  banner = "";
  bannerT = 0;
  placing: TowerId | null = "soldier";
  hoverC = -1;
  hoverR = -1;
  selectedId: number | null = null;
  killed = 0;

  towers: Tower[] = [];
  enemies: Enemy[] = [];
  shots: Shot[] = [];
  particles: Particle[] = [];
  floats: FloatText[] = [];
  sporeClouds: SporeCloud[] = [];
  allies: Ally[] = [];

  private unlocked: Set<TowerId>;
  private nextTower = 1;
  private nextEnemy = 1;
  private nextAlly = 1;
  private schedule: SpawnEvent[] = [];
  private spawnClock = 0;
  private onElif?: (amount: number) => void;
  private dirty = false;

  constructor(opts: Opts) {
    this.unlocked = new Set(opts.unlocked);
    this.unlocked.add("soldier");
    this.onElif = opts.onElif;
    this.sector = sectorOf(opts.mode);
    this.gold = this.sector.startGold;
    this.lives = this.sector.startLives;
  }

  setUnlocked(ids: TowerId[]) {
    this.unlocked = new Set(ids);
    this.unlocked.add("soldier");
    if (this.placing && !this.unlocked.has(this.placing)) this.placing = null;
  }

  setReducedMotion(v: boolean) {
    this.reducedMotion = v;
  }

  hud(): Hud {
    return {
      gold: this.gold,
      lives: this.lives,
      wave: this.waveIndex + 1,
      waves: this.sector.waves.length,
      phase: this.phase,
      speed: this.speed,
      paused: this.paused,
      notice: this.noticeT > 0 ? this.notice : "",
      placing: this.placing,
      selected: this.selectedInfo(),
      banner: this.bannerT > 0 ? this.banner : "",
      killed: this.killed,
      sectorName: this.sector.name,
      victory: this.sector.victory,
      preview: waveLabel(this.sector.waves, this.waveIndex),
    };
  }

  private selectedInfo(): HudSelected | null {
    const tower = this.towers.find((t) => t.uid === this.selectedId);
    if (!tower) return null;
    if (tower.kind === "slugger") {
      const stats = towerCombat(tower.kind, tower.level);
      const odds = sluggerOdds(tower.level);
      return {
        uid: tower.uid,
        kind: tower.kind,
        level: tower.level,
        levelName: stats.name,
        damage: stats.damage,
        interval: stats.interval,
        range: stats.range,
        splash: stats.splash,
        upgradeCost: odds.capped ? null : odds.cost,
        sell: Math.floor(tower.spent * 0.6),
        target: tower.targetMode,
        stun: tower.stun,
        ability: 0,
        abilityCd: 0,
        canAbility: false,
        buffText: odds.capped
          ? `피해 ${stats.damage} · 최대`
          : `피해 ${stats.damage} · 성공 ${odds.success}% · 초기화 ${odds.reset}%`,
        spore: tower.sporeT,
      };
    }
    const def = TOWERS[tower.kind];
    const lv = def.levels[tower.level - 1];
    const next = def.levels[tower.level] ?? null;
    const cmd = def.commander?.[tower.level - 1];
    const plant = def.factory?.[tower.level - 1];
    const medic = tower.kind === "medic";
    let buffText = "";
    if (cmd) {
      buffText = `공격속도 +${Math.round((cmd.fire - 1) * 100)}% · 피해 +${Math.round((cmd.dmg - 1) * 100)}%`;
    } else if (medic) {
      buffText = `피해 ${lv.damage} · ${lv.interval.toFixed(1)}초 · 제독 ${lv.splash}칸`;
    } else if (plant) {
      buffText =
        plant.gun > 0
          ? `장갑차 체력 ${plant.hp} · 충돌 1:1 · 지원 ${plant.gun}`
          : `장갑차 체력 ${plant.hp} · 충돌 1:1`;
    }
    return {
      uid: tower.uid,
      kind: tower.kind,
      level: tower.level,
      levelName: lv.name,
      damage: lv.damage,
      interval: lv.interval,
      range: medic ? lv.splash : lv.range,
      splash: lv.splash,
      upgradeCost: next ? next.cost : null,
      sell: Math.floor(tower.spent * 0.6),
      target: tower.targetMode,
      stun: tower.stun,
      ability: tower.abilityT,
      abilityCd: tower.abilityCd,
      canAbility: Boolean((cmd && cmd.ability > 0) || medic),
      buffText,
      spore: tower.sporeT,
    };
  }

  say(text: string) {
    this.notice = text;
    this.noticeT = 2.2;
    this.dirty = true;
  }

  tick(dt: number) {
    this.time += dt;
    if (this.noticeT > 0) this.noticeT -= dt;
    if (this.bannerT > 0) this.bannerT -= dt;
    if (!this.reducedMotion) this.shake = Math.max(0, this.shake - dt * 16);
    else this.shake = 0;

    if (this.phase === "combat") {
      this.spawnClock += dt;
      this.drainSpawns();
      this.moveEnemies(dt);
      this.bossSkills(dt);
      this.tickTowers(dt);
      this.tickAllies(dt);
      this.tickShots(dt);
      this.collectDead();
      if (this.lives <= 0) {
        this.lives = 0;
        this.phase = "defeat";
        this.banner = "거점 함락";
        this.bannerT = 4;
        this.dirty = true;
      } else if (this.schedule.length === 0 && this.enemies.length === 0) {
        this.finishWave();
      }
    }

    this.ageFx(dt);
    const dirty = this.dirty;
    this.dirty = false;
    return dirty;
  }

  private finishWave() {
    const wave = this.sector.waves[this.waveIndex];
    this.gold += wave.bonus;
    this.onElif?.(wave.elif);
    this.enemies = [];
    if (this.waveIndex >= this.sector.waves.length - 1) {
      this.phase = "victory";
      this.banner = this.sector.victory;
      this.bannerT = 5;
    } else {
      this.waveIndex += 1;
      this.phase = "prep";
      this.banner = `웨이브 ${this.waveIndex} 정리`;
      this.bannerT = 1.4;
    }
    this.dirty = true;
  }

  startWave(): boolean {
    if (this.phase !== "prep") return false;
    const wave = this.sector.waves[this.waveIndex];
    if (!wave) return false;
    this.phase = "combat";
    this.schedule = scheduleOf(wave);
    this.spawnClock = 0;
    this.banner = `웨이브 ${this.waveIndex + 1}`;
    this.bannerT = 1.5;
    this.dirty = true;
    return true;
  }

  private drainSpawns() {
    while (this.schedule.length > 0 && this.schedule[0].t <= this.spawnClock) {
      const ev = this.schedule.shift();
      if (ev) this.spawn(ev.id, 0, false);
    }
  }

  private spawn(id: EnemyId, progress: number, summoned: boolean) {
    const def = ENEMIES[id];
    const p = pointAt(this.sector.path, Math.max(0, progress));
    const enemy: Enemy = {
      uid: this.nextEnemy++,
      kind: id,
      hp: def.hp,
      maxHp: def.hp,
      speed: def.speed,
      gold: summoned ? 1 : def.gold,
      progress: Math.max(0, progress),
      x: p.x,
      y: p.y,
      angle: p.angle,
      alive: true,
      scale: def.scale * (summoned ? 0.85 : 1),
      flying: Boolean(def.flying),
      absorb: def.absorb ?? 0,
      regen: def.regen ?? 0,
      deathSpawn: def.deathSpawn ?? null,
      summonEvery: summoned ? 0 : (def.summonEvery ?? 0),
      summonId: summoned ? null : (def.summonId ?? null),
      summonN: summoned ? 0 : (def.summonN ?? 0),
      summonCd: def.summonEvery ?? 0,
      stunEvery: summoned ? 0 : (def.stunEvery ?? 0),
      stunRadius: def.stunRadius ?? 0,
      stunDur: def.stunDur ?? 0,
      stunCd: def.stunEvery ?? 0,
      spore: this.sector.spore ? (def.spore ?? DEFAULT_SPORE) : null,
    };
    this.enemies.push(enemy);
  }

  private moveEnemies(dt: number) {
    const total = this.sector.path.total;
    for (const e of this.enemies) {
      if (!e.alive) continue;
      if (e.regen > 0 && e.hp < e.maxHp) e.hp = Math.min(e.maxHp, e.hp + e.regen * dt);
      e.progress += e.speed * CELL * dt;
      if (e.progress >= total) {
        e.alive = false;
        this.lives -= 1;
        if (this.lives < 0) this.lives = 0;
        this.shake = Math.max(this.shake, 7);
        this.say("거점에 도달");
        continue;
      }
      const p = pointAt(this.sector.path, e.progress);
      e.x = p.x;
      e.y = p.y;
      e.angle = p.angle;
    }
  }

  private bossSkills(dt: number) {
    for (const e of this.enemies) {
      if (!e.alive) continue;
      if (e.summonEvery > 0 && e.summonId) {
        e.summonCd -= dt;
        if (e.summonCd <= 0) {
          e.summonCd = e.summonEvery;
          for (let i = 0; i < e.summonN; i++) this.spawn(e.summonId, e.progress - 28 - i * 24, true);
          this.burst(e.x, e.y, "#8a7a62", 8);
        }
      }
      if (e.stunEvery > 0) {
        e.stunCd -= dt;
        if (e.stunCd <= 0) {
          e.stunCd = e.stunEvery;
          this.stunAround(e.x, e.y, e.stunRadius * CELL, e.stunDur);
          this.burst(e.x, e.y, "#d7c39a", 10);
          this.shake = Math.max(this.shake, 4);
        }
      }
    }
  }

  private stunAround(x: number, y: number, radius: number, duration: number) {
    const r2 = radius * radius;
    for (const tower of this.towers) {
      const dx = tower.x - x;
      const dy = tower.y - y;
      if (dx * dx + dy * dy <= r2) tower.stun = Math.max(tower.stun, duration);
    }
  }

  private tickTowers(dt: number) {
    for (const tower of this.towers) {
      tower.stun = Math.max(0, tower.stun - dt);
      tower.sporeT = Math.max(0, tower.sporeT - dt);
      if (tower.sporeT === 0) {
        tower.sporeDmg = 1;
        tower.sporeFire = 1;
      }
      tower.abilityT = Math.max(0, tower.abilityT - dt);
      tower.abilityCd = Math.max(0, tower.abilityCd - dt);
      if (tower.kind === "commander") continue;
      if (tower.kind === "factory") {
        this.tickFactory(tower, dt);
        continue;
      }
      tower.cd -= dt;
      if (!this.targetValid(tower)) tower.targetId = null;
      if (tower.targetId == null) {
        const found = this.acquire(tower);
        tower.targetId = found ? found.uid : null;
      }
      const target = this.enemyById(tower.targetId);
      if (target) {
        const want = Math.atan2(target.y - tower.y, target.x - tower.x);
        tower.aim += angDiff(tower.aim, want) * Math.min(1, dt * 12);
      }
      if (tower.stun > 0 || !target || tower.cd > 0) continue;
      this.fire(tower, target);
      tower.cd = this.interval(tower);
    }
  }

  private fire(tower: Tower, target: Enemy) {
    const lv = towerCombat(tower.kind, tower.level);
    const buff = this.buff(tower);
    const damage = lv.damage * buff.dmg;
    if (tower.kind === "slugger") {
      this.splash(target.x, target.y, lv.splash * CELL, damage);
      tower.abilityT = 0.16;
      this.burst(target.x, target.y, "#d7c4a2", 7);
      return;
    }
    if (tower.kind === "sniper") {
      const lift = target.flying ? 22 : 0;
      this.hurt(target, damage);
      this.shots.push({
        kind: "tracer",
        x1: tower.x,
        y1: tower.y,
        x2: target.x,
        y2: target.y - lift,
        life: 0.12,
      });
      this.burst(tower.x, tower.y, "#e7e2d6", 3);
      return;
    }
    if (tower.kind === "demoman") {
      const dist = Math.hypot(target.x - tower.x, target.y - tower.y);
      const dur = Math.max(0.28, dist / (5.2 * CELL));
      const lead = pointAt(this.sector.path, target.progress + target.speed * CELL * dur * 0.85);
      this.shots.push({
        kind: "shell",
        x: tower.x,
        y: tower.y,
        sx: tower.x,
        sy: tower.y,
        tx: lead.x,
        ty: lead.y,
        t: 0,
        dur,
        damage,
        radius: lv.splash * CELL,
      });
      return;
    }
    this.shots.push({
      kind: "bullet",
      x: tower.x + Math.cos(tower.aim) * 16,
      y: tower.y + Math.sin(tower.aim) * 16,
      tx: target.x,
      ty: target.y,
      speed: 9.5 * CELL,
      damage,
      life: 1.6,
      target: target.uid,
    });
    this.burst(tower.x, tower.y, "#c6a15a", 2);
  }

  private interval(tower: Tower): number {
    const base = towerCombat(tower.kind, tower.level).interval;
    const buff = this.buff(tower);
    return base / buff.fire;
  }

  private buff(tower: Tower): { fire: number; dmg: number } {
    let fire = 1;
    let dmg = 1;
    let active = 1;
    for (const cmd of this.towers) {
      if (cmd.kind !== "commander") continue;
      const spec = TOWERS.commander.commander?.[cmd.level - 1];
      if (!spec) continue;
      const r = spec.radius * CELL;
      const dx = cmd.x - tower.x;
      const dy = cmd.y - tower.y;
      if (dx * dx + dy * dy > r * r) continue;
      fire = Math.max(fire, spec.fire);
      dmg = Math.max(dmg, spec.dmg);
      if (cmd.abilityT > 0) active = 1.8;
    }
    if (tower.sporeT > 0) {
      fire *= tower.sporeFire;
      dmg *= tower.sporeDmg;
    }
    return { fire: fire * active, dmg };
  }

  private targetValid(tower: Tower): boolean {
    const e = this.enemyById(tower.targetId);
    if (!e || !this.canSee(tower, e)) return false;
    const range = towerCombat(tower.kind, tower.level).range * CELL;
    const dx = e.x - tower.x;
    const dy = e.y - tower.y;
    return dx * dx + dy * dy <= range * range;
  }

  private acquire(tower: Tower): Enemy | null {
    const range = towerCombat(tower.kind, tower.level).range * CELL;
    const r2 = range * range;
    let best: Enemy | null = null;
    let key = 0;
    for (const e of this.enemies) {
      if (!e.alive || !this.canSee(tower, e)) continue;
      const dx = e.x - tower.x;
      const dy = e.y - tower.y;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;
      const score =
        tower.targetMode === "closest" ? -d2 : tower.targetMode === "strongest" ? e.hp : e.progress;
      if (!best || score > key) {
        best = e;
        key = score;
      }
    }
    return best;
  }

  private tickShots(dt: number) {
    const next: Shot[] = [];
    for (const shot of this.shots) {
      if (shot.kind === "tracer") {
        shot.life -= dt;
        if (shot.life > 0) next.push(shot);
        continue;
      }
      if (shot.kind === "bullet") {
        const tgt = this.enemyById(shot.target);
        if (tgt) {
          shot.tx = tgt.x;
          shot.ty = tgt.y;
        }
        const dx = shot.tx - shot.x;
        const dy = shot.ty - shot.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 12) {
          if (tgt) this.hurt(tgt, shot.damage);
          else this.splash(shot.tx, shot.ty, 18, shot.damage);
          this.burst(shot.tx, shot.ty, "#e7e2d6", 3);
        } else {
          const step = Math.min(dist, shot.speed * dt);
          shot.x += (dx / dist) * step;
          shot.y += (dy / dist) * step;
          shot.life -= dt;
          if (shot.life > 0) next.push(shot);
        }
        continue;
      }
      shot.t += dt / shot.dur;
      const t = Math.min(1, shot.t);
      shot.x = shot.sx + (shot.tx - shot.sx) * t;
      shot.y = shot.sy + (shot.ty - shot.sy) * t - Math.sin(t * Math.PI) * 36;
      if (shot.t >= 1) {
        this.splash(shot.tx, shot.ty, shot.radius, shot.damage);
        this.burst(shot.tx, shot.ty, "#c6a15a", 12);
        this.shake = Math.max(this.shake, 2.5);
      } else next.push(shot);
    }
    this.shots = next;
  }

  private splash(x: number, y: number, radius: number, damage: number) {
    const r2 = radius * radius;
    for (const e of this.enemies) {
      if (!e.alive || e.flying) continue;
      const dx = e.x - x;
      const dy = e.y - y;
      if (dx * dx + dy * dy <= r2) this.hurt(e, damage);
    }
  }

  private hurt(e: Enemy, damage: number, opts?: { raw?: boolean; silent?: boolean }) {
    if (!e.alive || damage <= 0) return;
    const dealt = !opts?.raw && e.absorb > 0 ? Math.max(1, damage - e.absorb) : damage;
    e.hp -= dealt;
    if (!opts?.silent) this.float(e.x, e.y - 16, String(Math.round(dealt)), "#e7e2d6");
    if (e.hp <= 0) this.killEnemy(e);
  }

  private killEnemy(e: Enemy) {
    if (!e.alive) return;
    e.alive = false;
    e.hp = 0;
    this.gold += e.gold;
    this.killed += 1;
    this.burst(e.x, e.y, "#8d927c", 8);
    if (e.spore) this.sporeBurst(e);
    if (e.deathSpawn) {
      for (let i = 0; i < e.deathSpawn.count; i++) {
        this.spawn(e.deathSpawn.id, e.progress - 36 * (i + 1), true);
      }
    }
    this.dirty = true;
  }

  private sporeBurst(e: Enemy) {
    const spec = e.spore;
    if (!spec) return;
    const radius = spec.radius * CELL;
    const r2 = radius * radius;
    for (const tower of this.towers) {
      const dx = tower.x - e.x;
      const dy = tower.y - e.y;
      if (dx * dx + dy * dy > r2) continue;
      tower.sporeT = Math.max(tower.sporeT, spec.duration);
      tower.sporeDmg = Math.min(tower.sporeDmg, spec.dmg);
      tower.sporeFire = Math.min(tower.sporeFire, spec.fire);
    }
    this.sporeClouds.push({ x: e.x, y: e.y, radius, life: 0.85, max: 0.85 });
    this.burst(e.x, e.y, "#d6e07a", 18);
    this.float(e.x, e.y - 30, "포자", "#d6e07a");
  }

  private canSee(tower: Tower, enemy: Enemy): boolean {
    return !(enemy.flying && tower.kind !== "sniper");
  }

  private collectDead() {
    if (this.enemies.some((e) => !e.alive)) {
      this.enemies = this.enemies.filter((e) => e.alive);
    }
  }

  private ageFx(dt: number) {
    for (const p of this.particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 18 * dt;
    }
    this.particles = this.particles.filter((p) => p.life > 0).slice(-90);
    for (const cloud of this.sporeClouds) cloud.life -= dt;
    this.sporeClouds = this.sporeClouds.filter((cloud) => cloud.life > 0).slice(-24);
    for (const f of this.floats) f.life -= dt;
    this.floats = this.floats.filter((f) => f.life > 0).slice(-36);
  }

  private burst(x: number, y: number, color: string, n: number) {
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
      const s = 20 + Math.random() * 70;
      const life = 0.35 + Math.random() * 0.25;
      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life,
        max: life,
        color,
        size: 2 + Math.random() * 2,
      });
    }
  }

  private float(x: number, y: number, text: string, color: string) {
    this.floats.push({ x, y, text, life: 0.6, color });
  }

  pointer(x: number, y: number, type: "move" | "down" | "leave") {
    if (type === "leave") {
      this.hoverC = -1;
      this.hoverR = -1;
      return;
    }
    const cell = cellOf(x, y);
    this.hoverC = cell ? cell.c : -1;
    this.hoverR = cell ? cell.r : -1;
    if (type !== "down" || !cell) return;
    if (this.phase === "victory" || this.phase === "defeat") return;
    const occupied = this.towerAt(cell.c, cell.r);
    if (occupied) {
      this.selectedId = occupied.uid;
      this.placing = null;
      this.dirty = true;
      return;
    }
    if (this.placing) {
      this.place(cell.c, cell.r, this.placing);
      return;
    }
    this.selectedId = null;
    this.dirty = true;
  }

  place(c: number, r: number, kind: TowerId) {
    if (this.phase === "victory" || this.phase === "defeat") return false;
    if (!this.unlocked.has(kind)) {
      this.say("해금이 필요합니다");
      return false;
    }
    if (kind === "slugger" && this.towers.some((tower) => tower.kind === "slugger")) {
      this.say("한정 타워는 한 명만 배치됩니다");
      return false;
    }
    if (!isBuildable(this.sector, c, r)) {
      this.say("길 위에는 설치할 수 없습니다");
      return false;
    }
    if (this.towerAt(c, r)) {
      this.say("이미 타워가 있습니다");
      return false;
    }
    const def = TOWERS[kind];
    if (this.gold < def.placeCost) {
      this.say("골드가 부족합니다");
      return false;
    }
    this.gold -= def.placeCost;
    const tower: Tower = {
      uid: this.nextTower++,
      kind,
      c,
      r,
      x: (c + 0.5) * CELL,
      y: (r + 0.5) * CELL,
      level: kind === "slugger" ? 0 : 1,
      spent: def.placeCost,
      cd: kind === "factory" ? 2 : 0.2,
      stun: 0,
      sporeT: 0,
      sporeDmg: 1,
      sporeFire: 1,
      aim: -Math.PI / 2,
      targetId: null,
      targetMode: "first",
      abilityT: 0,
      abilityCd: 0,
    };
    this.towers.push(tower);
    this.selectedId = tower.uid;
    this.dirty = true;
    return true;
  }

  upgrade(): boolean {
    const tower = this.towers.find((t) => t.uid === this.selectedId);
    if (!tower) return false;
    if (tower.kind === "slugger") return this.upgradeSlugger(tower);
    const def = TOWERS[tower.kind];
    const next = def.levels[tower.level];
    if (!next) {
      this.say("최대 레벨입니다");
      return false;
    }
    if (this.gold < next.cost) {
      this.say("골드가 부족합니다");
      return false;
    }
    this.gold -= next.cost;
    tower.spent += next.cost;
    tower.level += 1;
    this.dirty = true;
    return true;
  }

  private upgradeSlugger(tower: Tower): boolean {
    const odds = sluggerOdds(tower.level);
    if (odds.capped) {
      this.say("최대 강화입니다");
      return false;
    }
    if (this.gold < odds.cost) {
      this.say("골드가 부족합니다");
      return false;
    }
    this.gold -= odds.cost;
    tower.spent += odds.cost;
    const next = rollSlugger(tower.level, Math.random(), Math.random());
    tower.level = next.plus;
    this.say(
      next.result === "success"
        ? `강화 성공 +${next.plus}`
        : next.result === "reset"
          ? "강화 실패. 배트가 초기화되었습니다"
          : "강화 실패",
    );
    this.dirty = true;
    return true;
  }

  sell(): boolean {
    const idx = this.towers.findIndex((t) => t.uid === this.selectedId);
    if (idx < 0) return false;
    const tower = this.towers[idx];
    this.gold += Math.floor(tower.spent * 0.6);
    this.towers.splice(idx, 1);
    if (tower.kind === "factory") this.allies = this.allies.filter((ally) => ally.factoryId !== tower.uid);
    this.selectedId = null;
    this.dirty = true;
    return true;
  }

  cycleTarget() {
    const tower = this.towers.find((t) => t.uid === this.selectedId);
    if (!tower || tower.kind === "commander" || tower.kind === "factory") return;
    const i = TARGETS.indexOf(tower.targetMode);
    tower.targetMode = TARGETS[(i + 1) % TARGETS.length];
    tower.targetId = null;
    this.dirty = true;
  }

  activate() {
    const tower = this.towers.find((t) => t.uid === this.selectedId);
    if (!tower) return;
    if (tower.kind === "medic") {
      this.cleanse(tower);
      return;
    }
    if (tower.kind !== "commander") return;
    const spec = TOWERS.commander.commander?.[tower.level - 1];
    if (!spec || spec.ability <= 0) {
      this.say("아직 능력이 없습니다");
      return;
    }
    if (tower.abilityT > 0 || tower.abilityCd > 0) {
      this.say("재사용 대기 중");
      return;
    }
    tower.abilityT = spec.ability;
    tower.abilityCd = spec.abilityCd;
    this.dirty = true;
  }

  private cleanse(tower: Tower) {
    const lv = TOWERS.medic.levels[tower.level - 1];
    if (tower.abilityCd > 0) {
      this.say("재사용 대기 중");
      return;
    }
    const radius = lv.splash * CELL;
    const r2 = radius * radius;
    let cleared = 0;
    for (const other of this.towers) {
      const dx = other.x - tower.x;
      const dy = other.y - tower.y;
      if (dx * dx + dy * dy > r2) continue;
      if (other.stun <= 0 && other.sporeT <= 0) continue;
      other.stun = 0;
      other.sporeT = 0;
      other.sporeDmg = 1;
      other.sporeFire = 1;
      cleared += 1;
    }
    tower.abilityCd = lv.abilityCd ?? 18;
    tower.abilityT = 0.45;
    this.say(cleared > 0 ? `제독 ${cleared}` : "해제할 상태가 없습니다");
    this.dirty = true;
  }

  private tickFactory(tower: Tower, dt: number) {
    if (tower.stun > 0) return;
    const spec = TOWERS.factory.factory?.[tower.level - 1];
    if (!spec) return;
    const waiting = this.allies.filter((ally) => ally.alive && ally.factoryId === tower.uid).length;
    if (waiting >= 2) return;
    const pace = tower.sporeT > 0 ? tower.sporeFire : 1;
    tower.cd -= dt * pace;
    if (tower.cd > 0) return;
    this.spawnAlly(tower, spec);
    tower.cd = spec.every / Math.max(0.5, pace);
  }

  private spawnAlly(tower: Tower, spec: NonNullable<(typeof TOWERS)["factory"]["factory"]>[number]) {
    const progress = Math.max(0, this.sector.path.total - 8);
    const p = pointAt(this.sector.path, progress);
    this.allies.push({
      uid: this.nextAlly++,
      factoryId: tower.uid,
      level: tower.level,
      hp: spec.hp,
      maxHp: spec.hp,
      progress,
      x: p.x,
      y: p.y,
      angle: p.angle + Math.PI,
      alive: true,
      gun: spec.gun,
      gunInterval: spec.gunInterval,
      gunRange: spec.gunRange,
      gunCd: 0.3,
      speed: spec.speed,
      hit: [],
    });
    this.burst(p.x, p.y, "#8a9a6a", 6);
  }

  private tickAllies(dt: number) {
    for (const ally of this.allies) {
      if (!ally.alive) continue;
      ally.progress -= ally.speed * CELL * dt;
      if (ally.progress <= 0) {
        ally.alive = false;
        continue;
      }
      const p = pointAt(this.sector.path, ally.progress);
      ally.x = p.x;
      ally.y = p.y;
      ally.angle = p.angle + Math.PI;
      const foe = this.nearestGround(ally.x, ally.y, 36, ally.hit);
      if (foe) {
        const trade = Math.min(ally.hp, foe.hp);
        ally.hp -= trade;
        ally.hit.push(foe.uid);
        this.hurt(foe, trade, { raw: true });
        this.burst(ally.x, ally.y, "#c6a15a", 6);
        if (ally.hp <= 0) ally.alive = false;
      }
      if (!ally.alive || ally.gun <= 0) continue;
      ally.gunCd -= dt;
      if (ally.gunCd > 0) continue;
      const target = this.nearestGround(ally.x, ally.y, ally.gunRange * CELL, []);
      if (!target) continue;
      ally.gunCd = ally.gunInterval;
      this.shots.push({
        kind: "bullet",
        x: ally.x,
        y: ally.y,
        tx: target.x,
        ty: target.y,
        speed: 8 * CELL,
        damage: ally.gun,
        life: 1.2,
        target: target.uid,
      });
    }
    if (this.allies.some((ally) => !ally.alive)) this.allies = this.allies.filter((ally) => ally.alive);
  }

  private nearestGround(x: number, y: number, radius: number, skip: number[]): Enemy | null {
    const r2 = radius * radius;
    let best: Enemy | null = null;
    let bestD = r2;
    for (const enemy of this.enemies) {
      if (!enemy.alive || enemy.flying || skip.includes(enemy.uid)) continue;
      const dx = enemy.x - x;
      const dy = enemy.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 <= bestD) {
        best = enemy;
        bestD = d2;
      }
    }
    return best;
  }

  setPlacing(kind: TowerId | null) {
    this.placing = kind;
    if (kind) this.selectedId = null;
    this.dirty = true;
  }

  setSpeed(speed: 1 | 2 | 3) {
    this.speed = speed;
    this.dirty = true;
  }

  togglePause() {
    if (this.phase === "victory" || this.phase === "defeat") return;
    this.paused = !this.paused;
    this.dirty = true;
  }

  /** Test hook: advance the simulation without rendering. */
  fast(seconds: number) {
    const steps = Math.max(0, Math.round(seconds * 60));
    for (let i = 0; i < steps; i++) this.tick(1 / 60);
  }

  private towerAt(c: number, r: number): Tower | undefined {
    return this.towers.find((t) => t.c === c && t.r === r);
  }

  private enemyById(id: number | null): Enemy | null {
    if (id == null) return null;
    return this.enemies.find((e) => e.uid === id && e.alive) ?? null;
  }
}

function scheduleOf(wave: WaveDef): SpawnEvent[] {
  const events: SpawnEvent[] = [];
  let t = 0.35;
  for (const group of wave.groups) {
    for (let i = 0; i < group.count; i++) {
      events.push({ t, id: group.id });
      t += group.interval;
    }
    t += 1.15;
  }
  return events;
}

function angDiff(a: number, b: number): number {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
