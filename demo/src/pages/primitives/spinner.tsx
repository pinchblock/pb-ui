import { ArrowsClockwise } from "@phosphor-icons/react"
import { useState } from "react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { Spinner } from "../../../../src/components/ui/spinner.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function SpinnerPage() {
  const [syncing, setSyncing] = useState(false)

  return (
    <div>
      <PageIntro
        title="Spinner"
        description="Indeterminate loading indicator. Announces itself to screen readers via role=status and a visually hidden label."
        use="Short, unpredictable waits: syncing, submitting, refreshing. For content layouts use Skeleton instead, and never let a spinner run forever without a fallback (guardrails)."
      />

      <Showcase title="Sizes" hint="xs 12px to xl 32px.">
        <VariantRow>
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </VariantRow>
      </Showcase>

      <Showcase
        title="With visible text"
        hint="Pass the same message as the label so sighted and screen-reader users hear one story."
      >
        <VariantRow>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner size="sm" label="Syncing sessions" />
            Syncing sessions
          </span>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner size="sm" label="Uploading video" />
            Uploading attempt video
          </span>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Watch sync"
        description="A bounded wait with visible progress text and a retry affordance when it ends."
      >
        <div className="flex max-w-md items-center justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            {syncing ? (
              <Spinner size="md" label="Syncing with watch" />
            ) : (
              <ArrowsClockwise aria-hidden className="size-5 text-muted-foreground" />
            )}
            <div>
              <p className="text-sm font-medium text-foreground">Garmin sync</p>
              <p className="text-xs text-muted-foreground">
                {syncing ? "Pulling yesterday's sessions..." : "Last synced 2 hours ago"}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            disabled={syncing}
            onClick={() => {
              setSyncing(true)
              setTimeout(() => setSyncing(false), 2000)
            }}
          >
            Sync now
          </Button>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Spinner } from "@pinchblock/ui"

<Spinner size="sm" label="Syncing sessions" />

// Paired with visible text:
<span className="flex items-center gap-2 text-sm text-muted-foreground">
  <Spinner size="sm" label="Syncing sessions" />
  Syncing sessions
</span>
`}
      />
    </div>
  )
}
