import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/cn.ts"

/**
 * Switch. Base UI Switch (role=switch, hidden input). Thumb slides with
 * duration-(--duration-fast). Label it via Field/Label or aria-label.
 */
export const switchVariants = cva(
  cn(
    "group inline-flex shrink-0 items-center rounded-full bg-input p-0.5",
    "transition-[background-color] duration-(--duration-fast) ease-(--ease-out)",
    "data-checked:bg-primary",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
  ),
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export const switchThumbVariants = cva(
  cn(
    "pointer-events-none block rounded-full bg-card shadow-card",
    "transition-transform duration-(--duration-fast) ease-(--ease-out)",
  ),
  {
    variants: {
      size: {
        sm: "size-3 data-checked:translate-x-3",
        md: "size-4 data-checked:translate-x-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface SwitchProps
  extends Omit<BaseSwitch.Root.Props, "className">,
    VariantProps<typeof switchVariants> {
  className?: string
}

export function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <BaseSwitch.Root className={cn(switchVariants({ size }), className)} {...props}>
      <BaseSwitch.Thumb className={switchThumbVariants({ size })} />
    </BaseSwitch.Root>
  )
}
