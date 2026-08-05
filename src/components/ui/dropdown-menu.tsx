"use client"

import { Menu as BaseMenu } from "@base-ui/react/menu"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Circle } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * DropdownMenu. Action menus on Base UI Menu: full keyboard navigation,
 * typeahead, checkbox and radio items. Replaces the details/summary post
 * menus in pb-app.
 *
 * <DropdownMenu>
 *   <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
 *     <EllipsisVertical />
 *   </DropdownMenuTrigger>
 *   <DropdownMenuPopup>
 *     <DropdownMenuItem><Pencil /> Edit</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem variant="destructive"><Trash2 /> Delete</DropdownMenuItem>
 *   </DropdownMenuPopup>
 * </DropdownMenu>
 */
export function DropdownMenu(props: BaseMenu.Root.Props) {
  return <BaseMenu.Root {...props} />
}

export function DropdownMenuTrigger(props: BaseMenu.Trigger.Props) {
  return <BaseMenu.Trigger {...props} />
}

export interface DropdownMenuPopupProps extends Omit<BaseMenu.Popup.Props, "className"> {
  className?: string | undefined
  side?: BaseMenu.Positioner.Props["side"]
  align?: BaseMenu.Positioner.Props["align"]
  sideOffset?: BaseMenu.Positioner.Props["sideOffset"]
  alignOffset?: BaseMenu.Positioner.Props["alignOffset"]
}

export function DropdownMenuPopup({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset,
  ...props
}: DropdownMenuPopupProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50 outline-none"
      >
        <BaseMenu.Popup
          className={cn(
            "min-w-48 max-h-(--available-height) overflow-y-auto rounded-lg border border-border",
            "bg-popover p-1 text-popover-foreground shadow-raised outline-none",
            "origin-(--transform-origin)",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            "duration-(--duration-fast) ease-(--ease-out)",
            className,
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  )
}

export const dropdownMenuItemVariants = cva(
  cn(
    "relative flex select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
    "transition-colors duration-(--duration-fast) ease-(--ease-out)",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "text-foreground data-highlighted:bg-muted",
          "[&_svg]:text-muted-foreground",
        ),
        destructive: cn(
          "text-destructive data-highlighted:bg-destructive-soft",
          "[&_svg]:text-destructive",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface DropdownMenuItemProps
  extends Omit<BaseMenu.Item.Props, "className">,
    VariantProps<typeof dropdownMenuItemVariants> {
  className?: string | undefined
}

export function DropdownMenuItem({ className, variant, ...props }: DropdownMenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(dropdownMenuItemVariants({ variant }), className)}
      {...props}
    />
  )
}

export interface DropdownMenuCheckboxItemProps
  extends Omit<BaseMenu.CheckboxItem.Props, "className"> {
  className?: string | undefined
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(dropdownMenuItemVariants({ variant: "default" }), "pl-8", className)}
      {...props}
    >
      <BaseMenu.CheckboxItemIndicator className="absolute left-2 flex size-4 items-center justify-center">
        <Check aria-hidden className="size-4" />
      </BaseMenu.CheckboxItemIndicator>
      {children}
    </BaseMenu.CheckboxItem>
  )
}

export function DropdownMenuRadioGroup(props: BaseMenu.RadioGroup.Props) {
  return <BaseMenu.RadioGroup {...props} />
}

export interface DropdownMenuRadioItemProps
  extends Omit<BaseMenu.RadioItem.Props, "className"> {
  className?: string | undefined
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem
      className={cn(dropdownMenuItemVariants({ variant: "default" }), "pl-8", className)}
      {...props}
    >
      <BaseMenu.RadioItemIndicator className="absolute left-2 flex size-4 items-center justify-center">
        {/* weight="fill": the radio dot is control anatomy, it must stay
            a solid dot at any global icon weight (AGENTS.md rule 6). */}
        <Circle aria-hidden weight="fill" className="size-2 text-primary" />
      </BaseMenu.RadioItemIndicator>
      {children}
    </BaseMenu.RadioItem>
  )
}

export function DropdownMenuGroup(props: BaseMenu.Group.Props) {
  return <BaseMenu.Group {...props} />
}

export interface DropdownMenuGroupLabelProps
  extends Omit<BaseMenu.GroupLabel.Props, "className"> {
  className?: string | undefined
}

export function DropdownMenuGroupLabel({
  className,
  ...props
}: DropdownMenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export interface DropdownMenuSeparatorProps
  extends Omit<BaseMenu.Separator.Props, "className"> {
  className?: string | undefined
}

export function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <BaseMenu.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Right-aligned hint text for an item (keyboard shortcut, meta info). */
export function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-faint-foreground", className)}
      {...props}
    />
  )
}
