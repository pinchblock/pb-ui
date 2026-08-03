import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * TagPill. Quieter than Badge: sport tags, interests, filter chips.
 * Pass `onRemove` to render a keyboard-operable remove button.
 */
export const tagPillVariants = cva(
  cn(
    "inline-flex shrink-0 items-center whitespace-nowrap rounded-full",
    "bg-secondary-soft text-secondary-foreground",
  ),
  {
    variants: {
      size: {
        sm: "h-5 gap-0.5 px-2 text-xs",
        md: "h-6 gap-1 px-2.5 text-xs",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

export interface TagPillProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof tagPillVariants> {
  /** Renders a remove (X) button and calls back on activation. */
  onRemove?: () => void
  /** Accessible name for the remove button. */
  removeLabel?: string
}

export function TagPill({
  className,
  size,
  onRemove,
  removeLabel = "Remove",
  children,
  ...props
}: TagPillProps) {
  return (
    <span className={cn(tagPillVariants({ size }), className)} {...props}>
      {children}
      {onRemove ? (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className={cn(
            "-mr-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full",
            "text-muted-foreground transition-colors duration-(--duration-fast) ease-(--ease-out)",
            "hover:bg-secondary hover:text-secondary-foreground",
          )}
        >
          <X aria-hidden className="size-3" />
        </button>
      ) : null}
    </span>
  )
}
