"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleNotch } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Button. Exemplar component: every pb-ui component follows this shape.
 * - Base UI primitive underneath (a11y, disabled semantics, `render` prop
 *   for polymorphism: <Button render={<a href/>}>).
 * - CVA variants on semantic tokens only; no raw colors, no off-scale sizes.
 * - Motion via duration/ease tokens; pressed state gives tactile feedback.
 */
export const buttonVariants = cva(
  cn(
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-medium select-none" /* buttons are always fully rounded by rule */,
    "transition-[background-color,border-color,color,box-shadow,transform] duration-(--duration-fast) ease-(--ease-out)",
    "active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "border border-border bg-transparent text-foreground hover:border-border-strong hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        soft: "bg-primary-soft text-primary hover:bg-accent",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        "destructive-soft": "bg-destructive-soft text-destructive hover:bg-destructive/25",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-6 text-sm",
        xl: "h-12 px-8 text-base",
        icon: "size-9 max-sm:size-10",
        "icon-sm": "size-8 max-sm:size-10",
        "icon-xs": "size-6 max-sm:size-10",
      },
      /** Pill shape for marketing CTAs and chips-adjacent actions. */
      pill: {
        true: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends BaseButton.Props,
    VariantProps<typeof buttonVariants> {
  /** Shows a spinner and disables interaction while keeping width stable. */
  loading?: boolean
}

export function Button({
  className,
  variant,
  size,
  pill,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-loading={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, pill }), className)}
      {...props}
    >
      {loading && <CircleNotch aria-hidden className="animate-spin" />}
      {children}
    </BaseButton>
  )
}
