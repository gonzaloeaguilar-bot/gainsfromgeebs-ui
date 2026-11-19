"use client";

/**
 * The reader's pack collection, kept in localStorage and read through
 * useSyncExternalStore so the server render and the first client render agree
 * (both see the empty collection) and every later write repaints immediately.
 */

const STORAGE_KEY = "geebs.article-packs.v1";

export interface PackCollection {
  opened: string[];
  read: string[];
}

const EMPTY: PackCollection = { opened: [], read: [] };

let cachedRaw: string | null = null;
let cachedValue: PackCollection = EMPTY;

const listeners = new Set<() => void>();

export function subscribeToCollection(listener: () => void) {
  listeners.add(listener);
  /* Another tab opening a pack should show up here too. */
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getCollectionSnapshot(): PackCollection {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    /* Private mode or blocked storage: the packs still open, they just forget. */
    return EMPTY;
  }

  /* useSyncExternalStore compares snapshots by identity, so the parsed object
     has to be cached against the raw string or React loops forever. */
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;

  if (!raw) {
    cachedValue = EMPTY;
    return cachedValue;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<PackCollection>;
    cachedValue = {
      opened: Array.isArray(parsed.opened) ? parsed.opened : [],
      read: Array.isArray(parsed.read) ? parsed.read : [],
    };
  } catch {
    cachedValue = EMPTY;
  }
  return cachedValue;
}

export function getCollectionServerSnapshot(): PackCollection {
  return EMPTY;
}

export function saveCollection(next: PackCollection) {
  cachedValue = next;
  try {
    cachedRaw = JSON.stringify(next);
    window.localStorage.setItem(STORAGE_KEY, cachedRaw);
  } catch {
    /* Keep the in-memory collection so the session still feels continuous. */
    cachedRaw = null;
  }
  for (const listener of listeners) listener();
}
