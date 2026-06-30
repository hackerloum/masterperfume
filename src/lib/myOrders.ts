/**
 * Remembers the orders a customer placed on *this device* (no account needed).
 * Stored in localStorage so the Track Order page can list them automatically.
 */
const KEY = "mp_my_orders";

export interface SavedOrder {
  code: string;
  productName: string;
  createdAt: number;
}

export function getSavedOrders(): SavedOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as SavedOrder[]) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getSavedOrders().filter((o) => o.code !== order.code);
    const next = [order, ...existing].slice(0, 20); // keep the 20 most recent
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}
