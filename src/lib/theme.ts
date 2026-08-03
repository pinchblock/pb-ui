/**
 * Runtime theme control. All of it is class/attribute/variable work on
 * <html>; there is no React context and nothing re-renders on change.
 */

export const THEME_STORAGE_KEY = "pb-ui.theme"
export const MODE_STORAGE_KEY = "pb-ui.mode"

export type ModeSetting = "light" | "dark" | "system"

const root = () => document.documentElement

/** Apply a color theme by id ("ocean" clears to the default). */
export function applyTheme(themeId: string) {
  const el = root()
  for (const c of Array.from(el.classList)) {
    if (c.startsWith("theme-")) el.classList.remove(c)
  }
  if (themeId && themeId !== "ocean") el.classList.add(`theme-${themeId}`)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId)
  } catch {
    /* private mode */
  }
}

/** Apply light/dark/system. "system" tracks the OS preference. */
export function applyMode(mode: ModeSetting) {
  const dark =
    mode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : mode === "dark"
  root().classList.toggle("dark", dark)
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode)
  } catch {
    /* private mode */
  }
}

/** The global knobs. Pass null to reset to the token default. */
export function setRadius(px: number | null) {
  setKnob("--radius", px === null ? null : `${px}px`)
}

export function setFontScale(scale: number | null) {
  setKnob("--font-scale", scale === null ? null : String(scale))
}

export function setDensity(density: number | null) {
  setKnob("--density", density === null ? null : String(density))
}

function setKnob(name: string, value: string | null) {
  if (value === null) root().style.removeProperty(name)
  else root().style.setProperty(name, value)
}
