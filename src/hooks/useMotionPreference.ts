import { useEffect, useState, useCallback } from "react";

const KEY = "rajyog:motion-pref"; // "reduce" | "full" | null (=> follow OS)

export type MotionPref = "reduce" | "full" | null;

function readPref(): MotionPref {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "reduce" || v === "full" ? v : null;
}

function osPrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Resolves the effective reduced-motion state, honoring (in order):
 * 1. the user's manual choice stored in localStorage
 * 2. the OS-level prefers-reduced-motion media query
 *
 * Returns helpers to read, set, and clear the manual override.
 */
export function useMotionPreference() {
  const [pref, setPref] = useState<MotionPref>(null);
  const [osReduced, setOsReduced] = useState(false);

  useEffect(() => {
    setPref(readPref());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOsReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setOsReduced(e.matches);
    mq.addEventListener("change", onChange);

    // Sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPref(readPref());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setManual = useCallback((next: MotionPref) => {
    if (next === null) window.localStorage.removeItem(KEY);
    else window.localStorage.setItem(KEY, next);
    setPref(next);
  }, []);

  const reduced = pref === "reduce" || (pref === null && osReduced);

  return { reduced, pref, osReduced, setManual };
}
