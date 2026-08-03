"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * Row: horizontal flex with the same token gap scale as Stack.
 * Pair with <Grow /> to push siblings apart without margin hacks.
 */
export const rowVariants = cva("flex flex-row", {
  variants: {
    gap: {
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      7: "gap-7",
      8: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    wrap: {
      true: "flex-wrap",
    },
  },
  defaultVariants: {
    gap: 3,
    align: "center",
    justify: "start",
  },
})

export interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {}

export function Row({ className, gap, align, justify, wrap, ...props }: RowProps) {
  return (
    <div
      className={cn(rowVariants({ gap, align, justify, wrap }), className)}
      {...props}
    />
  )
}

/** Flexible spacer: absorbs free space inside a Row (or Stack). */
export function Grow({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div aria-hidden className={cn("flex-1", className)} {...props} />
}
