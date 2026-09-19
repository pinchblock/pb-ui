"use client"

import { Progress as BaseProgress } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Progress. Base UI Progress underneath (aria-valuenow handled).
 * `value={null}` (the default) renders the indeterminate sweep; the
 * animation parks as a static partial bar under reduced motion.
 */
export const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface ProgressProps
  extends Omit<BaseProgress.Root.Props, "value">,
    VariantProps<typeof progressVariants> {
  /** Current value; `null` (default) means indeterminate. */
  value?: number | null
  /** Optional label rendered above the track. */
  label?: React.ReactNode
  /** Shows the formatted value opposite the label. */
  showValue?: boolean
}

export function Progress({
  className,
  size,
  value = null,
  label,
  showValue = false,
  ...props
}: ProgressProps) {
  return (
    <BaseProgress.Root value={value} className={cn("w-full", className)} {...props}>
      {label || showValue ? (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {label ? (
            <BaseProgress.Label className="text-sm font-medium text-foreground">
              {label}
            </BaseProgress.Label>
          ) : (
            <span aria-hidden />
          )}
          {showValue ? (
            <BaseProgress.Value className="text-sm text-muted-foreground tabular-nums" />
          ) : null}
        </div>
      ) : null}
      <BaseProgress.Track className={progressVariants({ size })}>
        <BaseProgress.Indicator
          className={cn(
            "h-full rounded-full bg-foreground",
            "transition-[width] duration-(--duration-base) ease-(--ease-out)",
            "data-[indeterminate]:w-1/3 data-[indeterminate]:animate-progress-indeterminate",
          )}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  )
}
