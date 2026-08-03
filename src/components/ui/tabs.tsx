"use client"

import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Tabs. Base UI Tabs with two visual variants, replacing the divergent
 * pb-app tab implementations:
 * - underline: the app pattern (border-b list, 2px primary underline)
 * - pill: segmented control look for sub-navigation
 *
 * The variant is set once on TabsList and flows to every TabsTab via
 * context. Lists scroll horizontally when they overflow (scrollbar
 * hidden), so long tab sets stay usable on mobile. Tabs take icons:
 * svg children are sized automatically.
 */
/* `relative` is load-bearing: Base UI scrolls the active tab into view
   on mount by summing offsetLeft up the offsetParent chain. Without a
   positioned list the chain skips past this scroll container to an outer
   ancestor, inflating the offset and pre-scrolling the list so the first
   tab mounts clipped. Positioning the list makes it the offsetParent, so
   the scroll math resolves against the right box. */
export const tabsListVariants = cva(
  "relative flex max-w-full items-center overflow-x-auto scrollbar-none",
  {
    variants: {
      variant: {
        underline: "gap-5 border-b border-border",
        pill: "w-fit gap-1 rounded-lg bg-muted p-1",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
)

export const tabsTabVariants = cva(
  cn(
    "inline-flex shrink-0 items-center gap-2 text-sm font-medium whitespace-nowrap select-none",
    "text-muted-foreground transition-colors duration-(--duration-fast) ease-(--ease-out)",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        underline: cn(
          "border-b-2 border-transparent px-1 pt-1 pb-2",
          "hover:text-foreground",
          "data-[active]:border-primary data-[active]:text-foreground",
        ),
        pill: cn(
          "rounded-md px-3 py-1.5",
          "hover:text-foreground",
          "data-[active]:bg-card data-[active]:text-foreground data-[active]:shadow-card",
        ),
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
)

type TabsVariant = NonNullable<VariantProps<typeof tabsListVariants>["variant"]>

const TabsVariantContext = React.createContext<TabsVariant>("underline")

export interface TabsProps extends BaseTabs.Root.Props {}

export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={cn("w-full", className)} {...props} />
}

export interface TabsListProps
  extends BaseTabs.List.Props,
    VariantProps<typeof tabsListVariants> {}

export function TabsList({ className, variant, ...props }: TabsListProps) {
  return (
    <TabsVariantContext.Provider value={variant ?? "underline"}>
      <BaseTabs.List
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

export interface TabsTabProps extends BaseTabs.Tab.Props {}

export function TabsTab({ className, ...props }: TabsTabProps) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <BaseTabs.Tab
      className={cn(tabsTabVariants({ variant }), className)}
      {...props}
    />
  )
}

export interface TabsPanelProps extends BaseTabs.Panel.Props {}

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      className={cn(
        "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  )
}
