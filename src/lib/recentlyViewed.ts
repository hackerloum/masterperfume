/** Tracks recently viewed product ids on this device (localStorage). */
const KEY = "mp_recently_viewed";

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const next = [id, ...getRecentlyViewed().filter((x) => x !== id)].slice(0, 20);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}
