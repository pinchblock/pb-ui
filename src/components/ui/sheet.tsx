"use client"

import { Drawer } from "@base-ui/react/drawer"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Sheet. Edge-anchored panel built on the Base UI Drawer, with native
 * swipe-to-dismiss. side="right" for desktop work panels (LogSessionPanel),
 * side="bottom" for mobile composers. Sticky header/footer come from the
 * flex-column popup: SheetBody is the only scrolling region.
 *
 * <Sheet side="right">
 *   <SheetTrigger render={<Button />}>Open</SheetTrigger>
 *   <SheetPopup>
 *     <SheetHeader>
 *       <SheetTitle>Title</SheetTitle>
 *     </SheetHeader>
 *     <SheetBody>...form...</SheetBody>
 *     <SheetFooter>...actions...</SheetFooter>
 *   </SheetPopup>
 * </Sheet>
 */
export type SheetSide = "right" | "left" | "bottom"

const SheetSideContext = React.createContext<SheetSide>("right")

const SWIPE_DIRECTION: Record<SheetSide, "right" | "left" | "down"> = {
  right: "right",
  left: "left",
  bottom: "down",
}

export interface SheetProps extends Drawer.Root.Props {
  /** Edge the sheet slides in from. Also sets the swipe-dismiss direction. */
  side?: SheetSide
}

export function Sheet({ side = "right", swipeDirection, ...props }: SheetProps) {
  return (
    <SheetSideContext.Provider value={side}>
      <Drawer.Root swipeDirection={swipeDirection ?? SWIPE_DIRECTION[side]} {...props} />
    </SheetSideContext.Provider>
  )
}

export function SheetTrigger(props: Drawer.Trigger.Props) {
  return <Drawer.Trigger {...props} />
}

export function SheetClose(props: Drawer.Close.Props) {
  return <Drawer.Close {...props} />
}

const sheetViewportVariants = cva("fixed inset-0 z-50 flex", {
  variants: {
    side: {
      right: "items-stretch justify-end",
      left: "items-stretch justify-start",
      bottom: "items-end justify-center pt-12",
    },
  },
})

export const sheetPopupVariants = cva(
  cn(
    "relative flex max-h-full flex-col bg-popover text-popover-foreground",
    "shadow-overlay outline-none will-change-transform",
    "transition-transform duration-(--duration-slow) ease-(--ease-out)",
    /* Swipe follows the finger with zero lag; release animates out fast. */
    "data-swiping:duration-0 data-swiping:select-none",
    "data-ending-style:duration-(--duration-base)",
  ),
  {
    variants: {
      side: {
        right: cn(
          "h-full w-full max-w-md border-l border-border",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-starting-style:[transform:translateX(100%)]",
          "data-ending-style:[transform:translateX(100%)]",
        ),
        left: cn(
          "h-full w-full max-w-md border-r border-border",
          "[transform:translateX(var(--drawer-swipe-movement-x))]",
          "data-starting-style:[transform:translateX(-100%)]",
          "data-ending-style:[transform:translateX(-100%)]",
        ),
        bottom: cn(
          "w-full max-w-2xl rounded-t-2xl border-t border-border",
          /* Device inset, not a design value: keeps footers above the iOS home bar. */
          "pb-[env(safe-area-inset-bottom,0px)]",
          "[transform:translateY(var(--drawer-swipe-movement-y))]",
          "data-starting-style:[transform:translateY(100%)]",
          "data-ending-style:[transform:translateY(100%)]",
        ),
      },
    },
  },
)

export interface SheetPopupProps
  extends Omit<Drawer.Popup.Props, "className">,
    VariantProps<typeof sheetPopupVariants> {
  className?: string | undefined
}

/**
 * Sheet surface. Renders Portal, Backdrop and Viewport; the bottom variant
 * gets a swipe handle automatically.
 */
export function SheetPopup({ className, side: sideProp, children, ...props }: SheetPopupProps) {
  const contextSide = React.useContext(SheetSideContext)
  const side = sideProp ?? contextSide
  return (
    <Drawer.Portal>
      <Drawer.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
          "opacity-[calc(1-var(--drawer-swipe-progress,0))]",
          "transition-opacity duration-(--duration-slow) ease-(--ease-out)",
          "data-starting-style:opacity-0 data-ending-style:opacity-0",
          "data-swiping:duration-0 data-ending-style:duration-(--duration-base)",
        )}
      />
      <Drawer.Viewport className={sheetViewportVariants({ side })}>
        <Drawer.Popup className={cn(sheetPopupVariants({ side }), className)} {...props}>
          {side === "bottom" && (
            <div
              aria-hidden
              className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-border-strong"
            />
          )}
          {children}
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  )
}

/** Sticky top slot: stays put while SheetBody scrolls. */
export function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-1.5 border-b border-border p-4 sm:px-6",
        className,
      )}
      {...props}
    />
  )
}

/**
 * The scrolling region. Wraps Base UI Drawer.Content so text inside stays
 * selectable without triggering swipe-dismiss.
 */
export interface SheetBodyProps extends Omit<Drawer.Content.Props, "className"> {
  className?: string | undefined
}

export function SheetBody({ className, ...props }: SheetBodyProps) {
  return (
    <Drawer.Content
      className={cn("flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6", className)}
      {...props}
    />
  )
}

/** Sticky bottom slot for actions. */
export function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col-reverse gap-2 border-t border-border p-4 sm:flex-row sm:justify-end sm:px-6",
        className,
      )}
      {...props}
    />
  )
}

export interface SheetTitleProps extends Omit<Drawer.Title.Props, "className"> {
  className?: string | undefined
}

export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <Drawer.Title
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

export interface SheetDescriptionProps extends Omit<Drawer.Description.Props, "className"> {
  className?: string | undefined
}

export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <Drawer.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
