"use client"

import { Radio as BaseRadio } from "@base-ui/react/radio"
import { cva } from "class-variance-authority"
import { CircleCheck } from "lucide-react"

import { cn } from "../../lib/cn.ts"

/**
 * RadioCard. Card-styled selectable option for role pickers and mode
 * cards. Use inside RadioGroup; children are free-form (icon + title +
 * description is the usual shape). A check appears top-right when
 * selected.
 */
export const radioCardVariants = cva(
  cn(
    "relative w-full rounded-lg border border-border bg-card p-4 text-left text-sm text-card-foreground",
    "transition-[border-color,background-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
    "hover:border-border-strong",
    "data-checked:border-primary data-checked:bg-primary-soft",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-invalid:border-destructive",
  ),
)

export interface RadioCardProps extends Omit<BaseRadio.Root.Props, "className"> {
  className?: string
}

export function RadioCard({ className, children, ...props }: RadioCardProps) {
  return (
    <BaseRadio.Root className={cn(radioCardVariants(), className)} {...props}>
      {children}
      <BaseRadio.Indicator className="absolute top-3 right-3 flex text-primary">
        <CircleCheck className="size-4" />
      </BaseRadio.Indicator>
    </BaseRadio.Root>
  )
}
