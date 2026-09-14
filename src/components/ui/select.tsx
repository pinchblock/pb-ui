"use client"

import { Select as BaseSelect } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"
import { CaretDown, Check } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Select. Base UI Select family, styled: trigger reads like an Input,
 * popup on bg-popover with shadow-overlay. Compound parts for full
 * control, SimpleSelect for the common options-array case.
 */

/* Root, Value and Group carry no styling of their own. */
export const Select = BaseSelect.Root
export const SelectValue = BaseSelect.Value
export const SelectGroup = BaseSelect.Group

export const selectTriggerVariants = cva(
  cn(
    "flex w-full items-center justify-between gap-2 rounded-md border border-input bg-input-background text-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-placeholder:text-faint-foreground",
    "data-invalid:border-destructive aria-invalid:border-destructive",
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

export interface SelectTriggerProps
  extends Omit<BaseSelect.Trigger.Props, "className">,
    VariantProps<typeof selectTriggerVariants> {
  className?: string | undefined
}

export function SelectTrigger({ className, size, children, ...props }: SelectTriggerProps) {
  return (
    <BaseSelect.Trigger
      className={cn(selectTriggerVariants({ size }), className)}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-left">
        {children}
      </span>
      <BaseSelect.Icon className="flex shrink-0 text-muted-foreground">
        <CaretDown className="size-4" />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>
  )
}

export interface SelectPopupProps extends Omit<BaseSelect.Popup.Props, "className"> {
  className?: string | undefined
  /** Gap between trigger and popup, px. */
  sideOffset?: number
  /**
   * Base UI can overlap the trigger so the selected item aligns with it
   * (macOS style). Off by default: Pinchblock selects drop below.
   */
  alignItemWithTrigger?: boolean
}

export function SelectPopup({
  className,
  sideOffset = 4,
  alignItemWithTrigger = false,
  children,
  ...props
}: SelectPopupProps) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 select-none"
      >
        <BaseSelect.Popup
          className={cn(
            "max-h-(--available-height) min-w-(--anchor-width) overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-overlay",
            "origin-(--transform-origin) transition-[opacity,transform] duration-(--duration-fast) ease-(--ease-out)",
            "data-starting-style:scale-95 data-starting-style:opacity-0",
            "data-ending-style:scale-95 data-ending-style:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  )
}

export interface SelectItemProps extends Omit<BaseSelect.Item.Props, "className"> {
  className?: string | undefined
}

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      className={cn(
        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-foreground select-none",
        "data-highlighted:bg-muted",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <BaseSelect.ItemText className="min-w-0 flex-1 truncate">
        {children}
      </BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="flex shrink-0 text-foreground">
        <Check className="size-4" />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
}

export interface SelectGroupLabelProps
  extends Omit<BaseSelect.GroupLabel.Props, "className"> {
  className?: string | undefined
}

export function SelectGroupLabel({ className, ...props }: SelectGroupLabelProps) {
  return (
    <BaseSelect.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export interface SimpleSelectOption {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SimpleSelectProps {
  options: SimpleSelectOption[]
  placeholder?: React.ReactNode
  size?: VariantProps<typeof selectTriggerVariants>["size"]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  disabled?: boolean
  required?: boolean
  readOnly?: boolean
  name?: string
  id?: string
  /** Applied to the trigger. */
  className?: string | undefined
}

/** One-prop Select for the common flat options case. */
export function SimpleSelect({
  options,
  placeholder,
  size,
  className,
  ...rootProps
}: SimpleSelectProps) {
  return (
    <Select items={options} {...rootProps}>
      <SelectTrigger size={size} {...(className !== undefined ? { className } : {})}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectPopup>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
