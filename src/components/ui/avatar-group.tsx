"use client"

import * as React from "react"

import { cn } from "../../lib/cn.ts"
import { avatarVariants, type AvatarProps } from "./avatar.tsx"

/**
 * AvatarGroup. Overlapping stack of Avatars with a "+N" overflow chip.
 * Children should be Avatar elements of the same size; pass the same
 * `size` here so the overflow chip matches.
 */
export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** Maximum avatars shown before collapsing into the overflow chip. */
  max?: number
  /** Size of the overflow chip; match the Avatars passed as children. */
  size?: AvatarProps["size"]
}

export function AvatarGroup({
  className,
  max = 4,
  size = "md",
  children,
  ...props
}: AvatarGroupProps) {
  const items = React.Children.toArray(children)
  const visible = items.slice(0, max)
  const overflow = items.length - visible.length
  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((child, index) => (
        <span key={index} className="inline-flex rounded-full ring-2 ring-card">
          {child}
        </span>
      ))}
      {overflow > 0 ? (
        <span
          className={cn(
            avatarVariants({ size }),
            "bg-muted text-muted-foreground ring-2 ring-card",
          )}
        >
          +{overflow}
        </span>
      ) : null}
    </div>
  )
}
