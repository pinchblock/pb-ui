import { Barbell, Bell, MagnifyingGlass, Plus, VideoCamera } from "@phosphor-icons/react"

import { Button } from "../../../../src/components/ui/button.tsx"
import { IconButton } from "../../../../src/components/ui/icon-button.tsx"
import { Kbd } from "../../../../src/components/ui/kbd.tsx"
import { Separator } from "../../../../src/components/ui/separator.tsx"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../src/components/ui/tooltip.tsx"
import { CodeBlock, ExampleBlock, PageIntro, Showcase, VariantRow } from "../../sink/showcase.tsx"

export default function TooltipPage() {
  return (
    <div>
      <TooltipProvider>
        <PageIntro
          title="Tooltip"
          description="Base UI tooltip behind a shared TooltipProvider: 300ms delay, instant open while moving between adjacent triggers, opens on keyboard focus too."
          use="Name icon-only controls and surface shortcut hints. Never put essential content in a tooltip (touch users may never see it), and never tooltip an element that already has visible text saying the same thing."
        />

        <Showcase
          title="Basics"
          hint="The first tooltip is defaultOpen so you can see the treatment without hovering."
        >
          <VariantRow>
            <Tooltip defaultOpen>
              <TooltipTrigger render={<IconButton aria-label="Log a session" variant="secondary" />}>
                <Barbell />
              </TooltipTrigger>
              <TooltipContent>
                Log a session <Kbd className="ml-1">L</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Search" variant="secondary" />}>
                <MagnifyingGlass />
              </TooltipTrigger>
              <TooltipContent>
                Search <Kbd className="ml-1">⌘</Kbd>
                <Kbd className="ml-0.5">K</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Notifications" variant="secondary" />}>
                <Bell />
              </TooltipTrigger>
              <TooltipContent side="bottom">You are all caught up</TooltipContent>
            </Tooltip>
          </VariantRow>
        </Showcase>

        <Showcase title="Placement" hint="side and align forward to the Base UI positioner; top is the default.">
          <VariantRow>
            <Tooltip>
              <TooltipTrigger render={<Button variant="secondary" size="sm" />}>Top</TooltipTrigger>
              <TooltipContent>Placed on top</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="secondary" size="sm" />}>Right</TooltipTrigger>
              <TooltipContent side="right">Placed to the right</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="secondary" size="sm" />}>Bottom</TooltipTrigger>
              <TooltipContent side="bottom">Placed below</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="secondary" size="sm" />}>Left</TooltipTrigger>
              <TooltipContent side="left">Placed to the left</TooltipContent>
            </Tooltip>
          </VariantRow>
        </Showcase>

        <ExampleBlock
          title="Session toolbar"
          description="Icon-only toolbar where every control gets a name; move between triggers and they open instantly."
        >
          <div className="flex max-w-md items-center gap-1 rounded-xl border border-border bg-card px-3 py-2">
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Add exercise" />}>
                <Plus />
              </TooltipTrigger>
              <TooltipContent>Add exercise</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Record attempt" />}>
                <VideoCamera />
              </TooltipTrigger>
              <TooltipContent>Record attempt</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <Tooltip>
              <TooltipTrigger render={<IconButton aria-label="Log a session" />}>
                <Barbell />
              </TooltipTrigger>
              <TooltipContent>
                Log a session <Kbd className="ml-1">L</Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
        </ExampleBlock>

        <CodeBlock
          code={`
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@pinchblock/ui"

// Once, near the app root:
<TooltipProvider>...</TooltipProvider>

<Tooltip>
  <TooltipTrigger render={<IconButton aria-label="Log a session" />}>
    <Barbell />
  </TooltipTrigger>
  <TooltipContent>
    Log a session <Kbd className="ml-1">L</Kbd>
  </TooltipContent>
</Tooltip>
`}
        />
      </TooltipProvider>
    </div>
  )
}
