"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { Button } from "./button.tsx"

/**
 * Pagination. Prev/next plus page numbers with ellipsis truncation.
 * The compact variant drops the number strip to "page X of Y" text and
 * is the right choice on mobile and inside tight card footers.
 */
export const paginationVariants = cva("flex items-center gap-1", {
  variants: {
    variant: {
      default: "",
      compact: "gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const ELLIPSIS = "ellipsis" as const

type PageItem = number | typeof ELLIPSIS

/** 1 ... 4 [5] 6 ... 12 with `siblingCount` neighbours each side. */
function getPageItems(page: number, pageCount: number, siblingCount: number): PageItem[] {
  const totalSlots = siblingCount * 2 + 5 // first + last + 2 ellipses + window
  if (pageCount <= totalSlots) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }
  const left = Math.max(page - siblingCount, 2)
  const right = Math.min(page + siblingCount, pageCount - 1)
  const items: PageItem[] = [1]
  if (left > 2) items.push(ELLIPSIS)
  for (let p = left; p <= right; p++) items.push(p)
  if (right < pageCount - 1) items.push(ELLIPSIS)
  items.push(pageCount)
  return items
}

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange">,
    VariantProps<typeof paginationVariants> {
  /** Current page, 1-based. */
  page: number
  /** Total number of pages. */
  pageCount: number
  onPageChange?: (page: number) => void
  /** Pages shown on each side of the current page (default 1). */
  siblingCount?: number
}

export function Pagination({
  className,
  variant,
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  ...props
}: PaginationProps) {
  const clamp = (p: number) => Math.min(Math.max(p, 1), pageCount)
  const go = (p: number) => {
    const next = clamp(p)
    if (next !== page) onPageChange?.(next)
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn(paginationVariants({ variant }), className)}
      {...props}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
      >
        <CaretLeft aria-hidden />
      </Button>

      {variant === "compact" ? (
        <span className="text-sm text-muted-foreground tabular-nums">
          Page <span className="font-medium text-foreground">{page}</span> of {pageCount}
        </span>
      ) : (
        getPageItems(page, pageCount, siblingCount).map((item, index) =>
          item === ELLIPSIS ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden
              className="px-1 text-sm text-faint-foreground select-none"
            >
              &hellip;
            </span>
          ) : (
            <Button
              key={item}
              variant={item === page ? "soft" : "ghost"}
              size="icon-sm"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              className="tabular-nums"
              onClick={() => go(item)}
            >
              {item}
            </Button>
          ),
        )
      )}

      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => go(page + 1)}
      >
        <CaretRight aria-hidden />
      </Button>
    </nav>
  )
}
