"use client"

import { Combobox as BaseCombobox } from "@base-ui/react/combobox"
import { cva, type VariantProps } from "class-variance-authority"
import { CaretDown, Check, X } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Combobox. Base UI Combobox family: pick one item from a list with
 * typeahead filtering. The input IS the trigger (reads like our Input);
 * the popup matches SelectPopup (bg-popover, shadow-overlay).
 * Pass `items` on the root so filtering and the Empty part work; render
 * options via ComboboxList's function child (flat) or ComboboxGroup +
 * ComboboxCollection (grouped). For async lists, reach for
 * AsyncCombobox instead of wiring these parts by hand.
 */

/* Root, Group and Collection carry no styling of their own. */
export const Combobox = BaseCombobox.Root
export const ComboboxGroup = BaseCombobox.Group
export const ComboboxCollection = BaseCombobox.Collection

export const comboboxInputVariants = cva(
  cn(
    "w-full min-w-0 rounded-md border border-input bg-input-background text-foreground",
    "placeholder:text-faint-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "aria-invalid:border-destructive data-invalid:border-destructive",
  ),
  {
    variants: {
      size: {
        sm: "h-8 pl-2.5 text-xs",
        md: "h-9 pl-3 text-sm",
        lg: "h-10 pl-3.5 text-sm",
      },
      /* Reserves room on the right for caret only vs clear + caret. */
      clearable: {
        false: "pr-9",
        true: "pr-14",
      },
    },
    defaultVariants: {
      size: "md",
      clearable: false,
    },
  },
)

const inputButtonClassName = cn(
  "pointer-events-auto flex size-6 items-center justify-center rounded-sm text-muted-foreground",
  "transition-colors duration-(--duration-fast) ease-(--ease-out)",
  "hover:text-foreground",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
)

export interface ComboboxInputProps
  extends Omit<BaseCombobox.Input.Props, "className" | "size">,
    VariantProps<typeof comboboxInputVariants> {
  className?: string | undefined
}

/**
 * Input-shaped trigger: text input plus caret button, and a clear
 * button (shown only while a value is selected) when `clearable`.
 */
export function ComboboxInput({
  className,
  size,
  clearable = false,
  ...props
}: ComboboxInputProps) {
  return (
    <BaseCombobox.InputGroup className="relative w-full">
      <BaseCombobox.Input
        className={cn(comboboxInputVariants({ size, clearable }), className)}
        {...props}
      />
      {/* pointer-events-none so the strip's padding stays clickable-through
          to the input; the buttons re-enable their own pointer events. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-0.5 pr-1.5">
        {clearable ? (
          <BaseCombobox.Clear aria-label="Clear selection" className={inputButtonClassName}>
            <X aria-hidden className="size-4" />
          </BaseCombobox.Clear>
        ) : null}
        {/* Caret is a pointer affordance; keyboard users open from the input. */}
        <BaseCombobox.Trigger tabIndex={-1} aria-label="Open list" className={inputButtonClassName}>
          <CaretDown aria-hidden className="size-4" />
        </BaseCombobox.Trigger>
      </div>
    </BaseCombobox.InputGroup>
  )
}

export interface ComboboxPopupProps extends Omit<BaseCombobox.Popup.Props, "className"> {
  className?: string | undefined
  /** Gap between input and popup, px. */
  sideOffset?: number
}

export function ComboboxPopup({
  className,
  sideOffset = 4,
  children,
  ...props
}: ComboboxPopupProps) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={sideOffset} className="z-50 select-none">
        <BaseCombobox.Popup
          className={cn(
            "max-h-(--available-height) w-(--anchor-width) overflow-y-auto overscroll-contain rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-overlay",
            "origin-(--transform-origin) transition-[opacity,transform] duration-(--duration-fast) ease-(--ease-out)",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  )
}

export interface ComboboxListProps extends Omit<BaseCombobox.List.Props, "className"> {
  className?: string | undefined
}

export function ComboboxList({ className, ...props }: ComboboxListProps) {
  return <BaseCombobox.List className={cn("outline-none", className)} {...props} />
}

export interface ComboboxItemProps extends Omit<BaseCombobox.Item.Props, "className"> {
  className?: string | undefined
  /** Right-aligned secondary text: a count, a unit, a date. Sits before the selected mark. */
  trailing?: React.ReactNode
}

/** Meta text at the end of an item row: small, muted, digits aligned. */
const itemTrailingClassName = "shrink-0 text-xs tabular-nums text-muted-foreground"

export function ComboboxItem({ className, children, trailing, ...props }: ComboboxItemProps) {
  return (
    <BaseCombobox.Item
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-foreground select-none",
        "data-highlighted:bg-muted",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {trailing ? <span className={itemTrailingClassName}>{trailing}</span> : null}
      <BaseCombobox.ItemIndicator className="flex shrink-0 text-foreground">
        <Check aria-hidden className="size-4" />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  )
}

export interface ComboboxGroupLabelProps
  extends Omit<BaseCombobox.GroupLabel.Props, "className"> {
  className?: string | undefined
}

export function ComboboxGroupLabel({ className, ...props }: ComboboxGroupLabelProps) {
  return (
    <BaseCombobox.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export interface ComboboxEmptyProps extends Omit<BaseCombobox.Empty.Props, "className"> {
  className?: string | undefined
}

/**
 * No-results row; renders children only when the filtered list is
 * empty. Stays mounted for screen-reader announcements, so padding
 * collapses via `empty:` rather than hiding the element.
 */
export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <BaseCombobox.Empty
      className={cn(
        "px-2 py-4 text-center text-sm text-muted-foreground empty:p-0",
        className,
      )}
      {...props}
    />
  )
}

export interface ComboboxStatusProps extends Omit<BaseCombobox.Status.Props, "className"> {
  className?: string | undefined
}

/**
 * Polite live-region row for async list state ("Searching..."). Same
 * mounted-but-collapsed rule as ComboboxEmpty.
 */
export function ComboboxStatus({ className, ...props }: ComboboxStatusProps) {
  return (
    <BaseCombobox.Status
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground empty:p-0",
        className,
      )}
      {...props}
    />
  )
}
