import { useState } from "react"

import { Card, SectionHeader, ToggleRow } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function ToggleRowPage() {
  const [sleepSharing, setSleepSharing] = useState(true)

  return (
    <div>
      <PageIntro
        title="ToggleRow"
        description="Settings row: label and description with a trailing switch, built on ListRow so it stacks in the same divide-y lists. The whole row is a label; clicking anywhere toggles."
        use="For every boolean setting in the product. The switch is the keyboard and focus target and is named by the row label for screen readers. For toggles that need immediate server confirmation, keep it controlled."
      />

      <Showcase
        title="States"
        hint="Uncontrolled with defaultChecked, plain unchecked, and disabled (managed elsewhere)."
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
            label="Beta features"
            description="Managed by your squad admin"
            disabled
          />
        </Card>
      </Showcase>

      <Showcase
        title="Controlled"
        hint="checked plus onCheckedChange; this row reports its state below."
      >
        <div className="space-y-3">
          <Card>
            <ToggleRow
              label="Coach can view sleep data"
              description="Shares wearable sleep metrics with Coach Kadri"
              checked={sleepSharing}
              onCheckedChange={setSleepSharing}
            />
          </Card>
          <p className="text-xs text-muted-foreground">
            Sleep sharing is {sleepSharing ? "on: Coach Kadri sees nightly totals" : "off"}.
          </p>
        </div>
      </Showcase>

      <ExampleBlock
        title="Notification settings"
        description="A SectionHeader above a Card of stacked ToggleRows, the standard settings-screen shape."
      >
        <div className="max-w-md space-y-2">
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
      </ExampleBlock>

      <CodeBlock
        code={`
import { ToggleRow } from "@pinchblock/ui"

<Card className="divide-y divide-border">
  <ToggleRow
    label="Session reminders"
    description="Push notification 30 minutes before every booked session"
    defaultChecked
  />
  {/* Controlled: */}
  <ToggleRow label="Coach can view sleep data" checked={on} onCheckedChange={setOn} />
</Card>
`}
      />
    </div>
  )
}
