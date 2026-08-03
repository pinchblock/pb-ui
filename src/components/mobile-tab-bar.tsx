"use client"

import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"
import type { NavItem } from "./nav-rail.tsx"

/** Raised center action for the tab bar (e.g. "Log session"). */
export interface MobileTabBarFab {
  icon: LucideIcon
  /** Required: the FAB is icon-only, so this is its accessible name. */
  label: string
  href?: string
  onClick?: React.MouseEventHandler
  /** Base UI render prop replacing the default <a>/<button>. */
  render?: useRender.RenderProp
}

export const mobileTabBarItemVariants = cva(
  cn(
    "relative flex h-full min-w-0 flex-col items-center justify-center gap-0.5",
    "text-muted-foreground hover:text-foreground",
    "transition-colors duration-(--duration-fast) ease-(--ease-out)",
    "data-active:text-primary",
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ),
)

export const mobileTabBarFabVariants = cva(
  cn(
    "grid size-14 -translate-y-4 place-items-center rounded-full",
    "bg-primary text-primary-foreground shadow-raised",
    "transition-[background-color,transform] duration-(--duration-fast) ease-(--ease-out)",
    "hover:bg-primary-hover active:scale-95",
    "[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
  ),
)

function MobileTabBarItem({ item }: { item: NavItem }) {
  const { icon: Icon, label, href, onClick, active, badge, render } = item
  return useRender({
    render,
    defaultTagName: href ? "a" : "button",
    props: {
      href,
      type: href ? undefined : "button",
      onClick,
      "aria-current": active ? "page" : undefined,
      "data-active": active ? "" : undefined,
      className: mobileTabBarItemVariants(),
      children: (
        <>
          <span className="relative">
            <Icon aria-hidden />
            {badge != null ? (
              <span className="absolute -top-1 -right-2 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-xs leading-none font-semibold text-primary-foreground">
                {badge}
              </span>
            ) : null}
          </span>
          <span className="max-w-full truncate text-xs font-medium">{label}</span>
        </>
      ),
    },
  })
}

function MobileTabBarFabSlot({ fab }: { fab: MobileTabBarFab }) {
  const { icon: Icon, label, href, onClick, render } = fab
  const element = useRender({
    render,
    defaultTagName: href ? "a" : "button",
    props: {
      href,
      type: href ? undefined : "button",
      onClick,
      "aria-label": label,
      title: label,
      className: mobileTabBarFabVariants(),
      children: <Icon aria-hidden />,
    },
  })
  return <div className="flex items-start justify-center">{element}</div>
}

export interface MobileTabBarProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[]
  /** Raised center action; inserted into the middle slot. */
  fab?: MobileTabBarFab
}

/**
 * MobileTabBar: fixed bottom navigation for phone layouts. Give it four
 * items plus a `fab` for the classic five-slot bar with a raised center
 * action. Inside a positioned preview box (PhoneFrame, AppShell
 * `contained`) pass className="absolute" to pin it to the box instead
 * of the viewport.
 */
export function MobileTabBar({ items, fab, className, ...props }: MobileTabBarProps) {
  const mid = Math.ceil(items.length / 2)
  const leading = fab ? items.slice(0, mid) : items
  const trailing = fab ? items.slice(mid) : []
  return (
    <nav
      aria-label="Main"
      {...props}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card",
        /* Device inset, not a design value: clears iOS home indicators. */
        "pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      <div className="grid h-16 auto-cols-fr grid-flow-col items-stretch px-2">
        {leading.map((item) => (
          <MobileTabBarItem key={item.label} item={item} />
        ))}
        {fab ? <MobileTabBarFabSlot fab={fab} /> : null}
        {trailing.map((item) => (
          <MobileTabBarItem key={item.label} item={item} />
        ))}
      </div>
    </nav>
  )
}
