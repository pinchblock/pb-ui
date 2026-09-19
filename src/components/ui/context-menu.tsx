"use client"

import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { dropdownMenuItemVariants, type DropdownMenuItemProps } from "./dropdown-menu.tsx"

/**
 * ContextMenu. The actions a surface carries on itself rather than behind a
 * visible control: right click on a pointer, press and hold on a touch
 * screen. Same popup and items as DropdownMenu, so a product can move an
 * action between the two without it changing appearance.
 *
 * <ContextMenu>
 *   <ContextMenuTrigger render={<article />}>...</ContextMenuTrigger>
 *   <ContextMenuPopup>
 *     <ContextMenuItem><ArrowBendUpLeft /> Reply</ContextMenuItem>
 *     <ContextMenuItem variant="destructive"><Trash /> Delete</ContextMenuItem>
 *   </ContextMenuPopup>
 * </ContextMenu>
 */
export function ContextMenu(props: BaseContextMenu.Root.Props) {
  return <BaseContextMenu.Root {...props} />
}

export function ContextMenuTrigger(props: BaseContextMenu.Trigger.Props) {
  return <BaseContextMenu.Trigger {...props} />
}

export interface ContextMenuPopupProps
  extends Omit<BaseContextMenu.Popup.Props, "className"> {
  className?: string | undefined
}

export function ContextMenuPopup({ className, ...props }: ContextMenuPopupProps) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner className="z-50 outline-none">
        <BaseContextMenu.Popup
          className={cn(
            "min-w-44 max-h-(--available-height) overflow-y-auto rounded-lg border border-border",
            "bg-popover p-1 text-popover-foreground shadow-raised outline-none",
            "origin-(--transform-origin)",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-(--duration-fast) ease-(--ease-out)",
            className,
          )}
          {...props}
        />
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  )
}

export function ContextMenuItem({ className, variant, ...props }: DropdownMenuItemProps) {
  return (
    <BaseContextMenu.Item
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    />
  )
}

export function ContextMenuSeparator({ className, ...props }: { className?: string } & BaseContextMenu.Separator.Props) {
  return <BaseContextMenu.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}
