"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Card. Compound surface: Card + CardHeader/CardTitle/CardDescription/
 * CardContent/CardFooter. Variants:
 * - default: solid app card (bg-card, border, shadow-card)
 * - interactive: default + hover affordance for clickable/linked cards
 * - glass: PUBLIC MARKETING SURFACES ONLY (guardrail): authenticated app
 *   cards stay solid. Light themes collapse glass to solid automatically.
 * - sunken: borderless inset well (bg-background-sunken) for nested areas.
 */
export const cardVariants = cva("rounded-xl text-card-foreground", {
  variants: {
    variant: {
      default: "border border-border bg-card shadow-card",
      interactive: cn(
        "border border-border bg-card shadow-card",
        "transition-[border-color,box-shadow] duration-(--duration-fast) ease-(--ease-out)",
        "hover:border-primary-border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      ),
      glass: "glass-card",
      sunken: "bg-background-sunken",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant }), className)} {...props} />
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base leading-snug font-semibold text-foreground", className)}
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 p-6 pt-0", className)} {...props} />
}
