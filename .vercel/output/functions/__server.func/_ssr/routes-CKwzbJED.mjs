import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Target, c as Play, d as Heart, f as Gem, g as Bomb, h as Coins, i as Trash2, l as Pause, m as Crosshair, n as Volume2, o as RotateCcw, p as FastForward, s as Radio, t as VolumeX, u as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CKwzbJED.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOWERS = {
	soldier: {
		id: "soldier",
		name: "솔저",
		blurb: "안정적인 단발 화력",
		placeCost: 50,
		elif: 0,
		levels: [
			{
				name: "권총",
				damage: 8,
				interval: 1,
				range: 4,
				splash: 0,
				cost: 0
			},
			{
				name: "쌍권총",
				damage: 10,
				interval: .7,
				range: 4,
				splash: 0,
				cost: 40
			},
			{
				name: "M16",
				damage: 15,
				interval: .6,
				range: 5,
				splash: 0,
				cost: 70
			},
			{
				name: "M249",
				damage: 18,
				interval: .4,
				range: 5,
				splash: 0,
				cost: 120
			}
		]
	},
	sniper: {
		id: "sniper",
		name: "스나이퍼",
		blurb: "느린 고화력 단발",
		placeCost: 80,
		elif: 40,
		levels: [
			{
				name: "사냥용 소총",
				damage: 25,
				interval: 2,
				range: 6,
				splash: 0,
				cost: 0
			},
			{
				name: "핸들링 개선",
				damage: 25,
				interval: 1.6,
				range: 6,
				splash: 0,
				cost: 50
			},
			{
				name: "저격소총",
				damage: 45,
				interval: 1.8,
				range: 8,
				splash: 0,
				cost: 90
			},
			{
				name: "대구경 저격소총",
				damage: 80,
				interval: 2,
				range: 8,
				splash: 0,
				cost: 150
			}
		]
	},
	demoman: {
		id: "demoman",
		name: "데모맨",
		blurb: "범위 폭발",
		placeCost: 70,
		elif: 50,
		levels: [
			{
				name: "수류탄",
				damage: 12,
				interval: 1.5,
				range: 4,
				splash: 1.5,
				cost: 0
			},
			{
				name: "강화 수류탄",
				damage: 16,
				interval: 1.4,
				range: 4,
				splash: 1.8,
				cost: 45
			},
			{
				name: "수류탄 발사기",
				damage: 20,
				interval: 1.2,
				range: 5,
				splash: 2,
				cost: 80
			},
			{
				name: "로켓 발사기",
				damage: 35,
				interval: 1.5,
				range: 5,
				splash: 2.5,
				cost: 130
			}
		]
	},
	commander: {
		id: "commander",
		name: "사령관",
		blurb: "주변 타워 강화",
		placeCost: 100,
		elif: 80,
		levels: [
			{
				name: "지역 버프",
				damage: 0,
				interval: 0,
				range: 3,
				splash: 0,
				cost: 0
			},
			{
				name: "버프 강화",
				damage: 0,
				interval: 0,
				range: 3.5,
				splash: 0,
				cost: 60
			},
			{
				name: "전술 가속",
				damage: 0,
				interval: 0,
				range: 4,
				splash: 0,
				cost: 100
			},
			{
				name: "지속 전술",
				damage: 0,
				interval: 0,
				range: 4,
				splash: 0,
				cost: 140
			}
		],
		commander: [
			{
				name: "지역 버프",
				fire: 1.15,
				dmg: 1.1,
				radius: 3,
				ability: 0,
				abilityCd: 0,
				cost: 0
			},
			{
				name: "버프 강화",
				fire: 1.25,
				dmg: 1.15,
				radius: 3.5,
				ability: 0,
				abilityCd: 0,
				cost: 60
			},
			{
				name: "전술 가속",
				fire: 1.25,
				dmg: 1.15,
				radius: 4,
				ability: 8,
				abilityCd: 25,
				cost: 100
			},
			{
				name: "지속 전술",
				fire: 1.25,
				dmg: 1.15,
				radius: 4,
				ability: 12,
				abilityCd: 25,
				cost: 140
			}
		]
	}
};
var TOWER_ORDER = [
	"soldier",
	"sniper",
	"demoman",
	"commander"
];
var ENEMIES = {
	zombie: {
		id: "zombie",
		name: "좀비",
		hp: 40,
		speed: 1,
		gold: 5,
		scale: 1
	},
	fast: {
		id: "fast",
		name: "빠른좀비",
		hp: 25,
		speed: 1.8,
		gold: 6,
		scale: .86
	},
	slow: {
		id: "slow",
		name: "느린좀비",
		hp: 120,
		speed: .5,
		gold: 10,
		scale: 1.22
	},
	giant: {
		id: "giant",
		name: "좀비 거인",
		hp: 300,
		speed: .8,
		gold: 25,
		scale: 1.65
	},
	monster: {
		id: "monster",
		name: "좀비 괴수",
		hp: 500,
		speed: .4,
		gold: 35,
		scale: 2
	},
	digger: {
		id: "digger",
		name: "무덤도굴꾼",
		hp: 800,
		speed: .7,
		gold: 100,
		scale: 1.5
	}
};
var WAVES = [
	{
		bonus: 30,
		elif: 2,
		groups: [{
			id: "zombie",
			count: 8,
			interval: .75
		}]
	},
	{
		bonus: 30,
		elif: 2,
		groups: [{
			id: "zombie",
			count: 10,
			interval: .7
		}]
	},
	{
		bonus: 35,
		elif: 2,
		groups: [{
			id: "fast",
			count: 6,
			interval: .5
		}]
	},
	{
		bonus: 40,
		elif: 2,
		groups: [{
			id: "zombie",
			count: 8,
			interval: .65
		}, {
			id: "fast",
			count: 4,
			interval: .48
		}]
	},
	{
		bonus: 45,
		elif: 3,
		groups: [{
			id: "slow",
			count: 3,
			interval: 1.1
		}]
	},
	{
		bonus: 50,
		elif: 3,
		groups: [{
			id: "zombie",
			count: 10,
			interval: .6
		}, {
			id: "slow",
			count: 2,
			interval: 1
		}]
	},
	{
		bonus: 60,
		elif: 3,
		groups: [{
			id: "zombie",
			count: 6,
			interval: .6
		}, {
			id: "giant",
			count: 1,
			interval: .4
		}]
	},
	{
		bonus: 60,
		elif: 3,
		groups: [{
			id: "fast",
			count: 8,
			interval: .42
		}, {
			id: "slow",
			count: 3,
			interval: .9
		}]
	},
	{
		bonus: 70,
		elif: 4,
		groups: [{
			id: "zombie",
			count: 8,
			interval: .55
		}, {
			id: "monster",
			count: 1,
			interval: .4
		}]
	},
	{
		bonus: 70,
		elif: 4,
		groups: [{
			id: "slow",
			count: 2,
			interval: .9
		}, {
			id: "giant",
			count: 1,
			interval: .4
		}]
	},
	{
		bonus: 80,
		elif: 4,
		groups: [{
			id: "fast",
			count: 10,
			interval: .38
		}, {
			id: "monster",
			count: 1,
			interval: .4
		}]
	},
	{
		bonus: 100,
		elif: 12,
		groups: [{
			id: "zombie",
			count: 5,
			interval: .55
		}, {
			id: "digger",
			count: 1,
			interval: .5
		}]
	}
];
var PATH_CELLS = [
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
	[11, 2]
];
var pathSet = new Set(PATH_CELLS.map(([c, r]) => `${c},${r}`));
function isPath(c, r) {
	return pathSet.has(`${c},${r}`);
}
function inBounds(c, r) {
	return c >= 0 && r >= 0 && c < 12 && r < 8;
}
function isBuildable(c, r) {
	return inBounds(c, r) && !isPath(c, r);
}
function buildPath() {
	const pts = PATH_CELLS.map(([c, r]) => ({
		x: (c + .5) * 64,
		y: (r + .5) * 64
	}));
	const seg = [];
	let total = 0;
	for (let i = 1; i < pts.length; i++) {
		const d = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
		seg.push(d);
		total += d;
	}
	return {
		pts,
		seg,
		total
	};
}
var PATH = buildPath();
function pointAt(dist) {
	const { pts, seg, total } = PATH;
	let d = Math.max(0, Math.min(dist, total));
	if (dist >= total) {
		const a = pts[pts.length - 1];
		const b = pts[pts.length - 2];
		return {
			x: a.x,
			y: a.y,
			angle: Math.atan2(a.y - b.y, a.x - b.x)
		};
	}
	for (let i = 0; i < seg.length; i++) {
		if (d <= seg[i] || i === seg.length - 1) {
			const len = seg[i] || 1;
			const t = Math.min(1, d / len);
			return {
				x: pts[i].x + (pts[i + 1].x - pts[i].x) * t,
				y: pts[i].y + (pts[i + 1].y - pts[i].y) * t,
				angle: Math.atan2(pts[i + 1].y - pts[i].y, pts[i + 1].x - pts[i].x)
			};
		}
		d -= seg[i];
	}
	const last = pts[pts.length - 1];
	return {
		x: last.x,
		y: last.y,
		angle: 0
	};
}
function waveLabel(index) {
	const wave = WAVES[index];
	if (!wave) return "";
	return wave.groups.map((g) => `${ENEMIES[g.id].name} ${g.count}`).join(" · ");
}
function cellOf(x, y) {
	const c = Math.floor(x / 64);
	const r = Math.floor(y / 64);
	if (!inBounds(c, r)) return null;
	return {
		c,
		r
	};
}
var TARGET_LABEL = {
	first: "선두",
	closest: "근접",
	strongest: "강적"
};
var TARGETS = [
	"first",
	"closest",
	"strongest"
];
var Engine = class {
	gold = 200;
	lives = 20;
	phase = "prep";
	waveIndex = 0;
	speed = 1;
	paused = false;
	time = 0;
	shake = 0;
	reducedMotion = false;
	notice = "";
	noticeT = 0;
	banner = "";
	bannerT = 0;
	placing = "soldier";
	hoverC = -1;
	hoverR = -1;
	selectedId = null;
	killed = 0;
	towers = [];
	enemies = [];
	shots = [];
	particles = [];
	floats = [];
	unlocked;
	nextTower = 1;
	nextEnemy = 1;
	schedule = [];
	spawnClock = 0;
	onElif;
	dirty = false;
	constructor(opts) {
		this.unlocked = new Set(opts.unlocked);
		this.unlocked.add("soldier");
		this.onElif = opts.onElif;
	}
	setUnlocked(ids) {
		this.unlocked = new Set(ids);
		this.unlocked.add("soldier");
		if (this.placing && !this.unlocked.has(this.placing)) this.placing = null;
	}
	setReducedMotion(v) {
		this.reducedMotion = v;
	}
	hud() {
		return {
			gold: this.gold,
			lives: this.lives,
			wave: this.waveIndex + 1,
			waves: WAVES.length,
			phase: this.phase,
			speed: this.speed,
			paused: this.paused,
			notice: this.noticeT > 0 ? this.notice : "",
			placing: this.placing,
			selected: this.selectedInfo(),
			banner: this.bannerT > 0 ? this.banner : "",
			killed: this.killed
		};
	}
	selectedInfo() {
		const tower = this.towers.find((t) => t.uid === this.selectedId);
		if (!tower) return null;
		const def = TOWERS[tower.kind];
		const lv = def.levels[tower.level - 1];
		const next = def.levels[tower.level] ?? null;
		const cmd = def.commander?.[tower.level - 1];
		return {
			uid: tower.uid,
			kind: tower.kind,
			level: tower.level,
			levelName: lv.name,
			damage: lv.damage,
			interval: lv.interval,
			range: lv.range,
			splash: lv.splash,
			upgradeCost: next ? next.cost : null,
			sell: Math.floor(tower.spent * .6),
			target: tower.targetMode,
			stun: tower.stun,
			ability: tower.abilityT,
			abilityCd: tower.abilityCd,
			canAbility: Boolean(cmd && cmd.ability > 0),
			buffText: cmd ? `공격속도 +${Math.round((cmd.fire - 1) * 100)}% · 피해 +${Math.round((cmd.dmg - 1) * 100)}%` : ""
		};
	}
	say(text) {
		this.notice = text;
		this.noticeT = 2.2;
		this.dirty = true;
	}
	tick(dt) {
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
			this.tickShots(dt);
			this.collectDead();
			if (this.lives <= 0) {
				this.lives = 0;
				this.phase = "defeat";
				this.banner = "거점 함락";
				this.bannerT = 4;
				this.dirty = true;
			} else if (this.schedule.length === 0 && this.enemies.length === 0) this.finishWave();
		}
		this.ageFx(dt);
		const dirty = this.dirty;
		this.dirty = false;
		return dirty;
	}
	finishWave() {
		const wave = WAVES[this.waveIndex];
		this.gold += wave.bonus;
		this.onElif?.(wave.elif);
		this.enemies = [];
		if (this.waveIndex >= WAVES.length - 1) {
			this.phase = "victory";
			this.banner = "초원 사수";
			this.bannerT = 5;
		} else {
			this.waveIndex += 1;
			this.phase = "prep";
			this.banner = `웨이브 ${this.waveIndex} 정리`;
			this.bannerT = 1.4;
		}
		this.dirty = true;
	}
	startWave() {
		if (this.phase !== "prep") return false;
		const wave = WAVES[this.waveIndex];
		if (!wave) return false;
		this.phase = "combat";
		this.schedule = scheduleOf(wave);
		this.spawnClock = 0;
		this.banner = `웨이브 ${this.waveIndex + 1}`;
		this.bannerT = 1.5;
		this.dirty = true;
		return true;
	}
	drainSpawns() {
		while (this.schedule.length > 0 && this.schedule[0].t <= this.spawnClock) {
			const ev = this.schedule.shift();
			if (ev) this.spawn(ev.id, 0, false);
		}
	}
	spawn(id, progress, summoned) {
		const def = ENEMIES[id];
		const p = pointAt(Math.max(0, progress));
		const enemy = {
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
			scale: def.scale * (summoned ? .85 : 1),
			summoned,
			summonCd: id === "digger" ? 8 : 0,
			stunCd: id === "digger" ? 12 : 0
		};
		this.enemies.push(enemy);
	}
	moveEnemies(dt) {
		for (const e of this.enemies) {
			if (!e.alive) continue;
			e.progress += e.speed * 64 * dt;
			if (e.progress >= PATH.total) {
				e.alive = false;
				this.lives -= 1;
				if (this.lives < 0) this.lives = 0;
				this.shake = Math.max(this.shake, 7);
				this.say("거점에 도달");
				continue;
			}
			const p = pointAt(e.progress);
			e.x = p.x;
			e.y = p.y;
			e.angle = p.angle;
		}
	}
	bossSkills(dt) {
		for (const e of this.enemies) {
			if (!e.alive || e.kind !== "digger") continue;
			e.summonCd -= dt;
			e.stunCd -= dt;
			if (e.summonCd <= 0) {
				e.summonCd = 8;
				this.spawn("zombie", e.progress - 28, true);
				this.spawn("zombie", e.progress - 52, true);
				this.burst(e.x, e.y, "#8a7a62", 8);
			}
			if (e.stunCd <= 0) {
				e.stunCd = 12;
				this.stunAround(e.x, e.y, 192, 4);
				this.burst(e.x, e.y, "#d7c39a", 10);
				this.shake = Math.max(this.shake, 4);
			}
		}
	}
	stunAround(x, y, radius, duration) {
		const r2 = radius * radius;
		for (const tower of this.towers) {
			const dx = tower.x - x;
			const dy = tower.y - y;
			if (dx * dx + dy * dy <= r2) tower.stun = Math.max(tower.stun, duration);
		}
	}
	tickTowers(dt) {
		for (const tower of this.towers) {
			tower.stun = Math.max(0, tower.stun - dt);
			if (tower.kind === "commander") {
				tower.abilityT = Math.max(0, tower.abilityT - dt);
				tower.abilityCd = Math.max(0, tower.abilityCd - dt);
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
	fire(tower, target) {
		const lv = TOWERS[tower.kind].levels[tower.level - 1];
		const buff = this.buff(tower);
		const damage = lv.damage * buff.dmg;
		if (tower.kind === "sniper") {
			this.hurt(target, damage);
			this.shots.push({
				kind: "tracer",
				x1: tower.x,
				y1: tower.y,
				x2: target.x,
				y2: target.y,
				life: .12
			});
			this.burst(tower.x, tower.y, "#e7e2d6", 3);
			return;
		}
		if (tower.kind === "demoman") {
			const dist = Math.hypot(target.x - tower.x, target.y - tower.y);
			const dur = Math.max(.28, dist / 332.8);
			const lead = pointAt(target.progress + target.speed * 64 * dur * .85);
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
				radius: lv.splash * 64
			});
			return;
		}
		this.shots.push({
			kind: "bullet",
			x: tower.x + Math.cos(tower.aim) * 16,
			y: tower.y + Math.sin(tower.aim) * 16,
			tx: target.x,
			ty: target.y,
			speed: 608,
			damage,
			life: 1.6,
			target: target.uid
		});
		this.burst(tower.x, tower.y, "#c6a15a", 2);
	}
	interval(tower) {
		return TOWERS[tower.kind].levels[tower.level - 1].interval / this.buff(tower).fire;
	}
	buff(tower) {
		let fire = 1;
		let dmg = 1;
		let active = 1;
		for (const cmd of this.towers) {
			if (cmd.kind !== "commander") continue;
			const spec = TOWERS.commander.commander?.[cmd.level - 1];
			if (!spec) continue;
			const r = spec.radius * 64;
			const dx = cmd.x - tower.x;
			const dy = cmd.y - tower.y;
			if (dx * dx + dy * dy > r * r) continue;
			fire = Math.max(fire, spec.fire);
			dmg = Math.max(dmg, spec.dmg);
			if (cmd.abilityT > 0) active = 1.8;
		}
		return {
			fire: fire * active,
			dmg
		};
	}
	targetValid(tower) {
		const e = this.enemyById(tower.targetId);
		if (!e) return false;
		const range = TOWERS[tower.kind].levels[tower.level - 1].range * 64;
		const dx = e.x - tower.x;
		const dy = e.y - tower.y;
		return dx * dx + dy * dy <= range * range;
	}
	acquire(tower) {
		const range = TOWERS[tower.kind].levels[tower.level - 1].range * 64;
		const r2 = range * range;
		let best = null;
		let key = 0;
		for (const e of this.enemies) {
			if (!e.alive) continue;
			const dx = e.x - tower.x;
			const dy = e.y - tower.y;
			const d2 = dx * dx + dy * dy;
			if (d2 > r2) continue;
			const score = tower.targetMode === "closest" ? -d2 : tower.targetMode === "strongest" ? e.hp : e.progress;
			if (!best || score > key) {
				best = e;
				key = score;
			}
		}
		return best;
	}
	tickShots(dt) {
		const next = [];
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
					shot.x += dx / dist * step;
					shot.y += dy / dist * step;
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
	splash(x, y, radius, damage) {
		const r2 = radius * radius;
		for (const e of this.enemies) {
			if (!e.alive) continue;
			const dx = e.x - x;
			const dy = e.y - y;
			if (dx * dx + dy * dy <= r2) this.hurt(e, damage);
		}
	}
	hurt(e, damage) {
		if (!e.alive) return;
		e.hp -= damage;
		this.float(e.x, e.y - 16, String(Math.round(damage)), "#e7e2d6");
		if (e.hp <= 0) {
			e.alive = false;
			e.hp = 0;
			this.gold += e.gold;
			this.killed += 1;
			this.burst(e.x, e.y, "#8d927c", 8);
			this.dirty = true;
		}
	}
	collectDead() {
		if (this.enemies.some((e) => !e.alive)) this.enemies = this.enemies.filter((e) => e.alive);
	}
	ageFx(dt) {
		for (const p of this.particles) {
			p.life -= dt;
			p.x += p.vx * dt;
			p.y += p.vy * dt;
			p.vy += 18 * dt;
		}
		this.particles = this.particles.filter((p) => p.life > 0).slice(-90);
		for (const f of this.floats) f.life -= dt;
		this.floats = this.floats.filter((f) => f.life > 0).slice(-36);
	}
	burst(x, y, color, n) {
		for (let i = 0; i < n; i++) {
			const a = Math.PI * 2 * i / n + Math.random() * .4;
			const s = 20 + Math.random() * 70;
			const life = .35 + Math.random() * .25;
			this.particles.push({
				x,
				y,
				vx: Math.cos(a) * s,
				vy: Math.sin(a) * s,
				life,
				max: life,
				color,
				size: 2 + Math.random() * 2
			});
		}
	}
	float(x, y, text, color) {
		this.floats.push({
			x,
			y,
			text,
			life: .6,
			color
		});
	}
	pointer(x, y, type) {
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
	place(c, r, kind) {
		if (this.phase === "victory" || this.phase === "defeat") return false;
		if (!this.unlocked.has(kind)) {
			this.say("해금이 필요합니다");
			return false;
		}
		if (!isBuildable(c, r)) {
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
		const tower = {
			uid: this.nextTower++,
			kind,
			c,
			r,
			x: (c + .5) * 64,
			y: (r + .5) * 64,
			level: 1,
			spent: def.placeCost,
			cd: .2,
			stun: 0,
			aim: -Math.PI / 2,
			targetId: null,
			targetMode: "first",
			abilityT: 0,
			abilityCd: 0
		};
		this.towers.push(tower);
		this.selectedId = tower.uid;
		this.dirty = true;
		return true;
	}
	upgrade() {
		const tower = this.towers.find((t) => t.uid === this.selectedId);
		if (!tower) return false;
		const next = TOWERS[tower.kind].levels[tower.level];
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
	sell() {
		const idx = this.towers.findIndex((t) => t.uid === this.selectedId);
		if (idx < 0) return false;
		const tower = this.towers[idx];
		this.gold += Math.floor(tower.spent * .6);
		this.towers.splice(idx, 1);
		this.selectedId = null;
		this.dirty = true;
		return true;
	}
	cycleTarget() {
		const tower = this.towers.find((t) => t.uid === this.selectedId);
		if (!tower || tower.kind === "commander") return;
		tower.targetMode = TARGETS[(TARGETS.indexOf(tower.targetMode) + 1) % TARGETS.length];
		tower.targetId = null;
		this.dirty = true;
	}
	activate() {
		const tower = this.towers.find((t) => t.uid === this.selectedId);
		if (!tower || tower.kind !== "commander") return;
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
	setPlacing(kind) {
		this.placing = kind;
		if (kind) this.selectedId = null;
		this.dirty = true;
	}
	setSpeed(speed) {
		this.speed = speed;
		this.dirty = true;
	}
	togglePause() {
		if (this.phase === "victory" || this.phase === "defeat") return;
		this.paused = !this.paused;
		this.dirty = true;
	}
	/** Test hook: advance the simulation without rendering. */
	fast(seconds) {
		const steps = Math.max(0, Math.round(seconds * 60));
		for (let i = 0; i < steps; i++) this.tick(1 / 60);
	}
	towerAt(c, r) {
		return this.towers.find((t) => t.c === c && t.r === r);
	}
	enemyById(id) {
		if (id == null) return null;
		return this.enemies.find((e) => e.uid === id && e.alive) ?? null;
	}
};
function scheduleOf(wave) {
	const events = [];
	let t = .35;
	for (const group of wave.groups) {
		for (let i = 0; i < group.count; i++) {
			events.push({
				t,
				id: group.id
			});
			t += group.interval;
		}
		t += 1.15;
	}
	return events;
}
function angDiff(a, b) {
	let d = b - a;
	while (d > Math.PI) d -= Math.PI * 2;
	while (d < -Math.PI) d += Math.PI * 2;
	return d;
}
var TOWER_INK = {
	soldier: "#6f7d52",
	sniper: "#546170",
	demoman: "#8a6844",
	commander: "#a08448"
};
var mapCanvas = null;
function mapLayer() {
	if (mapCanvas) return mapCanvas;
	const canvas = document.createElement("canvas");
	canvas.width = 768;
	canvas.height = 512;
	const g = canvas.getContext("2d");
	if (!g) return canvas;
	g.fillStyle = "#243024";
	g.fillRect(0, 0, 768, 512);
	for (let i = 0; i < 220; i++) {
		const x = rand(i * 3) * 768;
		const y = rand(i * 3 + 1) * 512;
		const rx = 18 + rand(i * 3 + 2) * 70;
		const ry = 10 + rand(i * 7) * 28;
		g.fillStyle = i % 3 === 0 ? "#2c3a28" : i % 3 === 1 ? "#1e291c" : "#314232";
		g.beginPath();
		g.ellipse(x, y, rx, ry, rand(i) * Math.PI, 0, Math.PI * 2);
		g.fill();
	}
	g.strokeStyle = "rgba(231, 226, 214, 0.045)";
	g.lineWidth = 1;
	for (let c = 0; c <= 12; c++) {
		g.beginPath();
		g.moveTo(c * 64 + .5, 0);
		g.lineTo(c * 64 + .5, 512);
		g.stroke();
	}
	for (let r = 0; r <= 8; r++) {
		g.beginPath();
		g.moveTo(0, r * 64 + .5);
		g.lineTo(768, r * 64 + .5);
		g.stroke();
	}
	g.lineCap = "round";
	g.lineJoin = "round";
	tracePath(g);
	g.strokeStyle = "#4e4032";
	g.lineWidth = 55.04;
	g.stroke();
	tracePath(g);
	g.strokeStyle = "#6d5a42";
	g.lineWidth = 32;
	g.stroke();
	tracePath(g);
	g.strokeStyle = "rgba(231, 226, 214, 0.14)";
	g.lineWidth = 2;
	g.stroke();
	const spawn = PATH.pts[0];
	const base = PATH.pts[PATH.pts.length - 1];
	g.fillStyle = "#3a332c";
	g.fillRect(spawn.x - 30, spawn.y - 22, 44, 44);
	g.fillStyle = "#2a2824";
	g.fillRect(base.x - 18, base.y - 26, 52, 52);
	g.strokeStyle = "#c6a15a";
	g.lineWidth = 2;
	g.strokeRect(base.x - 18, base.y - 26, 52, 52);
	mapCanvas = canvas;
	return canvas;
}
function tracePath(g) {
	g.beginPath();
	PATH.pts.forEach((p, i) => i === 0 ? g.moveTo(p.x, p.y) : g.lineTo(p.x, p.y));
}
function rand(n) {
	const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
}
function renderFrame(ctx, engine) {
	const map = mapLayer();
	const sx = engine.reducedMotion ? 0 : Math.sin(engine.time * 42) * engine.shake;
	const sy = engine.reducedMotion ? 0 : Math.cos(engine.time * 37) * engine.shake;
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, 768, 512);
	ctx.save();
	ctx.translate(sx, sy);
	ctx.drawImage(map, 0, 0);
	drawLabels(ctx);
	drawHover(ctx, engine);
	drawRanges(ctx, engine);
	for (const tower of engine.towers) drawTower(ctx, engine, tower);
	for (const enemy of engine.enemies) drawEnemy(ctx, enemy);
	drawShots(ctx, engine);
	drawFx(ctx, engine);
	if (engine.bannerT > 0) drawBanner(ctx, engine.banner);
	ctx.restore();
}
function drawLabels(ctx) {
	const spawn = PATH.pts[0];
	const base = PATH.pts[PATH.pts.length - 1];
	ctx.fillStyle = "#e7e2d6";
	ctx.font = "600 13px \"IBM Plex Sans KR\", sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("진입", spawn.x - 8, spawn.y + 34);
	ctx.fillStyle = "#c6a15a";
	ctx.fillText("거점", base.x + 8, base.y + 42);
}
function drawHover(ctx, engine) {
	if (engine.hoverC < 0) return;
	const x = engine.hoverC * 64;
	const y = engine.hoverR * 64;
	ctx.fillStyle = isPath(engine.hoverC, engine.hoverR) ? "rgba(196, 92, 72, 0.28)" : "rgba(198, 161, 90, 0.16)";
	ctx.fillRect(x + 2, y + 2, 60, 60);
}
function drawRanges(ctx, engine) {
	const selected = engine.towers.find((t) => t.uid === engine.selectedId);
	if (selected) ring(ctx, selected, .9);
	if (!engine.placing || engine.hoverC < 0 || isPath(engine.hoverC, engine.hoverR)) return;
	const ghost = {
		kind: engine.placing,
		level: 1,
		x: (engine.hoverC + .5) * 64,
		y: (engine.hoverR + .5) * 64
	};
	ring(ctx, ghost, .45);
	drawTowerShape(ctx, ghost.kind, ghost.x, ghost.y, -Math.PI / 2, 1, true);
}
function ring(ctx, tower, alpha) {
	const range = rangeOf(tower.kind, tower.level);
	ctx.beginPath();
	ctx.arc(tower.x, tower.y, range, 0, Math.PI * 2);
	ctx.fillStyle = `rgba(198, 161, 90, ${.08 * alpha})`;
	ctx.fill();
	ctx.strokeStyle = `rgba(198, 161, 90, ${.55 * alpha})`;
	ctx.lineWidth = 1.5;
	ctx.setLineDash(tower.kind === "commander" ? [6, 6] : []);
	ctx.stroke();
	ctx.setLineDash([]);
}
function rangeOf(kind, level) {
	if (kind === "commander") return (TOWERS.commander.commander?.[level - 1]?.radius ?? 3) * 64;
	return TOWERS[kind].levels[level - 1].range * 64;
}
function drawTower(ctx, engine, tower) {
	if (tower.kind === "commander") {
		const radii = [
			3,
			3.5,
			4,
			4
		];
		ctx.beginPath();
		ctx.arc(tower.x, tower.y, radii[tower.level - 1] * 64, 0, Math.PI * 2);
		ctx.strokeStyle = tower.abilityT > 0 ? "rgba(198,161,90,0.85)" : "rgba(198,161,90,0.25)";
		ctx.lineWidth = tower.abilityT > 0 ? 2 : 1;
		ctx.setLineDash([5, 7]);
		ctx.stroke();
		ctx.setLineDash([]);
	}
	if (engine.selectedId === tower.uid) {
		ctx.strokeStyle = "#e7e2d6";
		ctx.lineWidth = 2;
		ctx.strokeRect(tower.x - 24, tower.y - 24, 48, 48);
	}
	drawTowerShape(ctx, tower.kind, tower.x, tower.y, tower.aim, tower.level, false);
	if (tower.stun > 0) {
		ctx.strokeStyle = "#d7c39a";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(tower.x, tower.y, 22, engine.time * 6, engine.time * 6 + 1.4);
		ctx.stroke();
	}
	ctx.fillStyle = "#c6a15a";
	for (let i = 0; i < tower.level; i++) ctx.fillRect(tower.x - 14 + i * 8, tower.y + 20, 5, 4);
}
function drawTowerShape(ctx, kind, x, y, aim, level, ghost) {
	ctx.save();
	ctx.globalAlpha = ghost ? .55 : 1;
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
function drawEnemy(ctx, enemy) {
	const s = enemy.scale;
	ctx.save();
	ctx.translate(enemy.x, enemy.y);
	ctx.fillStyle = "rgba(0,0,0,0.28)";
	ctx.beginPath();
	ctx.ellipse(0, 8 * s, 10 * s, 4 * s, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = enemyColor(enemy.kind);
	ctx.beginPath();
	ctx.ellipse(0, 2, 9 * s, 11 * s, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#1c1e1a";
	ctx.beginPath();
	ctx.arc(0, -8 * s, 6 * s, 0, Math.PI * 2);
	ctx.fill();
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
	ctx.restore();
	const w = 28 * Math.min(s, 1.4);
	const hp = Math.max(0, enemy.hp / enemy.maxHp);
	ctx.fillStyle = "rgba(0,0,0,0.45)";
	ctx.fillRect(enemy.x - w / 2, enemy.y - 20 * s - 8, w, 4);
	ctx.fillStyle = hp < .35 ? "#c45c48" : "#c6a15a";
	ctx.fillRect(enemy.x - w / 2, enemy.y - 20 * s - 8, w * hp, 4);
}
function enemyColor(kind) {
	switch (kind) {
		case "fast": return "#7d8b68";
		case "slow": return "#3f4a3e";
		case "giant": return "#3a4036";
		case "monster": return "#2c332c";
		case "digger": return "#6d5d48";
		default: return "#5a6354";
	}
}
function drawShots(ctx, engine) {
	for (const shot of engine.shots) if (shot.kind === "tracer") {
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
function drawFx(ctx, engine) {
	for (const p of engine.particles) {
		ctx.globalAlpha = Math.max(0, p.life / p.max);
		ctx.fillStyle = p.color;
		ctx.fillRect(p.x, p.y, p.size, p.size);
		ctx.globalAlpha = 1;
	}
	ctx.font = "600 12px \"IBM Plex Sans KR\", sans-serif";
	ctx.textAlign = "center";
	for (const f of engine.floats) {
		ctx.globalAlpha = Math.max(0, f.life / .6);
		ctx.fillStyle = f.color;
		ctx.fillText(f.text, f.x, f.y - (.6 - f.life) * 24);
	}
	ctx.globalAlpha = 1;
}
function drawBanner(ctx, text) {
	ctx.fillStyle = "rgba(16, 20, 15, 0.72)";
	ctx.fillRect(264, 16, 240, 36);
	ctx.strokeStyle = "#c6a15a";
	ctx.strokeRect(264, 16, 240, 36);
	ctx.fillStyle = "#e7e2d6";
	ctx.font = "600 18px \"IBM Plex Sans KR\", sans-serif";
	ctx.textAlign = "center";
	ctx.fillText(text, 384, 40);
}
var GameAudio = class {
	ctx = null;
	muted = false;
	unlock() {
		try {
			if (!this.ctx) this.ctx = new AudioContext();
			if (this.ctx.state === "suspended") this.ctx.resume();
		} catch {
			this.ctx = null;
		}
	}
	setMuted(muted) {
		this.muted = muted;
	}
	tone(freq, dur, type, gain) {
		if (this.muted || !this.ctx) return;
		const ctx = this.ctx;
		const osc = ctx.createOscillator();
		const amp = ctx.createGain();
		osc.type = type;
		osc.frequency.value = freq;
		amp.gain.setValueAtTime(gain, ctx.currentTime);
		amp.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + dur);
		osc.connect(amp);
		amp.connect(ctx.destination);
		osc.start();
		osc.stop(ctx.currentTime + dur);
	}
	place() {
		this.tone(220, .08, "square", .03);
	}
	shot() {
		this.tone(520, .04, "square", .02);
	}
	boom() {
		this.tone(90, .18, "sawtooth", .03);
	}
	warn() {
		this.tone(140, .2, "triangle", .04);
	}
	ui() {
		this.tone(360, .05, "square", .02);
	}
};
var KEY = "outpost-meta-v1";
function defaultMeta() {
	return {
		v: 1,
		elif: 0,
		unlocked: ["soldier"],
		muted: false
	};
}
function loadMeta() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return defaultMeta();
		const parsed = JSON.parse(raw);
		const unlocked = TOWER_ORDER.filter((id) => id === "soldier" || Array.isArray(parsed.unlocked) && parsed.unlocked.includes(id));
		return {
			v: 1,
			elif: typeof parsed.elif === "number" && parsed.elif >= 0 ? Math.floor(parsed.elif) : 0,
			unlocked,
			muted: Boolean(parsed.muted)
		};
	} catch {
		return defaultMeta();
	}
}
function saveMeta(meta) {
	localStorage.setItem(KEY, JSON.stringify(meta));
}
var ICONS = {
	soldier: Crosshair,
	sniper: Target,
	demoman: Bomb,
	commander: Radio
};
var MODES = [
	{
		id: "easy",
		code: "EASY",
		name: "초원",
		open: true,
		note: "12웨이브 · 단일 경로"
	},
	{
		id: "normal",
		code: "NORMAL",
		name: "개발 중",
		open: false,
		note: "준비되지 않음"
	},
	{
		id: "hard",
		code: "HARD",
		name: "개발 중",
		open: false,
		note: "준비되지 않음"
	},
	{
		id: "extreme",
		code: "EXTREME",
		name: "개발 중",
		open: false,
		note: "준비되지 않음"
	},
	{
		id: "death",
		code: "DEATH",
		name: "개발 중",
		open: false,
		note: "준비되지 않음"
	}
];
function Outpost() {
	const [meta, setMeta] = (0, import_react.useState)(defaultMeta);
	const [screen, setScreen] = (0, import_react.useState)("menu");
	const [hud, setHud] = (0, import_react.useState)(null);
	const [menuNote, setMenuNote] = (0, import_react.useState)("");
	const [confirmUnlock, setConfirmUnlock] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(0);
	const [sellArmed, setSellArmed] = (0, import_react.useState)(false);
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const audioRef = (0, import_react.useRef)(null);
	const metaRef = (0, import_react.useRef)(defaultMeta());
	metaRef.current = meta;
	const armRef = (0, import_react.useRef)(() => {});
	(0, import_react.useEffect)(() => {
		const loaded = loadMeta();
		setMeta(loaded);
	}, []);
	(0, import_react.useEffect)(() => {
		if (screen !== "play") return;
		const canvas = canvasRef.current;
		const engine = engineRef.current;
		if (!canvas || !engine) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const fit = () => {
			const field = canvas.parentElement;
			const hud = document.getElementById("hud-bar");
			const dock = document.getElementById("hud-dock");
			if (!field) return;
			const chrome = (hud?.offsetHeight ?? 0) + (dock?.offsetHeight ?? 0);
			const maxW = field.clientWidth;
			if (maxW < 8) return;
			const maxH = Math.max(160, window.innerHeight - chrome);
			const scale = Math.min(maxW / 768, maxH / 512);
			canvas.style.width = `${Math.max(1, Math.floor(768 * scale))}px`;
			canvas.style.height = `${Math.max(1, Math.floor(512 * scale))}px`;
		};
		fit();
		const observer = new ResizeObserver(fit);
		if (canvas.parentElement) observer.observe(canvas.parentElement);
		window.addEventListener("resize", fit);
		let raf = 0;
		let last = performance.now();
		let acc = 0;
		let hudAcc = 0;
		const loop = (now) => {
			const raw = Math.min(.05, (now - last) / 1e3);
			last = now;
			const scaled = engine.paused ? 0 : raw * engine.speed;
			const livesBefore = engine.lives;
			acc += scaled;
			let dirty = false;
			let guard = 0;
			while (acc >= 1 / 60 && guard < 12) {
				dirty = engine.tick(1 / 60) || dirty;
				acc -= 1 / 60;
				guard += 1;
			}
			renderFrame(ctx, engine);
			if (engine.lives < livesBefore) audioRef.current?.warn();
			hudAcc += raw;
			if (dirty || hudAcc > .15) {
				hudAcc = 0;
				setHud(engine.hud());
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		setHud(engine.hud());
		window.__td = {
			gold: () => engine.gold,
			lives: () => engine.lives,
			phase: () => engine.phase,
			wave: () => engine.waveIndex + 1,
			killed: () => engine.killed,
			towers: () => engine.towers.map((t) => ({
				kind: t.kind,
				c: t.c,
				r: t.r,
				level: t.level
			})),
			place: (c, r, id) => engine.place(c, r, id),
			begin: () => engine.startWave(),
			fast: (s) => {
				engine.fast(s);
				setHud(engine.hud());
			}
		};
		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
			window.removeEventListener("resize", fit);
			delete window.__td;
		};
	}, [screen, session]);
	function commit(next) {
		metaRef.current = next;
		setMeta(next);
		saveMeta(next);
		engineRef.current?.setUnlocked(next.unlocked);
	}
	function ensureAudio() {
		if (!audioRef.current) audioRef.current = new GameAudio();
		audioRef.current.unlock();
		audioRef.current.setMuted(Boolean(metaRef.current?.muted));
		return audioRef.current;
	}
	function startMission() {
		const current = metaRef.current ?? loadMeta();
		ensureAudio().ui();
		const engine = new Engine({
			unlocked: current.unlocked,
			onElif: (amount) => {
				const prev = metaRef.current ?? current;
				commit({
					...prev,
					elif: prev.elif + amount
				});
			}
		});
		engine.setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
		engineRef.current = engine;
		setSellArmed(false);
		setSession((n) => n + 1);
		setScreen("play");
	}
	function backToMenu() {
		engineRef.current = null;
		setScreen("menu");
		setHud(null);
	}
	function retry() {
		ensureAudio().ui();
		startMission();
	}
	function onPointer(kind, event) {
		const engine = engineRef.current;
		const canvas = canvasRef.current;
		if (!engine || !canvas) return;
		if (kind === "down") ensureAudio();
		if (kind === "leave") {
			engine.pointer(0, 0, "leave");
			return;
		}
		const rect = canvas.getBoundingClientRect();
		const x = (event.clientX - rect.left) / rect.width * 768;
		const y = (event.clientY - rect.top) / rect.height * 512;
		const before = engine.towers.length;
		engine.pointer(x, y, kind);
		if (kind === "down") {
			if (engine.towers.length > before) ensureAudio().place();
			setHud(engine.hud());
			setSellArmed(false);
		}
	}
	function arm(id) {
		const engine = engineRef.current;
		const current = metaRef.current;
		if (!engine || !current) return;
		ensureAudio().ui();
		if (!current.unlocked.includes(id)) {
			if (confirmUnlock === id && current.elif >= TOWERS[id].elif) {
				commit({
					...current,
					elif: current.elif - TOWERS[id].elif,
					unlocked: [...current.unlocked, id]
				});
				setConfirmUnlock(null);
				engine.setPlacing(id);
				setHud(engine.hud());
				return;
			}
			setConfirmUnlock(id);
			engine.say(current.elif >= TOWERS[id].elif ? "한 번 더 눌러 해금" : "엘리프가 부족합니다");
			setHud(engine.hud());
			return;
		}
		setConfirmUnlock(null);
		engine.setPlacing(engine.placing === id ? null : id);
		setHud(engine.hud());
		setSellArmed(false);
	}
	function unlockFromMenu(id) {
		const current = metaRef.current;
		if (!current || current.unlocked.includes(id)) return;
		ensureAudio().ui();
		if (current.elif < TOWERS[id].elif) {
			setMenuNote(`${TOWERS[id].name} 해금에는 엘리프 ${TOWERS[id].elif}이 필요합니다`);
			return;
		}
		if (confirmUnlock !== id) {
			setConfirmUnlock(id);
			setMenuNote(`${TOWERS[id].name}을 해금하려면 한 번 더 누르세요`);
			return;
		}
		commit({
			...current,
			elif: current.elif - TOWERS[id].elif,
			unlocked: [...current.unlocked, id]
		});
		setConfirmUnlock(null);
		setMenuNote(`${TOWERS[id].name} 해금`);
	}
	armRef.current = arm;
	(0, import_react.useEffect)(() => {
		if (screen !== "play") return;
		const onKey = (event) => {
			const engine = engineRef.current;
			if (!engine) return;
			if (event.code === "Space") {
				if (event.target instanceof HTMLButtonElement) return;
				event.preventDefault();
				if (engine.startWave()) ensureAudio().ui();
				setHud(engine.hud());
			} else if (event.code === "Escape") {
				engine.setPlacing(null);
				setHud(engine.hud());
			} else if (event.code === "Digit1") armRef.current("soldier");
			else if (event.code === "Digit2") armRef.current("sniper");
			else if (event.code === "Digit3") armRef.current("demoman");
			else if (event.code === "Digit4") armRef.current("commander");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [screen]);
	if (screen === "menu") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-4 bg-bg px-4 py-5 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-l-4 border-brass pl-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs tracking-widest text-brass",
						children: "SECTOR 01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold tracking-tight",
						children: "전초기지"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm leading-relaxed text-muted",
						children: "초원 경로를 따라 들어오는 적을 타워로 막습니다. 엘리프로 타워를 해금하고, 골드로 설치와 강화를 합니다."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-2",
				"aria-label": "타워 해금",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 flex items-center gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gem, {
							className: "size-4 text-brass",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-brass",
							children: meta.elif
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "엘리프"
						})
					]
				}), TOWER_ORDER.map((id) => {
					const def = TOWERS[id];
					const open = meta.unlocked.includes(id);
					const Icon = ICONS[id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => unlockFromMenu(id),
						disabled: open,
						className: "flex min-h-11 items-center gap-3 border border-line bg-surface px-3 py-2 text-left disabled:opacity-80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5 shrink-0 text-brass",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-semibold",
									children: def.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-xs text-muted",
									children: open ? "해금됨" : confirmUnlock === id ? "한 번 더 눌러 확정" : `엘리프 ${def.elif}`
								})]
							}),
							!open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
								className: "ml-auto size-4 text-muted",
								"aria-hidden": "true"
							})
						]
					}, id);
				})]
			}),
			menuNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-brass",
				children: menuNote
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "flex min-h-0 flex-1 flex-col gap-2",
				"aria-label": "난이도",
				children: MODES.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !mode.open,
					onClick: () => mode.open && startMission(),
					className: "flex min-h-11 items-center justify-between gap-3 border border-line bg-surface px-4 py-3 text-left disabled:opacity-45",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-brass",
						children: mode.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-base font-semibold",
						children: mode.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: mode.note
					})]
				}, mode.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: startMission,
				className: "min-h-11 bg-brass px-4 text-base font-semibold text-bg",
				children: "이지 작전 시작"
			})
		]
	});
	const selected = hud?.selected ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				id: "hud-bar",
				className: "shrink-0 border-b border-line px-3 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "전초기지"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ml-auto flex items-center gap-3 font-mono",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {
									className: "size-4 text-brass",
									"aria-hidden": "true"
								}), hud?.gold ?? 0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									className: "size-4 text-danger",
									"aria-hidden": "true"
								}), hud?.lives ?? 0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gem, {
									className: "size-4 text-brass",
									"aria-hidden": "true"
								}), meta.elif]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: hud ? `${Math.min(hud.wave, hud.waves)}/${hud.waves}` : ""
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-center gap-1",
					children: [
						[
							1,
							2,
							3
						].map((speed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								engineRef.current?.setSpeed(speed);
								setHud(engineRef.current?.hud() ?? null);
							},
							className: `min-h-11 min-w-11 border px-2 font-mono text-xs ${hud?.speed === speed ? "border-brass text-brass" : "border-line text-muted"}`,
							children: [speed, "x"]
						}, speed)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": hud?.paused ? "재개" : "일시정지",
							onClick: () => {
								engineRef.current?.togglePause();
								setHud(engineRef.current?.hud() ?? null);
							},
							className: "grid min-h-11 min-w-11 place-items-center border border-line",
							children: hud?.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": meta.muted ? "소리 켜기" : "소리 끄기",
							onClick: () => {
								const audio = ensureAudio();
								commit({
									...meta,
									muted: !meta.muted
								});
								audio.setMuted(!meta.muted);
							},
							className: "grid min-h-11 min-w-11 place-items-center border border-line",
							children: meta.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex w-full shrink-0 justify-center bg-bg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						width: 768,
						height: 512,
						"aria-label": "초원 전장",
						className: "block touch-none",
						onPointerDown: (event) => onPointer("down", event),
						onPointerMove: (event) => onPointer("move", event),
						onPointerLeave: (event) => onPointer("leave", event),
						onContextMenu: (event) => event.preventDefault()
					}),
					hud?.notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 text-sm text-brass",
						children: hud.notice
					}),
					(hud?.phase === "victory" || hud?.phase === "defeat") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center bg-bg/80 p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full max-w-sm border border-line bg-surface p-5 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-semibold",
									children: hud.phase === "victory" ? "초원 사수" : "거점 함락"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: hud.phase === "victory" ? "12웨이브를 버텼습니다. 엘리프는 다음 해금에 남습니다." : "생명이 떨어졌습니다. 해금 상태는 유지됩니다."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: retry,
										className: "inline-flex min-h-11 items-center gap-2 bg-brass px-4 font-semibold text-bg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
											className: "size-4",
											"aria-hidden": "true"
										}), "다시"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: backToMenu,
										className: "min-h-11 border border-line px-4",
										children: "메뉴"
									})]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "hud-dock",
				className: "shrink-0 border-t border-line bg-bg px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: hud?.phase !== "prep",
							onClick: () => {
								if (engineRef.current?.startWave()) {
									ensureAudio().ui();
									setHud(engineRef.current.hud());
								}
							},
							className: "inline-flex min-h-11 items-center gap-2 bg-brass px-3 text-sm font-semibold text-bg disabled:opacity-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FastForward, {
								className: "size-4",
								"aria-hidden": "true"
							}), hud?.phase === "prep" ? `웨이브 ${hud.wave} 시작` : hud?.phase === "combat" ? "진행 중" : "종료"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: hud?.phase === "prep" ? waveLabel(hud.wave - 1) : hud?.phase === "combat" ? "적 접근 중" : ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-2",
						children: TOWER_ORDER.map((id) => {
							const Icon = ICONS[id];
							const open = meta.unlocked.includes(id);
							const armed = hud?.placing === id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => arm(id),
								className: `flex min-h-11 flex-col items-start justify-center border px-2 py-1 text-left ${armed ? "border-brass" : "border-line"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-3.5 text-brass",
										"aria-hidden": "true"
									}), TOWERS[id].name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted",
									children: open ? confirmUnlock === id ? "해금 확인" : `${TOWERS[id].placeCost}G` : `${TOWERS[id].elif}E`
								})]
							}, id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-sm",
						children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 overflow-x-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-36 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold",
										children: [
											TOWERS[selected.kind].name,
											" · Lv",
											selected.level,
											" ",
											selected.levelName
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [selected.kind === "commander" ? selected.buffText : `피해 ${selected.damage} · ${selected.interval.toFixed(1)}초 · 사거리 ${selected.range}`, selected.stun > 0 ? " · 기절" : ""]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: selected.upgradeCost == null || (hud?.gold ?? 0) < (selected.upgradeCost ?? 0),
									onClick: () => {
										engineRef.current?.upgrade();
										ensureAudio().ui();
										setHud(engineRef.current?.hud() ?? null);
									},
									className: "min-h-11 shrink-0 border border-line px-3 text-xs disabled:opacity-40",
									children: selected.upgradeCost == null ? "최대" : `강화 ${selected.upgradeCost}G`
								}),
								selected.kind !== "commander" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										engineRef.current?.cycleTarget();
										setHud(engineRef.current?.hud() ?? null);
									},
									className: "min-h-11 shrink-0 border border-line px-3 text-xs",
									children: ["조준 ", TARGET_LABEL[selected.target]]
								}),
								selected.canAbility && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										engineRef.current?.activate();
										ensureAudio().ui();
										setHud(engineRef.current?.hud() ?? null);
									},
									className: "min-h-11 shrink-0 border border-brass px-3 text-xs text-brass",
									children: selected.ability > 0 ? `가속 ${selected.ability.toFixed(0)}s` : selected.abilityCd > 0 ? `대기 ${selected.abilityCd.toFixed(0)}s` : "능력 발동"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										if (!sellArmed) {
											setSellArmed(true);
											return;
										}
										engineRef.current?.sell();
										setSellArmed(false);
										setHud(engineRef.current?.hud() ?? null);
									},
									className: "inline-flex min-h-11 shrink-0 items-center gap-1 border border-line px-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										className: "size-3.5",
										"aria-hidden": "true"
									}), sellArmed ? "판매 확정" : `판매 ${selected.sell}G`]
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted",
							children: "타워를 고른 뒤 길 밖의 칸을 누르세요. 설치된 타워를 누르면 4레벨까지 강화할 수 있습니다. 키 1–4, Space, Esc."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-0 flex-1 bg-bg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				"aria-live": "polite",
				children: hud ? `골드 ${hud.gold}, 생명 ${hud.lives}, 웨이브 ${hud.wave}, ${hud.phase}` : ""
			})
		]
	});
}
var SplitComponent = Outpost;
//#endregion
export { SplitComponent as component };
