import { Separator } from "../../../../src/components/ui/separator.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

export default function SeparatorPage() {
  return (
    <div>
      <PageIntro
        title="Separator"
        description="Semantic divider line. Base UI Separator underneath, so screen readers hear a separator, not a styled div."
        use="Horizontal between stacked content blocks, vertical inside metadata rows. If spacing alone already separates two blocks, skip the line; separators are for when whitespace is not enough."
      />

      <Showcase title="Horizontal" hint="Full width of the container; space it with margin utilities.">
        <div className="max-w-sm">
          <p className="text-sm font-medium text-foreground">Max hangs, 5x10s at 85%</p>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">Rest 3 minutes between sets.</p>
        </div>
      </Showcase>

      <Showcase
        title="Vertical"
        hint="Needs a fixed height (h-4 here) or a stretchable flex parent; use it to divide inline metadata."
      >
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>12 sessions</span>
          <Separator orientation="vertical" className="h-4" />
          <span>4 PRs</span>
          <Separator orientation="vertical" className="h-4" />
          <span>6-week streak</span>
        </div>
      </Showcase>

      <ExampleBlock
        title="Session summary card"
        description="Horizontal separators between sections, vertical ones inside the stats row."
      >
        <div className="max-w-md rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">Fingerboard: max hangs</p>
          <p className="text-xs text-muted-foreground">Week 3, day 2</p>
          <Separator className="my-3" />
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>6 sets</span>
            <Separator orientation="vertical" className="h-4" />
            <span>85% load</span>
            <Separator orientation="vertical" className="h-4" />
            <span>42 min</span>
          </div>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground">
            Left ring finger felt tweaky on set 4; dropped to 80% and finished clean.
          </p>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Separator } from "@pinchblock/ui"

<Separator className="my-3" />

// Vertical, inside a metadata row:
<div className="flex items-center gap-3">
  <span>12 sessions</span>
  <Separator orientation="vertical" className="h-4" />
  <span>4 PRs</span>
</div>
`}
      />
    </div>
  )
}
