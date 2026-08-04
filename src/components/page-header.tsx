"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { ArrowLeft } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * PageHeader. Page title + description + actions row with an optional
 * back link above; replaces AppPageHeader in pb-app. `size="lg"` is for
 * top-level pages (Dashboard, Clients); `size="md"` (the default) for
 * detail pages.
 */
export const pageHeaderTitleVariants = cva(
  "font-display font-semibold tracking-tight text-foreground",
  {
    variants: {
      size: {
        md: "text-xl",
        lg: "text-3xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface PageHeaderBackLink {
  label: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof pageHeaderTitleVariants> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Right-side actions slot (Buttons). Wraps under the title on mobile. */
  actions?: React.ReactNode
  /** Back link rendered above the title. */
  back?: PageHeaderBackLink
}

export function PageHeader({
  className,
  size,
  title,
  description,
  actions,
  back,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-1", className)} {...props}>
      {back ? (
        <a
          href={back.href ?? "#"}
          onClick={back.onClick}
          className={cn(
            "mb-1 inline-flex w-fit items-center gap-1 text-sm text-muted-foreground",
            "transition-colors duration-(--duration-fast) ease-(--ease-out) hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
          )}
        >
          <ArrowLeft aria-hidden className="size-4" />
          {back.label}
        </a>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0">
          <h1 className={pageHeaderTitleVariants({ size })}>{title}</h1>
          {description ? (
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 items-center gap-2">{actions}</div>
        ) : null}
      </div>
    </header>
  )
}
