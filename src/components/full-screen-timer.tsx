"use client"

import { Pause, Play, SkipForward, X } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { Variants } from "motion/react"
import { useEffect } from "react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import { springPop } from "../lib/motion.ts"
import { AnimatedNumber, AnimatedNumberGroup } from "./charts/animated-number.tsx"
import { FullScreenTimerRing } from "./full-screen-timer-ring.tsx"
import { IconButton } from "./ui/icon-button.tsx"

/**
 * FullScreenTimer. The immersive workout countdown surface, rendered on
 * the theme-invariant `stage` tokens (always dark, identical in every
 * theme). Purely presentational: the app owns the clock and passes
 * phase + secondsLeft down; callbacks report intent back up.
 *
 * Phase color language: work = success family, rest = info family,
 * paused = neutral, done = primary steel. Phase changes pop with the
 * springPop reward motion; under prefers-reduced-motion the swap is
 * instant and the ring jumps without a sweep.
 *
 * Keyboard (on by default, `keyboardShortcuts={false}` to opt out):
 * Space pauses/resumes, Escape exits. Events originating from form
 * controls and buttons are ignored so the shortcuts never fight focus.
 */

export type FullScreenTimerPhase = "work" | "rest" | "paused" | "done"

const PHASE_TITLES: Record<FullScreenTimerPhase, string> = {
  work: "Work",
  rest: "Rest",
  paused: "Paused",
  done: "Done",
}

/** Phase badge: soft status tint, fixed across themes by stage tokens. */
export const fullScreenTimerPhaseVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      phase: {
        work: "bg-success-soft text-success",
        rest: "bg-info-soft text-info",
        paused: "bg-secondary-soft text-muted-foreground",
        done: "bg-secondary text-foreground",
      },
    },
    defaultVariants: {
      phase: "work",
    },
  },
)

/** Reduced motion: plain state swap, no scale, no overshoot. */
const instantSwap: Variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  visible: { opacity: 1, transition: { duration: 0 } },
}

export interface FullScreenTimerProps
  /* HTMLAttributes carries the media onPause handler; ours replaces it. */
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onPause">,
    VariantProps<typeof fullScreenTimerPhaseVariants> {
  phase: FullScreenTimerPhase
  /** Seconds remaining in the current phase (clamped to >= 0). */
  secondsLeft: number
  /** Full length of the current phase, drives the ring sweep. */
  totalSeconds: number
  /** Current exercise name ("Max hangs"). */
  label: string
  /** What follows this phase; hidden in the done state. */
  nextLabel?: string
  onPause?: () => void
  onResume?: () => void
  onSkip?: () => void
  onExit?: () => void
  /** Space = pause/resume, Escape = exit. Defaults to on. */
  keyboardShortcuts?: boolean
  /** Slot under the controls: effort capture on exit, done summary. */
  children?: React.ReactNode
}

function ControlSlot({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {children}
      <span aria-hidden className="text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function FullScreenTimer({
  phase,
  secondsLeft,
  totalSeconds,
  label,
  nextLabel,
  onPause,
  onResume,
  onSkip,
  onExit,
  keyboardShortcuts = true,
  children,
  className,
  ...props
}: FullScreenTimerProps) {
  const reducedMotion = useReducedMotion() ?? false
  const popVariants = reducedMotion ? instantSwap : springPop

  const running = phase === "work" || phase === "rest"
  const clamped = Math.max(0, Math.floor(secondsLeft))
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60

  /* Done closes the ring: a full circle reads as "complete". */
  const fraction =
    phase === "done"
      ? 1
      : totalSeconds > 0
        ? Math.min(1, Math.max(0, secondsLeft / totalSeconds))
        : 0

  const announcement =
    phase === "work"
      ? `Work: ${label}`
      : phase === "rest"
        ? `Rest${nextLabel ? `. Next: ${nextLabel}` : ""}`
        : phase === "paused"
          ? "Paused"
          : "Done"

  useEffect(() => {
    if (!keyboardShortcuts) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest("button, a, input, textarea, select, [contenteditable='true']")) return
      if (event.key === " ") {
        event.preventDefault()
        if (phase === "paused") onResume?.()
        else if (phase === "work" || phase === "rest") onPause?.()
      } else if (event.key === "Escape") {
        onExit?.()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keyboardShortcuts, phase, onPause, onResume, onExit])

  return (
    <div
      data-phase={phase}
      {...props}
      className={cn(
        "stage relative flex h-full w-full flex-col items-center justify-between gap-6",
        /* pt-12: clearance for status bars / notches on real devices. */
        "overflow-hidden bg-background px-6 pt-12 pb-8 text-foreground",
        className,
      )}
    >
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="flex shrink-0 flex-col items-center gap-2 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${phase}-${label}`}
            variants={popVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col items-center gap-3"
          >
            <span className={fullScreenTimerPhaseVariants({ phase })}>{PHASE_TITLES[phase]}</span>
            <p className="text-xl font-semibold">{label}</p>
          </motion.div>
        </AnimatePresence>
        {nextLabel && phase !== "done" ? (
          <p className="text-sm text-muted-foreground">Next: {nextLabel}</p>
        ) : null}
      </div>

      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <FullScreenTimerRing phase={phase} fraction={fraction}>
          <div
            role="timer"
            aria-label={`${minutes} minutes ${seconds} seconds remaining`}
            className={cn(
              "font-display text-6xl font-semibold",
              phase === "paused" && "text-muted-foreground",
            )}
          >
            <AnimatedNumberGroup>
              <AnimatedNumber value={minutes} format={{ minimumIntegerDigits: 2 }} />
              <span aria-hidden>:</span>
              <AnimatedNumber value={seconds} format={{ minimumIntegerDigits: 2 }} />
            </AnimatedNumberGroup>
          </div>
        </FullScreenTimerRing>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center gap-6">
        {children}
        <div className="flex items-start justify-center gap-8">
          {onSkip && phase !== "done" ? (
            <ControlSlot label="Skip">
              <IconButton
                aria-label={nextLabel ? `Skip to ${nextLabel}` : "Skip"}
                variant="secondary"
                pill
                className="size-14"
                onClick={onSkip}
              >
                <SkipForward className="size-6" />
              </IconButton>
            </ControlSlot>
          ) : null}
          {(running && onPause) || (phase === "paused" && onResume) ? (
            <ControlSlot label={phase === "paused" ? "Resume" : "Pause"}>
              <IconButton
                aria-label={phase === "paused" ? "Resume" : "Pause"}
                pill
                className={cn(
                  "size-16 bg-primary text-primary-foreground",
                  "hover:bg-primary-hover hover:text-primary-foreground",
                )}
                onClick={phase === "paused" ? onResume : onPause}
              >
                {phase === "paused" ? <Play className="size-7" /> : <Pause className="size-7" />}
              </IconButton>
            </ControlSlot>
          ) : null}
          {onExit ? (
            <ControlSlot label="Exit">
              <IconButton
                aria-label="Exit timer"
                variant="secondary"
                pill
                className="size-14"
                onClick={onExit}
              >
                <X className="size-6" />
              </IconButton>
            </ControlSlot>
          ) : null}
        </div>
      </div>
    </div>
  )
}
