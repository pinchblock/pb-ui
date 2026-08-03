import { cva } from "class-variance-authority"
import { createContext, useContext, useMemo } from "react"
import type * as React from "react"
import { Legend, ResponsiveContainer, Tooltip } from "recharts"
import type { LegendPayload, TooltipPayloadEntry } from "recharts"

import { cn } from "../../lib/cn.ts"

/**
 * Chart. Recharts wrapper in the shadcn shape: a config object maps each
 * series key to a label and a color (defaulting to the chart-1..8 tokens),
 * exposed to recharts as `var(--color-<key>)` CSS variables on the
 * container. Axes, grid and cursor pick up semantic tokens automatically.
 *
 * Usage:
 *   <ChartContainer config={{ sessions: { label: "Sessions" } }}>
 *     <LineChart data={data}>
 *       <XAxis dataKey="week" tickLine={false} axisLine={false} />
 *       <ChartTooltip content={<ChartTooltipContent />} />
 *       <Line dataKey="sessions" stroke="var(--color-sessions)" />
 *     </LineChart>
 *   </ChartContainer>
 */

export interface ChartSeriesConfig {
  /** Human label shown in tooltips and legends. */
  label?: React.ReactNode
  /** CSS color, normally a chart token: "var(--chart-3)". Defaults by index. */
  color?: string
}

export type ChartConfig = Record<string, ChartSeriesConfig>

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextValue | null>(null)

export function useChart(): ChartContextValue {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used inside <ChartContainer>")
  }
  return context
}

export const chartContainerVariants = cva(
  cn(
    "flex aspect-video w-full justify-center text-xs",
    /* Recessive chart chrome: axes and grid read from tokens, never recharts defaults. */
    "[&_.recharts-cartesian-axis-tick_text]:fill-faint-foreground",
    "[&_.recharts-cartesian-axis-line]:stroke-border",
    "[&_.recharts-cartesian-axis-tick-line]:stroke-border",
    "[&_.recharts-cartesian-grid_line]:stroke-border",
    "[&_.recharts-polar-grid_line]:stroke-border",
    "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
    "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
    "[&_.recharts-surface]:outline-hidden",
  ),
)

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig
  children: React.ComponentProps<typeof ResponsiveContainer>["children"]
}

export function ChartContainer({
  config,
  className,
  style,
  children,
  ...props
}: ChartContainerProps) {
  /* Every config key becomes --color-<key>, defaulting through chart-1..8. */
  const colorVars = useMemo(() => {
    const vars: Record<string, string> = {}
    Object.entries(config).forEach(([key, series], index) => {
      vars[`--color-${key}`] = series.color ?? `var(--chart-${(index % 8) + 1})`
    })
    return vars
  }, [config])

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        className={cn(chartContainerVariants(), className)}
        style={{ ...colorVars, ...style } as React.CSSProperties}
        {...props}
      >
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

/* Direct aliases: recharts needs its own Tooltip/Legend in the tree. */
export const ChartTooltip = Tooltip

export const ChartLegend = Legend

function seriesKeyOf(
  item: { dataKey?: unknown; name?: unknown },
  nameKey: string | undefined,
  fallback: string,
): string {
  if (nameKey) return nameKey
  if (typeof item.dataKey === "string") return item.dataKey
  if (typeof item.name === "string") return item.name
  return fallback
}

function formatValue(value: TooltipPayloadEntry["value"]): React.ReactNode {
  if (typeof value === "number") return value.toLocaleString()
  if (Array.isArray(value)) return value.join(" to ")
  return value
}

export interface ChartTooltipContentProps {
  /** Injected by recharts when passed as <ChartTooltip content={...} />. */
  active?: boolean
  payload?: ReadonlyArray<TooltipPayloadEntry>
  label?: React.ReactNode
  labelFormatter?: (
    label: React.ReactNode,
    payload: ReadonlyArray<TooltipPayloadEntry>,
  ) => React.ReactNode
  valueFormatter?: (value: number | string) => React.ReactNode
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "dot" | "line"
  /** Config key override when dataKey does not match the config. */
  nameKey?: string
  className?: string
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  hideLabel = false,
  hideIndicator = false,
  indicator = "dot",
  nameKey,
  className,
}: ChartTooltipContentProps) {
  const { config } = useChart()

  if (!active || !payload || payload.length === 0) return null
  const items = payload.filter((item) => item.type !== "none")
  if (items.length === 0) return null

  return (
    <div
      className={cn(
        "min-w-36 rounded-lg border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-overlay",
        className,
      )}
    >
      {!hideLabel && label != null && (
        <p className="mb-1.5 font-medium text-foreground">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </p>
      )}
      <div className="grid gap-1">
        {items.map((item, index) => {
          const key = seriesKeyOf(item, nameKey, `series-${index}`)
          const series = config[key]
          const color = item.color ?? `var(--color-${key})`
          return (
            <div key={`${key}-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                {!hideIndicator && (
                  <span
                    aria-hidden
                    className={cn(
                      "shrink-0",
                      indicator === "dot" ? "size-2 rounded-full" : "h-3 w-1 rounded-full",
                    )}
                    style={{ background: color }}
                  />
                )}
                {series?.label ?? item.name}
              </span>
              <span className="font-medium text-foreground tabular-nums">
                {valueFormatter && (typeof item.value === "number" || typeof item.value === "string")
                  ? valueFormatter(item.value)
                  : formatValue(item.value)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export interface ChartLegendContentProps {
  /** Injected by recharts when passed as <ChartLegend content={...} />. */
  payload?: ReadonlyArray<LegendPayload>
  hideIcon?: boolean
  nameKey?: string
  className?: string
}

export function ChartLegendContent({
  payload,
  hideIcon = false,
  nameKey,
  className,
}: ChartLegendContentProps) {
  const { config } = useChart()

  if (!payload || payload.length === 0) return null

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 text-xs text-muted-foreground",
        className,
      )}
    >
      {payload.map((item, index) => {
        const key = seriesKeyOf(item, nameKey, item.value ?? `series-${index}`)
        const series = config[key]
        return (
          <span key={`${key}-${index}`} className="flex items-center gap-1.5">
            {!hideIcon && (
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-xs"
                style={{ background: item.color ?? `var(--color-${key})` }}
              />
            )}
            {series?.label ?? item.value}
          </span>
        )
      })}
    </div>
  )
}
