"use client"

import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Skeleton. Pulsing placeholder block; compose to mirror the loaded
 * layout. Size it with the same utilities the real content uses so
 * nothing jumps when data arrives.
 */
export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export interface SkeletonTextProps extends React.ComponentProps<"div"> {
  /** Number of text lines; the last line is shortened. */
  lines?: number
}

/** Multi-line text placeholder; the trailing line is shorter, like prose. */
export function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", lines > 1 && index === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  )
}
