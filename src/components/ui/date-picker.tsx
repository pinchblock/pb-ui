"use client"

import { Field as BaseField } from "@base-ui/react/field"
import { CalendarBlank, X } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import type { DateRange, Matcher } from "react-day-picker"

import { cn } from "../../lib/cn.ts"
import { Calendar } from "./calendar.tsx"
import { Popover, PopoverPopup, PopoverTrigger } from "./popover.tsx"

/**
 * DatePicker (single Date) and DateRangePicker (from/to). Input-shaped
 * trigger opening a Calendar in a Popover. Two components instead of a
 * mode prop: the value types stay flat (Date vs DateRange), which keeps
 * form code and controlled state obvious.
 *
 * Field-compatible: the trigger renders through Base UI Field.Control,
 * so under <Field label error> the label associates and data-invalid
 * lands on the trigger with no extra wiring.
 */

/* Consumers style disabled dates etc. without depending on react-day-picker. */
export type { DateRange, Matcher } from "react-day-picker"

export const datePickerTriggerVariants = cva(
  cn(
    "flex w-full min-w-0 items-center gap-2 rounded-md border border-input bg-input-background text-left text-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive data-invalid:border-destructive",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

const defaultFormat = (date: Date) =>
  new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short", year: "numeric" }).format(date)

interface PickerBaseProps {
  placeholder?: string
  /** Shows a clear affordance while a value is set. */
  clearable?: boolean
  disabled?: boolean
  /** Days that cannot be picked (react-day-picker matcher passthrough). */
  disabledDates?: Matcher | Matcher[]
  /** Month shown on open when nothing is selected yet. */
  defaultMonth?: Date
  size?: VariantProps<typeof datePickerTriggerVariants>["size"]
  /** Formats the trigger text; defaults to the user's locale, e.g. "12 Aug 2026". */
  format?: (date: Date) => string
  /** Forwarded to the trigger (label association outside Field). */
  id?: string
  /** Applied to the trigger. */
  className?: string
}

interface PickerShellProps extends Pick<PickerBaseProps, "size" | "disabled" | "id" | "className"> {
  open: boolean
  onOpenChange: (open: boolean) => void
  display: string | undefined
  placeholder: string
  showClear: boolean
  onClear: () => void
  clearLabel: string
  children: React.ReactNode
}

/** Shared trigger + popup shell for both pickers. */
function PickerShell({
  open,
  onOpenChange,
  display,
  placeholder,
  showClear,
  onClear,
  clearLabel,
  size,
  disabled,
  id,
  className,
  children,
}: PickerShellProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <div className="relative w-full">
        <PopoverTrigger
          disabled={disabled}
          className={cn(datePickerTriggerVariants({ size }), showClear && "pr-9", className)}
          render={<BaseField.Control render={<button type="button" id={id} />} />}
        >
          <CalendarBlank aria-hidden className="size-4 text-muted-foreground" />
          <span className={cn("flex-1 truncate", display == null && "text-faint-foreground")}>
            {display ?? placeholder}
          </span>
        </PopoverTrigger>
        {showClear && (
          <button
            type="button"
            aria-label={clearLabel}
            onClick={onClear}
            className={cn(
              "absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground",
              "transition-colors duration-(--duration-fast) ease-(--ease-out) hover:text-foreground",
            )}
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <PopoverPopup align="start" className="w-auto p-2">
        {children}
      </PopoverPopup>
    </Popover>
  )
}

export interface DatePickerProps extends PickerBaseProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
}

export function DatePicker(props: DatePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    placeholder = "Pick a date",
    clearable = false,
    disabled = false,
    disabledDates,
    defaultMonth,
    size,
    format = defaultFormat,
    id,
    className,
  } = props
  const controlled = "value" in props
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState<Date | undefined>(defaultValue)
  const selected = controlled ? value : inner

  const setSelected = (date: Date | undefined) => {
    if (!controlled) setInner(date)
    onValueChange?.(date)
  }

  return (
    <PickerShell
      open={open}
      onOpenChange={setOpen}
      display={selected ? format(selected) : undefined}
      placeholder={placeholder}
      showClear={clearable && selected != null && !disabled}
      onClear={() => setSelected(undefined)}
      clearLabel="Clear date"
      size={size}
      disabled={disabled}
      id={id}
      className={className}
    >
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => {
          setSelected(date)
          if (date) setOpen(false)
        }}
        disabled={disabledDates}
        defaultMonth={selected ?? defaultMonth}
      />
    </PickerShell>
  )
}

export interface DateRangePickerProps extends PickerBaseProps {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  /** Months shown side by side in the popup. */
  numberOfMonths?: number
}

export function DateRangePicker(props: DateRangePickerProps) {
  const {
    value,
    defaultValue,
    onValueChange,
    placeholder = "Pick a date range",
    clearable = false,
    disabled = false,
    disabledDates,
    defaultMonth,
    numberOfMonths = 1,
    size,
    format = defaultFormat,
    id,
    className,
  } = props
  const controlled = "value" in props
  const [open, setOpen] = React.useState(false)
  const [inner, setInner] = React.useState<DateRange | undefined>(defaultValue)
  const selected = controlled ? value : inner

  const setSelected = (range: DateRange | undefined) => {
    if (!controlled) setInner(range)
    onValueChange?.(range)
  }

  const display = selected?.from
    ? selected.to && selected.to.toDateString() !== selected.from.toDateString()
      ? `${format(selected.from)} – ${format(selected.to)}`
      : format(selected.from)
    : undefined

  return (
    <PickerShell
      open={open}
      onOpenChange={setOpen}
      display={display}
      placeholder={placeholder}
      showClear={clearable && selected?.from != null && !disabled}
      onClear={() => setSelected(undefined)}
      clearLabel="Clear date range"
      size={size}
      disabled={disabled}
      id={id}
      className={className}
    >
      <Calendar
        mode="range"
        selected={selected}
        onSelect={(range) => {
          setSelected(range)
          // First click yields a same-day range; keep the popup open
          // until a real end date lands (Esc/outside accepts one day).
          if (range?.from && range.to && range.to.toDateString() !== range.from.toDateString()) {
            setOpen(false)
          }
        }}
        resetOnSelect
        disabled={disabledDates}
        defaultMonth={selected?.from ?? defaultMonth}
        numberOfMonths={numberOfMonths}
      />
    </PickerShell>
  )
}
