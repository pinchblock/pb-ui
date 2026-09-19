"use client"

import { cva } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import type { FullScreenTimerPhase } from "./full-screen-timer.tsx"

/**
 * FullScreenTimerRing: the phase-colored countdown ring part of
 * FullScreenTimer. Internal to the timer family; consumers use
 * FullScreenTimer. The progress circle strokes currentColor so all
 * color routes through one tone class per phase.
 */

/** Ring tone per phase; stroke reads currentColor. */
const ringToneVariants = cva(
  "transition-colors duration-(--duration-slow) ease-(--ease-out)",
  {
    variants: {
      phase: {
        work: "text-success",
        rest: "text-info",
        paused: "text-muted-foreground",
        done: "text-foreground",
      },
    },
  },
)

/* Ring geometry in viewBox units (100x100). */
const RING_STROKE = 4
const RING_RADIUS = 50 - RING_STROKE / 2
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export interface FullScreenTimerRingProps {
  phase: FullScreenTimerPhase
  /** Remaining share of the phase, 0..1. */
  fraction: number
  className?: string | undefined
  /** Centered content: the countdown numerals. */
  children?: React.ReactNode
}

export function FullScreenTimerRing({
  phase,
  fraction,
  className,
  children,
}: FullScreenTimerRingProps) {
  const clamped = Math.min(1, Math.max(0, fraction))
  return (
    <div
      className={cn(
        /* aspect-square + max-h-full: the ring fills the width up to
           max-w-xs but shrinks when vertical space runs out (small
           frames), so controls below never get clipped. */
        "relative flex aspect-square max-h-full w-full max-w-xs items-center justify-center",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className={cn("absolute inset-0 size-full -rotate-90", ringToneVariants({ phase }))}
      >
        <circle
          cx={50}
          cy={50}
          r={RING_RADIUS}
          fill="none"
          stroke="var(--chart-track)"
          strokeWidth={RING_STROKE}
        />
        <circle
          cx={50}
          cy={50}
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - clamped)}
          /* One tick per second: the token-slow sweep keeps the drain
             continuous; the base layer zeroes it under reduced motion. */
          className="transition-[stroke-dashoffset] duration-(--duration-slower) ease-(--ease-out)"
        />
      </svg>
      {children}
    </div>
  )
}
