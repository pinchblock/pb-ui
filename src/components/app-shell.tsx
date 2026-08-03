"use client"

import type * as React from "react"

import { cn } from "../lib/cn.ts"
import { MobileTabBar, type MobileTabBarFab } from "./mobile-tab-bar.tsx"
import { NavRail, type NavItem, type NavRailSection } from "./nav-rail.tsx"

/**
 * Which chrome to render. "responsive" (default) shows the rail on md+
 * viewports and the tab bar below md. "mobile"/"desktop" force one
 * chrome for previews (PhoneFrame, miniatures) where the viewport
 * breakpoint would lie about the intended device.
 */
export type AppShellLayout = "responsive" | "mobile" | "desktop"

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Destinations shared by the desktop rail and the mobile tab bar. */
  items: NavItem[]
  /** Tab bar subset (a phone bar fits 4 items + fab); defaults to `items`. */
  tabItems?: NavItem[]
  /** Optional labeled rail groups; wins over `items` on the rail. */
  railSections?: NavRailSection[]
  /** Raised center action on the mobile tab bar. */
  fab?: MobileTabBarFab
  /** Sticky chrome above the content; compose with <TopBar>. */
  topBar?: React.ReactNode
  /** Rail top slot: logo / workspace switcher. */
  railHeader?: React.ReactNode
  /** Rail bottom slot: avatar, theme toggle. */
  railFooter?: React.ReactNode
  /** 240px labeled rail instead of the 64px icon rail. */
  railExpanded?: boolean
  layout?: AppShellLayout
  /**
   * Render inside a positioned box (device frame, preview card) instead
   * of the viewport: the shell fills its parent, scrolls internally and
   * the tab bar pins to the box rather than the window.
   */
  contained?: boolean
}

/**
 * AppShell: the authenticated chrome template. Purely presentational;
 * links stay decoupled from any router via the per-item `render` prop.
 * The content area is a <main> landmark with min-w-0 so wide children
 * (tables, charts) scroll instead of blowing up the layout.
 */
export function AppShell({
  items,
  tabItems,
  railSections,
  fab,
  topBar,
  railHeader,
  railFooter,
  railExpanded = false,
  layout = "responsive",
  contained = false,
  className,
  children,
  ...props
}: AppShellProps) {
  const railVisibility =
    layout === "mobile" ? "hidden" : layout === "desktop" ? "flex" : "hidden md:flex"
  const tabBarVisibility =
    layout === "desktop" ? "hidden" : layout === "mobile" ? "" : "md:hidden"
  /* Bottom padding clears the fixed tab bar (h-16 + raised fab). */
  const clearTabBar =
    layout === "desktop" ? "" : layout === "mobile" ? "pb-24" : "pb-24 md:pb-0"

  return (
    <div
      {...props}
      className={cn(
        "flex bg-background text-foreground",
        contained ? "relative h-full min-h-0 overflow-hidden" : "min-h-dvh",
        className,
      )}
    >
      <NavRail
        items={railSections ? undefined : items}
        sections={railSections}
        expanded={railExpanded}
        header={railHeader}
        footer={railFooter}
        className={cn("shrink-0", railVisibility, !contained && "sticky top-0 h-dvh")}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main className={cn("min-w-0 flex-1", contained && "overflow-y-auto", clearTabBar)}>
          {children}
        </main>
      </div>
      <MobileTabBar
        items={tabItems ?? items}
        fab={fab}
        className={cn(tabBarVisibility, contained && "absolute")}
      />
    </div>
  )
}
