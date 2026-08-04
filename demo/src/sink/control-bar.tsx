import { cn, themes, type ModeSetting } from "@pinchblock/ui"
import { CircleHalf, Moon, Sun } from "@phosphor-icons/react"

import { MobileNav } from "./nav.tsx"

export const ICON_WEIGHTS = ["thin", "light", "regular", "bold", "duotone"] as const

export type SinkIconWeight = (typeof ICON_WEIGHTS)[number]

const FONT_SCALES: { label: string; name: string; value: number }[] = [
  { label: "S", name: "Text size small", value: 0.9 },
  { label: "M", name: "Text size medium", value: 1 },
  { label: "L", name: "Text size large", value: 1.15 },
]

const MODES: [ModeSetting, typeof Sun][] = [
  ["light", Sun],
  ["system", CircleHalf],
  ["dark", Moon],
]

/** Toggle-group button inside a bordered pill row. */
function knobButtonClass(active: boolean, extra?: string) {
  return cn(
    "rounded-md text-xs font-medium transition-colors duration-(--duration-fast)",
    active ? "bg-primary-soft text-primary" : "text-muted-foreground hover:bg-muted",
    extra,
  )
}

export interface ControlBarProps {
  theme: string
  onThemeChange: (theme: string) => void
  mode: ModeSetting
  onModeChange: (mode: ModeSetting) => void
  radius: number
  onRadiusChange: (radius: number) => void
  fontScale: number
  onFontScaleChange: (scale: number) => void
  density: number
  onDensityChange: (density: number) => void
  iconWeight: SinkIconWeight
  onIconWeightChange: (weight: SinkIconWeight) => void
}

/** Control bar: the whole point of the system. Every knob is live. */
export function ControlBar(p: ControlBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <MobileNav />

        {/* Theme picker with live swatches per theme. Wider than a phone:
            scrolls within itself, never the page. */}
        <label className="flex min-w-0 max-w-full items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Theme</span>
          <div className="flex min-w-0 gap-1 overflow-x-auto rounded-lg border border-border p-1 scrollbar-none">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                title={t.description}
                aria-pressed={p.theme === t.id}
                onClick={() => p.onThemeChange(t.id)}
                className={knobButtonClass(
                  p.theme === t.id,
                  "flex shrink-0 items-center gap-1.5 px-2.5 py-1.5",
                )}
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
          {MODES.map(([m, Icon]) => (
            <button
              key={m}
              type="button"
              title={m}
              aria-label={`${m} mode`}
              aria-pressed={p.mode === m}
              onClick={() => p.onModeChange(m)}
              className={knobButtonClass(p.mode === m, "p-1.5")}
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
            value={p.radius}
            onChange={(e) => p.onRadiusChange(Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="w-9 font-mono text-xs text-faint-foreground">{p.radius}px</span>
        </label>

        {/* Font scale */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Text</span>
          <div className="flex gap-1 rounded-lg border border-border p-1">
            {FONT_SCALES.map((f) => (
              <button
                key={f.label}
                type="button"
                aria-label={f.name}
                aria-pressed={p.fontScale === f.value}
                onClick={() => p.onFontScaleChange(f.value)}
                className={knobButtonClass(p.fontScale === f.value, "px-2 py-1")}
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
            value={p.density}
            onChange={(e) => p.onDensityChange(Number(e.target.value))}
            className="w-24 accent-primary"
          />
          <span className="w-10 font-mono text-xs text-faint-foreground">
            {p.density.toFixed(2)}x
          </span>
        </label>

        {/* Icon weight (global via IconContext) */}
        <div className="flex min-w-0 max-w-full items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Icons</span>
          <div className="flex min-w-0 gap-1 overflow-x-auto rounded-lg border border-border p-1 scrollbar-none">
            {ICON_WEIGHTS.map((w) => (
              <button
                key={w}
                type="button"
                aria-pressed={p.iconWeight === w}
                onClick={() => p.onIconWeightChange(w)}
                className={knobButtonClass(p.iconWeight === w, "shrink-0 px-2 py-1")}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
