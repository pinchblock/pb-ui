"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * Stack: vertical flex with a token gap scale. The workhorse layout
 * primitive; prefer it over ad-hoc `flex flex-col gap-*` strings.
 * Gap classes are a literal map: Tailwind cannot see dynamic names.
 */
export const stackVariants = cva("flex flex-col", {
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
  },
  defaultVariants: {
    gap: 4,
    align: "stretch",
    justify: "start",
  },
})

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

export function Stack({ className, gap, align, justify, ...props }: StackProps) {
  return (
    <div
      className={cn(stackVariants({ gap, align, justify }), className)}
      {...props}
    />
  )
}
