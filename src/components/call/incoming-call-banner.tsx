"use client"

import { Phone, PhoneDisconnect } from "@phosphor-icons/react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"
import { CallControlButton } from "./call-controls.tsx"

/**
 * IncomingCallBanner: the one call surface that floats OVER the normal
 * app, so it deliberately does NOT carry the "stage" class; it follows
 * the active theme like any other overlay (bg-popover, shadow-overlay).
 * role="alert" (assertive live region) so an incoming call interrupts
 * whatever the screen reader was doing when the banner mounts.
 * Positioning is the app's job; the banner only looks elevated.
 */
export interface IncomingCallBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Caller avatar slot (an Avatar). */
  avatar?: React.ReactNode
  /** Caller name. */
  name: string
  /** Context line under the name. */
  description?: string | undefined
  acceptLabel?: string | undefined
  declineLabel?: string | undefined
  onAccept?: (() => void) | undefined
  onDecline?: (() => void) | undefined
  /** Accept in flight (joining the room): spinner on accept, decline locked. */
  accepting?: boolean
}

export function IncomingCallBanner({
  avatar,
  name,
  description = "Incoming call",
  acceptLabel = "Accept call",
  declineLabel = "Decline call",
  onAccept,
  onDecline,
  accepting = false,
  className,
  ...props
}: IncomingCallBannerProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        "flex w-full max-w-sm items-center gap-3 rounded-2xl border border-border bg-popover p-3 text-popover-foreground shadow-overlay",
        /* Entrance; the base layer kills animation under reduced motion. */
        "animate-in fade-in-0 slide-in-from-top-2 duration-(--duration-base) ease-(--ease-out)",
        className,
      )}
      {...props}
    >
      {avatar != null && <span className="shrink-0">{avatar}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium">{name}</span>
        {description != null && (
          <span className="truncate text-xs text-muted-foreground">{description}</span>
        )}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <CallControlButton
          size="sm"
          intent="destructive"
          aria-label={declineLabel}
          onClick={onDecline}
          disabled={accepting}
        >
          <PhoneDisconnect aria-hidden />
        </CallControlButton>
        <CallControlButton
          size="sm"
          intent="success"
          aria-label={acceptLabel}
          onClick={onAccept}
          loading={accepting}
        >
          <Phone aria-hidden />
        </CallControlButton>
      </span>
    </div>
  )
}
