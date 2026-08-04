"use client"

import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * StatTile. KPI tile: eyebrow label + display value + optional icon,
 * trend and footnote. Unifies the five hand-rolled KPI blocks in
 * pb-app. Trend tone defaults to positive for "up" and negative for
 * "down"; pass `positive` explicitly when down is good (resting HR,
 * body fat, 5k time).
 */
export interface StatTileTrend {
  /** Display string, e.g. "+12%" or "-0:14". */
  value: string
  direction: "up" | "down"
  /**
   * Whether this movement is good. Defaults to direction === "up".
   * Controls the success/destructive tone.
   */
  positive?: boolean
}

export interface StatTileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Eyebrow-styled label above the value. */
  label: React.ReactNode
  value: React.ReactNode
  /** Icon element (a phosphor icon), rendered top-right in a soft circle. */
  icon?: React.ReactNode
  trend?: StatTileTrend
  /** Quiet context line under the value, e.g. "vs last week". */
  footnote?: React.ReactNode
}

export function StatTile({
  className,
  label,
  value,
  icon,
  trend,
  footnote,
  ...props
}: StatTileProps) {
  const positive = trend ? (trend.positive ?? trend.direction === "up") : false
  const TrendIcon = trend?.direction === "down" ? ArrowDownRight : ArrowUpRight

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 text-card-foreground shadow-card",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">{label}</p>
        {icon ? (
          <div
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary [&_svg]:size-4"
          >
            {icon}
          </div>
        ) : null}
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-2">
        <span className="font-display text-2xl font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </span>
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-medium tabular-nums",
              positive ? "text-success" : "text-destructive",
            )}
          >
            <TrendIcon aria-hidden className="size-3.5" />
            {trend.value}
            <span className="sr-only">
              {trend.direction === "up" ? "up" : "down"},{" "}
              {positive ? "improving" : "declining"}
            </span>
          </span>
        ) : null}
      </div>
      {footnote ? (
        <p className="mt-1 text-xs text-muted-foreground">{footnote}</p>
      ) : null}
    </div>
  )
}
