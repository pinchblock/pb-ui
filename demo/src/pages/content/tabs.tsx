import { ClockCounterClockwise, ListChecks, Trophy } from "@phosphor-icons/react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function TabsPage() {
  return (
    <div>
      <PageIntro
        title="Tabs"
        description="Base UI Tabs with two visual variants set once on TabsList: underline (the app pattern) and pill (segmented look). Keyboard arrows work; long lists scroll instead of wrapping."
        use="Underline for page-level views on a detail screen. Pill for sub-navigation and range switches inside a card. For a binary either/or choice that acts like a form input, use SegmentedControl instead."
      />

      <Showcase
        title="Underline"
        hint="border-b list with a 2px primary underline. Icons supported; disabled tabs are skipped by the keyboard."
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

      <Showcase title="Pill (segmented)" hint="For sub-navigation and range switches inside a card.">
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

      <ExampleBlock
        title="Volume card with a range switch"
        description="Pill tabs inside a Card header area, switching the period of one number."
      >
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Training volume</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="week">
              <TabsList variant="pill">
                <TabsTab value="week">Week</TabsTab>
                <TabsTab value="month">Month</TabsTab>
              </TabsList>
              <TabsPanel value="week">
                <p className="font-display text-2xl font-semibold text-foreground tabular-nums">
                  96,400 kg
                </p>
                <p className="text-xs text-muted-foreground">18 sessions across the squad</p>
              </TabsPanel>
              <TabsPanel value="month">
                <p className="font-display text-2xl font-semibold text-foreground tabular-nums">
                  402,100 kg
                </p>
                <p className="text-xs text-muted-foreground">71 sessions across the squad</p>
              </TabsPanel>
            </Tabs>
          </CardContent>
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Tabs, TabsList, TabsTab, TabsPanel } from "@pinchblock/ui"

<Tabs defaultValue="overview">
  <TabsList>            {/* variant="pill" for the segmented look */}
    <TabsTab value="overview"><ListChecks /> Overview</TabsTab>
    <TabsTab value="history">History</TabsTab>
  </TabsList>
  <TabsPanel value="overview">...</TabsPanel>
  <TabsPanel value="history">...</TabsPanel>
</Tabs>
`}
      />
    </div>
  )
}
