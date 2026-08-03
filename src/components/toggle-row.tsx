"use client"

import { useId } from "react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import { Switch } from "./ui/switch.tsx"
import { ListRow } from "./list-row.tsx"

/**
 * ToggleRow. Settings row: label + description with a trailing switch,
 * built on ListRow so it stacks in the same divide-y lists. The whole
 * row is a <label>, so clicking anywhere toggles; the switch itself is
 * the keyboard/focus target (Base UI Switch underneath) and is named
 * by the row label for screen readers.
 */
export interface ToggleRowProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "title" | "onChange"> {
  label: React.ReactNode
  description?: React.ReactNode
  /** Controlled checked state; use defaultChecked for uncontrolled. */
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  /** Form field name for the hidden input. */
  name?: string
}

export function ToggleRow({
  className,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  name,
  ...props
}: ToggleRowProps) {
  const labelId = useId()
  const descriptionId = useId()

  return (
    <label className={cn("block w-full", disabled && "opacity-50", className)} {...props}>
      <ListRow
        title={<span id={labelId}>{label}</span>}
        meta={description ? <span id={descriptionId}>{description}</span> : undefined}
        trailing={
          <Switch
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={(next) => onCheckedChange?.(next)}
            disabled={disabled}
            name={name}
            aria-labelledby={labelId}
            aria-describedby={description ? descriptionId : undefined}
          />
        }
      />
    </label>
  )
}
