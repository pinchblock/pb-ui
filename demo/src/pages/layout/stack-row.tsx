import { Barbell, Flame } from "@phosphor-icons/react"

import { Grow, Row } from "../../../../src/components/row.tsx"
import { Stack } from "../../../../src/components/stack.tsx"
import { Button } from "../../../../src/components/ui/button.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

/**
 * Kit page: Stack, Row and Grow live in one module and are always
 * used together, so they share one page.
 */

const GAPS = [1, 2, 3, 4, 6, 8] as const
const ALIGNS = ["start", "center", "end"] as const
const JUSTIFIES = ["start", "center", "end", "between"] as const

function GapTile() {
  return <div className="h-8 w-16 rounded-md bg-primary-soft" />
}

export default function StackRowPage() {
  return (
    <div>
      <PageIntro
        title="Stack & Row"
        description="Kit page for the flex primitives: Stack (vertical), Row (horizontal) and Grow (flexible spacer). Gap rides the 1-8 token scale; align, justify and wrap are constrained props."
        use="Reach for Stack and Row before writing flex flex-col gap-* by hand; ad-hoc flex strings are exactly what these replace. Grow pushes siblings apart without margin hacks. For two-dimensional layouts use CSS grid directly."
      />

      <Showcase
        title="Stack gap scale"
        hint="Gap classes are a literal gap-1..gap-8 map: Tailwind cannot see dynamic class names."
      >
        <VariantRow>
          {GAPS.map((gap) => (
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
      </Showcase>

      <Showcase title="Row align" hint="Row defaults to align=center; Stack defaults to stretch.">
        <VariantRow>
          {ALIGNS.map((align) => (
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
      </Showcase>

      <Showcase title="Row justify" hint="Constrained to start, center, end, between.">
        <VariantRow>
          {JUSTIFIES.map((justify) => (
            <div key={justify} className="rounded-lg border border-border p-3">
              <p className="mb-2 font-mono text-xs text-muted-foreground">justify={justify}</p>
              <Row gap={2} justify={justify} className="w-56 rounded-md bg-background-sunken p-2">
                <div className="size-6 rounded-sm bg-chart-1" />
                <div className="size-6 rounded-sm bg-chart-2" />
                <div className="size-6 rounded-sm bg-chart-4" />
              </Row>
            </div>
          ))}
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Session rows with a Grow spacer"
        description="The everyday pattern: icon, two-line Stack, Grow, trailing action. No margins, no justify-between gymnastics."
      >
        <Stack gap={2} className="max-w-xl">
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
      </ExampleBlock>

      <CodeBlock
        code={`
import { Grow, Row, Stack } from "@pinchblock/ui"

<Row gap={3}>
  <SessionIcon />
  <Stack gap={1}>
    <span className="text-sm font-medium">Pull day · Week 6</span>
    <span className="text-xs text-muted-foreground">6 exercises · 45 min</span>
  </Stack>
  <Grow />
  <Button size="sm" variant="soft">Start</Button>
</Row>
`}
      />
    </div>
  )
}
