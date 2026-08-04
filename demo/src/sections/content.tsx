import {
  Barbell,
  Bell,
  CalendarDots,
  CaretRight,
  Chat,
  ClockCounterClockwise,
  DownloadSimple,
  Flame,
  Heartbeat,
  Lightning,
  ListChecks,
  Moon,
  Plus,
  Trophy,
  Users,
} from "@phosphor-icons/react"
import { useState } from "react"

import { Alert } from "../../../src/components/ui/alert.tsx"
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "../../../src/components/ui/accordion.tsx"
import { Button } from "../../../src/components/ui/button.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../src/components/ui/card.tsx"
import { Pagination } from "../../../src/components/ui/pagination.tsx"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../src/components/ui/table.tsx"
import { Tabs, TabsList, TabsPanel, TabsTab } from "../../../src/components/ui/tabs.tsx"
import { EmptyState } from "../../../src/components/empty-state.tsx"
import { ListRow } from "../../../src/components/list-row.tsx"
import { PageHeader } from "../../../src/components/page-header.tsx"
import { SectionHeader } from "../../../src/components/section-header.tsx"
import { StatTile } from "../../../src/components/stat-tile.tsx"
import { Stepper } from "../../../src/components/stepper.tsx"
import { ToggleRow } from "../../../src/components/toggle-row.tsx"
import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

/* ------------------------------------------------------------------ */
/* Demo helpers                                                        */
/* ------------------------------------------------------------------ */

function Initials({ children }: { children: string }) {
  return (
    <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
      {children}
    </span>
  )
}

const LEADERBOARD = [
  { athlete: "Mari Tamm", sessions: 14, volume: "24,300 kg", pr: "Deadlift 140 kg" },
  { athlete: "Joosep Kask", sessions: 12, volume: "21,850 kg", pr: "Squat 152.5 kg" },
  { athlete: "Liis Vaher", sessions: 11, volume: "18,400 kg", pr: "Bench 72.5 kg" },
  { athlete: "Anton Roos", sessions: 9, volume: "15,900 kg", pr: "Clean 95 kg" },
]

function LeaderboardTable() {
  return (
    <TableContainer>
      <Table>
        <TableCaption>Squad volume leaderboard, last 30 days.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Athlete</TableHead>
            <TableHead numeric>Sessions</TableHead>
            <TableHead numeric>Volume</TableHead>
            <TableHead>Latest PR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LEADERBOARD.map((row) => (
            <TableRow key={row.athlete}>
              <TableCell className="font-medium text-foreground">{row.athlete}</TableCell>
              <TableCell numeric>{row.sessions}</TableCell>
              <TableCell numeric mono>
                {row.volume}
              </TableCell>
              <TableCell className="text-muted-foreground">{row.pr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(5)
  return (
    <div className="space-y-4">
      <Pagination page={page} pageCount={12} onPageChange={setPage} />
      <Pagination variant="compact" page={page} pageCount={12} onPageChange={setPage} />
      <Pagination page={1} pageCount={3} onPageChange={() => {}} />
    </div>
  )
}

function StepperDemo() {
  const [step, setStep] = useState(1)
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Stepper steps={["Goals", "Schedule", "Equipment", "Review"]} activeStep={step} />
        <VariantRow>
          <Button
            variant="secondary"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            size="sm"
            disabled={step === 3}
            onClick={() => setStep((s) => Math.min(3, s + 1))}
          >
            Continue
          </Button>
        </VariantRow>
      </div>
      <Stepper
        variant="bars"
        steps={["Warm-up", "Strength", "Conditioning", "Cool-down"]}
        activeStep={2}
      />
      <Stepper variant="bars" steps={["", "", "", "", ""]} activeStep={3} />
    </div>
  )
}

function DashboardSlice() {
  const [page, setPage] = useState(1)
  return (
    <div className="space-y-6">
      <PageHeader
        size="lg"
        title="Good morning, Coach Kadri"
        description="4 sessions today. Two athletes hit PRs since yesterday."
        actions={
          <>
            <Button variant="secondary" size="sm">
              <DownloadSimple aria-hidden />
              Export
            </Button>
            <Button size="sm">
              <Plus aria-hidden />
              New session
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Sessions this week"
          value="18"
          icon={<CalendarDots aria-hidden />}
          trend={{ value: "+12%", direction: "up" }}
          footnote="vs last week"
        />
        <StatTile
          label="Active streak"
          value="21 days"
          icon={<Flame aria-hidden />}
          trend={{ value: "+3", direction: "up" }}
          footnote="squad best: 34 days"
        />
        <StatTile
          label="Resting HR"
          value="52 bpm"
          icon={<Heartbeat aria-hidden />}
          trend={{ value: "-2 bpm", direction: "down", positive: true }}
          footnote="rolling 7-day average"
        />
        <StatTile
          label="Missed check-ins"
          value="3"
          icon={<Bell aria-hidden />}
          trend={{ value: "+1", direction: "up", positive: false }}
          footnote="nudge sent automatically"
        />
      </div>

      <div className="space-y-2">
        <SectionHeader
          icon={<Trophy aria-hidden />}
          title="Volume leaderboard"
          action={
            <Button variant="ghost" size="sm">
              View all
              <CaretRight aria-hidden />
            </Button>
          }
        />
        <Card>
          <CardContent className="p-0">
            <LeaderboardTable />
          </CardContent>
          <CardFooter className="justify-between border-t border-border p-4">
            <p className="text-xs text-muted-foreground">4 of 32 athletes</p>
            <Pagination variant="compact" page={page} pageCount={8} onPageChange={setPage} />
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-2">
        <SectionHeader icon={<Chat aria-hidden />} title="Unread messages" />
        <Card>
          <EmptyState
            icon={<Chat aria-hidden />}
            title="Inbox zero"
            description="No unread athlete messages. Check back after this evening's sessions."
            action={
              <Button variant="soft" size="sm">
                Message the squad
              </Button>
            }
          />
        </Card>
      </div>

      <div className="space-y-2">
        <SectionHeader title="Notifications" />
        <Card className="divide-y divide-border">
          <ToggleRow
            label="Session reminders"
            description="Push notification 30 minutes before every booked session"
            defaultChecked
          />
          <ToggleRow
            label="PR celebrations"
            description="Notify the squad feed when an athlete sets a personal record"
            defaultChecked
          />
          <ToggleRow
            label="Streak warnings"
            description="Warn athletes the evening before a streak would break"
          />
          <ToggleRow
            label="Quiet hours"
            description="Pause all notifications between 22:00 and 07:00"
            defaultChecked
            disabled
          />
        </Card>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export const sections: SinkSection[] = [
  {
    id: "content-cards",
    label: "Card",
    render: () => (
      <Showcase
        title="Card variants"
        hint="default for app surfaces, interactive for clickable cards, glass for PUBLIC marketing only (collapses to solid in light themes), sunken for inset wells."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Push day</CardTitle>
              <CardDescription>Tomorrow 07:30 with Coach Kadri</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Bench 5x5 at 80%, incline dumbbell press, dips, tricep work. 60 min.
            </CardContent>
            <CardFooter>
              <Button size="sm">Start session</Button>
              <Button variant="ghost" size="sm">
                Reschedule
              </Button>
            </CardFooter>
          </Card>

          <Card variant="interactive" tabIndex={0} role="button" aria-label="Open leg day session">
            <CardHeader>
              <CardTitle>Leg day (interactive)</CardTitle>
              <CardDescription>Hover or focus me: whole card is the click target</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Squat 4x6, Romanian deadlift, walking lunges, calf raises.
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass (marketing only)</CardTitle>
              <CardDescription>
                For public pages and overlays; authenticated app cards stay solid.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              In light themes glass collapses to solid automatically.
            </CardContent>
          </Card>

          <Card variant="sunken">
            <CardHeader>
              <CardTitle>Sunken</CardTitle>
              <CardDescription>Borderless inset well for nested regions</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use inside a default Card for logs, code, raw data.
            </CardContent>
          </Card>
        </div>
      </Showcase>
    ),
  },
  {
    id: "content-alerts",
    label: "Alert",
    render: () => (
      <Showcase
        title="Alert tones"
        hint="role=status by default, role=alert for destructive. The ai tone marks AI-assisted moments only."
      >
        <div className="space-y-3">
          <Alert tone="info" title="Deload week starts Monday" dismissible>
            Volume drops to 60% across all programs. Athletes were notified.
          </Alert>
          <Alert tone="success" title="PR logged">
            Mari Tamm pulled 140 kg. That is a 5 kg personal record.
          </Alert>
          <Alert
            tone="warning"
            title="3 athletes have not checked in"
            action={
              <Button variant="secondary" size="sm">
                Send reminder
              </Button>
            }
          >
            Check-ins were due yesterday evening. Streaks break at midnight.
          </Alert>
          <Alert tone="destructive" title="Payment failed" dismissible>
            The squad subscription could not be renewed. Update the card to keep bookings open.
          </Alert>
          <Alert tone="ai" title="Suggested progression">
            Based on the last 4 sessions, raise squat working weight by 2.5 kg and keep reps.
          </Alert>
        </div>
      </Showcase>
    ),
  },
  {
    id: "content-tabs",
    label: "Tabs",
    render: () => (
      <>
        <Showcase
          title="Underline tabs"
          hint="The app pattern: border-b list with a 2px primary underline. Icons supported, keyboard arrows work."
        >
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTab value="overview">
                <ListChecks aria-hidden />
                Overview
              </TabsTab>
              <TabsTab value="history">
                <ClockCounterClockwise aria-hidden />
                History
              </TabsTab>
              <TabsTab value="prs">
                <Trophy aria-hidden />
                PRs
              </TabsTab>
              <TabsTab value="billing" disabled>
                Billing
              </TabsTab>
            </TabsList>
            <TabsPanel value="overview" className="text-sm text-muted-foreground">
              Weekly plan, next session and open check-ins for the selected athlete.
            </TabsPanel>
            <TabsPanel value="history" className="text-sm text-muted-foreground">
              Every completed session with volume, duration and how it felt.
            </TabsPanel>
            <TabsPanel value="prs" className="text-sm text-muted-foreground">
              Personal records per lift, with dates and bodyweight at the time.
            </TabsPanel>
            <TabsPanel value="billing" className="text-sm text-muted-foreground">
              Disabled tab: this panel is unreachable.
            </TabsPanel>
          </Tabs>
        </Showcase>
        <Showcase
          title="Pill tabs (segmented)"
          hint="For sub-navigation and range switches inside a card."
        >
          <Tabs defaultValue="week">
            <TabsList variant="pill">
              <TabsTab value="week">Week</TabsTab>
              <TabsTab value="month">Month</TabsTab>
              <TabsTab value="year">Year</TabsTab>
              <TabsTab value="all">All time</TabsTab>
            </TabsList>
            <TabsPanel value="week" className="text-sm text-muted-foreground">
              18 sessions, 96,400 kg total volume this week.
            </TabsPanel>
            <TabsPanel value="month" className="text-sm text-muted-foreground">
              71 sessions, 402,100 kg total volume this month.
            </TabsPanel>
            <TabsPanel value="year" className="text-sm text-muted-foreground">
              612 sessions so far this year. Keep it rolling.
            </TabsPanel>
            <TabsPanel value="all" className="text-sm text-muted-foreground">
              1,847 sessions since joining Pinchblock.
            </TabsPanel>
          </Tabs>
        </Showcase>
        <Showcase
          title="Overflow safety"
          hint="Long tab sets scroll horizontally inside the list (scrollbar hidden) instead of wrapping or breaking layout."
        >
          <div className="max-w-sm">
            <Tabs defaultValue="squat">
              <TabsList>
                {["Squat", "Bench", "Deadlift", "Overhead press", "Clean", "Snatch", "Pull-up"].map(
                  (lift) => (
                    <TabsTab key={lift} value={lift.toLowerCase()}>
                      {lift}
                    </TabsTab>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "content-accordion",
    label: "Accordion",
    render: () => (
      <Showcase
        title="Accordion"
        hint="Replaces details/summary disclosures. Single-open by default; chevron and height animate with motion tokens."
      >
        <Accordion defaultValue={["technique"]}>
          <AccordionItem value="technique">
            <AccordionTrigger>How are technique videos reviewed?</AccordionTrigger>
            <AccordionPanel>
              Upload a set from any angle. Your coach annotates bar path and depth frame by
              frame and replies within 24 hours on training days.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="streaks">
            <AccordionTrigger>What counts towards my streak?</AccordionTrigger>
            <AccordionPanel>
              Any completed session, logged recovery day or mobility block counts. Rest days
              planned by your coach never break a streak.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="pause">
            <AccordionTrigger>Can I pause my plan during holidays?</AccordionTrigger>
            <AccordionPanel>
              Yes, up to 4 weeks per year. Your program picks up with a ramp-in week so the
              first session back does not wreck you.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Showcase>
    ),
  },
  {
    id: "content-table",
    label: "Table",
    render: () => (
      <Showcase
        title="Table"
        hint="Uppercase text-xs header, quiet row hover, numeric/mono cell helpers. TableContainer scrolls horizontally inside a Card."
      >
        <Card>
          <CardHeader>
            <CardTitle>Volume leaderboard</CardTitle>
            <CardDescription>Last 30 days across the squad</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <LeaderboardTable />
          </CardContent>
        </Card>
      </Showcase>
    ),
  },
  {
    id: "content-pagination",
    label: "Pagination",
    render: () => (
      <Showcase
        title="Pagination"
        hint="Default with ellipsis truncation, compact for mobile and card footers, and the short-list case. Prev/next disable at the edges."
      >
        <PaginationDemo />
      </Showcase>
    ),
  },
  {
    id: "content-empty-state",
    label: "EmptyState",
    render: () => (
      <Showcase
        title="EmptyState"
        hint="default is chromeless for use inside an existing Card; dashed is the standalone add-something pattern."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <EmptyState
              icon={<Trophy aria-hidden />}
              title="No PRs yet"
              description="Personal records show up here the moment an athlete beats a lift."
            />
          </Card>
          <EmptyState
            variant="dashed"
            icon={<Barbell aria-hidden />}
            title="No sessions planned"
            description="Build the first session of this training block to get the week started."
            action={
              <Button size="sm">
                <Plus aria-hidden />
                Plan a session
              </Button>
            }
          />
        </div>
      </Showcase>
    ),
  },
  {
    id: "content-list-rows",
    label: "ListRow",
    render: () => (
      <Showcase
        title="ListRow"
        hint="Leading + title/meta + trailing slots, stacked with divide-y in a Card. Interactive rows are real buttons; static rows can hold trailing actions."
      >
        <Card className="divide-y divide-border">
          <ListRow
            interactive
            leading={<Initials>MT</Initials>}
            title="Mari Tamm"
            meta="Deadlift day - checked in 2 h ago"
            trailing={<CaretRight aria-hidden />}
          />
          <ListRow
            interactive
            leading={<Initials>JK</Initials>}
            title="Joosep Kask"
            meta="Missed yesterday's conditioning block"
            trailing={<span className="text-xs">2 d</span>}
          />
          <ListRow
            interactive
            disabled
            leading={<Initials>LV</Initials>}
            title="Liis Vaher (deactivated)"
            meta="Membership paused until September"
            trailing={<CaretRight aria-hidden />}
          />
          <ListRow
            leading={
              <span className="flex size-9 items-center justify-center rounded-full bg-warning-soft text-warning">
                <Lightning aria-hidden className="size-4" />
              </span>
            }
            title="Static row with an action"
            meta="Use this shape when the trailing slot holds a button"
            trailing={
              <Button variant="secondary" size="sm">
                Nudge
              </Button>
            }
          />
        </Card>
      </Showcase>
    ),
  },
  {
    id: "content-toggle-rows",
    label: "ToggleRow",
    render: () => (
      <Showcase
        title="ToggleRow"
        hint="Settings row on ListRow with a trailing switch. The whole row is the label; the switch is the keyboard target."
      >
        <Card className="divide-y divide-border">
          <ToggleRow
            label="Rest day reminders"
            description="A gentle nudge on planned rest days so streaks survive"
            defaultChecked
          />
          <ToggleRow
            label="Dark sessions"
            description="Dim the in-workout screen during evening training"
          />
          <ToggleRow
            label="Coach can view sleep data"
            description="Shares wearable sleep metrics with Coach Kadri"
            defaultChecked
          />
          <ToggleRow
            label="Beta features"
            description="Managed by your squad admin"
            disabled
          />
        </Card>
      </Showcase>
    ),
  },
  {
    id: "content-stat-tiles",
    label: "StatTile",
    render: () => (
      <Showcase
        title="StatTile"
        hint="Eyebrow label + display value + trend + footnote. For resting HR, down is good: pass positive explicitly."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Weekly volume"
            value="96,400 kg"
            icon={<Barbell aria-hidden />}
            trend={{ value: "+8%", direction: "up" }}
            footnote="vs last week"
          />
          <StatTile
            label="Streak"
            value="21 days"
            icon={<Flame aria-hidden />}
            trend={{ value: "+3", direction: "up" }}
          />
          <StatTile
            label="Resting HR"
            value="52 bpm"
            icon={<Heartbeat aria-hidden />}
            trend={{ value: "-2 bpm", direction: "down", positive: true }}
            footnote="rolling 7-day average"
          />
          <StatTile label="Squad size" value="32" icon={<Users aria-hidden />} footnote="2 pending invites" />
        </div>
      </Showcase>
    ),
  },
  {
    id: "content-headers",
    label: "Page & section headers",
    render: () => (
      <>
        <Showcase
          title="PageHeader"
          hint="lg for top-level pages, default for detail pages; optional back link and actions row."
        >
          <div className="space-y-8">
            <PageHeader
              size="lg"
              title="Dashboard"
              description="Everything your squad did this week, in one place."
              actions={
                <Button size="sm">
                  <Plus aria-hidden />
                  New session
                </Button>
              }
            />
            <PageHeader
              title="Mari Tamm"
              description="Powerlifting block 3, week 2 of 6"
              back={{ label: "Back to athletes", onClick: (e) => e.preventDefault() }}
              actions={
                <>
                  <Button variant="secondary" size="sm">
                    Message
                  </Button>
                  <Button variant="soft" size="sm">
                    Edit plan
                  </Button>
                </>
              }
            />
          </div>
        </Showcase>
        <Showcase title="SectionHeader" hint="Eyebrow title with optional icon and action slot.">
          <div className="space-y-6">
            <SectionHeader
              icon={<CalendarDots aria-hidden />}
              title="Today's sessions"
              action={
                <Button variant="ghost" size="sm">
                  View all
                  <CaretRight aria-hidden />
                </Button>
              }
            />
            <SectionHeader icon={<Moon aria-hidden />} title="Recovery" />
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "content-stepper",
    label: "Stepper",
    render: () => (
      <Showcase
        title="Stepper"
        hint="dots for wizards (try the buttons), bars for guided workout progress; labels optional."
      >
        <StepperDemo />
      </Showcase>
    ),
  },
  {
    id: "content-dashboard",
    label: "Dashboard slice",
    render: () => (
      <Showcase
        title="Composed: coach dashboard"
        hint="PageHeader + StatTile row + SectionHeader + Card with Table and compact Pagination + EmptyState + ToggleRow settings, all from the library."
      >
        <DashboardSlice />
      </Showcase>
    ),
  },
]
