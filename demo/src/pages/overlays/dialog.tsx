import { Button } from "../../../../src/components/ui/button.tsx"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../../../src/components/ui/dialog.tsx"
import { Toaster, toast } from "../../../../src/components/ui/toast.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function DialogPage() {
  return (
    <div>
      <PageIntro
        title="Dialog"
        description="Modal task surface on the Base UI Dialog. Below the sm breakpoint it presents as a bottom sheet (slides up, rounded top); on larger screens it centers with a fade and zoom. The backdrop uses the overlay token with blur."
        use="Use for short, focused tasks that interrupt the page: program details, swap decisions, small forms. Side panels and longer forms belong in Sheet; irreversible actions go through ConfirmDialog."
      />

      <Showcase
        title="Sizes"
        hint="sm for a single decision, md (default) for content, lg for dense layouts. Narrow the window and reopen to see the bottom-sheet presentation."
      >
        <VariantRow>
          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Small (sm)</DialogTrigger>
            <DialogPopup size="sm">
              <DialogHeader>
                <DialogTitle>Rest day?</DialogTitle>
                <DialogDescription>
                  Your readiness score is low. Swap today for active recovery?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Keep session</DialogClose>
                <DialogClose render={<Button />}>Swap to recovery</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>

          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Default (md)</DialogTrigger>
            <DialogPopup>
              <DialogHeader>
                <DialogTitle>Session notes</DialogTitle>
                <DialogDescription>Tuesday: Lower body, week 3 of 8.</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-foreground">
                Felt strong on top sets. Belt from 100 kg. Left knee niggle gone
                after the longer warm-up, keep the extra ramp sets.
              </p>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>

          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Large (lg)</DialogTrigger>
            <DialogPopup size="lg">
              <DialogHeader>
                <DialogTitle>Block history</DialogTitle>
                <DialogDescription>
                  Every completed block with volume and PR counts.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 sm:grid-cols-3">
                {["Base Strength", "Peaking", "Hypertrophy I"].map((block, i) => (
                  <div key={block} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium text-foreground">{block}</p>
                    <p className="text-xs text-muted-foreground">
                      {8 - i} weeks, {3 + i} PRs
                    </p>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="secondary" />}>Close</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Program details"
        description="A details-then-commit flow: the primary action closes the dialog and confirms with a toast."
      >
        <Dialog>
          <DialogTrigger render={<Button />}>View program details</DialogTrigger>
          <DialogPopup>
            <DialogHeader>
              <DialogTitle>Hypertrophy Block II</DialogTitle>
              <DialogDescription>
                8 weeks, 4 sessions per week, programmed by Maria Kask.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm text-foreground">
              <p>
                Week 1 starts with a volume reset: 3 sets at RPE 7 on the main lifts,
                then accessories superset with core work.
              </p>
              <p className="text-muted-foreground">
                Your 1RM estimates carry over from the previous block.
              </p>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>Not now</DialogClose>
              <DialogClose
                render={<Button />}
                onClick={() =>
                  toast.success("Program started", {
                    description: "First session is on your calendar for tomorrow.",
                  })
                }
              >
                Start program
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </Dialog>
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  Dialog, DialogTrigger, DialogPopup, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
  Button,
} from "@pinchblock/ui"

<Dialog>
  <DialogTrigger render={<Button />}>View program details</DialogTrigger>
  <DialogPopup size="sm">
    <DialogHeader>
      <DialogTitle>Rest day?</DialogTitle>
      <DialogDescription>Swap today for active recovery?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Keep session</DialogClose>
      <DialogClose render={<Button />} onClick={swap}>Swap to recovery</DialogClose>
    </DialogFooter>
  </DialogPopup>
</Dialog>
`}
      />

      <Toaster />
    </div>
  )
}
