import {
  applyMode,
  applyTheme,
  MODE_STORAGE_KEY,
  setDensity,
  setFontScale,
  setRadius,
  THEME_STORAGE_KEY,
  themes,
  type ModeSetting,
} from "@pinchblock/ui"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useEffect, useState } from "react"

import { GROUPS } from "./sections/registry.ts"

const FONT_SCALES: { label: string; value: number }[] = [
  { label: "S", value: 0.9 },
  { label: "M", value: 1 },
  { label: "L", value: 1.15 },
]

/** URL params (?theme=ember&mode=dark&radius=16&density=0.9&font=1.15)
 * override persisted state: handy for screenshots and visual regression. */
const params = new URLSearchParams(window.location.search)

function readInitialTheme(): string {
  const fromUrl = params.get("theme")
  if (fromUrl && themes.some((t) => t.id === fromUrl)) return fromUrl
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) ?? "ocean"
  } catch {
    return "ocean"
  }
}

function readInitialMode(): ModeSetting {
  const fromUrl = params.get("mode")
  if (fromUrl === "light" || fromUrl === "dark" || fromUrl === "system") return fromUrl
  try {
    return (localStorage.getItem(MODE_STORAGE_KEY) as ModeSetting) ?? "system"
  } catch {
    return "system"
  }
}

/** `min` is per-knob: radius legitimately goes to 0, font/density never do. */
function readNumberParam(name: string, fallback: number, min: number): number {
  const raw = params.get(name)
  if (raw === null || raw.trim() === "") return fallback
  const v = Number(raw)
  return Number.isFinite(v) && v >= min ? v : fallback
}

export function App() {
  const [theme, setTheme] = useState(readInitialTheme)
  const [mode, setMode] = useState<ModeSetting>(readInitialMode)
  const [radius, setRadiusState] = useState(() => readNumberParam("radius", 10, 0))
  const [fontScale, setFontScaleState] = useState(() => readNumberParam("font", 1, 0.5))
  const [density, setDensityState] = useState(() => readNumberParam("density", 1, 0.5))
  const [active, setActive] = useState("")

  useEffect(() => applyTheme(theme), [theme])
  useEffect(() => applyMode(mode), [mode])
  useEffect(() => setRadius(radius), [radius])
  useEffect(() => setFontScale(fontScale), [fontScale])
  useEffect(() => setDensity(density), [density])

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar nav, generated from the registry */}
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 overflow-y-auto border-r border-border bg-background-sunken px-4 py-6 md:block">
        <p className="mb-1 text-sm font-semibold">Pinchblock UI</p>
        <p className="mb-6 text-xs text-muted-foreground">Kitchen sink</p>
        <nav className="space-y-5">
          {GROUPS.filter((g) => g.sections.length > 0).map((group) => (
            <div key={group.label}>
              <p className="eyebrow mb-1.5">{group.label}</p>
              <ul>
                {group.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={() => setActive(s.id)}
                      className={`block rounded-md px-2 py-1 text-sm transition-colors duration-(--duration-fast) ${
                        active === s.id
                          ? "bg-primary-soft text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Control bar: the whole point of the system. Every knob is live. */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* Theme picker with live swatches per theme */}
            <label className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Theme</span>
              <div className="flex gap-1 rounded-lg border border-border p-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    title={t.description}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-(--duration-fast) ${
                      theme === t.id
                        ? "bg-primary-soft text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <span className={`theme-${t.id} flex gap-0.5`}>
                      <i className="size-2.5 rounded-full bg-primary" />
                      <i className="size-2.5 rounded-full bg-success" />
                      <i className="size-2.5 rounded-full bg-warning" />
                    </span>
                    {t.label}
                  </button>
                ))}
              </div>
            </label>

            {/* Mode */}
            <div className="flex gap-1 rounded-lg border border-border p-1">
              {(
                [
                  ["light", Sun],
                  ["system", SunMoon],
                  ["dark", Moon],
                ] as const
              ).map(([m, Icon]) => (
                <button
                  key={m}
                  type="button"
                  title={m}
                  onClick={() => setMode(m)}
                  className={`rounded-md p-1.5 transition-colors duration-(--duration-fast) ${
                    mode === m ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>

            {/* Radius knob */}
            <label className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Radius</span>
              <input
                type="range"
                min={0}
                max={24}
                step={1}
                value={radius}
                onChange={(e) => setRadiusState(Number(e.target.value))}
                className="w-24 accent-primary"
              />
              <span className="w-9 font-mono text-xs text-faint-foreground">{radius}px</span>
            </label>

            {/* Font scale */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Text</span>
              <div className="flex gap-1 rounded-lg border border-border p-1">
                {FONT_SCALES.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setFontScaleState(f.value)}
                    className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-(--duration-fast) ${
                      fontScale === f.value
                        ? "bg-primary-soft text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Density knob */}
            <label className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Density</span>
              <input
                type="range"
                min={0.85}
                max={1.15}
                step={0.05}
                value={density}
                onChange={(e) => setDensityState(Number(e.target.value))}
                className="w-24 accent-primary"
              />
              <span className="w-10 font-mono text-xs text-faint-foreground">
                {density.toFixed(2)}x
              </span>
            </label>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-10">
          {GROUPS.filter((g) => g.sections.length > 0).map((group) => (
            <section key={group.label} className="mb-14">
              <h2 className="mb-6 border-b border-border pb-2 text-lg font-semibold">
                {group.label}
              </h2>
              {group.sections.map((s) => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  {s.render()}
                </div>
              ))}
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
