"use client"

import { Radio as BaseRadio } from "@base-ui/react/radio"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/cn.ts"

/**
 * RadioGroup + Radio. Base UI radio group (roving focus, arrow-key
 * selection, hidden input). Pair each Radio with a Label, or use
 * RadioCard for the card-styled variant.
 */
export interface RadioGroupProps extends Omit<BaseRadioGroup.Props, "className"> {
  className?: string
}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={cn("flex flex-col gap-2", className)} {...props} />
}

export const radioVariants = cva(
  cn(
    "flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-input-background",
    "transition-[border-color,background-color] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "data-checked:border-primary",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-invalid:border-destructive",
  ),
)

export interface RadioProps extends Omit<BaseRadio.Root.Props, "className"> {
  className?: string
}

export function Radio({ className, ...props }: RadioProps) {
  return (
    <BaseRadio.Root className={cn(radioVariants(), className)} {...props}>
      <BaseRadio.Indicator className="size-2 rounded-full bg-primary" />
    </BaseRadio.Root>
  )
}
