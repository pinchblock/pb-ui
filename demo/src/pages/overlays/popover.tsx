import { Flame } from "@phosphor-icons/react"

import {
  Button,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@pinchblock/ui"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function PopoverPage() {
  return (
    <div>
      <PageIntro
        title="Popover"
        description="Anchored non-modal popup on the Base UI Popover. Outside click and Escape dismiss; positioner props (side, align, offsets) pass straight through to the popup."
        use="Use for glanceable detail that does not demand a decision: session summaries, streak info, inline explanations. If the user must act, use Dialog; for lists of actions use DropdownMenu."
      />

      <Showcase title="Basic" hint="Title and description parts wire up the accessible name automatically.">
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
        </VariantRow>
      </Showcase>

      <Showcase title="Positioning" hint="Optional arrow, side and align control placement relative to the trigger.">
        <VariantRow>
          <Popover>
            <PopoverTrigger render={<Button variant="secondary" />}>Arrow, top</PopoverTrigger>
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
      </Showcase>

      <ExampleBlock
        title="Streak detail on a stat row"
        description="A quiet trigger on a dashboard stat opens the explanation without leaving the page."
      >
        <div className="flex max-w-md items-center justify-between rounded-xl border border-border bg-card p-4">
          <div>
            <p className="text-sm text-muted-foreground">Current streak</p>
            <p className="flex items-center gap-1.5 text-xl font-semibold text-foreground">
              <Flame aria-hidden className="size-5 text-warning" /> 12 days
            </p>
          </div>
          <Popover>
            <PopoverTrigger render={<Button variant="ghost" size="sm" />}>
              How streaks work
            </PopoverTrigger>
            <PopoverPopup arrow side="top" align="end">
              <PopoverTitle>Keeping your streak</PopoverTitle>
              <PopoverDescription className="mt-1">
                Any logged activity counts: a session, a walk, even mobility work.
                Freezes cover the days life wins; you have 2 left this month.
              </PopoverDescription>
            </PopoverPopup>
          </Popover>
        </div>
      </ExampleBlock>

      <CodeBlock
        code={`
import {
  Popover, PopoverTrigger, PopoverPopup,
  PopoverTitle, PopoverDescription,
  Button,
} from "@pinchblock/ui"

<Popover>
  <PopoverTrigger render={<Button variant="secondary" />}>
    Session summary
  </PopoverTrigger>
  <PopoverPopup arrow side="top">
    <PopoverTitle>Tuesday: Lower body</PopoverTitle>
    <PopoverDescription>5 exercises, 18 sets, 52 min.</PopoverDescription>
  </PopoverPopup>
</Popover>
`}
      />
    </div>
  )
}
