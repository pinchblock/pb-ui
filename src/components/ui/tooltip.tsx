"use client"

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Tooltip. Base UI tooltip; wrap the app (or a subtree) in
 * TooltipProvider so adjacent tooltips share the 300ms delay and open
 * instantly while moving between triggers.
 *
 * Usage:
 *   <Tooltip>
 *     <TooltipTrigger render={<IconButton aria-label="..." />} />
 *     <TooltipContent>Label</TooltipContent>
 *   </Tooltip>
 */
export function TooltipProvider({
  delay = 300,
  ...props
}: BaseTooltip.Provider.Props) {
  return <BaseTooltip.Provider delay={delay} {...props} />
}

export function Tooltip(props: BaseTooltip.Root.Props) {
  return <BaseTooltip.Root {...props} />
}

export function TooltipTrigger({ delay = 300, ...props }: BaseTooltip.Trigger.Props) {
  return <BaseTooltip.Trigger delay={delay} {...props} />
}

export interface TooltipContentProps extends BaseTooltip.Popup.Props {
  side?: BaseTooltip.Positioner.Props["side"]
  align?: BaseTooltip.Positioner.Props["align"]
  sideOffset?: number
}

export function TooltipContent({
  className,
  side = "top",
  align = "center",
  sideOffset = 6,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <BaseTooltip.Portal>
      <BaseTooltip.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50">
        <BaseTooltip.Popup
          className={cn(
            "max-w-64 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-overlay",
            "origin-(--transform-origin) transition-[transform,opacity] duration-(--duration-fast) ease-(--ease-out)",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  )
}
