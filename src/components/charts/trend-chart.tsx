"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { useReducedMotion } from "motion/react"
import { useId } from "react"
import type * as React from "react"
import { Area, AreaChart, ReferenceLine, XAxis } from "recharts"
import type { DotItemDotProps } from "recharts"

import { cn } from "../../lib/cn.ts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./chart.tsx"

/**
 * TrendChart. The session-timeline signature: a smooth line/area over
 * time, optional dot markers tinted by how the session felt (feel-1..5),
 * and an optional dashed target line. Compact size for cards and list
 * rows, full size for detail views.
 */

export interface TrendPoint {
  /** X axis label: a week, a date, a session name. */
  label: string
  value: number
  /** 1-5 session feel; tints this point's dot marker via feel tokens. */
  feel?: 1 | 2 | 3 | 4 | 5
}

export const trendChartVariants = cva("aspect-auto w-full", {
  variants: {
    size: {
      compact: "h-24",
      full: "h-64",
    },
  },
  defaultVariants: {
    size: "full",
  },
})

export interface TrendChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trendChartVariants> {
  data: ReadonlyArray<TrendPoint>
  /** Series label shown in the tooltip and the default accessible name. @default "Value" */
  label?: string
  /** Line color, normally a chart token. @default "var(--chart-1)" */
  color?: string
  /** Draws a dashed chart-target reference line at this y value. */
  target?: number
  /** Dot markers on every point; defaults on when any point carries a feel. */
  showDots?: boolean
  /** Gradient area fill under the line. @default true */
  area?: boolean
  valueFormatter?: (value: number | string) => React.ReactNode
}

function feelDot(props: DotItemDotProps): React.ReactNode {
  const { cx, cy, index } = props
  if (cx == null || cy == null) return null
  const feel = (props.payload as TrendPoint | undefined)?.feel
  return (
    <circle
      key={`trend-dot-${index}`}
      cx={cx}
      cy={cy}
      r={feel ? 4 : 3}
      fill={feel ? `var(--feel-${feel})` : "var(--color-value)"}
      stroke="var(--card)"
      strokeWidth={1.5}
    />
  )
}

export function TrendChart({
  data,
  size,
  label = "Value",
  color = "var(--chart-1)",
  target,
  showDots,
  area = true,
  valueFormatter,
  className,
  "aria-label": ariaLabel,
  ...props
}: TrendChartProps) {
  const gradientId = `pb-trend-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const reducedMotion = useReducedMotion()
  const compact = size === "compact"
  const withDots = showDots ?? data.some((point) => point.feel != null)
  const config: ChartConfig = { value: { label, color } }

  const first = data[0]
  const last = data[data.length - 1]
  const defaultLabel =
    first && last
      ? `${label} trend from ${first.label} to ${last.label}, latest ${last.value}`
      : `${label} trend, no data`

  return (
    /* role="img" with the accessible name lives on the wrapper; the
       recharts SVG below is aria-hidden via the ChartContainer div. */
    <div
      role="img"
      aria-label={ariaLabel ?? defaultLabel}
      className={cn(trendChartVariants({ size }), className)}
      {...props}
    >
      <ChartContainer aria-hidden config={config} className="aspect-auto h-full w-full">
        <AreaChart
          data={data as TrendPoint[]}
          margin={
            compact
              ? { top: 6, right: 6, bottom: 6, left: 6 }
              : { top: 12, right: 12, bottom: 0, left: 12 }
          }
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
            </linearGradient>
          </defs>
          {!compact && (
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
          )}
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<ChartTooltipContent valueFormatter={valueFormatter} />}
          />
          {target != null && (
            <ReferenceLine
              y={target}
              stroke="var(--chart-target)"
              strokeDasharray="4 4"
              ifOverflow="extendDomain"
            />
          )}
          <Area
            dataKey="value"
            type="monotone"
            stroke="var(--color-value)"
            strokeWidth={2}
            fill={area ? `url(#${gradientId})` : "none"}
            dot={withDots ? feelDot : false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={!reducedMotion}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
