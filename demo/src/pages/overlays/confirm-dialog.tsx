import { useState } from "react"

import { Button, ConfirmDialog, toast, Toaster, useConfirm } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function ConfirmDialogPage() {
  const [controlledOpen, setControlledOpen] = useState(false)
  const { confirm, confirmDialog } = useConfirm()

  async function handleUnenroll() {
    const ok = await confirm({
      title: "Unenroll from Hypertrophy Block II?",
      description:
        "Your coach keeps your logs, but the remaining 3 weeks disappear from your calendar.",
      confirmLabel: "Unenroll",
      cancelLabel: "Stay enrolled",
      destructive: true,
    })
    if (ok) toast.info("Unenrolled from Hypertrophy Block II")
  }

  return (
    <div>
      <PageIntro
        title="ConfirmDialog"
        description="Promise-based replacement for window.confirm on the alert-dialog primitive. Outside clicks do not dismiss; Escape cancels. An async onConfirm keeps the confirm button in a loading state until it settles."
        use="Every destructive or hard-to-undo action goes through it: deleting posts, unenrolling, discarding drafts. Confirming routine actions is noise; prefer doing the thing and offering undo via toast."
      />

      <Showcase
        title="Controlled, async onConfirm"
        hint="The component form for non-destructive confirms; the button shows loading while onConfirm runs."
      >
        <VariantRow>
          <Button variant="secondary" onClick={() => setControlledOpen(true)}>
            Publish workout
          </Button>
        </VariantRow>
        <ConfirmDialog
          open={controlledOpen}
          onOpenChange={setControlledOpen}
          title="Publish workout to the community feed?"
          description="Anyone on Pinchblock can view and clone it."
          confirmLabel="Publish"
          onConfirm={async () => {
            await new Promise((resolve) => setTimeout(resolve, 900))
            toast.success("Workout published")
          }}
        />
      </Showcase>

      <ExampleBlock
        title="Unenroll from a program"
        description="The hook form: useConfirm() returns a promise, so the flow reads as `if (await confirm(...))`. Destructive styles the confirm button red."
      >
        <div className="flex max-w-md items-center justify-between rounded-xl border border-border bg-card p-4">
          <div>
            <p className="font-medium text-card-foreground">Hypertrophy Block II</p>
            <p className="text-sm text-muted-foreground">Week 5 of 8, coached by Maria Kask</p>
          </div>
          <Button variant="destructive-soft" onClick={handleUnenroll}>
            Unenroll
          </Button>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { ConfirmDialog, useConfirm } from "@pinchblock/ui"

// Hook form: promise-based, one dialog per call site.
const { confirm, confirmDialog } = useConfirm()

async function handleUnenroll() {
  const ok = await confirm({
    title: "Unenroll from Hypertrophy Block II?",
    description: "The remaining 3 weeks disappear from your calendar.",
    confirmLabel: "Unenroll",
    destructive: true,
  })
  if (ok) unenroll()
}
// Render {confirmDialog} once in the component's JSX.

// Controlled form: async onConfirm keeps the button loading.
<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Publish workout to the community feed?"
  confirmLabel="Publish"
  onConfirm={publish}
/>
`}
      />

      {confirmDialog}
      <Toaster />
    </div>
  )
}
