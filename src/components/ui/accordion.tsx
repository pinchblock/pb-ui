"use client"

import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import { CaretDown } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Accordion. Base UI Accordion styled for Pinchblock; replaces the
 * details/summary disclosures in pb-app. Single-open by default, pass
 * `multiple` to allow several panels at once. The chevron rotates and
 * the panel height animates with motion tokens; both respect
 * prefers-reduced-motion via the base layer.
 */
export interface AccordionProps extends BaseAccordion.Root.Props {}

export function Accordion({ className, ...props }: AccordionProps) {
  return <BaseAccordion.Root className={cn("w-full", className)} {...props} />
}

export interface AccordionItemProps extends BaseAccordion.Item.Props {}

export function AccordionItem({ className, ...props }: AccordionItemProps) {
  return (
    <BaseAccordion.Item
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  )
}

export interface AccordionTriggerProps extends BaseAccordion.Trigger.Props {}

/** Header + trigger in one part; renders the rotating chevron. */
export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps) {
  return (
    <BaseAccordion.Header className="m-0">
      <BaseAccordion.Trigger
        className={cn(
          "flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-medium text-foreground",
          "transition-colors duration-(--duration-fast) ease-(--ease-out) hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&>svg]:transition-transform [&>svg]:duration-(--duration-base) [&>svg]:ease-(--ease-out)",
          "data-[panel-open]:[&>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <CaretDown aria-hidden className="size-4 shrink-0 text-muted-foreground" />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  )
}

export interface AccordionPanelProps extends BaseAccordion.Panel.Props {}

export function AccordionPanel({ className, children, ...props }: AccordionPanelProps) {
  return (
    <BaseAccordion.Panel
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden text-sm text-muted-foreground",
        "transition-[height] duration-(--duration-base) ease-(--ease-out)",
        "data-[ending-style]:h-0 data-[starting-style]:h-0",
      )}
      {...props}
    >
      <div className={cn("pb-4", className)}>{children}</div>
    </BaseAccordion.Panel>
  )
}
