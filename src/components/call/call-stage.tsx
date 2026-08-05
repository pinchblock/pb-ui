"use client"

import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * CallStage: the full-surface layout shell for live calls, on stage
 * tokens (class "stage": always dark, identical in every theme).
 * Presentational only: pb-app's call provider owns LiveKit and state;
 * this component renders what it is given. Children fill the surface
 * as the main media slot; the status bar, participant tile strip and
 * control cluster float above it on scrims.
 */

/** Connection quality level: 0 lost, 1 poor, 2 fair, 3 good. */
export type CallQualityLevel = 0 | 1 | 2 | 3

const QUALITY_LABELS: Record<CallQualityLevel, string> = {
  0: "Connection lost",
  1: "Poor connection",
  2: "Fair connection",
  3: "Good connection",
}

/* Status semantics are fixed (docs/GUARDRAILS.md): red degraded,
   amber caution, green healthy. At 0 all bars dim to destructive. */
const QUALITY_ACTIVE: Record<CallQualityLevel, string> = {
  0: "bg-destructive/40",
  1: "bg-destructive",
  2: "bg-warning",
  3: "bg-success",
}

const BAR_HEIGHTS = ["h-1.5", "h-2.5", "h-3.5"] as const

export interface CallQualityIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  quality: CallQualityLevel
  /** Screen-reader label; defaults per level ("Good connection"). */
  label?: string | undefined
}

export function CallQualityIndicator({
  quality,
  label,
  className,
  ...props
}: CallQualityIndicatorProps) {
  return (
    <span
      role="img"
      aria-label={label ?? QUALITY_LABELS[quality]}
      data-quality={quality}
      className={cn("inline-flex shrink-0 items-end gap-0.5", className)}
      {...props}
    >
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={height}
          aria-hidden
          className={cn(
            "w-1 rounded-full transition-colors duration-(--duration-fast) ease-(--ease-out)",
            height,
            quality === 0
              ? QUALITY_ACTIVE[0]
              : index < quality
                ? QUALITY_ACTIVE[quality]
                : "bg-border-strong",
          )}
        />
      ))}
    </span>
  )
}

export interface CallStageProps extends React.HTMLAttributes<HTMLElement> {
  /** Top status bar title (session or participant name). */
  title?: string | undefined
  /** Preformatted elapsed time ("12:04"); the app owns the ticking. */
  duration?: string | undefined
  /** Connection quality, 0 to 3. Omit to hide the indicator. */
  quality?: CallQualityLevel | undefined
  /** Override the quality indicator's screen-reader label. */
  qualityLabel?: string | undefined
  /** Participant tiles, rendered as a scrollable strip above the controls. */
  tiles?: React.ReactNode[] | undefined
  /** Bottom control cluster slot (CallControls). */
  controls?: React.ReactNode
}

export function CallStage({
  title,
  duration,
  quality,
  qualityLabel,
  tiles,
  controls,
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: CallStageProps) {
  const hasStatusBar = title != null || duration != null || quality != null
  return (
    <section
      aria-label={ariaLabel ?? title ?? "Call"}
      className={cn(
        "stage relative isolate flex size-full flex-col overflow-hidden bg-background text-foreground",
        className,
      )}
      {...props}
    >
      {/* Main media slot fills the whole surface. */}
      <div className="absolute inset-0">{children}</div>

      {hasStatusBar && (
        <header
          className={cn(
            "relative z-10 flex items-center justify-between gap-3 px-4 pt-3 pb-8",
            "bg-linear-to-b from-background/80 via-background/40 to-transparent",
          )}
        >
          <span className="min-w-0 truncate text-sm font-medium">{title}</span>
          <span className="flex shrink-0 items-center gap-3">
            {duration != null && (
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {duration}
              </span>
            )}
            {quality != null && (
              <CallQualityIndicator quality={quality} label={qualityLabel} />
            )}
          </span>
        </header>
      )}

      <div
        className={cn(
          "relative z-10 mt-auto flex flex-col gap-3 pt-10",
          "pb-[env(safe-area-inset-bottom,0px)]",
          "bg-linear-to-t from-background/80 via-background/40 to-transparent",
        )}
      >
        {tiles != null && tiles.length > 0 && (
          <div className="flex gap-2 overflow-x-auto px-4">
            {tiles.map((tile, index) => (
              <div key={index} className="shrink-0">
                {tile}
              </div>
            ))}
          </div>
        )}
        {controls != null && (
          <div className="flex justify-center px-4 pb-4">{controls}</div>
        )}
      </div>
    </section>
  )
}
