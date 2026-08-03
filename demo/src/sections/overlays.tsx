import {
  BellOff,
  CalendarPlus,
  Dumbbell,
  EllipsisVertical,
  Flame,
  Link2,
  Pencil,
  Share2,
  Trash2,
} from "lucide-react"
import { useState } from "react"
import type * as React from "react"

import { Button } from "../../../src/components/ui/button.tsx"
import { ConfirmDialog, useConfirm } from "../../../src/components/ui/confirm-dialog.tsx"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../../../src/components/ui/dialog.tsx"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../src/components/ui/dropdown-menu.tsx"
import {
  HoverCard,
  HoverCardPopup,
  HoverCardTrigger,
} from "../../../src/components/ui/hover-card.tsx"
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "../../../src/components/ui/popover.tsx"
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "../../../src/components/ui/sheet.tsx"
import { Toaster, toast } from "../../../src/components/ui/toast.tsx"

import type { SinkSection } from "./types.ts"
import { Showcase, VariantRow } from "./section-shell.tsx"

/* Demo-only labelled field. Swap for the library Input/Field once the
   forms group lands; kept deliberately minimal here. */
function DemoField({
  label,
  ...inputProps
}: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        className="h-9 w-full rounded-md border border-input bg-input-background px-3 text-sm text-foreground placeholder:text-faint-foreground"
        {...inputProps}
      />
    </label>
  )
}

function DialogDemo() {
  return (
    <div className="space-y-6">
      <VariantRow>
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
                onClick={() => toast.success("Program started", {
                  description: "First session is on your calendar for tomorrow.",
                })}
              >
                Start program
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </Dialog>

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
      <p className="text-xs text-muted-foreground">
        Responsive: below the sm breakpoint the same dialog presents as a bottom
        sheet (slides up, rounded top); on larger screens it centers with a fade
        and zoom. Narrow the window and reopen to compare.
      </p>
    </div>
  )
}

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
          <Dumbbell aria-hidden /> Log session
        </SheetTrigger>
        <SheetPopup>
          <SheetHeader>
            <SheetTitle>Log session</SheetTitle>
            <SheetDescription>Tuesday: Lower body, week 3 of 8</SheetDescription>
          </SheetHeader>
          <SheetBody className="space-y-4">
            <DemoField label="Back squat (kg)" placeholder="120" inputMode="decimal" />
            <DemoField label="Sets x reps" placeholder="4 x 6" />
            <DemoField label="RPE" placeholder="8" inputMode="numeric" />
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Notes</span>
              <textarea
                rows={3}
                placeholder="Felt strong, belt on top sets"
                className="w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm text-foreground placeholder:text-faint-foreground"
              />
            </label>
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

function SheetDemo() {
  return (
    <div className="space-y-6">
      <VariantRow>
        <LogSessionSheet />

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
          <SheetTrigger render={<Button variant="secondary" />}>Left sheet</SheetTrigger>
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
      </VariantRow>
      <p className="text-xs text-muted-foreground">
        Sheets are Base UI Drawers: swipe-to-dismiss follows the finger, header
        and footer stay pinned while the body scrolls, and the right sheet is
        the desktop home for panels like LogSessionPanel.
      </p>
    </div>
  )
}

function PopoverDemo() {
  return (
    <VariantRow>
      <Popover>
        <PopoverTrigger render={<Button variant="secondary" />}>
          Session summary
        </PopoverTrigger>
        <PopoverPopup>
          <div className="space-y-2">
            <PopoverTitle>Tuesday: Lower body</PopoverTitle>
            <PopoverDescription>
              5 exercises, 18 sets, 52 min. Est. tonnage 7,410 kg.
            </PopoverDescription>
            <div className="flex items-center gap-2 pt-1">
              <Flame aria-hidden className="size-4 text-warning" />
              <span className="text-xs text-muted-foreground">12-day streak intact</span>
            </div>
          </div>
        </PopoverPopup>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="secondary" />}>With arrow</PopoverTrigger>
        <PopoverPopup arrow side="top">
          <PopoverTitle>Streak freeze</PopoverTitle>
          <PopoverDescription className="mt-1">
            Miss a day without losing your streak. You have 2 left this month.
          </PopoverDescription>
        </PopoverPopup>
      </Popover>

      <Popover>
        <PopoverTrigger render={<Button variant="ghost" />}>Align start</PopoverTrigger>
        <PopoverPopup align="start" className="w-56">
          <PopoverDescription>
            Positioner props (side, align, offsets) pass straight through.
          </PopoverDescription>
        </PopoverPopup>
      </Popover>
    </VariantRow>
  )
}

function DropdownMenuDemo() {
  const [muted, setMuted] = useState(false)
  const [sort, setSort] = useState("newest")
  const { confirm, confirmDialog } = useConfirm()

  async function handleDelete() {
    const remove = await confirm({
      title: "Delete this post?",
      description: "The post and its 14 comments are removed for everyone.",
      confirmLabel: "Delete post",
      destructive: true,
    })
    if (remove) toast.info("Post deleted")
  }

  return (
    <div className="space-y-6">
      <VariantRow>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="secondary" />}>
            Post actions <EllipsisVertical aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuPopup>
            <DropdownMenuItem onClick={() => toast.info("Editing post")}>
              <Pencil aria-hidden /> Edit post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("Link copied")}>
              <Link2 aria-hidden /> Copy link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 aria-hidden /> Share to feed
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={muted}
              onCheckedChange={setMuted}
            >
              <BellOff aria-hidden /> Mute notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuGroupLabel>Sort comments</DropdownMenuGroupLabel>
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">Newest first</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="top">Top voted</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleDelete}>
              <Trash2 aria-hidden /> Delete post
            </DropdownMenuItem>
          </DropdownMenuPopup>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" aria-label="Session menu" />}
          >
            <EllipsisVertical aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuPopup align="end">
            <DropdownMenuItem>
              <CalendarPlus aria-hidden /> Reschedule
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Share2 aria-hidden /> Share (coach only)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 aria-hidden /> Remove session
            </DropdownMenuItem>
          </DropdownMenuPopup>
        </DropdownMenu>
      </VariantRow>
      <p className="text-xs text-muted-foreground">
        Arrow keys navigate, typeahead jumps to items, checkbox and radio items
        keep the menu open. The destructive item pairs red text with the
        destructive-soft highlight.
      </p>
      {confirmDialog}
    </div>
  )
}

function ToastDemo() {
  return (
    <div className="space-y-6">
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
      <p className="text-xs text-muted-foreground">
        toast.success/destructive/info/warning/ai(message, {"{ description }"}) works
        from anywhere (toast.error is an alias of toast.destructive); the Toaster is
        mounted once. Auto-dismiss after 5s, swipe down or right to dismiss, hover to
        expand the stack (max 3 visible).
      </p>
      {/* One Toaster serves every section on this page. */}
      <Toaster />
    </div>
  )
}

function ConfirmDemo() {
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
    <div className="space-y-6">
      <VariantRow>
        <Button variant="destructive-soft" onClick={handleUnenroll}>
          Unenroll from program
        </Button>
        <Button variant="secondary" onClick={() => setControlledOpen(true)}>
          Non-destructive confirm
        </Button>
      </VariantRow>
      <p className="text-xs text-muted-foreground">
        useConfirm() returns a promise: `if (await confirm(...))`. Outside
        clicks do not dismiss an alert dialog; Escape cancels. Async onConfirm
        keeps the button in a loading state until it settles.
      </p>
      {confirmDialog}
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
    </div>
  )
}

function HoverCardDemo() {
  return (
    <div className="space-y-6">
      <p className="max-w-md text-sm text-foreground">
        Programmed by{" "}
        <HoverCard>
          <HoverCardTrigger
            href="#overlay-hover-card"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            @coach_maria
          </HoverCardTrigger>
          <HoverCardPopup>
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base font-semibold text-primary"
              >
                MK
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">Maria Kask</p>
                <p className="text-xs text-muted-foreground">
                  Strength coach, Tallinn. Powerlifting and GPP.
                </p>
                <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                  <span>
                    <strong className="text-foreground">128</strong> athletes
                  </span>
                  <span>
                    <strong className="text-foreground">12</strong> programs
                  </span>
                  <span>
                    <strong className="text-foreground">4.9</strong> rating
                  </span>
                </div>
              </div>
            </div>
            <Button size="sm" className="mt-3 w-full" onClick={() => toast.success("Following Maria Kask")}>
              Follow
            </Button>
          </HoverCardPopup>
        </HoverCard>{" "}
        with progression based on your last block.
      </p>
      <p className="text-xs text-muted-foreground">
        Opens on hover (600ms delay) or keyboard focus. On touch screens the
        first tap opens the preview instead of navigating; a second tap follows
        the link.
      </p>
    </div>
  )
}

export const sections: SinkSection[] = [
  {
    id: "overlay-dialog",
    label: "Dialog",
    render: () => (
      <Showcase
        title="Dialog"
        hint="Modal task surface. Bottom sheet under sm, centered card above; backdrop uses the overlay token with blur."
      >
        <DialogDemo />
      </Showcase>
    ),
  },
  {
    id: "overlay-sheet",
    label: "Sheet",
    render: () => (
      <Showcase
        title="Sheet"
        hint="Edge panels on the Base UI Drawer: swipe to dismiss, sticky header/footer, scrolling body. Includes the composed log-session flow with a nested discard confirm."
      >
        <SheetDemo />
      </Showcase>
    ),
  },
  {
    id: "overlay-popover",
    label: "Popover",
    render: () => (
      <Showcase
        title="Popover"
        hint="Anchored non-modal popup; optional arrow, full positioner control."
      >
        <PopoverDemo />
      </Showcase>
    ),
  },
  {
    id: "overlay-dropdown-menu",
    label: "Dropdown menu",
    render: () => (
      <Showcase
        title="Dropdown menu"
        hint="Icons, checkbox and radio items, separators, disabled and destructive items. Replaces the details/summary post menus."
      >
        <DropdownMenuDemo />
      </Showcase>
    ),
  },
  {
    id: "overlay-toast",
    label: "Toast",
    render: () => (
      <Showcase
        title="Toast"
        hint="Every tone fires a real toast; they stack, swipe away, and expand on hover."
      >
        <ToastDemo />
      </Showcase>
    ),
  },
  {
    id: "overlay-confirm-dialog",
    label: "Confirm dialog",
    render: () => (
      <Showcase
        title="Confirm dialog"
        hint="Promise-based replacement for window.confirm, on the alert-dialog primitive."
      >
        <ConfirmDemo />
      </Showcase>
    ),
  },
  {
    id: "overlay-hover-card",
    label: "Hover card",
    render: () => (
      <Showcase
        title="Hover card"
        hint="Profile previews on hover/focus with a tap fallback on touch, for FollowsHoverCard."
      >
        <HoverCardDemo />
      </Showcase>
    ),
  },
]
