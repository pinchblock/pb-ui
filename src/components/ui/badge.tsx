"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Badge. Status pills and inline chips (replaces app-local StatusBadge
 * and every hand-rolled chip). Soft appearance is the default (quiet
 * emphasis); solid is for status pills that must dominate. The `ai`
 * tone always renders the AI surface treatment; pair it with a
 * Sparkles icon on AI-assisted moments only.
 */
export const badgeVariants = cva(
  cn(
    "inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-medium select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      tone: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        destructive: "",
        info: "",
        ai: "",
      },
      appearance: {
        soft: "",
        solid: "",
      },
      size: {
        sm: "h-5 gap-1 px-2 text-xs [&_svg]:size-3",
        md: "h-6 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5",
      },
    },
    compoundVariants: [
      { tone: "neutral", appearance: "soft", className: "bg-muted text-muted-foreground" },
      { tone: "neutral", appearance: "solid", className: "bg-foreground text-background" },
      { tone: "primary", appearance: "soft", className: "bg-secondary text-foreground" },
      { tone: "primary", appearance: "solid", className: "bg-primary text-primary-foreground" },
      { tone: "success", appearance: "soft", className: "bg-success-soft text-success" },
      { tone: "success", appearance: "solid", className: "bg-success text-success-foreground" },
      { tone: "warning", appearance: "soft", className: "bg-warning-soft text-warning" },
      { tone: "warning", appearance: "solid", className: "bg-warning text-warning-foreground" },
      { tone: "destructive", appearance: "soft", className: "bg-destructive-soft text-destructive" },
      { tone: "destructive", appearance: "solid", className: "bg-destructive text-destructive-foreground" },
      { tone: "info", appearance: "soft", className: "bg-info-soft text-info" },
      { tone: "info", appearance: "solid", className: "bg-info text-info-foreground" },
      /* AI has exactly one treatment; both appearances resolve to it. */
      { tone: "ai", className: "ai-surface" },
    ],
    defaultVariants: {
      tone: "neutral",
      appearance: "soft",
      size: "sm",
    },
  },
)

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /** Leading icon slot (a phosphor icon; sized by the badge). */
  icon?: React.ReactNode
}

export function Badge({
  className,
  tone,
  appearance,
  size,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ tone, appearance, size }), className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  )
}
