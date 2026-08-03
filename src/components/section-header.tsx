import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * SectionHeader. Eyebrow-styled section title with optional icon and a
 * right-side action slot. Sits above a Card, list or table group on
 * dashboards ("TODAY'S SESSIONS", "RECENT PRS").
 */
export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  /** Icon element (a lucide icon), rendered before the title. */
  icon?: React.ReactNode
  /** Right-side slot: "View all" link, small Button, filter. */
  action?: React.ReactNode
}

export function SectionHeader({
  className,
  title,
  icon,
  action,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    >
      <h2 className="eyebrow flex items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-primary">
        {icon}
        {title}
      </h2>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
