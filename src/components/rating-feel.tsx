"use client"

import { Radio } from "@base-ui/react/radio"
import { RadioGroup } from "@base-ui/react/radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * RatingFeel. The 1-5 "how did it feel" scale, a Pinchblock signature.
 * FeelPicker is the input (radiogroup semantics via Base UI, five
 * circular buttons tinted feel-1..5, selection pops with ease-spring);
 * FeelDot and FeelBadge are the display atoms for lists and session
 * cards. All color comes from the feel-1..5 tokens.
 */

export type FeelValue = 1 | 2 | 3 | 4 | 5

export const FEEL_VALUES: readonly FeelValue[] = [1, 2, 3, 4, 5]

export const FEEL_LABELS: Record<FeelValue, string> = {
  1: "Rough",
  2: "Tough",
  3: "Okay",
  4: "Good",
  5: "Great",
}

/* One local var per feel step; every class below reads --feel-color. */
const feelVar = {
  1: "[--feel-color:var(--feel-1)]",
  2: "[--feel-color:var(--feel-2)]",
  3: "[--feel-color:var(--feel-3)]",
  4: "[--feel-color:var(--feel-4)]",
  5: "[--feel-color:var(--feel-5)]",
} as const

export const feelPickerItemVariants = cva(
  cn(
    "rounded-full bg-(--feel-color)",
    "transition-[transform,opacity,box-shadow] duration-(--duration-base) ease-(--ease-spring)",
    "opacity-45 hover:scale-105 hover:opacity-75",
    "data-checked:scale-110 data-checked:opacity-100",
    "data-checked:ring-2 data-checked:ring-(--feel-color) data-checked:ring-offset-2 data-checked:ring-offset-card",
    "data-disabled:opacity-25",
  ),
  {
    variants: {
      feel: feelVar,
      size: {
        sm: "size-6",
        md: "size-8",
        lg: "size-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface FeelPickerProps extends VariantProps<typeof feelPickerItemVariants> {
  value?: FeelValue
  defaultValue?: FeelValue
  onValueChange?: (value: FeelValue) => void
  disabled?: boolean
  readOnly?: boolean
  /** Form field name (RadioGroup renders a hidden input). */
  name?: string
  className?: string | undefined
  "aria-label"?: string
}

export function FeelPicker({
  value,
  defaultValue,
  onValueChange,
  disabled,
  readOnly,
  name,
  size,
  className,
  "aria-label": ariaLabel,
}: FeelPickerProps) {
  return (
    <RadioGroup
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as FeelValue)}
      disabled={disabled}
      readOnly={readOnly}
      name={name}
      aria-label={ariaLabel ?? "How did it feel?"}
      className={cn("flex items-center gap-2", className)}
    >
      {FEEL_VALUES.map((feel) => (
        <Radio.Root
          key={feel}
          value={feel}
          aria-label={`${feel} of 5, ${FEEL_LABELS[feel]}`}
          className={feelPickerItemVariants({ feel, size })}
        />
      ))}
    </RadioGroup>
  )
}

export const feelDotVariants = cva(
  "inline-block shrink-0 rounded-full bg-(--feel-color)",
  {
    variants: {
      feel: feelVar,
      size: {
        sm: "size-2",
        md: "size-2.5",
        lg: "size-3",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface FeelDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof feelDotVariants> {
  feel: FeelValue
}

export function FeelDot({ feel, size, className, ...props }: FeelDotProps) {
  return (
    <span
      role="img"
      aria-label={`Feel ${feel} of 5, ${FEEL_LABELS[feel]}`}
      className={cn(feelDotVariants({ feel, size }), className)}
      {...props}
    />
  )
}

/* Label reads in text-foreground so contrast holds on the soft tint in
   every theme; the FeelDot carries the feel color as reinforcement. */
export const feelBadgeVariants = cva(
  cn(
    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5",
    "bg-(--feel-color)/15 text-xs font-medium text-foreground",
  ),
  {
    variants: {
      feel: feelVar,
    },
  },
)

export interface FeelBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof feelBadgeVariants> {
  feel: FeelValue
}

export function FeelBadge({ feel, className, children, ...props }: FeelBadgeProps) {
  return (
    <span className={cn(feelBadgeVariants({ feel }), className)} {...props}>
      {/* Decorative here: the badge text already names the feel. */}
      <FeelDot feel={feel} size="sm" role={undefined} aria-label={undefined} aria-hidden />
      {children ?? FEEL_LABELS[feel]}
    </span>
  )
}
