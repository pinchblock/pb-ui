import { CalendarDots, CaretRight, Moon, Trophy } from "@phosphor-icons/react"

import { Button, Card, ListRow, SectionHeader } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function SectionHeaderPage() {
  return (
    <div>
      <PageIntro
        title="SectionHeader"
        description="Eyebrow-styled section title with an optional icon and a right-side action slot. Sits above a Card, list or table group."
        use="For labelling dashboard regions and settings groups. The action slot takes a small ghost Button or link, nothing heavier. For the page title itself use PageHeader."
      />

      <Showcase title="With icon and action" hint="The icon renders in primary; the action stays quiet.">
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
      </Showcase>

      <Showcase title="Plain" hint="Icon and action are both optional.">
        <div className="space-y-6">
          <SectionHeader icon={<Moon aria-hidden />} title="Recovery" />
          <SectionHeader title="Notifications" />
        </div>
      </Showcase>

      <ExampleBlock
        title="Dashboard section above a list"
        description="SectionHeader labels the region; the Card below holds the rows."
      >
        <div className="max-w-md space-y-2">
          <SectionHeader
            icon={<Trophy aria-hidden />}
            title="Recent PRs"
            action={
              <Button variant="ghost" size="sm">
                View all
                <CaretRight aria-hidden />
              </Button>
            }
          />
          <Card className="divide-y divide-border">
            <ListRow title="Mari Tamm" meta="Deadlift 140 kg, up 5 kg" />
            <ListRow title="Joosep Kask" meta="Squat 152.5 kg, up 2.5 kg" />
          </Card>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { SectionHeader } from "@pinchblock/ui"

<SectionHeader
  icon={<CalendarDots />}
  title="Today's sessions"
  action={
    <Button variant="ghost" size="sm">
      View all <CaretRight />
    </Button>
  }
/>
`}
      />
    </div>
  )
}
