import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Spinner. Announces itself to screen readers via role="status" and a
 * visually hidden label. Never let it spin forever without a fallback
 * (see docs/GUARDRAILS.md).
 */
export const spinnerVariants = cva(
  "inline-flex shrink-0 items-center justify-center text-muted-foreground",
  {
    variants: {
      size: {
        xs: "[&_svg]:size-3",
        sm: "[&_svg]:size-4",
        md: "[&_svg]:size-5",
        lg: "[&_svg]:size-6",
        xl: "[&_svg]:size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface SpinnerProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof spinnerVariants> {
  /** Screen-reader label. */
  label?: string
}

export function Spinner({ className, size, label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <Loader2 aria-hidden className="animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  )
}
