import { CalendarDots } from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Field } from "../../../../src/components/ui/field.tsx"
import { Label } from "../../../../src/components/ui/label.tsx"
import {
  SegmentedControl,
  SegmentedControlItem,
} from "../../../../src/components/ui/segmented-control.tsx"
import { Slider } from "../../../../src/components/ui/slider.tsx"
import { Textarea } from "../../../../src/components/ui/textarea.tsx"
import { CodeBlock, ExampleBlock, PageIntro } from "../../sink/showcase.tsx"

const FEELS = [
  { value: "1", label: "Rough" },
  { value: "2", label: "Meh" },
  { value: "3", label: "OK" },
  { value: "4", label: "Good" },
  { value: "5", label: "Great" },
]

function LogSessionCard() {
  const [effort, setEffort] = useState(6)
  const [feel, setFeel] = useState("4")
  return (
    <div className="max-w-md space-y-5 rounded-xl border border-border bg-background-raised p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">Tuesday: Limit bouldering</p>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarDots aria-hidden className="size-3.5" /> Today
        </span>
      </div>
      <div>
        <div className="mb-1 flex items-center justify-between">
          <Label>How hard was it?</Label>
          <span className="text-sm font-semibold text-primary tabular-nums">{effort}/10</span>
        </div>
        <Slider
          aria-label="Session effort"
          min={1}
          max={10}
          value={effort}
          onValueChange={(value) => setEffort(value as number)}
        />
      </div>
      <div className="space-y-1.5">
        <Label>How did it feel?</Label>
        <SegmentedControl
          size="sm"
          value={feel}
          onValueChange={setFeel}
          aria-label="Session feel"
          className="w-full"
        >
          {FEELS.map((option) => (
            <SegmentedControlItem key={option.value} value={option.value} className="flex-1">
              {option.label}
            </SegmentedControlItem>
          ))}
        </SegmentedControl>
      </div>
      <Field label="Notes" hint="Optional. Your coach sees these.">
        <Textarea autoGrow placeholder="Sent the red overhang project on attempt 3." />
      </Field>
      <Button className="w-full">Log session</Button>
    </div>
  )
}

export default function ExampleLogSessionPage() {
  return (
    <div>
      <PageIntro
        title="Example: Log session"
        description="The B2C logging moment composed from form primitives: effort Slider, feel SegmentedControl, notes Field + Textarea, one full-width primary Button."
        use="This is the pattern for quick post-session capture: two low-friction scale inputs first, free text last and optional. Copy the composition, not the components; every part is a stock primitive."
      />

      <ExampleBlock
        title="Log session"
        description="Effort slider plus feel segmented row; notes stay optional so the flow never blocks the streak."
      >
        <LogSessionCard />
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  Button, Field, Label, SegmentedControl,
  SegmentedControlItem, Slider, Textarea,
} from "@pinchblock/ui"

<Slider aria-label="Session effort" min={1} max={10}
  value={effort} onValueChange={(v) => setEffort(v as number)} />

<SegmentedControl size="sm" value={feel} onValueChange={setFeel}
  aria-label="Session feel" className="w-full">
  {FEELS.map((f) => (
    <SegmentedControlItem key={f.value} value={f.value} className="flex-1">
      {f.label}
    </SegmentedControlItem>
  ))}
</SegmentedControl>

<Field label="Notes" hint="Optional. Your coach sees these.">
  <Textarea autoGrow />
</Field>
`}
      />
    </div>
  )
}
