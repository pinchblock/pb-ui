"use client"

import { Toast as BaseToast } from "@base-ui/react/toast"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CircleAlert,
  CircleCheck,
  Info,
  Sparkles,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react"
import type * as React from "react"

import { cn } from "../../lib/cn.ts"

/**
 * Toast. Imperative notifications: call toast.success(...) from anywhere
 * (event handlers, stores, API clients); the <Toaster /> mounted once at
 * the app root renders the stack. Auto-dismiss after 5s, swipe to dismiss
 * (down/right), hover to expand the stack. Announcements are handled by
 * Base UI's built-in live region.
 */
export type ToastTone = "success" | "destructive" | "info" | "warning" | "ai"

export interface ToastOptions {
  description?: React.ReactNode
  /** ms before auto-dismiss; 0 keeps the toast until dismissed. Default 5000. */
  timeout?: number
  /** "high" announces assertively for urgent failures. Default "low". */
  priority?: "low" | "high"
  /** Re-using an id updates the existing toast in place. */
  id?: string
}

/** Global manager: works outside React, survives across route changes. */
export const toastManager = BaseToast.createToastManager()

function makeTone(tone: ToastTone) {
  return (message: React.ReactNode, options?: ToastOptions): string =>
    toastManager.add({ title: message, type: tone, ...options })
}

export const toast = {
  success: makeTone("success"),
  destructive: makeTone("destructive"),
  /** Ergonomic alias for `toast.destructive` (the canonical tone). */
  error: makeTone("destructive"),
  info: makeTone("info"),
  warning: makeTone("warning"),
  /** AI treatment: only for AI-assisted moments (guardrails). */
  ai: makeTone("ai"),
  /** Dismiss one toast by id, or every toast when called bare. */
  dismiss: (id?: string) => toastManager.close(id),
}

const TONE_ICONS: Record<ToastTone, LucideIcon> = {
  success: CircleCheck,
  destructive: CircleAlert,
  info: Info,
  warning: TriangleAlert,
  ai: Sparkles,
}

export const toastIconVariants = cva("mt-0.5 size-4 shrink-0", {
  variants: {
    tone: {
      success: "text-success",
      destructive: "text-destructive",
      info: "text-info",
      warning: "text-warning",
      ai: "text-ai-foreground",
    },
  },
})

type ToastIconTone = NonNullable<VariantProps<typeof toastIconVariants>["tone"]>

function isTone(type: string | undefined): type is ToastIconTone {
  return type !== undefined && type in TONE_ICONS
}

/* Stacking math from the Base UI toast recipe, mapped onto tokens.
   --toast-index / --toast-offset-y / --toast-swipe-movement-* are provided
   by Base UI at runtime. */
const toastRootClassName = cn(
  "absolute right-0 bottom-0 left-auto z-[calc(1000-var(--toast-index))] w-full select-none",
  "[--gap:calc(var(--spacing)*3)] [--peek:calc(var(--spacing)*3)]",
  "[--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]",
  "[--height:var(--toast-frontmost-height,var(--toast-height))]",
  "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
  "origin-bottom rounded-xl border border-border bg-popover text-popover-foreground shadow-raised",
  "h-(--height) data-expanded:h-(--toast-height)",
  /* Collapsed stack: peek + scale. Expanded (hover/focus): full list. */
  "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
  "data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
  /* Bridge the gap between stacked toasts so hover does not flicker. */
  "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
  /* Enter, exit, and swipe-release exits per direction. */
  "data-starting-style:[transform:translateY(150%)]",
  "data-ending-style:opacity-0 data-limited:opacity-0",
  "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
  "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
  "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
  "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
  "transition-[transform,opacity,height] duration-(--duration-slow) ease-(--ease-out)",
)

function ToastList() {
  const { toasts } = BaseToast.useToastManager()
  return toasts.map((t) => {
    const tone = isTone(t.type) ? t.type : undefined
    const Icon = tone ? TONE_ICONS[tone] : undefined
    return (
      <BaseToast.Root key={t.id} toast={t} className={toastRootClassName}>
        <BaseToast.Content
          className={cn(
            "flex h-full items-start gap-3 overflow-hidden p-4",
            "transition-opacity duration-(--duration-base) ease-(--ease-out)",
            "data-behind:opacity-0 data-expanded:opacity-100",
          )}
        >
          {Icon && <Icon aria-hidden className={toastIconVariants({ tone })} />}
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <BaseToast.Title className="text-sm leading-tight font-semibold" />
            <BaseToast.Description className="text-sm text-muted-foreground" />
          </div>
          <BaseToast.Close
            aria-label="Dismiss notification"
            className={cn(
              "-m-1 shrink-0 rounded-md p-1 text-muted-foreground",
              "transition-colors duration-(--duration-fast) ease-(--ease-out)",
              "hover:bg-muted hover:text-foreground",
            )}
          >
            <X aria-hidden className="size-4" />
          </BaseToast.Close>
        </BaseToast.Content>
      </BaseToast.Root>
    )
  })
}

export interface ToasterProps {
  /** ms before auto-dismiss for all toasts; individual toasts can override. */
  timeout?: number
  /** Max toasts shown before the oldest fade out. */
  limit?: number
}

/**
 * Mount exactly once at the app root. Viewport sits bottom-center on
 * mobile and bottom-right on sm+ screens.
 */
export function Toaster({ timeout = 5000, limit = 3 }: ToasterProps) {
  return (
    <BaseToast.Provider toastManager={toastManager} timeout={timeout} limit={limit}>
      <BaseToast.Portal>
        <BaseToast.Viewport
          className={cn(
            "fixed inset-x-4 bottom-4 z-50",
            "sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96",
          )}
        >
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}
