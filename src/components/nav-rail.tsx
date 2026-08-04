"use client"

import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import type { Icon } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * One navigation destination, shared by NavRail, MobileTabBar and
 * AppShell. Presentational: no router coupling. `href` renders a plain
 * <a>; pass `render` (Base UI render prop) to swap in a router link,
 * e.g. render={<Link to="/plan" />}.
 */
export interface NavItem {
  icon: Icon
  label: string
  href?: string
  onClick?: React.MouseEventHandler
  active?: boolean
  /** Count chip on the expanded rail / tab bar; dot on the icon rail. */
  badge?: string | number
  /** Base UI render prop replacing the default <a>/<button>. */
  render?: useRender.RenderProp
}

/** A labeled group of destinations on the rail. */
export interface NavRailSection {
  label?: string
  items: NavItem[]
}

/**
 * NavRail: desktop-side navigation. 64px icon rail by default,
 * expandable to a 240px rail with labels via `expanded`.
 */
export const navRailVariants = cva(
  cn(
    "flex h-full flex-col gap-2 border-r border-border bg-background-raised p-3",
    "transition-[width] duration-(--duration-base) ease-(--ease-in-out)",
  ),
  {
    variants: {
      expanded: {
        true: "w-60",
        false: "w-16",
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
)

export const navRailItemVariants = cva(
  cn(
    "relative flex items-center gap-3 rounded-lg text-sm font-medium",
    "text-muted-foreground hover:bg-muted hover:text-foreground",
    "transition-colors duration-(--duration-fast) ease-(--ease-out)",
    "data-active:bg-primary-soft data-active:text-primary",
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ),
  {
    variants: {
      expanded: {
        true: "h-10 w-full px-3",
        false: "size-10 justify-center",
      },
    },
    defaultVariants: {
      expanded: false,
    },
  },
)

export interface NavRailItemProps extends VariantProps<typeof navRailItemVariants> {
  item: NavItem
  className?: string
}

/**
 * A single rail destination. Collapsed rails show the icon only; the
 * label moves to aria-label/title so it stays screen-reader reachable.
 */
export function NavRailItem({ item, expanded = false, className }: NavRailItemProps) {
  const { icon: Icon, label, href, onClick, active, badge, render } = item
  return useRender({
    render,
    defaultTagName: href ? "a" : "button",
    props: {
      href,
      type: href ? undefined : "button",
      onClick,
      title: expanded ? undefined : label,
      "aria-label": expanded ? undefined : label,
      "aria-current": active ? "page" : undefined,
      "data-active": active ? "" : undefined,
      className: cn(navRailItemVariants({ expanded }), className),
      children: (
        <>
          <Icon aria-hidden />
          {expanded ? <span className="truncate">{label}</span> : null}
          {badge != null ? (
            expanded ? (
              <span className="ml-auto grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                {badge}
              </span>
            ) : (
              <span
                aria-hidden
                className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary"
              />
            )
          ) : null}
        </>
      ),
    },
  })
}

export interface NavRailProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navRailVariants> {
  /** Convenience for a single unlabeled group. */
  items?: NavItem[]
  /** Labeled groups; wins over `items` when both are given. */
  sections?: NavRailSection[]
  /** Top slot: logo / workspace switcher. */
  header?: React.ReactNode
  /** Bottom slot: avatar, theme toggle. */
  footer?: React.ReactNode
}

export function NavRail({
  items,
  sections,
  expanded = false,
  header,
  footer,
  className,
  children,
  ...props
}: NavRailProps) {
  const groups: NavRailSection[] = sections ?? (items ? [{ items }] : [])
  return (
    <nav
      aria-label="Main"
      data-expanded={expanded ? "" : undefined}
      {...props}
      className={cn(navRailVariants({ expanded }), className)}
    >
      {header ? (
        <div className={cn("flex items-center", expanded ? "px-1" : "justify-center")}>
          {header}
        </div>
      ) : null}
      <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto">
        {groups.map((group, index) => (
          <div key={group.label ?? index} className="space-y-1">
            {group.label ? (
              expanded ? (
                <p className="eyebrow px-3 pb-1">{group.label}</p>
              ) : index > 0 ? (
                <div aria-hidden className="mx-2 border-t border-border" />
              ) : null
            ) : null}
            {group.items.map((item) => (
              <NavRailItem key={item.label} item={item} expanded={expanded} />
            ))}
          </div>
        ))}
        {children}
      </div>
      {footer ? (
        <div className={cn("flex items-center gap-2", !expanded && "justify-center")}>
          {footer}
        </div>
      ) : null}
    </nav>
  )
}
