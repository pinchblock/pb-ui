"use client"

import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Table. Dependency-free table primitives with the pb-app look:
 * uppercase text-xs header row, quiet row hover, roomy cells. Wrap the
 * Table in a TableContainer (usually inside a Card) so wide tables
 * scroll horizontally instead of breaking the page on mobile.
 *
 * Cell tone helpers: `numeric` right-aligns with tabular figures for
 * comparable columns; add `mono` for identifiers and precise values.
 */
export function TableContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full overflow-x-auto", className)} {...props} />
}

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={cn("w-full caption-bottom border-collapse text-sm", className)}
      {...props}
    />
  )
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors duration-(--duration-fast) ease-(--ease-out)",
        "hover:bg-muted/50 data-[selected]:bg-primary-soft",
        className,
      )}
      {...props}
    />
  )
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Right-align for number columns. */
  numeric?: boolean
}

export function TableHead({ className, numeric = false, ...props }: TableHeadProps) {
  return (
    <th
      className={cn(
        "h-10 px-3 text-left align-middle text-xs font-semibold tracking-wider whitespace-nowrap text-muted-foreground uppercase",
        numeric && "text-right",
        className,
      )}
      {...props}
    />
  )
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-align with tabular figures for comparable numbers. */
  numeric?: boolean
  /** Monospace: identifiers, splits, precise values. */
  mono?: boolean
}

export function TableCell({
  className,
  numeric = false,
  mono = false,
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        "px-3 py-3 align-middle",
        numeric && "text-right tabular-nums",
        mono && "font-mono text-xs",
        className,
      )}
      {...props}
    />
  )
}

export function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn("mt-3 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}
