import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup } from "@base-ui/react/toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { createContext, useContext, useState } from "react"

import { cn } from "../../lib/cn.ts"

/**
 * SegmentedControl. Single-select segment bar (theme switcher, auth
 * role toggle, feel picker). Base UI ToggleGroup underneath (roving
 * focus, arrow keys, aria-pressed) with the always-one-selected
 * invariant enforced here: pressing the active segment keeps it.
 */
export const segmentedControlVariants = cva(
  "inline-flex items-stretch rounded-lg bg-muted p-1",
  {
    variants: {
      size: {
        sm: "h-8",
        md: "h-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const segmentedControlItemVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap text-muted-foreground select-none",
    "transition-[background-color,color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:text-foreground",
    "data-pressed:bg-card data-pressed:text-primary data-pressed:shadow-card",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      size: {
        sm: "px-2.5 text-xs",
        md: "px-3 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const SegmentedControlContext = createContext<{ size: "sm" | "md" }>({ size: "md" })

export interface SegmentedControlProps
  extends Omit<
    ToggleGroup.Props<string>,
    "className" | "value" | "defaultValue" | "onValueChange" | "multiple"
  > {
  className?: string
  size?: "sm" | "md"
  /** Selected segment value (controlled). */
  value?: string
  /** Initially selected segment value (uncontrolled). */
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function SegmentedControl({
  className,
  size = "md",
  value,
  defaultValue,
  onValueChange,
  children,
  ...props
}: SegmentedControlProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value !== undefined ? value : internal
  return (
    <SegmentedControlContext.Provider value={{ size }}>
      <ToggleGroup
        value={current !== undefined ? [current] : []}
        onValueChange={(groupValue) => {
          const next = groupValue[groupValue.length - 1]
          /* Deselecting the active segment would empty the group; keep it. */
          if (next === undefined || next === current) {
            return
          }
          if (value === undefined) {
            setInternal(next)
          }
          onValueChange?.(next)
        }}
        className={cn(segmentedControlVariants({ size }), className)}
        {...props}
      >
        {children}
      </ToggleGroup>
    </SegmentedControlContext.Provider>
  )
}

export interface SegmentedControlItemProps
  extends Omit<Toggle.Props<string>, "className" | "value">,
    VariantProps<typeof segmentedControlItemVariants> {
  className?: string
  value: string
}

export function SegmentedControlItem({
  className,
  size,
  ...props
}: SegmentedControlItemProps) {
  const context = useContext(SegmentedControlContext)
  return (
    <Toggle
      className={cn(segmentedControlItemVariants({ size: size ?? context.size }), className)}
      {...props}
    />
  )
}
