import { themes } from "@pinchblock/ui"
import { CodeBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/** One theme card: light on top, dark below, same specimen row. */
function ThemeCard({ id, label }: { id: string; label: string }) {
  return (
    <div className={`theme-${id} rounded-lg border border-border`}>
      {(["light", "dark"] as const).map((mode) => (
        <div
          key={mode}
          className={`${mode === "dark" ? "dark rounded-b-lg" : "rounded-t-lg"} bg-background p-4`}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {label} {mode}
            </span>
            <span className="flex gap-1">
              <i className="size-4 rounded-full bg-primary" />
              <i className="size-4 rounded-full bg-success" />
              <i className="size-4 rounded-full bg-warning" />
              <i className="size-4 rounded-full bg-destructive" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              Primary
            </span>
            <span className="rounded-md border border-border bg-card px-3 py-1.5 text-xs text-card-foreground">
              Card
            </span>
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs text-primary">
              Soft chip
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ThemesPage() {
  return (
    <div>
      <PageIntro
        title="Themes"
        description="Every theme, both modes, side by side. Themes are pure CSS class blocks compiled from src/tokens; each provides every token or it does not ship, so nothing on this matrix can render unstyled."
        use="The app sets one theme class on the root and toggles .dark for mode. Wrapping any subtree in .theme-x re-themes just that subtree, which is exactly how this matrix works: no JS, no re-render."
      />

      <Showcase
        title="Theme matrix"
        hint="Status dots stay red/green/amber in every theme by design; only brand and surface colors move."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {themes.map((t) => (
            <ThemeCard key={t.id} id={t.id} label={t.label} />
          ))}
        </div>
      </Showcase>

      <CodeBlock
        code={`
<!-- App-wide: theme class on the root, .dark toggles mode -->
<html class="theme-ocean dark">

<!-- Re-theme a subtree (theme picker previews, embedded marketing) -->
<div class="theme-ember">...</div>

// Theme metadata for pickers:
import { themes, defaultTheme } from "@pinchblock/ui"
themes.map((t) => ({ id: t.id, label: t.label }))
`}
      />
    </div>
  )
}
