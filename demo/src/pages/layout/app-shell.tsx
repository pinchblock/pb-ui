import {
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
  Timer,
  Trophy,
  UserCircle,
} from "@phosphor-icons/react"

import {
  AppShell,
  Button,
  Grow,
  type NavItem,
  NavRail,
  type NavRailSection,
  Page,
  PhoneFrame,
  Row,
  Stack,
  TopBar,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/* Fitness-flavored nav fixtures. Button-mode items (no href): the sink
   has no router, and NavItem renders a <button> without one. */
const NAV: NavItem[] = [
  { icon: House, label: "Home", active: true },
  { icon: Compass, label: "Explore" },
  { icon: CalendarDots, label: "Plan", badge: 2 },
  { icon: Newspaper, label: "Feed", badge: 5 },
  { icon: UserCircle, label: "Profile" },
]

/* Phone tab bar: 4 items + center FAB = the classic 5-slot bar. */
const TAB_ITEMS: NavItem[] = [NAV[0]!, NAV[1]!, NAV[3]!, NAV[4]!]

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
            <span className="w-8 shrink-0 text-xs font-medium text-muted-foreground">{session.day}</span>
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
            <Button variant="ghost" size="icon-sm" aria-label="Notifications">
              <Bell aria-hidden />
            </Button>
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
                  <span className="text-xs text-muted-foreground">Week 6 of Hypertrophy Block A</span>
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
          <p className="mb-2 font-mono text-xs text-muted-foreground">expanded={String(expanded)}</p>
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

export default function AppShellPage() {
  return (
    <div>
      <PageIntro
        title="App shell"
        description="Kit page for the authenticated chrome family: AppShell, NavRail, MobileTabBar and TopBar. AppShell composes the other three, so they are shown and change together."
        use='One AppShell per app, at the root. Ship layout="responsive" in product (rail on md+, tab bar below); force mobile or desktop only for previews like the ones here. Keep the tab bar to four items plus the FAB, and swap router links in via each item&apos;s render prop.'
      />

      <Showcase
        title="Mobile shell in a PhoneFrame"
        hint='AppShell contained + layout="mobile": TopBar, scrollable content, MobileTabBar with 4 tabs and the raised "Log session" FAB, pinned to the frame instead of the viewport.'
      >
        <div className="flex justify-center">
          <PhoneShellDemo />
        </div>
      </Showcase>

      <Showcase
        title="NavRail: icon rail vs expanded"
        hint="64px icon rail (labels move to aria-label/title, badges collapse to dots) vs 240px labeled rail with sections. Active item: bg-primary-soft + text-primary."
      >
        <NavRailStatesDemo />
      </Showcase>

      <ExampleBlock
        title="Desktop dashboard miniature"
        description='AppShell contained + layout="desktop" inside a scale-90 box: expanded NavRail with sections and badges, translucent TopBar, width-capped Page content.'
      >
        <DesktopShellDemo />
      </ExampleBlock>

      <CodeBlock
        code={`
import { AppShell, TopBar, Grow, Button } from "@pinchblock/ui"

const NAV = [
  { icon: House, label: "Home", render: <Link to="/" />, active: true },
  { icon: CalendarDots, label: "Plan", render: <Link to="/plan" />, badge: 2 },
]

<AppShell
  items={NAV}
  fab={{ icon: Plus, label: "Log session", onClick: openLogger }}
  topBar={
    <TopBar>
      <span className="text-sm font-semibold">Home</span>
      <Grow />
      <Button variant="ghost" size="icon-sm" aria-label="Notifications">
        <Bell />
      </Button>
    </TopBar>
  }
>
  <Outlet />
</AppShell>
`}
      />
    </div>
  )
}
