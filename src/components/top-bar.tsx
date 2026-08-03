"use client"

import type * as React from "react"

import { cn } from "../lib/cn.ts"

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * TopBar: sticky app header. Compose the contents with Row/Grow or
 * plain flex children; AppShell takes it via the `topBar` slot.
 */
export function TopBar({ className, children, ...props }: TopBarProps) {
  return (
    <header
      {...props}
      className={cn(
        "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border px-4",
        /*
         * The ONE sanctioned arbitrary value in this library: the
         * app-topbar translucency is a color-mix over the background
         * token, so it re-themes correctly. Do not copy this pattern
         * elsewhere; everything else uses plain token utilities.
         */
        "bg-[color-mix(in_srgb,var(--background)_78%,transparent)]",
        /* Blur follows --glass-filter, so light themes (filter: none)
           collapse to solid per the glass guardrail. */
        "[backdrop-filter:var(--glass-filter)]",
        className,
      )}
    >
      {children}
    </header>
  )
}
