import { useState } from "react"

import { Badge, Button, Skeleton, SkeletonText } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase } from "../../sink/showcase.tsx"

const SESSIONS = [
  { name: "Limit bouldering", detail: "90 min, Tallinn Boulder Club", status: "Completed" },
  { name: "Fingerboard: max hangs", detail: "45 min, home board", status: "Completed" },
  { name: "Mobility and antagonists", detail: "30 min, anywhere", status: "Planned" },
]

function SessionRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <Skeleton className="h-5 w-20 rounded-full" />
    </div>
  )
}

function SessionList({ loading }: { loading: boolean }) {
  return (
    <div className="max-w-md divide-y divide-border rounded-xl border border-border bg-card px-4">
      {loading
        ? SESSIONS.map((s) => <SessionRowSkeleton key={s.name} />)
        : SESSIONS.map((s) => (
            <div key={s.name} className="flex items-center justify-between gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.detail}</p>
              </div>
              <Badge tone={s.status === "Completed" ? "success" : "info"}>{s.status}</Badge>
            </div>
          ))}
    </div>
  )
}

/** Covers Skeleton and SkeletonText. */
export default function SkeletonPage() {
  const [loading, setLoading] = useState(true)

  return (
    <div>
      <PageIntro
        title="Skeleton"
        description="Pulsing placeholder blocks, plus SkeletonText for prose. Compose them to mirror the loaded layout so nothing jumps when data lands."
        use="Content layouts you know the shape of: cards, lists, profiles. For unpredictable waits (sync, submit) use Spinner. Size skeletons with the same utilities the real content uses."
      />

      <Showcase title="Blocks" hint="A plain div; shape it with the same size and radius utilities as the content it stands in for.">
        <div className="flex max-w-md items-start gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
            <div className="flex gap-1.5 pt-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
          </div>
          <Skeleton className="size-8" />
        </div>
      </Showcase>

      <Showcase title="SkeletonText" hint="Prose placeholder; the last line is shortened, like real text.">
        <div className="max-w-sm">
          <SkeletonText lines={3} />
        </div>
      </Showcase>

      <ExampleBlock
        title="Session list loading"
        description="The skeleton mirrors the loaded rows exactly; toggle to check that nothing shifts."
      >
        <div className="space-y-3">
          <Button variant="secondary" size="sm" onClick={() => setLoading((v) => !v)}>
            {loading ? "Show loaded" : "Show loading"}
          </Button>
          <SessionList loading={loading} />
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Skeleton, SkeletonText } from "@pinchblock/ui"

// Mirror the loaded layout:
<div className="flex items-center gap-3">
  <Skeleton className="size-12 rounded-full" />
  <div className="flex-1 space-y-2">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>

<SkeletonText lines={3} />
`}
      />
    </div>
  )
}
