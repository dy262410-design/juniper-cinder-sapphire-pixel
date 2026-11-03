import { TOWER_ORDER, type TowerId } from "./data";

const KEY = "outpost-meta-v1";

export type Meta = {
  v: 1;
  elif: number;
  unlocked: TowerId[];
  muted: boolean;
};

export function defaultMeta(): Meta {
  return { v: 1, elif: 0, unlocked: ["soldier"], muted: false };
}

export function loadMeta(): Meta {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultMeta();
    const parsed = JSON.parse(raw) as Partial<Meta>;
    const unlocked = TOWER_ORDER.filter(
      (id) => id === "soldier" || (Array.isArray(parsed.unlocked) && parsed.unlocked.includes(id)),
    );
    return {
      v: 1,
      elif: typeof parsed.elif === "number" && parsed.elif >= 0 ? Math.floor(parsed.elif) : 0,
      unlocked,
      muted: Boolean(parsed.muted),
    };
  } catch {
    return defaultMeta();
  }
}

export function saveMeta(meta: Meta): void {
  localStorage.setItem(KEY, JSON.stringify(meta));
}
