"use client"

import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Avatar. Base UI Avatar underneath (image loading states handled).
 * The initials fallback is colored deterministically from `colorKey`
 * (defaults to `name`) across the chart token palette, so the same
 * person gets the same color everywhere without hand-picking.
 */
export const avatarVariants = cva(
  cn(
    "relative inline-flex shrink-0 items-center justify-center overflow-visible",
    "rounded-full align-middle font-medium select-none",
  ),
  {
    variants: {
      size: {
        xs: "size-6 text-xs",
        sm: "size-7 text-xs",
        md: "size-9 text-sm",
        lg: "size-12 text-base",
        xl: "size-16 text-lg",
        "2xl": "size-20 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

/* Literal class strings: Tailwind cannot see composed class names. */
const FALLBACK_COLORS = [
  "bg-chart-1/15 text-chart-1",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
  "bg-chart-4/15 text-chart-4",
  "bg-chart-5/15 text-chart-5",
  "bg-chart-6/15 text-chart-6",
  "bg-chart-7/15 text-chart-7",
  "bg-chart-8/15 text-chart-8",
]

const RING_CLASSES = {
  primary: "ring-2 ring-primary",
  success: "ring-2 ring-success",
  warning: "ring-2 ring-warning",
  destructive: "ring-2 ring-destructive",
  info: "ring-2 ring-info",
} as const

export type AvatarRing = keyof typeof RING_CLASSES

function hashKey(key: string): number {
  let hash = 0
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  const first = parts[0]?.charAt(0) ?? ""
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? "") : ""
  return (first + last).toUpperCase() || "?"
}

export interface AvatarProps
  extends BaseAvatar.Root.Props,
    VariantProps<typeof avatarVariants> {
  /** Image URL; the initials fallback shows while loading or on error. */
  src?: string
  /** Image alt text; falls back to `name`. */
  alt?: string
  /** Person's name; drives the initials fallback. */
  name?: string
  /** Stable key for the fallback color hash (e.g. user id). Defaults to `name`. */
  colorKey?: string
  /** Status ring around the avatar (presence, attention). */
  ring?: AvatarRing
  /** Overlay slot at the bottom-right corner (e.g. a ShieldCheck for verified coaches). */
  badge?: React.ReactNode
}

export function Avatar({
  className,
  size,
  src,
  alt,
  name,
  colorKey,
  ring,
  badge,
  children,
  ...props
}: AvatarProps) {
  const key = colorKey ?? name ?? alt ?? ""
  const fallbackColor =
    FALLBACK_COLORS[hashKey(key) % FALLBACK_COLORS.length] ?? "bg-muted text-muted-foreground"
  /* AT hears the person's name, not the raw initials ("JD"). */
  const fallbackName = name ?? alt
  return (
    <BaseAvatar.Root
      className={cn(avatarVariants({ size }), ring && RING_CLASSES[ring], className)}
      {...props}
    >
      {src ? (
        <BaseAvatar.Image
          src={src}
          alt={alt ?? name ?? ""}
          className="size-full rounded-full object-cover"
        />
      ) : null}
      <BaseAvatar.Fallback
        role={fallbackName ? "img" : undefined}
        aria-label={fallbackName}
        className={cn(
          "flex size-full items-center justify-center rounded-full",
          fallbackColor,
        )}
      >
        <span aria-hidden={fallbackName ? true : undefined}>
          {initialsOf(fallbackName ?? "")}
        </span>
      </BaseAvatar.Fallback>
      {badge ? (
        <span className="absolute -right-0.5 -bottom-0.5 z-10 inline-flex items-center justify-center rounded-full bg-card p-0.5 text-primary">
          {badge}
        </span>
      ) : null}
      {children}
    </BaseAvatar.Root>
  )
}
