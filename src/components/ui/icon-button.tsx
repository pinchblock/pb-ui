"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * IconButton. Square icon-only button; `aria-label` is required by the
 * type because there is no visible text. The `badge` slot positions a
 * CounterBadge or NotificationDot at the top-right (unread patterns).
 */
export const iconButtonVariants = cva(
  cn(
    "relative inline-flex shrink-0 items-center justify-center rounded-full select-none",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-fast) ease-(--ease-out)",
    "active:scale-[0.98]",
    /* Both disabled paths: native :disabled, and Base UI's data-disabled
       (the only signal under focusableWhenDisabled, which renders
       aria-disabled instead of the disabled attribute). */
    "disabled:pointer-events-none disabled:opacity-50",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        soft: "bg-secondary text-foreground hover:bg-accent",
        secondary:
          "border border-border bg-transparent text-muted-foreground hover:border-border-strong hover:bg-muted hover:text-foreground",
      },
      size: {
        md: "size-9 max-sm:size-10 [&_svg:not([class*='size-'])]:size-4",
        sm: "size-8 max-sm:size-10 [&_svg:not([class*='size-'])]:size-4",
        xs: "size-6 max-sm:size-10 [&_svg:not([class*='size-'])]:size-3.5",
      },
      /** Circular shape (floating actions, avatar-adjacent controls). */
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
)

export interface IconButtonProps
  extends BaseButton.Props,
    VariantProps<typeof iconButtonVariants> {
  /** Required: icon-only buttons have no visible text. */
  "aria-label": string
  /** Top-right overlay slot: CounterBadge or NotificationDot. */
  badge?: React.ReactNode
}

export function IconButton({
  className,
  variant,
  size,
  pill,
  badge,
  children,
  ...props
}: IconButtonProps) {
  return (
    <BaseButton
      className={cn(iconButtonVariants({ variant, size, pill }), className)}
      {...props}
    >
      {children}
      {badge ? (
        <span className="pointer-events-none absolute -top-1 -right-1 inline-flex">
          {badge}
        </span>
      ) : null}
    </BaseButton>
  )
}
