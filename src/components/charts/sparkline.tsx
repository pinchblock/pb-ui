"use client"

import { useId } from "react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Sparkline. Tiny self-contained SVG trend line for lists and stat tiles.
 * Deliberately NOT recharts: a client list renders dozens of these and
 * they must stay cheap. Size it with h-/w- classes; the stroke width
 * stays constant thanks to non-scaling-stroke.
 */

/** ViewBox space; the SVG stretches to its CSS box. */
const VIEW_W = 100
const VIEW_H = 32
/** Breathing room so the stroke never clips at extremes. */
const PAD_Y = 3

const round2 = (n: number) => Math.round(n * 100) / 100

/**
 * The one true smooth path: Catmull-Rom converted to cubic beziers.
 * Points are [x, y] pairs in whatever coordinate space the caller uses.
 */
export function smoothPath(
  points: ReadonlyArray<readonly [number, number]>,
  smoothing = 1,
): string {
  const first = points[0]
  if (!first) return ""
  let d = `M ${round2(first[0])} ${round2(first[1])}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * smoothing
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * smoothing
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * smoothing
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * smoothing
    d += ` C ${round2(c1x)} ${round2(c1y)} ${round2(c2x)} ${round2(c2y)} ${round2(p2[0])} ${round2(p2[1])}`
  }
  return d
}

function linearPath(points: ReadonlyArray<readonly [number, number]>): string {
  const first = points[0]
  if (!first) return ""
  let d = `M ${round2(first[0])} ${round2(first[1])}`
  for (let i = 1; i < points.length; i += 1) {
    const p = points[i]!
    d += ` L ${round2(p[0])} ${round2(p[1])}`
  }
  return d
}

export interface SparklineProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "children" | "fill" | "viewBox"> {
  data: ReadonlyArray<number>
  /** Catmull-Rom smoothing; set false for a hard polyline. @default true */
  smooth?: boolean
  /** Stroke color, normally a chart token. @default "var(--chart-1)" */
  stroke?: string
  /** Soft gradient fade under the line. @default false */
  gradient?: boolean
  /**
   * Tone the line by direction: "auto" picks chart-positive when the last
   * value is at or above the first, chart-negative otherwise. Overrides
   * `stroke` when not "default". @default "default"
   */
  tone?: "default" | "auto" | "positive" | "negative"
  strokeWidth?: number
  /** Accessible label. Without it the sparkline is decorative (aria-hidden). */
  label?: string
}

export function Sparkline({
  data,
  smooth = true,
  stroke = "var(--chart-1)",
  gradient = false,
  tone = "default",
  strokeWidth = 2,
  label,
  className,
  ...props
}: SparklineProps) {
  const gradientId = `pb-spark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min
  const stepX = data.length > 1 ? VIEW_W / (data.length - 1) : 0
  const points: [number, number][] = data.map((value, i) => [
    i * stepX,
    range === 0
      ? VIEW_H / 2
      : PAD_Y + (1 - (value - min) / range) * (VIEW_H - PAD_Y * 2),
  ])

  const first = data[0] ?? 0
  const last = data[data.length - 1] ?? first
  const resolvedStroke =
    tone === "positive" || (tone === "auto" && last >= first)
      ? "var(--chart-positive)"
      : tone === "negative" || (tone === "auto" && last < first)
        ? "var(--chart-negative)"
        : stroke

  const line = smooth ? smoothPath(points) : linearPath(points)
  const lastPoint = points[points.length - 1]
  const firstPoint = points[0]
  const areaPath =
    gradient && line && firstPoint && lastPoint
      ? `${line} L ${round2(lastPoint[0])} ${VIEW_H} L ${round2(firstPoint[0])} ${VIEW_H} Z`
      : null

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("h-8 w-24 shrink-0", className)}
      {...props}
    >
      {areaPath && (
        <>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={resolvedStroke} stopOpacity={0.25} />
              <stop offset="100%" stopColor={resolvedStroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        </>
      )}
      {line && (
        <path
          d={line}
          fill="none"
          stroke={resolvedStroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  )
}
