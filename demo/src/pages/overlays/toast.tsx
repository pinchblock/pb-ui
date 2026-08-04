import { CloudSlash, FloppyDisk } from "@phosphor-icons/react"

import { Button, toast, Toaster } from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function ToastPage() {
  return (
    <div>
      <PageIntro
        title="Toast"
        description="Stacked notifications callable from anywhere: mount the Toaster once, then fire toast.success/destructive/info/warning/ai(message, { description }). Auto-dismiss after 5s, swipe down or right to dismiss, hover to expand the stack (max 3 visible)."
        use="Confirm outcomes the user did not navigate to: saves, syncs, PRs, coach comments. Never for errors that block the current form (use Field errors or Alert), and the ai tone only for AI-assisted moments."
      />

      <Showcase
        title="Tones"
        hint="Every button fires a real toast; fire several to see stacking and hover-to-expand. toast.error is an alias of toast.destructive."
      >
        <VariantRow>
          <Button
            variant="secondary"
            onClick={() =>
              toast.success("PR unlocked", {
                description: "Back squat 3RM up 5 kg since April.",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.destructive("Sync failed", {
                description: "Session saved locally; retrying when back online.",
                priority: "high",
              })
            }
          >
            Destructive
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.info("Coach Maria commented on your squat video")}
          >
            Info
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.warning("Streak at risk", {
                description: "Log any activity before midnight to keep day 12.",
              })
            }
          >
            Warning
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.ai("Deload suggested", {
                description: "Recovery trend says drop volume 30% this week.",
              })
            }
          >
            AI
          </Button>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Save and sync feedback"
        description="The standard pairing: success confirms a background save, destructive with high priority reports a failed sync."
      >
        <div className="flex max-w-md flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div>
            <p className="font-medium text-card-foreground">Tuesday: Lower body</p>
            <p className="text-sm text-muted-foreground">18 sets entered, not yet saved.</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() =>
                toast.success("Session logged", {
                  description: "Back squat volume PR: 2,880 kg total.",
                })
              }
            >
              <FloppyDisk aria-hidden /> Save session
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                toast.destructive("Sync failed", {
                  description: "Saved locally; retrying when back online.",
                  priority: "high",
                })
              }
            >
              <CloudSlash aria-hidden /> Simulate offline save
            </Button>
          </div>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import { Toaster, toast } from "@pinchblock/ui"

// Mount once, near the app root:
<Toaster />

// Fire from anywhere (components, mutations, event handlers):
toast.success("Session logged", {
  description: "Back squat volume PR: 2,880 kg total.",
})
toast.destructive("Sync failed", { priority: "high" })
toast.ai("Deload suggested", {
  description: "Recovery trend says drop volume 30% this week.",
})
`}
      />

      <Toaster />
    </div>
  )
}
