"use client"

import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import { cva } from "class-variance-authority"
import { Check, Minus } from "@phosphor-icons/react"

import { cn } from "../../lib/cn.ts"

/**
 * Checkbox. Base UI Checkbox (role=checkbox, hidden input, keyboard
 * operable). Supports `indeterminate`. Label it via Field/Label or
 * aria-label.
 */
export const checkboxVariants = cva(
  cn(
    "group flex size-4 shrink-0 items-center justify-center rounded-sm border border-input bg-input-background",
    "transition-[background-color,border-color] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
    "data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-invalid:border-destructive",
  ),
)

export interface CheckboxProps extends Omit<BaseCheckbox.Root.Props, "className"> {
  className?: string
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <BaseCheckbox.Root className={cn(checkboxVariants(), className)} {...props}>
      <BaseCheckbox.Indicator className="flex items-center justify-center text-current">
        {/* Control-anatomy glyphs pin their weight (AGENTS.md rule 6
            carve-out): the mark must stay bold at any global setting. */}
        <Check aria-hidden weight="bold" className="size-3 group-data-indeterminate:hidden" />
        <Minus aria-hidden weight="bold" className="hidden size-3 group-data-indeterminate:block" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}
