import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * StreakHeatmap. GitHub-style day grid (weeks as columns, Monday-first
 * weekdays as rows) for training consistency. Cell intensity is
 * color-mix steps of a single chart token; empty days sit on the
 * chart-track token so the grid reads in every theme.
 */

export interface StreakDay {
  /** "yyyy-mm-dd" or a Date. */
  date: string | Date
  /** Session count (or any effort measure) for that day. */
  value: number
}

export interface StreakHeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ReadonlyArray<StreakDay>
  /** How many week columns to show, ending at `endDate`. @default 20 */
  weeks?: number
  /** Last day of the grid. @default today */
  endDate?: string | Date
  /** Intensity steps above zero. @default 4 */
  levels?: number
  /** Base color, normally a chart token. @default "var(--chart-1)" */
  color?: string
  showMonthLabels?: boolean
  showDayLabels?: boolean
  /** Cell hover text. @default `${value} sessions` */
  valueLabel?: (value: number, date: Date) => string
}

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""] as const
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const
/** Local-date key; plain "yyyy-mm-dd" strings pass through untouched. */
function dayKey(input: string | Date): string {
  if (typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)) return input
  const d = typeof input === "string" ? new Date(input) : input
  const m = `${d.getMonth() + 1}`.padStart(2, "0")
  const day = `${d.getDate()}`.padStart(2, "0")
  return `${d.getFullYear()}-${m}-${day}`
}

/** Monday of the week containing `date`, at local midnight. */
function mondayOf(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = (d.getDay() + 6) % 7 /* Mon=0 .. Sun=6 */
  d.setDate(d.getDate() - day)
  return d
}

export function StreakHeatmap({
  data,
  weeks = 20,
  endDate,
  levels = 4,
  color = "var(--chart-1)",
  showMonthLabels = true,
  showDayLabels = true,
  valueLabel,
  className,
  "aria-label": ariaLabel,
  ...props
}: StreakHeatmapProps) {
  const values = new Map<string, number>()
  for (const day of data) {
    const key = dayKey(day.date)
    values.set(key, (values.get(key) ?? 0) + day.value)
  }
  const max = Math.max(1, ...values.values())

  const end = endDate ? new Date(endDate) : new Date()
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  const firstMonday = mondayOf(end)
  firstMonday.setDate(firstMonday.getDate() - (weeks - 1) * 7)

  /* Calendar arithmetic (not ms) so DST transitions never shift a day. */
  const columns = Array.from({ length: weeks }, (_, w) => {
    const monday = new Date(
      firstMonday.getFullYear(),
      firstMonday.getMonth(),
      firstMonday.getDate() + w * 7,
    )
    return {
      monday,
      days: Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)
        return date.getTime() > endTime
          ? null
          : { date, value: values.get(dayKey(date)) ?? 0 }
      }),
    }
  })

  const background = (value: number) => {
    if (value <= 0) return "var(--chart-track)"
    const level = Math.min(levels, Math.max(1, Math.ceil((value / max) * levels)))
    const percent = levels === 1 ? 100 : 30 + ((level - 1) * 70) / (levels - 1)
    return `color-mix(in oklab, ${color} ${percent}%, transparent)`
  }

  return (
    <div
      role="img"
      aria-label={ariaLabel ?? `Training activity, last ${weeks} weeks`}
      className={cn("inline-flex gap-0.5 text-xs text-faint-foreground", className)}
      {...props}
    >
      {showDayLabels && (
        <div aria-hidden className="flex flex-col gap-0.5 pr-1.5">
          {showMonthLabels && <div className="h-4" />}
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="flex h-3 items-center leading-none">
              {label}
            </div>
          ))}
        </div>
      )}
      {columns.map((week, w) => {
        const prev = columns[w - 1]
        const monthLabel =
          showMonthLabels && (!prev || prev.monday.getMonth() !== week.monday.getMonth())
            ? MONTH_LABELS[week.monday.getMonth()]
            : null
        return (
          <div key={w} aria-hidden className="flex flex-col gap-0.5">
            {showMonthLabels && (
              <div className="relative h-4">
                {monthLabel && (
                  <span className="absolute top-0 left-0 leading-none whitespace-nowrap">
                    {monthLabel}
                  </span>
                )}
              </div>
            )}
            {week.days.map((day, i) =>
              day ? (
                <div
                  key={i}
                  title={`${dayKey(day.date)}: ${
                    valueLabel ? valueLabel(day.value, day.date) : `${day.value} sessions`
                  }`}
                  className="size-3 rounded-xs"
                  style={{ background: background(day.value) }}
                />
              ) : (
                <div key={i} className="size-3" />
              ),
            )}
          </div>
        )
      })}
    </div>
  )
}
