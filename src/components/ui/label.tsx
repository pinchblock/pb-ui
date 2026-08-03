"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Label. Standalone form label; inside a Field the same styles are
 * applied to Base UI Field.Label (which auto-associates with the
 * control), so both render identically.
 */
export const labelVariants = cva(
  cn(
    "inline-flex items-center gap-1 text-sm font-medium text-foreground select-none",
    "peer-disabled:opacity-50 data-disabled:opacity-50",
  ),
)

export interface LabelProps
  extends React.ComponentPropsWithRef<"label">,
    VariantProps<typeof labelVariants> {}

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn(labelVariants(), className)} {...props} />
}
