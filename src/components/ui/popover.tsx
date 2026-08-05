"use client"

import { Popover as BasePopover } from "@base-ui/react/popover"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Popover. Anchored non-modal popup for rich hints, small forms and
 * summaries. Arrow is opt-in via the `arrow` prop on PopoverPopup.
 *
 * <Popover>
 *   <PopoverTrigger render={<Button variant="secondary" />}>Open</PopoverTrigger>
 *   <PopoverPopup arrow side="top">...</PopoverPopup>
 * </Popover>
 */
export function Popover(props: BasePopover.Root.Props) {
  return <BasePopover.Root {...props} />
}

export function PopoverTrigger(props: BasePopover.Trigger.Props) {
  return <BasePopover.Trigger {...props} />
}

export function PopoverClose(props: BasePopover.Close.Props) {
  return <BasePopover.Close {...props} />
}

/** Geometry of the arrow SVG below; the offsets place it flush to the popup edge. */
const popoverArrowClassName = cn(
  "flex",
  "data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
  "data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0",
  "data-[side=left]:-right-3.25 data-[side=left]:rotate-90",
  "data-[side=right]:-left-3.25 data-[side=right]:-rotate-90",
)

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className="fill-popover"
      />
      <path
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
        className="fill-border"
      />
    </svg>
  )
}

export interface PopoverPopupProps extends Omit<BasePopover.Popup.Props, "className"> {
  className?: string | undefined
  /** Which side of the anchor to open on. May flip to avoid collisions. */
  side?: BasePopover.Positioner.Props["side"]
  align?: BasePopover.Positioner.Props["align"]
  /** Gap between anchor and popup in px. */
  sideOffset?: BasePopover.Positioner.Props["sideOffset"]
  alignOffset?: BasePopover.Positioner.Props["alignOffset"]
  /** Draws a pointing arrow toward the anchor. */
  arrow?: boolean
}

export function PopoverPopup({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset,
  arrow = false,
  children,
  ...props
}: PopoverPopupProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50"
      >
        <BasePopover.Popup
          className={cn(
            "w-72 max-w-(--available-width) rounded-xl border border-border bg-popover p-4",
            "text-sm text-popover-foreground shadow-raised outline-none",
            "origin-(--transform-origin)",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-(--duration-fast) ease-(--ease-out)",
            className,
          )}
          {...props}
        >
          {arrow && (
            <BasePopover.Arrow className={popoverArrowClassName}>
              <ArrowSvg />
            </BasePopover.Arrow>
          )}
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  )
}

export interface PopoverTitleProps extends Omit<BasePopover.Title.Props, "className"> {
  className?: string | undefined
}

export function PopoverTitle({ className, ...props }: PopoverTitleProps) {
  return (
    <BasePopover.Title
      className={cn("text-sm leading-none font-semibold", className)}
      {...props}
    />
  )
}

export interface PopoverDescriptionProps
  extends Omit<BasePopover.Description.Props, "className"> {
  className?: string | undefined
}

export function PopoverDescription({ className, ...props }: PopoverDescriptionProps) {
  return (
    <BasePopover.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
