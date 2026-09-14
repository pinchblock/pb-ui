"use client"

import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/cn.ts"

/**
 * FilterChip + ChipGroup. Rounded-full pressable chips for explore
 * filters and waitlist sport pickers. FilterChip is a Base UI Toggle
 * (aria-pressed); ChipGroup coordinates several chips in single or
 * multi select mode. Standalone FilterChips (no group) also work via
 * pressed/onPressedChange.
 */
export const filterChipVariants = cva(
  cn(
    "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-transparent font-medium whitespace-nowrap text-muted-foreground select-none",
    "transition-[background-color,border-color,color] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong hover:text-foreground",
    "data-pressed:border-border-strong data-pressed:bg-secondary data-pressed:text-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  ),
  {
    variants: {
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface FilterChipProps
  extends Omit<Toggle.Props<string>, "className">,
    VariantProps<typeof filterChipVariants> {
  className?: string | undefined
  /** Result count shown after the label ("Climbing 12"). */
  count?: number
}

export function FilterChip({ className, size, count, children, ...props }: FilterChipProps) {
  return (
    <Toggle className={cn(filterChipVariants({ size }), className)} {...props}>
      {children}
      {count !== undefined && (
        /* Not aria-hidden: the count is part of the chip's accessible
           name ("Coaches 24"), not decoration. */
        <span className="text-xs tabular-nums opacity-70">{count}</span>
      )}
    </Toggle>
  )
}

export interface ChipGroupProps
  extends Omit<ToggleGroup.Props<string>, "className" | "multiple"> {
  className?: string | undefined
  /** Allow several chips pressed at once; single-select otherwise. */
  multiple?: boolean
}

export function ChipGroup({ className, multiple = false, ...props }: ChipGroupProps) {
  return (
    <ToggleGroup
      multiple={multiple}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}
