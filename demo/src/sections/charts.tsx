import { useState } from "react"
import { Flame, Trophy } from "@phosphor-icons/react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"

import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../src/components/charts/chart.tsx"
import { Sparkline } from "../../../src/components/charts/sparkline.tsx"
import { TrendChart, type TrendPoint } from "../../../src/components/charts/trend-chart.tsx"
import { ActivityRing } from "../../../src/components/charts/activity-ring.tsx"
import { StreakHeatmap, type StreakDay } from "../../../src/components/charts/streak-heatmap.tsx"
import {
  AnimatedNumber,
  AnimatedNumberGroup,
} from "../../../src/components/charts/animated-number.tsx"
import {
  FEEL_LABELS,
  FeelBadge,
  FeelDot,
  FeelPicker,
  type FeelValue,
} from "../../../src/components/rating-feel.tsx"
import { Button } from "../../../src/components/ui/button.tsx"

/* Recharts runs JS-driven entrance animations; gate them explicitly. */
const ANIMATE =
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* ------------------------------------------------------------------ */
/* Demo data: training-flavored, deterministic                         */
/* ------------------------------------------------------------------ */

const WEEKLY_SESSIONS = [
  { week: "W1", you: 3, squad: 4 },
  { week: "W2", you: 4, squad: 4 },
  { week: "W3", you: 4, squad: 5 },
  { week: "W4", you: 2, squad: 4 },
  { week: "W5", you: 5, squad: 4 },
  { week: "W6", you: 5, squad: 5 },
  { week: "W7", you: 6, squad: 5 },
  { week: "W8", you: 4, squad: 4 },
  { week: "W9", you: 6, squad: 5 },
  { week: "W10", you: 7, squad: 5 },
  { week: "W11", you: 6, squad: 5 },
  { week: "W12", you: 7, squad: 6 },
]

const WEEKLY_VOLUME = [
  { week: "W1", volume: 8400 },
  { week: "W2", volume: 9100 },
  { week: "W3", volume: 9800 },
  { week: "W4", volume: 5200 },
  { week: "W5", volume: 10600 },
  { week: "W6", volume: 11400 },
  { week: "W7", volume: 12100 },
  { week: "W8", volume: 9600 },
  { week: "W9", volume: 12800 },
  { week: "W10", volume: 13500 },
  { week: "W11", volume: 12900 },
  { week: "W12", volume: 14200 },
]

const TRAINING_SPLIT = [
  { week: "W1", strength: 120, conditioning: 45 },
  { week: "W2", strength: 140, conditioning: 60 },
  { week: "W3", strength: 150, conditioning: 55 },
  { week: "W4", strength: 80, conditioning: 30 },
  { week: "W5", strength: 160, conditioning: 70 },
  { week: "W6", strength: 170, conditioning: 65 },
  { week: "W7", strength: 180, conditioning: 80 },
  { week: "W8", strength: 140, conditioning: 60 },
  { week: "W9", strength: 190, conditioning: 85 },
  { week: "W10", strength: 200, conditioning: 90 },
  { week: "W11", strength: 185, conditioning: 80 },
  { week: "W12", strength: 210, conditioning: 95 },
]

const CLIENTS = [
  { name: "Mari K.", plan: "Hypertrophy, week 6", streak: 12, data: [3, 4, 3, 5, 4, 5, 6, 7], delta: "+18%" },
  { name: "Tom R.", plan: "5k prep, week 3", streak: 2, data: [5, 4, 4, 3, 3, 2, 2, 1], delta: "-24%" },
  { name: "Katrin V.", plan: "Strength base, week 9", streak: 21, data: [4, 4, 5, 4, 5, 5, 5, 6], delta: "+9%" },
  { name: "Jaan P.", plan: "Return from injury", streak: 5, data: [1, 2, 2, 3, 2, 3, 4, 4], delta: "+31%" },
]

const SESSION_TREND: TrendPoint[] = [
  { label: "Apr 14", value: 6.0, feel: 3 },
  { label: "Apr 17", value: 6.5, feel: 4 },
  { label: "Apr 21", value: 7.0, feel: 4 },
  { label: "Apr 24", value: 5.5, feel: 2 },
  { label: "Apr 28", value: 6.5, feel: 3 },
  { label: "May 1", value: 7.5, feel: 4 },
  { label: "May 5", value: 8.0, feel: 5 },
  { label: "May 8", value: 7.0, feel: 4 },
  { label: "May 12", value: 8.5, feel: 5 },
  { label: "May 15", value: 8.0, feel: 4 },
]

const LOAD_TREND: TrendPoint[] = WEEKLY_VOLUME.map((w) => ({
  label: w.week,
  value: w.volume,
}))

/** 20 weeks of believable consistency: Mon/Tue/Thu/Fri, a deload, a trip. */
function buildStreakDays(): StreakDay[] {
  const days: StreakDay[] = []
  const today = new Date()
  for (let i = 0; i < 140; i += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const weekday = (date.getDay() + 6) % 7 /* Mon=0 */
    const week = Math.floor(i / 7)
    if (week === 6) continue /* vacation week */
    let value = 0
    if (weekday === 0 || weekday === 3) value = 2
    else if (weekday === 1 || weekday === 4) value = 1
    else if (weekday === 5 && week % 3 === 0) value = 1
    if (week === 13) value = Math.min(value, 1) /* deload week */
    if (value > 0 && (i * 7 + 3) % 11 === 0) value = 0 /* the odd missed day */
    if (value > 0) days.push({ date, value: weekday === 0 && week % 4 === 0 ? 3 : value })
  }
  return days
}

const STREAK_DAYS = buildStreakDays()

/* ------------------------------------------------------------------ */
/* Interactive demos                                                   */
/* ------------------------------------------------------------------ */

function StatCounters() {
  const [sessions, setSessions] = useState(148)
  const [volume, setVolume] = useState(12480)
  const [prs, setPrs] = useState(3)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">Sessions logged</p>
          <AnimatedNumber value={sessions} className="text-2xl font-semibold text-foreground" />
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">Volume this block</p>
          <AnimatedNumber
            value={volume}
            suffix=" kg"
            className="text-2xl font-semibold text-foreground"
          />
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Trophy aria-hidden className="size-3.5 text-warning" /> PRs this block
          </p>
          <AnimatedNumber value={prs} className="text-2xl font-semibold text-foreground" />
        </div>
      </div>
      <VariantRow>
        <Button
          onClick={() => {
            setSessions((n) => n + 1)
            setVolume((n) => n + 320)
          }}
        >
          Log session
        </Button>
        <Button variant="soft" onClick={() => setPrs((n) => n + 1)}>
          New PR
        </Button>
        <p className="text-xs text-muted-foreground">
          AnimatedNumber rolls digits with tabular numerals; layout never shifts.
        </p>
      </VariantRow>
      <div className="rounded-lg border border-border bg-background p-4">
        <p className="mb-1 text-xs text-muted-foreground">
          Weekly goal (grouped: both tick together)
        </p>
        <AnimatedNumberGroup>
          <span className="text-2xl font-semibold text-foreground">
            <AnimatedNumber value={sessions % 16} />
            <span className="text-muted-foreground"> / </span>
            <AnimatedNumber value={16} />
          </span>
        </AnimatedNumberGroup>
      </div>
    </div>
  )
}

function FeelPickerLive() {
  const [feel, setFeel] = useState<FeelValue>(4)
  return (
    <div className="flex flex-wrap items-center gap-6">
      <FeelPicker value={feel} onValueChange={setFeel} aria-label="How did the session feel?" />
      <p className="text-sm text-muted-foreground">
        Session felt <span className="font-medium text-foreground">{FEEL_LABELS[feel]}</span> (
        {feel}/5)
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

export const sections: SinkSection[] = [
  {
    id: "charts-chart",
    label: "Chart",
    render: () => (
      <>
        <Showcase
          title="Line chart with config"
          hint="ChartContainer maps config keys to chart tokens as var(--color-key). Tooltip and legend read labels from the same config."
        >
          <ChartContainer
            config={{
              you: { label: "You" },
              squad: { label: "Squad avg", color: "var(--chart-2)" },
            }}
          >
            <LineChart data={WEEKLY_SESSIONS} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis width={28} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="you"
                type="monotone"
                stroke="var(--color-you)"
                strokeWidth={2}
                dot={false}
                isAnimationActive={ANIMATE}
              />
              <Line
                dataKey="squad"
                type="monotone"
                stroke="var(--color-squad)"
                strokeWidth={2}
                strokeDasharray="6 3"
                dot={false}
                isAnimationActive={ANIMATE}
              />
            </LineChart>
          </ChartContainer>
        </Showcase>
        <Showcase
          title="Bar chart"
          hint="Weekly training volume. Single series needs no legend; the title names it."
        >
          <ChartContainer config={{ volume: { label: "Volume (kg)" } }}>
            <BarChart data={WEEKLY_VOLUME} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                content={
                  <ChartTooltipContent valueFormatter={(v) => `${Number(v).toLocaleString()} kg`} />
                }
              />
              <Bar
                dataKey="volume"
                fill="var(--color-volume)"
                radius={[4, 4, 0, 0]}
                isAnimationActive={ANIMATE}
              />
            </BarChart>
          </ChartContainer>
        </Showcase>
        <Showcase title="Stacked area" hint="Strength vs conditioning minutes per week.">
          <ChartContainer
            config={{
              strength: { label: "Strength" },
              conditioning: { label: "Conditioning", color: "var(--chart-2)" },
            }}
          >
            <AreaChart data={TRAINING_SPLIT} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent valueFormatter={(v) => `${v} min`} />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="strength"
                stackId="split"
                type="monotone"
                stroke="var(--color-strength)"
                fill="var(--color-strength)"
                fillOpacity={0.3}
                isAnimationActive={ANIMATE}
              />
              <Area
                dataKey="conditioning"
                stackId="split"
                type="monotone"
                stroke="var(--color-conditioning)"
                fill="var(--color-conditioning)"
                fillOpacity={0.3}
                isAnimationActive={ANIMATE}
              />
            </AreaChart>
          </ChartContainer>
        </Showcase>
      </>
    ),
  },
  {
    id: "charts-sparkline",
    label: "Sparkline",
    render: () => (
      <>
        <Showcase
          title="Variants"
          hint="Pure SVG, no recharts: cheap enough for long lists. tone='auto' reads direction from the data."
        >
          <VariantRow>
            <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} label="Default" />
            <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} smooth={false} label="Not smoothed" />
            <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} gradient label="Gradient fill" />
            <Sparkline data={[2, 3, 3, 4, 5, 5, 6, 7]} tone="auto" gradient label="Auto positive" />
            <Sparkline data={[7, 6, 5, 5, 4, 3, 2, 2]} tone="auto" gradient label="Auto negative" />
            <Sparkline data={[3, 4, 3, 5, 4, 5, 6, 7]} stroke="var(--chart-4)" label="Custom token" />
          </VariantRow>
        </Showcase>
        <Showcase
          title="In a client list"
          hint="Coach view: weekly session counts per client at a glance."
        >
          <div className="divide-y divide-border">
            {CLIENTS.map((client) => (
              <div key={client.name} className="flex items-center gap-4 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
                  {client.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{client.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{client.plan}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Flame aria-hidden className="size-3.5 text-warning" />
                  {client.streak}d
                </span>
                <Sparkline
                  data={client.data}
                  tone="auto"
                  gradient
                  label={`${client.name} session trend`}
                />
                <span
                  className={`w-12 text-right text-xs font-medium tabular-nums ${
                    client.delta.startsWith("-") ? "text-destructive" : "text-success"
                  }`}
                >
                  {client.delta}
                </span>
              </div>
            ))}
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "charts-trend",
    label: "TrendChart",
    render: () => (
      <>
        <Showcase
          title="Full size with feel dots and target"
          hint="Session load (RPE) over a block. Dots are tinted by the athlete's 1-5 feel rating; the dashed line is the block target."
        >
          <TrendChart
            data={SESSION_TREND}
            label="Session load"
            target={8}
            valueFormatter={(v) => `${v} RPE`}
          />
        </Showcase>
        <Showcase
          title="Compact (h-24) for cards and list rows"
          hint="Same component, size='compact': no axes, tight margins."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="mb-1 text-xs text-muted-foreground">Last 10 sessions</p>
              <TrendChart data={SESSION_TREND} size="compact" label="Load" />
            </div>
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="mb-1 text-xs text-muted-foreground">Weekly volume, no dots</p>
              <TrendChart
                data={LOAD_TREND}
                size="compact"
                label="Volume"
                color="var(--chart-2)"
                showDots={false}
                valueFormatter={(v) => `${Number(v).toLocaleString()} kg`}
              />
            </div>
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "charts-activity-ring",
    label: "ActivityRing",
    render: () => (
      <>
        <Showcase
          title="Nested trio"
          hint="Up to three rings, outermost first, animated sweep on scroll into view. Reduced motion jumps to the end."
        >
          <VariantRow>
            <ActivityRing
              size="lg"
              rings={[
                { value: 82, label: "Sessions" },
                { value: 64, label: "Volume" },
                { value: 91, label: "Recovery" },
              ]}
            >
              <span className="text-xl font-semibold text-foreground">82%</span>
              <span className="text-xs text-muted-foreground">weekly goal</span>
            </ActivityRing>
            <div className="space-y-1.5 text-sm">
              <p className="flex items-center gap-2">
                <i className="size-2.5 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">Sessions</span>
                <span className="font-medium text-foreground tabular-nums">82%</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="size-2.5 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium text-foreground tabular-nums">64%</span>
              </p>
              <p className="flex items-center gap-2">
                <i className="size-2.5 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">Recovery</span>
                <span className="font-medium text-foreground tabular-nums">91%</span>
              </p>
            </div>
          </VariantRow>
        </Showcase>
        <Showcase
          title="Single ring sizes"
          hint="value shorthand for one ring; any chart token as color."
        >
          <VariantRow>
            <ActivityRing size="sm" value={45} aria-label="Sessions 45%" />
            <ActivityRing size="md" value={70} aria-label="Sessions 70%">
              <span className="text-sm font-semibold text-foreground">70%</span>
            </ActivityRing>
            <ActivityRing
              size="md"
              rings={[{ value: 100, label: "Streak goal", color: "var(--chart-3)" }]}
            >
              <Flame aria-hidden className="size-5 text-warning" />
            </ActivityRing>
          </VariantRow>
        </Showcase>
      </>
    ),
  },
  {
    id: "charts-streak-heatmap",
    label: "StreakHeatmap",
    render: () => (
      <>
        <Showcase
          title="20 weeks of training consistency"
          hint="Monday-first day grid; intensity is color-mix steps of chart-1, empty days sit on chart-track. Hover a cell for the day."
        >
          <div className="overflow-x-auto pb-1">
            <StreakHeatmap
              data={STREAK_DAYS}
              weeks={20}
              valueLabel={(v) => (v === 1 ? "1 session" : `${v} sessions`)}
            />
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-faint-foreground">
            Less
            <span className="size-3 rounded-xs" style={{ background: "var(--chart-track)" }} />
            <span
              className="size-3 rounded-xs"
              style={{ background: "color-mix(in oklab, var(--chart-1) 30%, transparent)" }}
            />
            <span
              className="size-3 rounded-xs"
              style={{ background: "color-mix(in oklab, var(--chart-1) 65%, transparent)" }}
            />
            <span className="size-3 rounded-xs" style={{ background: "var(--chart-1)" }} />
            More
          </div>
        </Showcase>
        <Showcase title="Compact, no labels" hint="For tight card layouts: weeks=12, labels off.">
          <StreakHeatmap
            data={STREAK_DAYS}
            weeks={12}
            showMonthLabels={false}
            showDayLabels={false}
            color="var(--chart-2)"
          />
        </Showcase>
      </>
    ),
  },
  {
    id: "charts-animated-number",
    label: "AnimatedNumber",
    render: () => (
      <Showcase
        title="Stat counters"
        hint="Press the buttons: digits roll to the new value. @number-flow/react underneath, tabular numerals by default."
      >
        <StatCounters />
      </Showcase>
    ),
  },
  {
    id: "charts-rating-feel",
    label: "RatingFeel",
    render: () => (
      <>
        <Showcase
          title="FeelPicker"
          hint="Radiogroup semantics (arrow keys work), five circles tinted feel-1..5, selection pops with ease-spring."
        >
          <div className="space-y-4">
            <FeelPickerLive />
            <VariantRow>
              <FeelPicker size="sm" defaultValue={3} aria-label="Feel, small" />
              <FeelPicker size="lg" defaultValue={5} aria-label="Feel, large" />
              <FeelPicker defaultValue={2} disabled aria-label="Feel, disabled" />
            </VariantRow>
          </div>
        </Showcase>
        <Showcase title="FeelDot and FeelBadge" hint="Display atoms for lists and session cards.">
          <div className="space-y-4">
            <VariantRow>
              {([1, 2, 3, 4, 5] as const).map((feel) => (
                <FeelDot key={feel} feel={feel} />
              ))}
              <FeelDot feel={4} size="sm" />
              <FeelDot feel={4} size="lg" />
            </VariantRow>
            <VariantRow>
              {([1, 2, 3, 4, 5] as const).map((feel) => (
                <FeelBadge key={feel} feel={feel} />
              ))}
              <FeelBadge feel={5}>Felt unstoppable</FeelBadge>
            </VariantRow>
          </div>
        </Showcase>
        <Showcase
          title="In a session log"
          hint="Composed: recent sessions with feel, load and a PR moment."
        >
          <div className="divide-y divide-border">
            {[
              { day: "Thu, May 15", title: "Lower body strength", load: "8.0 RPE", feel: 4 as const, pr: false },
              { day: "Mon, May 12", title: "Squat day, top single", load: "8.5 RPE", feel: 5 as const, pr: true },
              { day: "Thu, May 8", title: "Upper body volume", load: "7.0 RPE", feel: 4 as const, pr: false },
              { day: "Mon, May 5", title: "Intervals 6x800m", load: "8.0 RPE", feel: 5 as const, pr: false },
            ].map((session) => (
              <div key={session.day} className="flex items-center gap-4 py-3">
                <FeelDot feel={session.feel} />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-sm font-medium text-foreground">
                    {session.title}
                    {session.pr && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 text-xs font-medium text-warning">
                        <Trophy aria-hidden className="size-3" /> PR
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{session.day}</p>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{session.load}</span>
                <FeelBadge feel={session.feel} />
              </div>
            ))}
          </div>
        </Showcase>
      </>
    ),
  },
  {
    id: "charts-weekly-report",
    label: "Weekly report (composed)",
    render: () => (
      <Showcase
        title="Client weekly report"
        hint="Everything together, the way a Pinchblock coach sees it: rings, trend, streak, stats and feel."
      >
        <div className="max-w-2xl rounded-xl border border-border bg-background p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-foreground">Mari K.</p>
              <p className="text-sm text-muted-foreground">Hypertrophy block, week 6 of 8</p>
            </div>
            <FeelBadge feel={4}>Mostly good week</FeelBadge>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-6">
            <ActivityRing
              size="md"
              rings={[
                { value: 100, label: "Sessions" },
                { value: 78, label: "Volume" },
                { value: 62, label: "Recovery" },
              ]}
            >
              <span className="text-sm font-semibold text-foreground">5/5</span>
            </ActivityRing>
            <div className="grid flex-1 grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="text-lg font-semibold text-foreground tabular-nums">14.2t</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Streak</p>
                <p className="flex items-center gap-1 text-lg font-semibold text-foreground tabular-nums">
                  <Flame aria-hidden className="size-4 text-warning" /> 12d
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg feel</p>
                <p className="flex items-center gap-1.5 text-lg font-semibold text-foreground tabular-nums">
                  <FeelDot feel={4} size="sm" /> 4.2
                </p>
              </div>
            </div>
          </div>
          <p className="mb-1 text-xs text-muted-foreground">Session load, last 10</p>
          <TrendChart data={SESSION_TREND} size="compact" label="Load" target={8} />
          <p className="mt-4 mb-1 text-xs text-muted-foreground">Consistency, last 12 weeks</p>
          <div className="overflow-x-auto pb-1">
            <StreakHeatmap data={STREAK_DAYS} weeks={12} showMonthLabels={false} />
          </div>
        </div>
      </Showcase>
    ),
  },
]
