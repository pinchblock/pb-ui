"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * CounterBadge. "9+"-style unread count pill. `surfaceRing` cuts a ring
 * in the surface color so it reads cleanly overlaid on avatars and
 * icon buttons (position it via IconButton's `badge` slot or absolute
 * utilities in `className`).
 */
export const counterBadgeVariants = cva(
  cn(
    "inline-flex h-4.5 min-w-4.5 shrink-0 items-center justify-center rounded-full px-1",
    "text-xs leading-none font-semibold tabular-nums whitespace-nowrap select-none",
  ),
  {
    variants: {
      tone: {
        primary: "bg-foreground text-background",
        destructive: "bg-destructive text-destructive-foreground",
        neutral: "bg-muted text-muted-foreground",
      },
      surfaceRing: {
        true: "ring-2 ring-card",
      },
    },
    defaultVariants: {
      tone: "destructive",
    },
  },
)

export interface CounterBadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof counterBadgeVariants> {
  count: number
  /** Counts above this render as "max+". */
  max?: number
}

export function CounterBadge({
  className,
  tone,
  surfaceRing,
  count,
  max = 9,
  ...props
}: CounterBadgeProps) {
  return (
    <span
      className={cn(counterBadgeVariants({ tone, surfaceRing }), className)}
      {...props}
    >
      {count > max ? `${max}+` : count}
    </span>
  )
}

/**
 * NotificationDot. Presence/attention dot for when a count would be
 * noise. Same surface-ring trick for overlaying.
 */
export const notificationDotVariants = cva("inline-flex size-2 shrink-0 rounded-full", {
  variants: {
    tone: {
      primary: "bg-foreground",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
    },
    surfaceRing: {
      true: "ring-2 ring-card",
    },
  },
  defaultVariants: {
    tone: "destructive",
  },
})

export interface NotificationDotProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof notificationDotVariants> {
  /** Screen-reader text (e.g. "New messages"); omit for purely decorative dots. */
  label?: string
}

export function NotificationDot({
  className,
  tone,
  surfaceRing,
  label,
  ...props
}: NotificationDotProps) {
  return (
    <span
      aria-hidden={label ? undefined : true}
      className={cn(notificationDotVariants({ tone, surfaceRing }), className)}
      {...props}
    >
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}
