import { PreviewCard } from "@base-ui/react/preview-card"
import * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * HoverCard. Rich preview that opens on hover or keyboard focus, for
 * FollowsHoverCard-style profile previews. Touch fallback: devices
 * without hover open it on first tap (the tap that opens it does not
 * follow the trigger link; a second tap navigates).
 *
 * <HoverCard>
 *   <HoverCardTrigger href="/coach/maria">@coach_maria</HoverCardTrigger>
 *   <HoverCardPopup>...profile preview...</HoverCardPopup>
 * </HoverCard>
 */
interface HoverCardContextValue {
  open: boolean
  openFromTouch: () => void
}

const HoverCardContext = React.createContext<HoverCardContextValue | null>(null)

export interface HoverCardProps extends Omit<PreviewCard.Root.Props, "onOpenChange"> {
  /** eventDetails is absent when the touch fallback opened the card. */
  onOpenChange?: (open: boolean, eventDetails?: PreviewCard.Root.ChangeEventDetails) => void
}

export function HoverCard({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: HoverCardProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  const handleOpenChange = (
    next: boolean,
    eventDetails?: PreviewCard.Root.ChangeEventDetails,
  ) => {
    setUncontrolledOpen(next)
    onOpenChange?.(next, eventDetails)
  }

  const context: HoverCardContextValue = {
    open,
    openFromTouch: () => handleOpenChange(true),
  }

  return (
    <HoverCardContext.Provider value={context}>
      <PreviewCard.Root open={open} onOpenChange={handleOpenChange} {...props} />
    </HoverCardContext.Provider>
  )
}

export function HoverCardTrigger({ onClick, ...props }: PreviewCard.Trigger.Props) {
  const context = React.useContext(HoverCardContext)
  return (
    <PreviewCard.Trigger
      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event as never)
        if (event.defaultPrevented || !context || context.open) return
        /* Hover cannot happen on coarse pointers: first tap previews. */
        const pointerType = (event.nativeEvent as PointerEvent).pointerType
        const isTouch = pointerType
          ? pointerType !== "mouse"
          : typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
        if (isTouch) {
          event.preventDefault()
          context.openFromTouch()
        }
      }}
      {...props}
    />
  )
}

export interface HoverCardPopupProps extends Omit<PreviewCard.Popup.Props, "className"> {
  className?: string
  side?: PreviewCard.Positioner.Props["side"]
  align?: PreviewCard.Positioner.Props["align"]
  sideOffset?: PreviewCard.Positioner.Props["sideOffset"]
  alignOffset?: PreviewCard.Positioner.Props["alignOffset"]
}

export function HoverCardPopup({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset,
  ...props
}: HoverCardPopupProps) {
  return (
    <PreviewCard.Portal>
      <PreviewCard.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50"
      >
        <PreviewCard.Popup
          className={cn(
            "w-80 max-w-(--available-width) rounded-xl border border-border bg-popover p-4",
            "text-sm text-popover-foreground shadow-raised outline-none",
            "origin-(--transform-origin)",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-(--duration-fast) ease-(--ease-out)",
            className,
          )}
          {...props}
        />
      </PreviewCard.Positioner>
    </PreviewCard.Portal>
  )
}
