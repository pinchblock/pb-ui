import {
  ArrowRight,
  Barbell,
  Bell,
  CalendarDots,
  Compass,
  Flame,
  House,
  MagnifyingGlass,
  Newspaper,
  Play,
  Plus,
  Sparkle,
  Timer,
  Trophy,
  UserCircle,
} from "@phosphor-icons/react"

import { AppShell } from "../../../src/components/app-shell.tsx"
import {
  NavRail,
  type NavItem,
  type NavRailSection,
} from "../../../src/components/nav-rail.tsx"
import { Page } from "../../../src/components/page.tsx"
import { PhoneFrame } from "../../../src/components/phone-frame.tsx"
import { Grow, Row } from "../../../src/components/row.tsx"
import { Stack } from "../../../src/components/stack.tsx"
import { TopBar } from "../../../src/components/top-bar.tsx"
import { Button } from "../../../src/components/ui/button.tsx"
import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

/* ------------------------------------------------------------------ */
/* Fake nav data (fitness flavored, href-only: the sink has no router) */
/* ------------------------------------------------------------------ */

const NAV: NavItem[] = [
  { icon: House, label: "Home", href: "#layout-app-shell", active: true },
  { icon: Compass, label: "Explore", href: "#layout-app-shell" },
  { icon: CalendarDots, label: "Plan", href: "#layout-app-shell", badge: 2 },
  { icon: Newspaper, label: "Feed", href: "#layout-app-shell", badge: 5 },
  { icon: UserCircle, label: "Profile", href: "#layout-app-shell" },
]

/* Phone tab bar: 4 items + center FAB = the classic 5-slot bar. */
const TAB_ITEMS: NavItem[] = [
  NAV[0]!,
  NAV[1]!,
  NAV[3]!,
  NAV[4]!,
]

const RAIL_SECTIONS: NavRailSection[] = [
  { label: "Train", items: [NAV[0]!, NAV[1]!, NAV[2]!] },
  { label: "Community", items: [NAV[3]!, NAV[4]!] },
]

function RailLogo({ expanded }: { expanded?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Barbell aria-hidden className="size-4" />
      </span>
      {expanded ? <span className="truncate text-sm font-semibold">Pinchblock</span> : null}
    </span>
  )
}

function RailAvatar({ expanded }: { expanded?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
        AO
      </span>
      {expanded ? (
        <span className="min-w-0 text-xs">
          <span className="block truncate font-medium text-foreground">Ade Okafor</span>
          <span className="block truncate text-muted-foreground">Pro athlete</span>
        </span>
      ) : null}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Stack & Row                                                         */
/* ------------------------------------------------------------------ */

function GapTile() {
  return <div className="grid h-8 w-16 place-items-center rounded-md bg-primary-soft" />
}

function StackRowDemo() {
  const gaps = [1, 2, 3, 4, 6, 8] as const
  const aligns = ["start", "center", "end"] as const
  return (
    <Stack gap={6}>
      <div>
        <p className="eyebrow mb-2">Stack gap scale (literal gap-1..gap-8 map)</p>
        <VariantRow>
          {gaps.map((gap) => (
            <div key={gap} className="rounded-lg border border-border p-3">
              <p className="mb-2 font-mono text-xs text-muted-foreground">gap={gap}</p>
              <Stack gap={gap}>
                <GapTile />
                <GapTile />
                <GapTile />
              </Stack>
            </div>
          ))}
        </VariantRow>
      </div>
      <div>
        <p className="eyebrow mb-2">Row align</p>
        <VariantRow>
          {aligns.map((align) => (
            <div key={align} className="rounded-lg border border-border p-3">
              <p className="mb-2 font-mono text-xs text-muted-foreground">align={align}</p>
              <Row gap={2} align={align} className="h-16 rounded-md bg-background-sunken px-2">
                <div className="h-4 w-8 rounded-sm bg-chart-1" />
                <div className="h-8 w-8 rounded-sm bg-chart-2" />
                <div className="h-12 w-8 rounded-sm bg-chart-4" />
              </Row>
            </div>
          ))}
        </VariantRow>
      </div>
      <div>
        <p className="eyebrow mb-2">Row + Grow spacer (real-world session row)</p>
        <Stack gap={2}>
          <Row gap={3} className="rounded-lg border border-border bg-background-raised p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
              <Barbell aria-hidden className="size-5" />
            </span>
            <Stack gap={1}>
              <span className="text-sm font-medium">Pull day · Week 6</span>
              <span className="text-xs text-muted-foreground">6 exercises · 45 min</span>
            </Stack>
            <Grow />
            <Button size="sm" variant="soft">
              Start
            </Button>
          </Row>
          <Row gap={3} className="rounded-lg border border-border bg-background-raised p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-warning-soft text-warning">
              <Flame aria-hidden className="size-5" />
            </span>
            <Stack gap={1}>
              <span className="text-sm font-medium">21-day streak</span>
              <span className="text-xs text-muted-foreground">Longest yet. Keep it alive tonight.</span>
            </Stack>
            <Grow />
            <Button size="sm" variant="ghost">
              Details
            </Button>
          </Row>
        </Stack>
      </div>
    </Stack>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function PageDemo() {
  const sizes = ["sm", "md", "lg", "xl", "full"] as const
  return (
    <Stack gap={2}>
      {sizes.map((size) => (
        <div key={size} className="rounded-md bg-background-sunken py-2">
          <Page
            size={size}
            className="rounded-sm border border-dashed border-border-strong bg-card py-2 text-center font-mono text-xs text-muted-foreground"
          >
            size="{size}"
          </Page>
        </div>
      ))}
      <p className="mt-2 text-xs text-muted-foreground">
        Page centers content with responsive px (px-4 / sm:px-6 / lg:px-8). Drop a
        PageHeader from the content group in as the first child; Page leaves that slot
        to children so the layout and content groups stay decoupled.
      </p>
    </Stack>
  )
}

/* ------------------------------------------------------------------ */
/* AppShell playground                                                 */
/* ------------------------------------------------------------------ */

function PhoneHome() {
  const week = [
    { day: "Mon", name: "Push day", done: true },
    { day: "Tue", name: "Pull day", done: false },
    { day: "Thu", name: "Legs + core", done: false },
  ]
  return (
    <Stack gap={4} className="p-4">
      <Stack gap={1}>
        <span className="text-xs text-muted-foreground">Tuesday, Aug 4</span>
        <span className="text-lg font-semibold">Morning, Ade</span>
      </Stack>
      <div className="rounded-xl bg-primary p-4 text-primary-foreground shadow-card">
        <Row gap={3}>
          <Stack gap={1}>
            <span className="text-xs text-primary-foreground/80">Up next</span>
            <span className="text-sm font-semibold">Pull day · Week 6</span>
            <span className="text-xs text-primary-foreground/80">6 exercises · 45 min</span>
          </Stack>
          <Grow />
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/20">
            <Play aria-hidden className="size-4" />
          </span>
        </Row>
      </div>
      <Row gap={2} wrap>
        <span className="flex items-center gap-1.5 rounded-full bg-warning-soft px-3 py-1.5 text-xs font-medium text-warning">
          <Flame aria-hidden className="size-3.5" />
          21-day streak
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-xs font-medium text-success">
          <Trophy aria-hidden className="size-3.5" />3 PRs
        </span>
      </Row>
      <Stack gap={2}>
        <span className="eyebrow">This week</span>
        {week.map((session) => (
          <Row key={session.day} gap={3} className="rounded-lg border border-border p-2.5">
            <span className="w-8 shrink-0 text-xs font-medium text-muted-foreground">
              {session.day}
            </span>
            <span className="truncate text-sm">{session.name}</span>
            <Grow />
            {session.done ? (
              <span className="text-xs font-medium text-success">Done</span>
            ) : (
              <Timer aria-hidden className="size-4 text-faint-foreground" />
            )}
          </Row>
        ))}
      </Stack>
    </Stack>
  )
}

function PhoneShellDemo() {
  return (
    <PhoneFrame>
      <AppShell
        contained
        layout="mobile"
        items={NAV}
        tabItems={TAB_ITEMS}
        fab={{ icon: Plus, label: "Log session" }}
        topBar={
          <TopBar className="h-16 pt-5">
            <span className="text-sm font-semibold">Home</span>
            <Grow />
            <button
              type="button"
              aria-label="Notifications"
              className="relative grid size-8 place-items-center rounded-full text-muted-foreground transition-colors duration-(--duration-fast) ease-(--ease-out) hover:bg-muted hover:text-foreground"
            >
              <Bell aria-hidden className="size-4" />
              <span aria-hidden className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive" />
            </button>
          </TopBar>
        }
      >
        <PhoneHome />
      </AppShell>
    </PhoneFrame>
  )
}

function DesktopShellDemo() {
  const stats = [
    { label: "Sessions this week", value: "4 / 5", note: "+1 vs last week" },
    { label: "Streak", value: "21 days", note: "Personal best" },
    { label: "Next up", value: "Pull day", note: "Today · 45 min" },
  ]
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background-sunken">
      {/* scale-90 miniature so the shell does not hijack the sink layout */}
      <div className="h-112 origin-top scale-90">
        <AppShell
          contained
          layout="desktop"
          railExpanded
          items={NAV}
          railSections={RAIL_SECTIONS}
          railHeader={<RailLogo expanded />}
          railFooter={<RailAvatar expanded />}
          topBar={
            <TopBar>
              <div className="flex h-8 w-56 items-center gap-2 rounded-md border border-input bg-input-background px-2.5 text-xs text-faint-foreground">
                <MagnifyingGlass aria-hidden className="size-3.5" />
                Search plans, coaches…
              </div>
              <Grow />
              <Button variant="ghost" size="icon-sm" aria-label="Notifications">
                <Bell aria-hidden />
              </Button>
              <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                AO
              </span>
            </TopBar>
          }
        >
          <Page size="md" className="py-6">
            <Stack gap={5}>
              <Row gap={3}>
                <Stack gap={1}>
                  <span className="text-lg font-semibold">Good morning, Ade</span>
                  <span className="text-xs text-muted-foreground">
                    Week 6 of Hypertrophy Block A
                  </span>
                </Stack>
                <Grow />
                <Button size="sm">
                  <Plus aria-hidden />
                  Log session
                </Button>
              </Row>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs text-success">{stat.note}</p>
                  </div>
                ))}
              </div>
            </Stack>
          </Page>
        </AppShell>
      </div>
    </div>
  )
}

function NavRailStatesDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {([false, true] as const).map((expanded) => (
        <div key={String(expanded)}>
          <p className="mb-2 font-mono text-xs text-muted-foreground">
            expanded={String(expanded)}
          </p>
          <div className="h-96 w-fit overflow-hidden rounded-xl border border-border">
            <NavRail
              expanded={expanded}
              sections={RAIL_SECTIONS}
              header={<RailLogo expanded={expanded} />}
              footer={<RailAvatar expanded={expanded} />}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Glass & marketing kit                                               */
/* ------------------------------------------------------------------ */

function GlassDemo() {
  const exercises = [
    { name: "Deadlift", sets: "5 x 5 · 175 kg" },
    { name: "Weighted pull-up", sets: "4 x 8 · +20 kg" },
    { name: "Barbell row", sets: "4 x 10 · 90 kg" },
  ]
  return (
    <div className="pb-backdrop relative overflow-hidden rounded-xl border border-border bg-background-sunken">
      <div className="glass-header flex h-12 items-center gap-3 px-4">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span className="grid size-6 place-items-center rounded-md bg-primary text-primary-foreground">
            <Barbell aria-hidden className="size-3.5" />
          </span>
          Pinchblock
        </span>
        <Grow />
        <a href="#layout-glass" className="glass-chip px-3 py-1 text-xs font-medium">
          Get the app
        </a>
      </div>
      <div className="px-6 py-10 sm:px-10">
        <Stack gap={6} align="start">
          <Stack gap={3} align="start">
            <span className="eyebrow">The Pinchblock method</span>
            <h2 className="max-w-lg text-display-sm font-display">
              <span className="text-gradient-primary">Coaching that travels</span> with you
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Programs written by real coaches, adjusted to your week. Log a session in
              under a minute and watch the streak grow.
            </p>
          </Stack>
          <Row gap={2} wrap>
            <span className="glass-chip flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium">
              <Flame aria-hidden className="size-3.5 text-warning" />
              21-day streak
            </span>
            <span className="glass-chip flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium">
              <Trophy aria-hidden className="size-3.5 text-success" />3 PRs this month
            </span>
            <span className="ai-surface flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
              <Sparkle aria-hidden className="size-3.5" />
              AI session insights
            </span>
          </Row>
          <div className="grid w-full gap-4 sm:grid-cols-2">
            <div className="glass-card p-5">
              <Stack gap={3} align="start">
                <Row gap={2} className="w-full">
                  <span className="text-sm font-semibold">Tuesday · Pull day</span>
                  <Grow />
                  <span className="text-xs text-muted-foreground">45 min</span>
                </Row>
                <Stack gap={2} className="w-full">
                  {exercises.map((exercise) => (
                    <Row key={exercise.name} gap={2} className="text-xs">
                      <span className="font-medium">{exercise.name}</span>
                      <Grow />
                      <span className="text-muted-foreground">{exercise.sets}</span>
                    </Row>
                  ))}
                </Stack>
                <Button size="sm">
                  Start session
                  <ArrowRight aria-hidden />
                </Button>
              </Stack>
            </div>
            <div className="glass-panel p-5">
              <Stack gap={3} align="start">
                <span className="text-sm font-semibold">Bring your coach along</span>
                <p className="text-xs text-muted-foreground">
                  Share your log with a coach, get the next block delivered every Sunday,
                  and celebrate PRs together.
                </p>
                <Row gap={2} wrap>
                  <Button size="sm" pill>
                    Start 14-day trial
                  </Button>
                  <Button size="sm" pill variant="ghost">
                    See pricing
                  </Button>
                </Row>
              </Stack>
            </div>
          </div>
        </Stack>
      </div>
      <div className="glass-footer flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-muted-foreground">
        <span>Pinchblock · Train with people who care</span>
        <span>iOS · Android · Web</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export const sections: SinkSection[] = [
  {
    id: "layout-stack-row",
    label: "Stack & Row",
    render: () => (
      <Showcase
        title="Stack, Row, Grow"
        hint="The flex primitives. Gap accepts 1-8 (literal class map), align/justify are constrained props, Grow is the spacer."
      >
        <StackRowDemo />
      </Showcase>
    ),
  },
  {
    id: "layout-page",
    label: "Page",
    render: () => (
      <Showcase
        title="Page container widths"
        hint="sm max-w-xl · md max-w-3xl · lg max-w-5xl (default) · xl max-w-7xl · full. Resize the window to see the responsive padding."
      >
        <PageDemo />
      </Showcase>
    ),
  },
  {
    id: "layout-app-shell",
    label: "App shell",
    render: () => (
      <>
        <Showcase
          title="Mobile shell in a PhoneFrame"
          hint='AppShell contained + layout="mobile": TopBar, scrollable content, MobileTabBar with 4 tabs and the raised "Log session" FAB, pinned to the frame instead of the viewport.'
        >
          <div className="flex justify-center">
            <PhoneShellDemo />
          </div>
        </Showcase>
        <Showcase
          title="Desktop shell miniature"
          hint='AppShell contained + layout="desktop" inside a scale-90 box: expanded NavRail with sections and badges, translucent TopBar, width-capped Page content.'
        >
          <DesktopShellDemo />
        </Showcase>
        <Showcase
          title="NavRail: icon rail vs expanded"
          hint="64px icon rail (labels move to aria-label/title, badges collapse to dots) vs 240px labeled rail. Active item: bg-primary-soft + text-primary."
        >
          <NavRailStatesDemo />
        </Showcase>
      </>
    ),
  },
  {
    id: "layout-glass",
    label: "Glass & marketing",
    render: () => (
      <Showcase
        title="Glass kit over a pb-backdrop hero"
        hint="glass-header, glass-card, glass-panel, glass-chip, glass-footer + gradient headline and eyebrow. Marketing surfaces only; light themes collapse glass to solid via --glass-filter: none. Toggle dark mode above."
      >
        <GlassDemo />
      </Showcase>
    ),
  },
]
