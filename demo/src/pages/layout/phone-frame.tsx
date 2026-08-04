import { ArrowRight, Flame, Play, Trophy } from "@phosphor-icons/react"

import { Button, Grow, PhoneFrame, Row, Stack } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

/** Static screen content: PhoneFrame accepts arbitrary children. */
function StreakScreen() {
  const days = ["M", "T", "W", "T", "F", "S", "S"] as const
  return (
    <Stack gap={4} className="p-4 pt-10">
      <Stack gap={1}>
        <span className="text-xs text-muted-foreground">Tonight · Pull day</span>
        <span className="text-base font-semibold">Keep the streak alive</span>
      </Stack>
      <div className="rounded-xl bg-warning-soft p-4">
        <Row gap={3}>
          <Flame aria-hidden className="size-8 text-warning" />
          <Stack gap={1}>
            <span className="text-2xl font-semibold text-warning">21 days</span>
            <span className="text-xs text-muted-foreground">Longest streak yet</span>
          </Stack>
        </Row>
      </div>
      <Row gap={1} justify="between">
        {days.map((day, index) => (
          <Stack key={index} gap={1} align="center">
            <span
              className={
                index < 5
                  ? "grid size-5 place-items-center rounded-full bg-success-soft text-success"
                  : "grid size-5 place-items-center rounded-full bg-muted text-faint-foreground"
              }
            >
              <Flame aria-hidden className="size-3" />
            </span>
            <span className="text-xs text-muted-foreground">{day}</span>
          </Stack>
        ))}
      </Row>
      <Button size="sm">
        <Play aria-hidden />
        Start session
      </Button>
    </Stack>
  )
}

export default function PhoneFramePage() {
  return (
    <div>
      <PageIntro
        title="PhoneFrame"
        description="Marketing device frame at a modern phone aspect ratio: notch, home indicator and a clipped screen area for arbitrary children."
        use='For landing pages and feature showcases, not app chrome. Pair with AppShell contained + layout="mobile" for a live in-frame app preview (see the App shell page). Override the default w-72 width via className.'
      />

      <Showcase
        title="Widths via className"
        hint="Default w-72; the screen scales with the frame because the aspect ratio is fixed."
      >
        <div className="flex flex-wrap items-start justify-center gap-8">
          <div>
            <p className="mb-2 text-center font-mono text-xs text-muted-foreground">default (w-72)</p>
            <PhoneFrame>
              <StreakScreen />
            </PhoneFrame>
          </div>
          <div>
            <p className="mb-2 text-center font-mono text-xs text-muted-foreground">w-56</p>
            <PhoneFrame className="w-56">
              <StreakScreen />
            </PhoneFrame>
          </div>
        </div>
      </Showcase>

      <ExampleBlock
        title="Landing hero device shot"
        description="The frame's home turf: a marketing hero over pb-backdrop with the product running beside the pitch."
      >
        <div className="pb-backdrop overflow-hidden rounded-xl border border-border bg-background-sunken">
          <div className="flex flex-col items-center gap-8 px-6 py-10 sm:flex-row sm:items-start sm:px-10">
            <Stack gap={4} align="start" className="max-w-md">
              <span className="eyebrow">Streaks that stick</span>
              <h2 className="text-display-sm font-display">
                <span className="text-gradient-primary">Show up daily,</span> even on rest days
              </h2>
              <p className="text-sm text-muted-foreground">
                Log a session in under a minute. Your coach sees it, your streak grows, and
                Sunday brings the next block.
              </p>
              <Row gap={2} wrap>
                <Button pill>
                  Start 14-day trial
                  <ArrowRight aria-hidden />
                </Button>
                <Button pill variant="ghost">
                  <Trophy aria-hidden />
                  See athlete stories
                </Button>
              </Row>
            </Stack>
            <PhoneFrame className="w-60">
              <StreakScreen />
            </PhoneFrame>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { AppShell, PhoneFrame } from "@pinchblock/ui"

// Static screenshot-style content:
<PhoneFrame className="w-60">
  <StreakScreen />
</PhoneFrame>

// Live in-frame app preview:
<PhoneFrame>
  <AppShell contained layout="mobile" items={NAV} fab={fab}>
    <HomeScreen />
  </AppShell>
</PhoneFrame>
`}
      />
    </div>
  )
}
