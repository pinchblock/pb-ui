"use client"

import { OTPField as BaseOTPField } from "@base-ui/react/otp-field"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/cn.ts"

/**
 * OTPInput. Base UI OTP Field composed into one control: a row of
 * single-character cells styled like Input. The primitive provides
 * per-cell keyboard navigation (arrows, backspace), paste distribution
 * across cells, `one-time-code` autofill on the first cell and a hidden
 * validation input, so `name` + `autoSubmit` work inside a plain form.
 *
 * Labelling: inside a Field the cells inherit the Field.Label
 * association automatically; standalone, pair with a Label whose
 * htmlFor matches this component's `id` (the first cell's id).
 *
 * Invalid: a Field `error` wires data-invalid to every cell; standalone,
 * set the `invalid` prop. Completion: `onComplete` fires once all cells
 * fill (typed or pasted); `autoSubmit` submits the owning form instead.
 */
export const otpInputVariants = cva("flex items-center", {
  variants: {
    size: {
      md: "gap-1.5",
      lg: "gap-2",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export const otpInputCellVariants = cva(
  cn(
    "min-w-0 shrink-0 rounded-md border border-input bg-input-background text-center font-medium tabular-nums text-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    /* The base layer's outline is replaced by a ring so the focused
       cell reads like a focused Input, for pointer and keyboard alike. */
    "outline-none focus:border-ring focus:ring-2 focus:ring-ring",
    "hover:not-focus:border-border-strong",
    "data-filled:border-border-strong",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "aria-invalid:border-destructive data-invalid:border-destructive",
  ),
  {
    variants: {
      size: {
        md: "h-9 w-8 text-sm",
        lg: "h-12 w-10 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface OTPInputProps
  extends Omit<BaseOTPField.Root.Props, "className" | "children" | "length" | "onValueComplete">,
    VariantProps<typeof otpInputCellVariants> {
  className?: string | undefined
  /** Number of code cells. */
  length?: number
  /** Marks the cells invalid when used outside a Field with an error. */
  invalid?: boolean
  /** Fired with the full code once every cell is filled (typed or pasted). */
  onComplete?: (value: string) => void
}

export function OTPInput({
  className,
  size,
  length = 6,
  invalid = false,
  onComplete,
  ...props
}: OTPInputProps) {
  return (
    <BaseOTPField.Root
      length={length}
      onValueComplete={onComplete}
      className={cn(otpInputVariants({ size }), className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <BaseOTPField.Input
          key={index}
          aria-invalid={invalid || undefined}
          className={otpInputCellVariants({ size })}
        />
      ))}
    </BaseOTPField.Root>
  )
}
