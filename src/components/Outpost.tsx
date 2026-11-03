import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  Bomb,
  Crosshair,
  Cross,
  Factory,
  FastForward,
  Gem,
  Heart,
  Lock,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Target,
  Trash2,
  Volume2,
  VolumeX,
  CircleDot,
  Coins,
} from "lucide-react";
import {
  TOWER_ORDER,
  TOWERS,
  VIEW_H,
  VIEW_W,
  TARGET_LABEL,
  type ModeId,
  type TowerId,
} from "../game/data";
import { Engine, type Hud } from "../game/engine";
import { renderFrame } from "../game/draw";
import { GameAudio } from "../game/audio";
import { loadMeta, saveMeta, defaultMeta, type Meta } from "../game/storage";

const ICONS = {
  soldier: Crosshair,
  sniper: Target,
  demoman: Bomb,
  commander: Radio,
  medic: Cross,
  factory: Factory,
  slugger: CircleDot,
} as const;

const MODES: { id: ModeId | "hard" | "extreme" | "death"; code: string; name: string; open: boolean; note: string }[] = [
  { id: "easy", code: "EASY", name: "초원", open: true, note: "12웨이브 · 단일 경로" },
  { id: "normal", code: "NORMAL", name: "배양동", open: true, note: "15웨이브 · 포자 · 비행" },
  { id: "hard", code: "HARD", name: "개발 중", open: false, note: "준비되지 않음" },
  { id: "extreme", code: "EXTREME", name: "개발 중", open: false, note: "준비되지 않음" },
  { id: "death", code: "DEATH", name: "개발 중", open: false, note: "준비되지 않음" },
];

export function Outpost() {
  const [meta, setMeta] = useState<Meta>(defaultMeta);
  const [screen, setScreen] = useState<"menu" | "play">("menu");
  const [hud, setHud] = useState<Hud | null>(null);
  const [menuNote, setMenuNote] = useState("");
  const [confirmUnlock, setConfirmUnlock] = useState<TowerId | null>(null);
  const [session, setSession] = useState(0);
  const [sellArmed, setSellArmed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const audioRef = useRef<GameAudio | null>(null);
  const metaRef = useRef<Meta>(defaultMeta());
  metaRef.current = meta;
  const armRef = useRef<(id: TowerId) => void>(() => {});

  useEffect(() => {
    const loaded = loadMeta();
    setMeta(loaded);
  }, []);

  useEffect(() => {
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
      const scale = Math.min(maxW / VIEW_W, maxH / VIEW_H);
      canvas.style.width = `${Math.max(1, Math.floor(VIEW_W * scale))}px`;
      canvas.style.height = `${Math.max(1, Math.floor(VIEW_H * scale))}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    window.addEventListener("resize", fit);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let hudAcc = 0;
    const loop = (now: number) => {
      const raw = Math.min(0.05, (now - last) / 1000);
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
      if (dirty || hudAcc > 0.15) {
        hudAcc = 0;
        setHud(engine.hud());
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    setHud(engine.hud());

    const debug = {
      gold: () => engine.gold,
      lives: () => engine.lives,
      phase: () => engine.phase,
      wave: () => engine.waveIndex + 1,
      killed: () => engine.killed,
      towers: () => engine.towers.map((t) => ({ kind: t.kind, c: t.c, r: t.r, level: t.level })),
      place: (c: number, r: number, id: TowerId) => engine.place(c, r, id),
      begin: () => engine.startWave(),
      fast: (s: number) => {
        engine.fast(s);
        setHud(engine.hud());
      },
    };
    (window as unknown as { __td?: typeof debug }).__td = debug;

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", fit);
      delete (window as unknown as { __td?: typeof debug }).__td;
    };
  }, [screen, session]);

  function commit(next: Meta) {
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

  function startMission(mode: ModeId = "easy") {
    const current = metaRef.current ?? loadMeta();
    const audio = ensureAudio();
    audio.ui();
    const engine = new Engine({
      mode,
      unlocked: current.unlocked,
      onElif: (amount) => {
        const prev = metaRef.current ?? current;
        commit({ ...prev, elif: prev.elif + amount });
      },
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
    startMission(engineRef.current?.sector.id ?? "easy");
  }

  function onPointer(kind: "move" | "down" | "leave", event: ReactPointerEvent<HTMLCanvasElement>) {
    const engine = engineRef.current;
    const canvas = canvasRef.current;
    if (!engine || !canvas) return;
    if (kind === "down") ensureAudio();
    if (kind === "leave") {
      engine.pointer(0, 0, "leave");
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * VIEW_W;
    const y = ((event.clientY - rect.top) / rect.height) * VIEW_H;
    const before = engine.towers.length;
    engine.pointer(x, y, kind);
    if (kind === "down") {
      if (engine.towers.length > before) ensureAudio().place();
      setHud(engine.hud());
      setSellArmed(false);
    }
  }

  function arm(id: TowerId) {
    const engine = engineRef.current;
    const current = metaRef.current;
    if (!engine || !current) return;
    ensureAudio().ui();
    if (!current.unlocked.includes(id)) {
      if (confirmUnlock === id && current.elif >= TOWERS[id].elif) {
        commit({ ...current, elif: current.elif - TOWERS[id].elif, unlocked: [...current.unlocked, id] });
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

  function unlockFromMenu(id: TowerId) {
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
    commit({ ...current, elif: current.elif - TOWERS[id].elif, unlocked: [...current.unlocked, id] });
    setConfirmUnlock(null);
    setMenuNote(`${TOWERS[id].name} 해금`);
  }

  armRef.current = arm;

  useEffect(() => {
    if (screen !== "play") return;
    const onKey = (event: KeyboardEvent) => {
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
      else if (event.code === "Digit5") armRef.current("medic");
      else if (event.code === "Digit6") armRef.current("factory");
      else if (event.code === "Digit7") armRef.current("slugger");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen]);

  if (screen === "menu") {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-4 bg-bg px-4 py-5 text-fg">
        <header className="border-l-4 border-brass pl-4">
          <p className="font-mono text-xs tracking-widest text-brass">SECTOR 01</p>
          <h1 className="text-3xl font-semibold tracking-tight">전초기지</h1>
          <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
            초원과 배양동. 엘리프로 타워를 해금하고, 골드로 설치와 강화를 합니다. 날아다니는 적은 스나이퍼만 맞춥니다.
          </p>
        </header>

        <section className="grid grid-cols-2 gap-2" aria-label="타워 해금">
          <div className="col-span-2 flex items-center gap-2 text-sm">
            <Gem className="size-4 text-brass" aria-hidden="true" />
            <span className="font-mono text-brass">{meta.elif}</span>
            <span className="text-muted">엘리프</span>
          </div>
          {TOWER_ORDER.map((id) => {
            const def = TOWERS[id];
            const open = meta.unlocked.includes(id);
            const Icon = ICONS[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => unlockFromMenu(id)}
                disabled={open}
                className="flex min-h-11 items-center gap-3 border border-line bg-surface px-3 py-2 text-left disabled:opacity-80"
              >
                <Icon className="size-5 shrink-0 text-brass" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{def.name}</span>
                  <span className="block text-xs text-muted">
                    {open ? "해금됨" : confirmUnlock === id ? "한 번 더 눌러 확정" : `엘리프 ${def.elif}`}
                  </span>
                </span>
                {!open && <Lock className="ml-auto size-4 text-muted" aria-hidden="true" />}
              </button>
            );
          })}
        </section>

        {menuNote && <p className="text-sm text-brass">{menuNote}</p>}

        <section className="flex min-h-0 flex-1 flex-col gap-2" aria-label="난이도">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              disabled={!mode.open}
              onClick={() => {
                if (!mode.open) return;
                if (mode.id === "easy" || mode.id === "normal") startMission(mode.id);
              }}
              className="flex min-h-11 items-center justify-between gap-3 border border-line bg-surface px-4 py-3 text-left disabled:opacity-45"
            >
              <span>
                <span className="font-mono text-xs text-brass">{mode.code}</span>
                <span className="mt-0.5 block text-base font-semibold">{mode.name}</span>
              </span>
              <span className="text-xs text-muted">{mode.note}</span>
            </button>
          ))}
        </section>

        <button
          type="button"
          onClick={() => startMission("easy")}
          className="min-h-11 bg-brass px-4 text-base font-semibold text-bg"
        >
          이지 작전 시작
        </button>
      </main>
    );
  }

  const selected = hud?.selected ?? null;

  return (
    <main className="flex h-dvh flex-col bg-bg text-fg">
      <header id="hud-bar" className="shrink-0 border-b border-line px-3 py-1">
        <div className="flex items-center gap-3 text-sm">
          <p className="font-semibold">전초기지</p>
          <p className="text-xs text-muted">{hud?.sectorName}</p>
          <p className="ml-auto flex items-center gap-3 font-mono">
            <span className="flex items-center gap-1">
              <Coins className="size-4 text-brass" aria-hidden="true" />
              {hud?.gold ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="size-4 text-danger" aria-hidden="true" />
              {hud?.lives ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Gem className="size-4 text-brass" aria-hidden="true" />
              {meta.elif}
            </span>
            <span className="text-muted">{hud ? `${Math.min(hud.wave, hud.waves)}/${hud.waves}` : ""}</span>
          </p>
        </div>
        <div className="mt-1 flex items-center gap-1">
          {([1, 2, 3] as const).map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => {
                engineRef.current?.setSpeed(speed);
                setHud(engineRef.current?.hud() ?? null);
              }}
              className={`min-h-11 min-w-11 border px-2 font-mono text-xs ${
                hud?.speed === speed ? "border-brass text-brass" : "border-line text-muted"
              }`}
            >
              {speed}x
            </button>
          ))}
          <button
            type="button"
            aria-label={hud?.paused ? "재개" : "일시정지"}
            onClick={() => {
              engineRef.current?.togglePause();
              setHud(engineRef.current?.hud() ?? null);
            }}
            className="grid min-h-11 min-w-11 place-items-center border border-line"
          >
            {hud?.paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
          <button
            type="button"
            aria-label={meta.muted ? "소리 켜기" : "소리 끄기"}
            onClick={() => {
              const audio = ensureAudio();
              commit({ ...meta, muted: !meta.muted });
              audio.setMuted(!meta.muted);
            }}
            className="grid min-h-11 min-w-11 place-items-center border border-line"
          >
            {meta.muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
      </header>

      <div className="relative flex w-full shrink-0 justify-center bg-bg">
        <canvas
          ref={canvasRef}
          width={VIEW_W}
          height={VIEW_H}
          aria-label={hud?.sectorName ? `${hud.sectorName} 전장` : "전장"}
          className="block touch-none"
          onPointerDown={(event) => onPointer("down", event)}
          onPointerMove={(event) => onPointer("move", event)}
          onPointerLeave={(event) => onPointer("leave", event)}
          onContextMenu={(event) => event.preventDefault()}
        />
        {hud?.notice && (
          <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 text-sm text-brass">
            {hud.notice}
          </p>
        )}
        {(hud?.phase === "victory" || hud?.phase === "defeat") && (
          <div className="absolute inset-0 grid place-items-center bg-bg/80 p-4">
            <div className="w-full max-w-sm border border-line bg-surface p-5 text-center">
              <h2 className="text-2xl font-semibold">{hud.phase === "victory" ? hud.victory : "거점 함락"}</h2>
              <p className="mt-2 text-sm text-muted">
                {hud.phase === "victory"
                  ? `${hud.waves}웨이브를 버텼습니다. 엘리프는 다음 해금에 남습니다.`
                  : "생명이 떨어졌습니다. 해금 상태는 유지됩니다."}
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <button type="button" onClick={retry} className="inline-flex min-h-11 items-center gap-2 bg-brass px-4 font-semibold text-bg">
                  <RotateCcw className="size-4" aria-hidden="true" />
                  다시
                </button>
                <button type="button" onClick={backToMenu} className="min-h-11 border border-line px-4">
                  메뉴
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <section id="hud-dock" className="shrink-0 border-t border-line bg-bg px-3 py-2">
        <div className="mb-2 flex items-center gap-2">
          <button
            type="button"
            disabled={hud?.phase !== "prep"}
            onClick={() => {
              if (engineRef.current?.startWave()) {
                ensureAudio().ui();
                setHud(engineRef.current.hud());
              }
            }}
            className="inline-flex min-h-11 items-center gap-2 bg-brass px-3 text-sm font-semibold text-bg disabled:opacity-40"
          >
            <FastForward className="size-4" aria-hidden="true" />
            {hud?.phase === "prep" ? `웨이브 ${hud.wave} 시작` : hud?.phase === "combat" ? "진행 중" : "종료"}
          </button>
          <p className="truncate text-xs text-muted">
            {hud?.phase === "prep" ? hud.preview : hud?.phase === "combat" ? "적 접근 중" : ""}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {TOWER_ORDER.map((id) => {
            const Icon = ICONS[id];
            const open = meta.unlocked.includes(id);
            const armed = hud?.placing === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => arm(id)}
                className={`flex min-h-11 flex-col items-start justify-center border px-2 py-1 text-left ${
                  armed ? "border-brass" : "border-line"
                }`}
              >
                <span className="flex items-center gap-1 text-xs font-semibold">
                  <Icon className="size-3.5 text-brass" aria-hidden="true" />
                  {TOWERS[id].name}
                </span>
                <span className="font-mono text-xs text-muted">
                  {open ? (confirmUnlock === id ? "해금 확인" : `${TOWERS[id].placeCost}G`) : `${TOWERS[id].elif}E`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-2 text-sm">
          {selected ? (
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="min-w-36 shrink-0">
                <p className="font-semibold">
                  {selected.kind === "slugger"
                    ? `강타 · +${selected.level}`
                    : `${TOWERS[selected.kind].name} · Lv${selected.level} ${selected.levelName}`}
                </p>
                <p className="text-xs text-muted">
                  {selected.kind === "commander" ||
                  selected.kind === "medic" ||
                  selected.kind === "factory" ||
                  selected.kind === "slugger"
                    ? selected.buffText
                    : `피해 ${selected.damage} · ${selected.interval.toFixed(1)}초 · 사거리 ${selected.range}`}
                  {selected.kind === "sniper" ? " · 비행 감지" : ""}
                  {selected.stun > 0 ? " · 기절" : ""}
                  {selected.spore > 0 ? ` · 포자 ${selected.spore.toFixed(0)}s` : ""}
                </p>
              </div>
              <button
                type="button"
                disabled={selected.upgradeCost == null || (hud?.gold ?? 0) < (selected.upgradeCost ?? 0)}
                onClick={() => {
                  engineRef.current?.upgrade();
                  ensureAudio().ui();
                  setHud(engineRef.current?.hud() ?? null);
                }}
                className="min-h-11 shrink-0 border border-line px-3 text-xs disabled:opacity-40"
              >
                {selected.upgradeCost == null ? "최대" : `강화 ${selected.upgradeCost}G`}
              </button>
              {selected.kind !== "commander" && selected.kind !== "factory" && (
                <button
                  type="button"
                  onClick={() => {
                    engineRef.current?.cycleTarget();
                    setHud(engineRef.current?.hud() ?? null);
                  }}
                  className="min-h-11 shrink-0 border border-line px-3 text-xs"
                >
                  조준 {TARGET_LABEL[selected.target]}
                </button>
              )}
              {selected.canAbility && (
                <button
                  type="button"
                  onClick={() => {
                    engineRef.current?.activate();
                    ensureAudio().ui();
                    setHud(engineRef.current?.hud() ?? null);
                  }}
                  className="min-h-11 shrink-0 border border-brass px-3 text-xs text-brass"
                >
                  {selected.kind === "medic"
                    ? selected.abilityCd > 0
                      ? `대기 ${selected.abilityCd.toFixed(0)}s`
                      : "제독"
                    : selected.ability > 0
                      ? `가속 ${selected.ability.toFixed(0)}s`
                      : selected.abilityCd > 0
                        ? `대기 ${selected.abilityCd.toFixed(0)}s`
                        : "능력 발동"}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (!sellArmed) {
                    setSellArmed(true);
                    return;
                  }
                  engineRef.current?.sell();
                  setSellArmed(false);
                  setHud(engineRef.current?.hud() ?? null);
                }}
                className="inline-flex min-h-11 shrink-0 items-center gap-1 border border-line px-3 text-xs"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                {sellArmed ? "판매 확정" : `판매 ${selected.sell}G`}
              </button>
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-muted">
              타워를 고른 뒤 길 밖의 칸을 누르세요. 강타는 전장에서 골드로 강화하고, 성공 확률은 내려가며 실패하면 초기화될 수 있습니다. 키 1–7, Space, Esc.
            </p>
          )}
        </div>
      </section>
      <div className="min-h-0 flex-1 bg-bg" />
      <p className="sr-only" aria-live="polite">
        {hud ? `골드 ${hud.gold}, 생명 ${hud.lives}, 웨이브 ${hud.wave}, ${hud.phase}` : ""}
      </p>
    </main>
  );
}
