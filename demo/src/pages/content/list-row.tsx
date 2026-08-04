import { CaretRight, Lightning, VideoCamera } from "@phosphor-icons/react"

import { Button, Card, CounterBadge, ListRow } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

function Initials({ children }: { children: string }) {
  return (
    <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
      {children}
    </span>
  )
}

export default function ListRowPage() {
  return (
    <div>
      <PageIntro
        title="ListRow"
        description="The inbox, roster and settings row workhorse: leading slot, title plus meta, trailing slot. Rows carry no border; stack them with divide-y in a Card."
        use="interactive renders a real button with hover and focus treatment. Never put buttons in the trailing slot of an interactive row (nested interactive elements); use a static row with a trailing action instead."
      />

      <Showcase
        title="Interactive rows"
        hint="Real buttons: hover, focus ring, disabled state. Trailing holds a chevron, timestamp or badge."
      >
        <Card className="divide-y divide-border">
          <ListRow
            interactive
            leading={<Initials>MT</Initials>}
            title="Mari Tamm"
            meta="Deadlift day, checked in 2 h ago"
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
        </Card>
      </Showcase>

      <Showcase
        title="Static row with a trailing action"
        hint="When the trailing slot holds a Button, the row itself stays non-interactive."
      >
        <Card>
          <ListRow
            leading={
              <span className="flex size-9 items-center justify-center rounded-full bg-warning-soft text-warning">
                <Lightning aria-hidden className="size-4" />
              </span>
            }
            title="Streak at risk"
            meta="Anton Roos has not trained in 6 days"
            trailing={
              <Button variant="secondary" size="sm">
                Nudge
              </Button>
            }
          />
        </Card>
      </Showcase>

      <ExampleBlock
        title="Technique review inbox"
        description="Interactive rows with unread counters; long titles and meta truncate instead of wrapping."
      >
        <Card className="max-w-md divide-y divide-border">
          <ListRow
            interactive
            leading={
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <VideoCamera aria-hidden className="size-4" />
              </span>
            }
            title="Snatch, 3rd attempt at 62 kg"
            meta="Mari Tamm, uploaded 40 min ago"
            trailing={<CounterBadge count={2} />}
          />
          <ListRow
            interactive
            leading={
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft text-primary">
                <VideoCamera aria-hidden className="size-4" />
              </span>
            }
            title="Squat depth check, working sets with the new low-bar setup"
            meta="Joosep Kask, uploaded yesterday, waiting on your frame-by-frame notes"
            trailing={<CaretRight aria-hidden />}
          />
        </Card>
      </ExampleBlock>

      <CodeBlock
        code={`
import { ListRow } from "@pinchblock/ui"

<Card className="divide-y divide-border">
  <ListRow
    interactive
    onClick={openAthlete}
    leading={<Avatar ... />}
    title="Mari Tamm"
    meta="Deadlift day, checked in 2 h ago"
    trailing={<CaretRight />}
  />
  {/* Static row when the trailing slot is a Button: */}
  <ListRow title="Streak at risk" trailing={<Button size="sm">Nudge</Button>} />
</Card>
`}
      />
    </div>
  )
}
