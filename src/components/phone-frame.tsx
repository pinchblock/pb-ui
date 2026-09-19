"use client"

import type * as React from "react"

import { cn } from "../lib/cn.ts"

export interface PhoneFrameProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * PhoneFrame: marketing device frame for landing showcases. Wraps
 * arbitrary children at a phone aspect ratio; pair with AppShell
 * `contained` + layout="mobile" for a live in-frame app preview.
 * Override the width via className (default w-72).
 */
export function PhoneFrame({ className, children, ...props }: PhoneFrameProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative w-72 shrink-0 rounded-[2rem] border border-border-strong bg-background-sunken p-2 shadow-raised" /* device chrome, not a UI surface: keeps a phone-like corner */,
        className,
      )}
    >
      {/* aspect-[9/19.5] is a hardware fact (modern phone screen), not a
          design value; no token category exists for aspect ratios. */}
      <div className="relative isolate aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-50 flex justify-center pt-1.5"
        >
          <div className="h-4 w-20 rounded-full border border-border bg-background-sunken" />
        </div>
        {children}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-1 z-50 flex justify-center"
        >
          <div className="h-1 w-20 rounded-full bg-foreground/20" />
        </div>
      </div>
    </div>
  )
}
