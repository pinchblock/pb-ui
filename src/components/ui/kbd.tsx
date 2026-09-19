"use client"

import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Kbd. Keyboard key cap for shortcut hints; compose multiple for
 * combos. Sits well inside TooltipContent.
 */
export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-xs",
        "border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}
