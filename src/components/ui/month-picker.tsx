"use client"

import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import * as React from "react"

import { cn } from "../../lib/cn.ts"
import { IconButton } from "./icon-button.tsx"

/**
 * MonthPicker. Year header with caret navigation plus a 12-month grid;
 * picking a month fires a Date at the first of that month. For plan
 * scheduling ("block starts in March"), not day-level logging.
 *
 * Keyboard: arrows move within the grid (roving tabindex), Enter/Space
 * picks, Home/End jump to January/December.
 */
export interface MonthPickerProps {
  /** Selected month; any Date within that month works. */
  value?: Date
  defaultValue?: Date
  /** Fires with a Date at the first of the picked month. */
  onValueChange?: (month: Date) => void
  /** Earliest selectable month (inclusive). */
  min?: Date
  /** Latest selectable month (inclusive). */
  max?: Date
  /** Accessible name of the widget. */
  "aria-label"?: string
  className?: string
}

const monthButtonClassName = cn(
  "flex h-9 items-center justify-center rounded-md text-sm select-none",
  "transition-[background-color,color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
  "hover:bg-muted",
  "disabled:pointer-events-none disabled:opacity-50",
  // Current month: quiet inset ring, same treatment as Calendar's today.
  "data-current:font-medium data-current:ring-1 data-current:ring-primary-border data-current:ring-inset",
  "data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary",
)

/** Months as comparable indices (year * 12 + month). */
const toIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth()

export function MonthPicker(props: MonthPickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    min,
    max,
    "aria-label": ariaLabel = "Pick a month",
    className,
  } = props
  const controlled = "value" in props
  const [inner, setInner] = React.useState<Date | undefined>(defaultValue)
  const selected = controlled ? value : inner

  const today = new Date()
  const [year, setYear] = React.useState(
    () => (selected ?? min ?? today).getFullYear(),
  )
  const buttonsRef = React.useRef<(HTMLButtonElement | null)[]>([])

  /* Follow selection changes after mount: when the selected month's
     year changes (a controlled `value` update from outside, or a pick
     made after caret navigation), display that year. */
  const selectedYear = selected?.getFullYear()
  React.useEffect(() => {
    if (selectedYear != null) setYear(selectedYear)
  }, [selectedYear])

  const monthLabels = React.useMemo(() => {
    const short = new Intl.DateTimeFormat(undefined, { month: "short" })
    const long = new Intl.DateTimeFormat(undefined, { month: "long" })
    return Array.from({ length: 12 }, (_, m) => {
      const date = new Date(2024, m, 1)
      return { short: short.format(date), long: long.format(date) }
    })
  }, [])

  const isDisabled = (m: number) => {
    const index = year * 12 + m
    return (min != null && index < toIndex(min)) || (max != null && index > toIndex(max))
  }

  const pick = (m: number) => {
    const month = new Date(year, m, 1)
    if (!controlled) setInner(month)
    onValueChange?.(month)
  }

  /* Roving tabindex home: selected month in this year, else today,
     else January; whichever wins must be enabled, otherwise Tab would
     land on a disabled button (or none), so fall back to the first
     enabled month of the year. */
  const firstEnabledMonth =
    Array.from({ length: 12 }, (_, m) => m).find((m) => !isDisabled(m)) ?? 0
  const preferredMonth =
    selected != null && selected.getFullYear() === year
      ? selected.getMonth()
      : today.getFullYear() === year
        ? today.getMonth()
        : firstEnabledMonth
  const activeMonth = isDisabled(preferredMonth) ? firstEnabledMonth : preferredMonth

  const onGridKeyDown = (event: React.KeyboardEvent) => {
    const current = buttonsRef.current.findIndex((b) => b === document.activeElement)
    if (current === -1) return
    const step: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 3,
      ArrowUp: -3,
    }
    let next: number
    if (event.key === "Home") next = 0
    else if (event.key === "End") next = 11
    else if (event.key in step) next = current + (step[event.key] ?? 0)
    else return
    event.preventDefault()
    if (next < 0 || next > 11 || isDisabled(next)) return
    buttonsRef.current[next]?.focus()
  }

  const prevYearDisabled = min != null && year <= min.getFullYear()
  const nextYearDisabled = max != null && year >= max.getFullYear()

  return (
    <div role="group" aria-label={ariaLabel} className={cn("w-64 select-none", className)}>
      <div className="mb-2 flex items-center justify-between">
        <IconButton
          aria-label="Previous year"
          size="sm"
          disabled={prevYearDisabled}
          onClick={() => setYear((y) => y - 1)}
        >
          <CaretLeft />
        </IconButton>
        <span aria-live="polite" className="text-sm font-medium text-foreground tabular-nums">
          {year}
        </span>
        <IconButton
          aria-label="Next year"
          size="sm"
          disabled={nextYearDisabled}
          onClick={() => setYear((y) => y + 1)}
        >
          <CaretRight />
        </IconButton>
      </div>
      <div className="grid grid-cols-3 gap-1" onKeyDown={onGridKeyDown}>
        {monthLabels.map((label, m) => {
          const isSelected =
            selected != null && selected.getFullYear() === year && selected.getMonth() === m
          const isCurrent = today.getFullYear() === year && today.getMonth() === m
          return (
            <button
              key={label.long}
              ref={(node) => {
                buttonsRef.current[m] = node
              }}
              type="button"
              tabIndex={m === activeMonth ? 0 : -1}
              disabled={isDisabled(m)}
              aria-label={`${label.long} ${year}`}
              aria-pressed={isSelected}
              data-selected={isSelected || undefined}
              data-current={isCurrent || undefined}
              onClick={() => pick(m)}
              className={monthButtonClassName}
            >
              {label.short}
            </button>
          )
        })}
      </div>
    </div>
  )
}
