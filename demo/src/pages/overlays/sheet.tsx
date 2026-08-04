import { Barbell } from "@phosphor-icons/react"
import { useState } from "react"

import {
  Button,
  Field,
  Input,
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
  Textarea,
  toast,
  Toaster,
  useConfirm,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

/** The composed log-session flow: right sheet, form fields, nested
 * discard confirm. The pattern behind LogSessionPanel. */
function LogSessionSheet() {
  const [open, setOpen] = useState(false)
  const { confirm, confirmDialog } = useConfirm()

  async function handleDiscard() {
    const discard = await confirm({
      title: "Discard this session?",
      description: "Sets you have entered will not be saved.",
      confirmLabel: "Discard",
      cancelLabel: "Keep editing",
      destructive: true,
    })
    if (discard) setOpen(false)
  }

  return (
    <>
      <Sheet side="right" open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button />}>
          <Barbell aria-hidden /> Log session
        </SheetTrigger>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Log session</SheetTitle>
            <SheetDescription>Tuesday: Lower body, week 3 of 8</SheetDescription>
          </SheetHeader>
          <SheetBody className="space-y-4">
            <Field label="Back squat (kg)">
              <Input placeholder="120" inputMode="decimal" />
            </Field>
            <Field label="Sets x reps">
              <Input placeholder="4 x 6" />
            </Field>
            <Field label="RPE" hint="Rate of perceived exertion, 1 to 10.">
              <Input placeholder="8" inputMode="numeric" />
            </Field>
            <Field label="Notes">
              <Textarea rows={3} placeholder="Felt strong, belt on top sets" />
            </Field>
          </SheetBody>
          <SheetFooter>
            <Button variant="ghost" onClick={handleDiscard}>
              Discard
            </Button>
            <Button
              onClick={() => {
                setOpen(false)
                toast.success("Session logged", {
                  description: "Back squat volume PR: 2,880 kg total.",
                })
              }}
            >
              Save session
            </Button>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
      {confirmDialog}
    </>
  )
}

export default function SheetPage() {
  return (
    <div>
      <PageIntro
        title="Sheet"
        description="Edge panel on the Base UI Drawer: swipe-to-dismiss follows the finger, header and footer stay pinned while the body scrolls."
        use="Right is the desktop home for task panels like logging a session. Bottom is for quick mobile actions, left for navigation and filters. For short blocking decisions use Dialog instead."
      />

      <Showcase
        title="Sides"
        hint="Each edge has a job. Swipe toward the edge (or drag the bottom handle) to dismiss."
      >
        <VariantRow>
          <Sheet side="bottom">
            <SheetTrigger render={<Button variant="secondary" />}>
              Quick log (bottom)
            </SheetTrigger>
            <SheetPopup>
              <SheetHeader className="border-b-0 pb-0 text-center">
                <SheetTitle>How did it feel?</SheetTitle>
                <SheetDescription>Swipe down or drag the handle to dismiss.</SheetDescription>
              </SheetHeader>
              <SheetBody className="flex flex-wrap items-center justify-center gap-2">
                {["Rough", "Meh", "OK", "Good", "Great"].map((feel) => (
                  <SheetClose
                    key={feel}
                    render={<Button variant="soft" pill size="sm" />}
                    onClick={() => toast.info(`Session rated: ${feel}`)}
                  >
                    {feel}
                  </SheetClose>
                ))}
              </SheetBody>
            </SheetPopup>
          </Sheet>

          <Sheet side="left">
            <SheetTrigger render={<Button variant="secondary" />}>Filters (left)</SheetTrigger>
            <SheetPopup>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <SheetBody className="space-y-2 text-sm text-muted-foreground">
                <p>Navigation and filter panels anchor left.</p>
                <p>Swipe left to dismiss.</p>
              </SheetBody>
              <SheetFooter>
                <SheetClose render={<Button variant="secondary" />}>Done</SheetClose>
              </SheetFooter>
            </SheetPopup>
          </Sheet>

          <Sheet side="right">
            <SheetTrigger render={<Button variant="secondary" />}>Details (right)</SheetTrigger>
            <SheetPopup>
              <SheetHeader>
                <SheetTitle>Exercise details</SheetTitle>
                <SheetDescription>Back squat, high bar</SheetDescription>
              </SheetHeader>
              <SheetBody className="space-y-2 text-sm text-muted-foreground">
                <p>Task panels and detail views anchor right on desktop.</p>
                <p>The body scrolls; header and footer stay pinned.</p>
              </SheetBody>
              <SheetFooter>
                <SheetClose render={<Button variant="secondary" />}>Close</SheetClose>
              </SheetFooter>
            </SheetPopup>
          </Sheet>
        </VariantRow>
      </Showcase>

      <ExampleBlock
        title="Log session with discard confirm"
        description="A right sheet composing Field, Input and Textarea, with a nested ConfirmDialog guarding unsaved sets on discard."
      >
        <LogSessionSheet />
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  Sheet, SheetTrigger, SheetPopup, SheetHeader, SheetTitle,
  SheetDescription, SheetBody, SheetFooter, SheetClose,
  Button,
} from "@pinchblock/ui"

<Sheet side="right" open={open} onOpenChange={setOpen}>
  <SheetTrigger render={<Button />}>Log session</SheetTrigger>
  <SheetPopup>
    <SheetHeader>
      <SheetTitle>Log session</SheetTitle>
      <SheetDescription>Tuesday: Lower body</SheetDescription>
    </SheetHeader>
    <SheetBody>{/* form fields */}</SheetBody>
    <SheetFooter>
      <SheetClose render={<Button variant="ghost" />}>Discard</SheetClose>
      <Button onClick={save}>Save session</Button>
    </SheetFooter>
  </SheetPopup>
</Sheet>
`}
      />

      <Toaster />
    </div>
  )
}
