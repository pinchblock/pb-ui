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
import { IconContext } from "@phosphor-icons/react"
import { Suspense, useEffect, useState } from "react"
import {
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router"

import { findGroup, findPage, GROUPS } from "./pages/registry.ts"
import { ControlBar, ICON_WEIGHTS, type SinkIconWeight } from "./sink/control-bar.tsx"
import { ErrorBoundary } from "./sink/error-boundary.tsx"
import { SidebarNav } from "./sink/nav.tsx"

/** URL params (?theme=ember&mode=dark&radius=16&density=0.9&font=1.15
 * &icons=bold) override persisted state on any page: the per-component
 * URLs plus these params are the visual-regression surface. */
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

function readInitialIconWeight(): SinkIconWeight {
  const fromUrl = params.get("icons")
  if (fromUrl && (ICON_WEIGHTS as readonly string[]).includes(fromUrl)) {
    return fromUrl as SinkIconWeight
  }
  return "regular"
}

/** `min` is per-knob: radius legitimately goes to 0, font/density never do. */
function readNumberParam(name: string, fallback: number, min: number): number {
  const raw = params.get(name)
  if (raw === null || raw.trim() === "") return fallback
  const v = Number(raw)
  return Number.isFinite(v) && v >= min ? v : fallback
}

function Layout() {
  const [theme, setTheme] = useState(readInitialTheme)
  const [mode, setMode] = useState<ModeSetting>(readInitialMode)
  const [radius, setRadiusState] = useState(() => readNumberParam("radius", 10, 0))
  const [fontScale, setFontScaleState] = useState(() => readNumberParam("font", 1, 0.5))
  const [density, setDensityState] = useState(() => readNumberParam("density", 1, 0.5))
  const [iconWeight, setIconWeight] = useState<SinkIconWeight>(readInitialIconWeight)
  const location = useLocation()

  useEffect(() => applyTheme(theme), [theme])
  useEffect(() => applyMode(mode), [mode])
  useEffect(() => setRadius(radius), [radius])
  useEffect(() => setFontScale(fontScale), [fontScale])
  useEffect(() => setDensity(density), [density])

  return (
    <IconContext.Provider value={{ weight: iconWeight }}>
      <div className="flex min-h-screen bg-background text-foreground">
        <SidebarNav />

        <div className="min-w-0 flex-1">
          <ControlBar
            theme={theme}
            onThemeChange={setTheme}
            mode={mode}
            onModeChange={setMode}
            radius={radius}
            onRadiusChange={setRadiusState}
            fontScale={fontScale}
            onFontScaleChange={setFontScaleState}
            density={density}
            onDensityChange={setDensityState}
            iconWeight={iconWeight}
            onIconWeightChange={setIconWeight}
          />

          <main className="mx-auto max-w-5xl px-6 py-10">
            {/* key: a chunk error on one page must not poison the next. */}
            <ErrorBoundary key={location.pathname}>
              <Suspense
                fallback={
                  <div className="space-y-4">
                    <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
                    <div className="h-40 animate-pulse rounded-xl bg-muted" />
                  </div>
                }
              >
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </IconContext.Provider>
  )
}

function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Pinchblock UI kitchen sink</h1>
      <p className="mt-1 max-w-prose text-sm text-muted-foreground">
        Every component on its own page, live under every theme, mode and knob in the top
        bar. Use the URL params (?theme=&amp;mode=&amp;radius=&amp;density=&amp;font=&amp;icons=)
        to link an exact configuration.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GROUPS.filter((g) => g.pages.length > 0).map((g) => (
          <Link
            key={g.slug}
            to={`/c/${g.slug}`}
            className="rounded-xl border border-border bg-card p-4 transition-colors duration-(--duration-fast) hover:border-primary-border"
          >
            <p className="font-medium text-card-foreground">{g.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {g.pages.length} component{g.pages.length === 1 ? "" : "s"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function GroupOverview() {
  const { group: slug } = useParams()
  const group = findGroup(slug)
  if (!group) return <Navigate to="/" replace />
  return (
    <div>
      <h1 className="text-2xl font-semibold">{group.label}</h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {group.pages.map((p) => (
          <Link
            key={p.id}
            to={`/c/${group.slug}/${p.id}`}
            className="rounded-xl border border-border bg-card p-4 transition-colors duration-(--duration-fast) hover:border-primary-border"
          >
            <p className="font-medium text-card-foreground">{p.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function PageRoute() {
  const { group, page } = useParams()
  const match = findPage(group, page)
  if (!match) return <Navigate to="/" replace />
  const { Component } = match
  return <Component />
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="c/:group" element={<GroupOverview />} />
        <Route path="c/:group/:page" element={<PageRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
