"use client"

import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { cva, type VariantProps } from "class-variance-authority"
import { DotsSixVertical, Minus, Plus } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * NumberField. Base UI NumberField family composed into one control,
 * styled like Input: bordered group with decrement / input / increment.
 * min, max, step, largeStep, smallStep, snapOnStep, format
 * (Intl.NumberFormatOptions), locale, value/onValueChange all pass
 * through to Base UI Root. Inside a Field it picks up label
 * association and data-invalid for free; standalone, set `aria-label`
 * and `aria-invalid` here (they are forwarded to the inner input).
 * Keyboard: arrows step, shift+arrow steps by largeStep, Home/End
 * jump to min/max.
 */
export const numberFieldGroupVariants = cva(
  cn(
    "flex w-full min-w-0 items-stretch overflow-hidden rounded-md border border-input bg-input-background",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "focus-within:border-ring hover:not-focus-within:border-border-strong",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-invalid:border-destructive has-aria-invalid:border-destructive",
  ),
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

/** Stepper buttons stay w-9 in both sizes: touch target floor rides --spacing. */
export const numberFieldButtonVariants = cva(
  cn(
    "flex w-9 shrink-0 items-center justify-center text-muted-foreground select-none",
    "transition-[background-color,color] duration-(--duration-fast) ease-(--ease-out)",
    "hover:bg-muted hover:text-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
)

const inputSizeClasses = {
  sm: "px-2 text-xs",
  md: "px-2.5 text-sm",
} as const

export interface NumberFieldProps
  extends Omit<BaseNumberField.Root.Props, "className">,
    VariantProps<typeof numberFieldGroupVariants> {
  className?: string
  /** Placeholder for the inner input. */
  placeholder?: string
  /** Accessible name for the inner input when not inside a Field with a label. */
  "aria-label"?: string
  /** Marks the inner input invalid and paints the border destructive. */
  "aria-invalid"?: React.AriaAttributes["aria-invalid"]
  /**
   * Adds a pointer-drag scrub handle before the steppers (Base UI
   * ScrubArea). Pointer-only affordance; keyboard stepping is
   * unaffected. Off by default.
   */
  scrub?: boolean
}

export function NumberField({
  className,
  size,
  placeholder,
  "aria-label": ariaLabel,
  "aria-invalid": ariaInvalid,
  scrub = false,
  ...props
}: NumberFieldProps) {
  return (
    <BaseNumberField.Root className={cn("w-full min-w-0", className)} {...props}>
      <BaseNumberField.Group className={numberFieldGroupVariants({ size })}>
        {scrub && (
          /* Value scrub, not reorder drag: ew-resize is the platform cursor for it. */
          <BaseNumberField.ScrubArea className="flex shrink-0 cursor-ew-resize touch-none items-center border-e border-input px-1.5 text-faint-foreground">
            <DotsSixVertical aria-hidden className="size-4" />
          </BaseNumberField.ScrubArea>
        )}
        {/* Base UI labels the steppers (Decrease/Increase) and keeps them
            out of the tab order; keyboard users step with the arrow keys. */}
        <BaseNumberField.Decrement
          className={cn(numberFieldButtonVariants(), "border-e border-input")}
        >
          <Minus aria-hidden />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid}
          className={cn(
            "h-full w-full min-w-0 flex-1 bg-transparent text-center tabular-nums text-foreground",
            "placeholder:text-faint-foreground",
            "outline-none focus-visible:outline-none",
            inputSizeClasses[size ?? "md"],
          )}
        />
        <BaseNumberField.Increment
          className={cn(numberFieldButtonVariants(), "border-s border-input")}
        >
          <Plus aria-hidden />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}
