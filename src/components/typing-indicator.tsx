"use client"

import type * as React from "react"

import { cn } from "../lib/cn.ts"

/**
 * TypingIndicator: three bouncing dots. Dots use currentColor, so it
 * inherits wherever it sits (e.g. text-muted-foreground inside a
 * "theirs" ChatBubble). CSS animation with token-derived timing; the
 * base layer's prefers-reduced-motion kill-switch stops it globally.
 */
export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Screen reader announcement. */
  label?: string
}

/* Literal classes so Tailwind can see them; timing derived from tokens. */
const DOT_DELAYS = [
  "",
  "[animation-delay:var(--duration-fast)]",
  "[animation-delay:calc(var(--duration-fast)*2)]",
] as const

export function TypingIndicator({
  label = "Typing",
  className,
  ...props
}: TypingIndicatorProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {DOT_DELAYS.map((delay, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "size-1.5 rounded-full bg-current",
            "animate-bounce [animation-duration:calc(var(--duration-slower)*2)]",
            delay,
          )}
        />
      ))}
    </div>
  )
}
