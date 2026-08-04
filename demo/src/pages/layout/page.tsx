import { Play } from "@phosphor-icons/react"

import { Page } from "../../../../src/components/page.tsx"
import { Grow, Row } from "../../../../src/components/row.tsx"
import { Stack } from "../../../../src/components/stack.tsx"
import { Button } from "../../../../src/components/ui/button.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const SIZES = ["sm", "md", "lg", "xl", "full"] as const

export default function PagePage() {
  return (
    <div>
      <PageIntro
        title="Page"
        description="Width-capped content container with responsive horizontal padding (px-4 / sm:px-6 / lg:px-8). Five sizes, lg is the default."
        use="Wrap every routed view's content in a Page so line lengths stay readable on wide screens. Pass a PageHeader (content group) as the first child; Page deliberately does not import it, keeping the layout and content groups decoupled."
      />

      <Showcase
        title="Sizes"
        hint="sm max-w-xl · md max-w-3xl · lg max-w-5xl (default) · xl max-w-7xl · full. Resize the window to see the responsive padding."
      >
        <Stack gap={2}>
          {SIZES.map((size) => (
            <div key={size} className="rounded-md bg-background-sunken py-2">
              <Page
                size={size}
                className="rounded-sm border border-dashed border-border-strong bg-card py-2 text-center font-mono text-xs text-muted-foreground"
              >
                size="{size}"
              </Page>
            </div>
          ))}
        </Stack>
      </Showcase>

      <ExampleBlock
        title="Plan overview at reading width"
        description='A dashboard view inside Page size="md": the cap keeps stat cards and copy from stretching across an ultrawide monitor.'
      >
        <div className="rounded-xl bg-background-sunken py-6">
          <Page size="md">
            <Stack gap={4}>
              <Row gap={3}>
                <Stack gap={1}>
                  <span className="text-lg font-semibold">Hypertrophy Block A</span>
                  <span className="text-xs text-muted-foreground">
                    Week 6 of 8 · Coach Maria Lindqvist
                  </span>
                </Stack>
                <Grow />
                <Button size="sm">
                  <Play aria-hidden />
                  Start pull day
                </Button>
              </Row>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">Sessions this week</p>
                  <p className="mt-1 text-2xl font-semibold">4 / 5</p>
                  <p className="mt-1 text-xs text-success">+1 vs last week</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="text-xs text-muted-foreground">Weekly volume</p>
                  <p className="mt-1 text-2xl font-semibold">24 300 kg</p>
                  <p className="mt-1 text-xs text-muted-foreground">Deload starts week 8</p>
                </div>
              </div>
            </Stack>
          </Page>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Page, PageHeader } from "@pinchblock/ui"

<Page size="md" className="py-6">
  <PageHeader
    title="Training plan"
    description="Week 6 of Hypertrophy Block A"
  />
  {content}
</Page>
`}
      />
    </div>
  )
}
