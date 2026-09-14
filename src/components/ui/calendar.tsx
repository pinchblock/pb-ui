"use client"

import { CaretDown, CaretLeft, CaretRight, CaretUp } from "@phosphor-icons/react"
import * as React from "react"
import { DayPicker, type ChevronProps, type DayButtonProps } from "react-day-picker"

import { cn } from "../../lib/cn.ts"
import { iconButtonVariants } from "./icon-button.tsx"

/**
 * Calendar. react-day-picker v10 restyled through its classNames API;
 * no day-picker stylesheet is imported, every class below is ours.
 * Weeks start Monday (training-week convention). Selection state is
 * styled via data-* attributes set by a custom DayButton, so single
 * and range modes never fight over the same class slot.
 *
 * Usually composed inside DatePicker / DateRangePicker; use directly
 * for inline calendars (plan overviews, log heat views).
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarChevron({ className, orientation }: ChevronProps) {
  const Icon =
    orientation === "left"
      ? CaretLeft
      : orientation === "right"
        ? CaretRight
        : orientation === "up"
          ? CaretUp
          : CaretDown
  return <Icon aria-hidden className={cn("size-4", className)} />
}

/**
 * Day button that mirrors react-day-picker modifiers as data-*
 * attributes (guardrails: state styling via data-*). Replicates the
 * default DayButton's focus behavior, which the override discards.
 */
function CalendarDayButton({ day: _day, modifiers, ...props }: DayButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const selectedSingle =
    modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle

  return (
    <button
      ref={ref}
      data-selected-single={selectedSingle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      data-today={modifiers.today || undefined}
      {...props}
    />
  )
}

const dayButtonClassName = cn(
  "flex size-9 items-center justify-center rounded-md text-sm font-normal select-none",
  "transition-[background-color,color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
  "hover:bg-muted",
  "disabled:pointer-events-none",
  // Today: quiet inset ring, distinct from the 2px focus outline.
  "data-today:font-medium data-today:ring-1 data-today:ring-border-strong data-today:ring-inset",
  // Selected day / range endpoints: solid foreground (brand stays on buttons and links).
  "data-selected-single:bg-foreground data-selected-single:text-background data-selected-single:hover:bg-foreground",
  "data-range-start:bg-foreground data-range-start:text-background data-range-start:hover:bg-foreground",
  "data-range-end:bg-foreground data-range-end:text-background data-range-end:hover:bg-foreground",
  // Range middle: the cell paints the accent band; keep the button quiet.
  "data-range-middle:hover:bg-transparent",
)

export function Calendar({
  className,
  classNames,
  components,
  showOutsideDays = true,
  weekStartsOn = 1,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      weekStartsOn={weekStartsOn}
      className={cn("w-fit text-foreground select-none", className)}
      classNames={{
        months: "relative flex flex-col gap-6 sm:flex-row",
        month: "flex flex-col gap-3",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous: iconButtonVariants({ variant: "ghost", size: "sm" }),
        button_next: iconButtonVariants({ variant: "ghost", size: "sm" }),
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "text-sm font-medium",
        dropdowns: "flex items-center justify-center gap-1 text-sm font-medium",
        dropdown_root: "relative inline-flex items-center rounded-md px-1.5 py-1 hover:bg-muted",
        dropdown: "absolute inset-0 opacity-0",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "flex size-9 items-center justify-center text-xs font-medium text-muted-foreground",
        week: "mt-1 flex w-full",
        day: cn(
          "relative p-0 text-center",
          "data-outside:text-faint-foreground data-disabled:opacity-50 data-hidden:invisible",
        ),
        day_button: dayButtonClassName,
        // Range band painted on the cells so it runs edge to edge.
        range_start: "rounded-l-md bg-accent",
        range_middle: "bg-accent text-accent-foreground",
        range_end: "rounded-r-md bg-accent",
        ...classNames,
      }}
      components={{
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}
