"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * EmptyState. Centered icon-in-soft-circle + title + body + CTA slot
 * for empty lists, no-results and first-run screens. The dashed
 * variant is the pb-app "nothing here yet, add something" pattern; the
 * default variant is chromeless for use inside an existing Card.
 */
export const emptyStateVariants = cva(
  "flex w-full flex-col items-center justify-center px-6 py-12 text-center",
  {
    variants: {
      variant: {
        default: "",
        dashed: "rounded-xl border border-dashed border-border-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof emptyStateVariants> {
  /** Icon element (a phosphor icon); rendered in a soft circle. */
  icon?: React.ReactNode
  title: React.ReactNode
  /** Supporting body copy under the title. */
  description?: React.ReactNode
  /** CTA slot (Button, link...). */
  action?: React.ReactNode
}

export function EmptyState({
  className,
  variant,
  icon,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ variant }), className)} {...props}>
      {icon ? (
        <div
          aria-hidden
          className="mb-4 flex size-12 items-center justify-center rounded-full bg-secondary text-foreground [&_svg]:size-6"
        >
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
