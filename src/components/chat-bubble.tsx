import { cva, type VariantProps } from "class-variance-authority"
import { Clock } from "lucide-react"
import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * ChatBubble: one message in a coach/athlete thread. "mine" aligns
 * right on primary; "theirs" aligns left on card. Pending messages
 * (optimistic sends) dim and show a clock until the server confirms.
 */
export const chatBubbleVariants = cva(
  cn(
    "relative w-fit max-w-prose rounded-2xl px-4 py-2.5",
    "text-sm leading-relaxed break-words",
  ),
  {
    variants: {
      variant: {
        mine: "ml-auto rounded-br-md bg-primary text-primary-foreground",
        theirs: "mr-auto rounded-bl-md border border-border bg-card text-card-foreground",
      },
      pending: {
        true: "opacity-70",
      },
    },
    defaultVariants: {
      variant: "theirs",
    },
  },
)

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  /** Small trailing meta (timestamp, read state). */
  meta?: React.ReactNode
}

export function ChatBubble({
  className,
  variant,
  pending,
  meta,
  children,
  ...props
}: ChatBubbleProps) {
  return (
    <div
      data-pending={pending || undefined}
      className={cn(chatBubbleVariants({ variant, pending }), className)}
      {...props}
    >
      {children}
      {(meta != null || pending) && (
        <span className="mt-1 flex items-center justify-end gap-1 text-xs opacity-70">
          {meta}
          {pending && (
            <>
              <Clock aria-hidden className="size-3" />
              <span className="sr-only">Sending</span>
            </>
          )}
        </span>
      )}
    </div>
  )
}

export interface DateDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Centered label: "Today", "Monday", "12 May". */
  label: string
}

/** Centered date separator between message groups. */
export function DateDivider({ label, className, ...props }: DateDividerProps) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("my-4 flex items-center gap-3", className)}
      {...props}
    >
      <span aria-hidden className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium text-faint-foreground">{label}</span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  )
}
